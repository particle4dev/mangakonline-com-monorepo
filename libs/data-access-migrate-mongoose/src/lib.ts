import { Connection, FilterQuery } from 'mongoose';
import fs from 'fs';
import path from 'path';
import ask, {Answers} from 'inquirer';
import filter from 'lodash/filter';
import find from 'lodash/find';
import mkdirp from 'mkdirp';
import MigrationModelFactory, { MigrationDocument, MigrationModel } from './migration.schema';
import connect from './connect';
import 'colors';

const migrationTemplate =`/**
 * Make any changes you need to make to the database here
 */
export async function up () {
  // Write migration here
}
/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
export async function down () {
  // Write migration here
}
`;

export type MigratorConstructor = {
  templatePath?: string;
  migrationsPath: string;
  dbConnectionUri?: string;
  collectionName?: string;
  autosync?: boolean;
  cli?: boolean;
  connection?: Connection
};

export default class Migrator {
  template: null | string = null;
  migrationPath: null | string = null;
  connection: null | Connection = null;
  collection: null | string = null;
  autosync = false;
  cli = false;
  migrationModel: null | MigrationModel = null;

  constructor({
    templatePath,
    migrationsPath = './migrations',
    dbConnectionUri,
    collectionName = 'migrations',
    autosync = false,
    cli = false,
    connection
  }: MigratorConstructor) {
    const defaultTemplate = migrationTemplate;
    this.template = templatePath ? fs.readFileSync(templatePath, 'utf-8') : defaultTemplate;
    this.migrationPath = path.resolve(migrationsPath);
    this.connection = connection || connect(dbConnectionUri);
    this.collection = collectionName;
    this.autosync = autosync;
    this.cli = cli;
    this.migrationModel = MigrationModelFactory(collectionName, this.connection);

    mkdirp.sync(this.migrationPath);
  }

  log(logString, force = false) {
    if (force || this.cli) {
      console.log(logString);
    }
  }

  /**
   * Use your own Mongoose connection object (so you can use this('modelname')
   * @param {mongoose.connection} connection - Mongoose connection
   */
  setMongooseConnection(connection: Connection) {
    this.migrationModel = MigrationModelFactory(this.collection, connection);
    return this;
  }

  /**
   * Close the underlying connection to mongo
   * @returns {Promise} A promise that resolves when connection is closed
   */
  close() {
    return this.connection ? this.connection.close() : Promise.resolve();
  }

  /**
   * Create a new migration
   * @param {string} migrationName
   * @returns {Promise<Object>} A promise of the Migration created
   */
  async create(migrationName: string) {
    try {
      const existingMigration = await this.migrationModel.findOne({ name: migrationName });
      if (existingMigration) {
        throw new Error(`There is already a migration with name '${migrationName}' in the database`.red);
      }

      await this.sync();
      const now = Date.now();
      const newMigrationFile = `${now}-${migrationName}.ts`;
      fs.writeFileSync(path.join(this.migrationPath, newMigrationFile), this.template);
      // create instance in db
      await this.connection;
      const migrationCreated = await this.migrationModel.create({
        name: migrationName,
        createdAt: now
      });
      this.log(`Created migration ${migrationName} in ${this.migrationPath}.`);
      return migrationCreated;
    } catch (error) {
      this.log(error.stack);
      fileRequired(error);
    }
  }

  /**
   * Runs migrations up to or down to a given migration name
   *
   * @param migrationName
   * @param direction
   */
  async run(direction = 'up', migrationName, ...args) {
    await this.sync();

    if (direction !== 'up' && direction !== 'down') {
      throw new Error(`The '${direction}' is not supported, use the 'up' or 'down' direction`);
    }

    const untilMigration = migrationName ?
      await this.migrationModel.findOne({ name: migrationName }) :
      await this.migrationModel.findOne().sort({ createdAt: direction === 'up' ? -1 : 1 });

    if (!untilMigration) {
      if (migrationName) throw new ReferenceError("Could not find that migration in the database");
      else throw new Error("There are no pending migrations.");
    }

    let query: FilterQuery<MigrationDocument> = {
      createdAt: { $lte: untilMigration.createdAt },
      state: 'down'
    };

    if (direction === 'down') {
      query = {
        createdAt: { $gte: untilMigration.createdAt },
        state: 'up'
      };
    }

    const sortDirection = direction === 'up' ? 1 : -1;
    const migrationsToRun = await this.migrationModel.find(query)
      .sort({ createdAt: sortDirection });

    if (!migrationsToRun.length) {
      if (this.cli) {
        this.log('There are no migrations to run'.yellow);
        this.log(`Current Migrations' Statuses: `);
        await this.list();
      }
    }

    let numMigrationsRan = 0;
    const migrationsRan = [];

    for (const migration of migrationsToRun) {
      const migrationFilePath = path.join(this.migrationPath, migration.filename);
      const migrationFunctions = await import(path.resolve(migrationFilePath));

      if (!migrationFunctions[direction]) {
        throw new Error(`The "${direction}" export is not defined in ${migration.filename}.`.red);
      }

      try {
        await migrationFunctions[direction].call(
          this.connection.model.bind(this.connection),
          this.connection,
          ...args
        );

        this.log(`${direction.toUpperCase()}:   `[direction == 'up' ? 'green' : 'red'] + ` ${migration.filename} `);

        await this.migrationModel.updateMany({ name: migration.name }, { $set: { state: direction } });
        migrationsRan.push(migration.toJSON());
        numMigrationsRan++;
      } catch (err) {
        this.log(`Failed to run migration ${migration.name} due to an error.`.red);
        this.log(`Not continuing. Make sure your data is in consistent state`.red);
        throw err instanceof (Error) ? err : new Error(err);
      }
    }

    if (migrationsToRun.length == numMigrationsRan && numMigrationsRan > 0) this.log('All migrations finished successfully.'.green);
    return migrationsRan;
  }

