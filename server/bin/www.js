const http = require('http');
const createApp = require('../app'),
  config = require('../config'),
  logger = require('../helpers/logger'),
  log = logger('Setup www');

let server, app;

process.on('uncaughtException', (err) => {
  log.error(err);
  process.exit(1);
});

function onError (error) {
  if (error.syscall !== 'listen') { throw error; }

  const bind = typeof port === 'string' ? `Pipe ${config.PORT}` : `Port ${config.PORT}`;

  switch (error.code) {
    case 'EACCES':
      log.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      log.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening () {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  log.info('Listening on ' + bind);
}

function onTerminating (signal) {
  return server.close(() => {
    return app.shutdown()
      .then(() => {
        process.exit(0);
      })
      .catch((err) => {
        process.exit(1);
      });
  });
}

createApp
  .then((result) => {
    app = result;
    app.set('port', config.PORT);
    server = http.createServer(app);
    server.listen(config.PORT);
    server.on('error', onError);
    server.on('listening', onListening);
    process.on('SIGTERM', onTerminating);
    process.on('SIGINT', onTerminating);
    process.on('SIGQUIT', onTerminating);
    process.on('SIGTSTP', onTerminating);
  })
  .catch((err) => {
    process.exit(1);
  });

