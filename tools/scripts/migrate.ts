import path from 'path';
import minimist from 'minimist';
import migrateMongoose from 'data-access-migrate-mongoose';

const argv = minimist(process.argv.slice(2));

const migrationsDir = 'migrations';

const migrator = new migrateMongoose({
  migrationsPath: path.resolve('apps', argv.app, migrationsDir), // Path to migrations directory
  dbConnectionUri: process.env.MONGODB_URI, // mongo url
  autosync: false // if making a CLI app, set this to false to prompt the user, otherwise true
});

// Create command
if(argv._.includes('create')) {
  migrator.create(argv.name).then(()=> {
    console.log(`Migration created. Run mongoose-migrate up ${argv.name} to apply the migration.`);
    process.exit(0);
  })
}

// Migrate Up
if(argv._.includes('up')) {
  migrator.run('up', argv.name).then(()=> {
    console.log(`Migration up ${argv.name} finished.`);
    process.exit(0);
  })
}

// Migrate down
if(argv._.includes('down')) {
  migrator.run('down', argv.name).then(()=> {
    console.log(`Migration down ${argv.name} finished.`);
    process.exit(0);
  });
}

// Migrate list
if(argv._.includes('list')) {
  migrator.list().then((result)=> {
    console.log(result);
    process.exit(0);
  });
}

// Migrate prune
if(argv._.includes('prune')) {
  migrator.prune().then(()=> {
    process.exit(0);
  });
}

// Migrate sync
if(argv._.includes('sync')) {
  migrator.sync().then((result)=> {
    console.log(result);
    process.exit(0);
  });
}