  /**
   * Looks at the file system migrations and imports any migrations that are
   * on the file system but missing in the database into the database
   *
   * This functionality is opposite of prune()
   */
  async sync() {
    try {
      const migrationsInFolder = await this.getMigrationsInFolder();

      const filesNotInDb = filter(migrationsInFolder, { existsInDatabase: false }).map(f => f.filename);
      let migrationsToImport = filesNotInDb;
      this.log('Synchronizing database with file system migrations...');
      if (!this.autosync && migrationsToImport.length) {
        const answers: Answers = await ask.prompt({
          type: 'checkbox',
          message: 'The following migrations exist in the migrations folder but not in the database. Select the ones you want to import into the database',
          name: 'migrationsToImport',
          choices: filesNotInDb
        });

        migrationsToImport = answers.migrationsToImport;
      }

      return await Promise.all(migrationsToImport.map(async (migrationToImport) => {
        const filePath = path.join(this.migrationPath, migrationToImport),
          timestampSeparatorIndex = migrationToImport.indexOf('-'),
          timestamp = migrationToImport.slice(0, timestampSeparatorIndex),
          migrationName = migrationToImport.slice(timestampSeparatorIndex + 1, migrationToImport.lastIndexOf('.'));

        this.log(`Adding migration ${filePath} into database from file system. State is ` + `DOWN`.red);
        const createdMigration = await this.migrationModel.create({
          name: migrationName,
          createdAt: timestamp
        });
        return createdMigration.toJSON();
      }));
    } catch (error) {
      this.log(`Could not synchronise migrations in the migrations folder up to the database.`.red);
      throw error;
    }
  }

  /**
   * Opposite of sync().
   * Removes files in migration directory which don't exist in database.
   */
  async prune() {
    try {
      const dbMigrationsNotOnFs = await this.getMigrationsNotInFolder();

      let migrationsToDelete: string[] = dbMigrationsNotOnFs.map(m => m.name);

      if (!this.autosync && !!migrationsToDelete.length) {
        const answers: Answers = await ask.prompt({
          type: 'checkbox',
          message: 'The following migrations exist in the database but not in the migrations folder. Select the ones you want to remove from the file system.',
          name: 'migrationsToDelete',
          choices: migrationsToDelete
        });

        migrationsToDelete = answers.migrationsToDelete;
      }

      const migrationsToDeleteDocs = await this.migrationModel
        .find({
          name: { $in: migrationsToDelete }
        }).lean();

      if (migrationsToDelete.length) {
        this.log(`Removing migration(s) ` + `${migrationsToDelete.join(', ')}`.cyan + ` from database`);
        await this.migrationModel.deleteMany({
          name: { $in: migrationsToDelete }
        });
      }

      return migrationsToDeleteDocs;
    } catch (error) {
      this.log(`Could not prune extraneous migrations from database.`.red);
      throw error;
    }
  }

  async getMigrationsInFolder(): Promise<{createdAt: number, filename: string, existsInDatabase: boolean}> {
    const filesInMigrationFolder: string[] = fs.readdirSync(this.migrationPath);
    const migrationsInDatabase = await this.migrationModel.find({});
    const migrationsInFolder = filter(filesInMigrationFolder, (file: string) => RegExp(/(\.js|\.ts)$/).test(file))
      .map((filename: string) => {
        const fileCreatedAt = parseInt(filename.split('-')[0]);
        const existsInDatabase: boolean = migrationsInDatabase.some((m: MigrationDocument) => filename == m.filename);
        return { createdAt: fileCreatedAt, filename, existsInDatabase };
      });
    return migrationsInFolder;
  }

  async getMigrationsNotInFolder() {
    const migrationsInFolder = await this.getMigrationsInFolder();
    const migrationsInDatabase = await this.migrationModel.find({});
    const dbMigrationsNotOnFs = filter(migrationsInDatabase, m => {
      return !find(migrationsInFolder, { filename: m.filename });
    });

    return dbMigrationsNotOnFs;
  }

  /**
   * Lists the current migrations and their statuses
   * @returns {Promise<Array<Object>>}
   * @example
   *   [
   *    { name: 'my-migration', filename: '149213223424_my-migration.js', state: 'up' },
   *    { name: 'add-cows', filename: '149213223453_add-cows.js', state: 'down' }
   *   ]
   */
  async list() {
    await this.sync();
    const migrations = await this.migrationModel.find().sort({ createdAt: 1 });
    if (!migrations.length) this.log('There are no migrations to list.'.yellow);
    return migrations.map((m) => {
      this.log(
        `${m.state == 'up' ? 'UP:  \t' : 'DOWN:\t'}`[m.state == 'up' ? 'green' : 'red'] +
        ` ${m.filename}`
      );
      return m.toJSON();
    });
  }
}

function fileRequired(error) {
  if (error && error.code == 'ENOENT') {
    throw new ReferenceError(`Could not find any files at path '${error.path}'`);
  }
}
