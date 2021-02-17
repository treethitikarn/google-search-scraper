const express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  compression = require('compression'),
  path = require('path'),
  cors = require('cors'),
  helmet = require('helmet');
const config = require('./config'),
  error = require('./helpers/error'),
  apis = require('./apis'),
  { errorObjects } = require('./helpers/error'),
  { callLocationTracking } = require('./middelwares'),
  logger = require('./helpers/logger'),
  log = logger('Middlewares');

function addRequestPreProcessMiddleware (app) {
  log.info('Add request preprocess middleware');

  if (config.NODE_ENV !== 'production') {
    app.use(morgan(':date[iso] :method :url :status :res[content-length] - :response-time ms'));
  }

  app.use(helmet());
  app.use(cors());
  app.use(compression());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  return Promise.resolve(true);
}

function connectApi (app) {
  log.info('Connect Apis')
  app.use(express.static(path.resolve(config.BASE_PATH, 'build'), { index: false }));
  app.use('/api', callLocationTracking);
  app.get('/*', apis.index);
  return Promise.resolve(true);
}

function pathNotFoundHandler (req, res, next) {
  next(errorObjects.NOT_FOUND);
}

function shutdown () {
  log.info('Shutdown');
  return Promise.resolve(true);
}

const app = express();

module.exports = addRequestPreProcessMiddleware(app)
  .then(() => connectApi(app))
  .then(() => {
    log.info('Add path not found handler');
    app.use(pathNotFoundHandler);
    log.info('Add error handler');
    app.use(error.handleError);
    app.shutdown = shutdown;
    return app;
  });
