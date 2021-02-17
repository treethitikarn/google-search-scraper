'use strict';

const httpStatus = require('./httpStatus');
const logger = require('../helpers/logger');
const log = logger('Helpers.error');
const errorObjects = {
    BAD_REQUEST: {
      status: httpStatus.BAD_REQUEST,
      code: httpStatus.BAD_REQUEST,
      message: 'invalid parameter(s)'
    },
    UNAUTHORIZED: {
      status: httpStatus.UNAUTHORIZED,
      code: httpStatus.UNAUTHORIZED,
      message: 'unauthorized'
    },
    NOT_FOUND: {
      status: httpStatus.NOT_FOUND,
      code: httpStatus.NOT_FOUND,
      message: 'resource not found'
    },
    DUPLICATED: {
      status: httpStatus.DUPLICATED,
      code: httpStatus.DUPLICATED,
      message: 'duplicated'
    },
    INTERNAL_SERVER_ERROR: {
      status: httpStatus.INTERNAL_SERVER_ERROR,
      code: httpStatus.INTERNAL_SERVER_ERROR,
      message: 'somethings went wrong'
    }
  };

function handleError (err, req, res, next) {
  log.error(err);

  let obj;
  
  if (err.status) {
    obj = { ...err };
  }
  else {
    obj = errorObjects.INTERNAL_SERVER_ERROR;
  }

  res.status(obj.status).json(obj);
}

module.exports = {
  errorObjects,
  handleError
};
