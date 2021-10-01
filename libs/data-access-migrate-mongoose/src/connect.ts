import mongoose from 'mongoose';
import isFunction from 'lodash/isFunction';
import debug from 'debug';

const logger = debug('data-access-migrate-mongoose:connect');

export function connect(uri: string, options: mongoose.ConnectionOptions, cb?: () => void): mongoose.Connection {
  // NOTE:
  // createConnection use to multiple connections open to Mongo,
  // each with different read/write settings
  // This connection object is then used to create and retrieve models.
  // Models are always scoped to a single connection.

  const conn = mongoose.createConnection(uri, options);

  // mongoose.connect(uri, options)
  // const conn = mongoose.connection

  // CONNECTION EVENTS
  // When successfully connected
  conn.on('connected', () => {
    logger(`Mongoose default connection open to ${uri}`);
    isFunction(cb) && cb();
  });

  // If the connection throws an error
  conn.on('error', err => {
    logger(`Failed to connect to DB ${uri} on startup ${err.message}`);
  });

  // When the connection is disconnected
  conn.on('disconnected', () => {
    logger(`Mongoose default connection to DB : ${uri} disconnected`);
  });

  const gracefulExit = () => {
    conn.close(() => {
      logger(`Mongoose default connection with DB : ${uri} is disconnected through app termination`);
      process.exit(0);
    });
  };

  // If the Node process ends, close the Mongoose connection
  process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);

  return conn;
}

// DEBUG
// https://stackoverflow.com/questions/18762264/log-all-queries-that-mongoose-fire-in-the-application
function openDebugMongo() {
  mongoose.set('debug', (coll: string, method: string, query, doc, options) => {
    const message = `mongo debug ${coll}: ${method} - Query: ${JSON.stringify(query)}
        doc: ${JSON.stringify(doc)}
        options: ${JSON.stringify(options)}
        `;
    logger(message);
  });
}

// Mongo
const defaults = {
  // https://dev.to/emmysteven/solved-mongoose-unique-index-not-working-45d5
  // Solved unique issue
  autoIndex: true,
  keepAlive: true,
  // https://github.com/Automattic/mongoose/issues/6890
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // https://mongoosejs.com/docs/deprecations.html#findandmodify
  useFindAndModify: false
};
let primaryData: null | mongoose.Connection = null;

export default function connectPrimaryData(dbConnectionUri: string = process.env.MONGODB_URI,options: mongoose.ConnectionOptions = {}, cb?: () => void): mongoose.Connection {
  options = Object.assign(
    {},
    defaults,
    options,
  );

  if (!primaryData) {
    logger('create mongo instance');
    primaryData = connect(dbConnectionUri, options, cb);
  } else if(isFunction(cb)) {
    cb();
  }

  if (process.env.NODE_ENV === 'development' && process.env.MONGO_DEBUG === 'true') {
    // enable debug mongo
    openDebugMongo();
  }

  return primaryData;
}
