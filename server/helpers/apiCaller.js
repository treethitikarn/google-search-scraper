'use strict';

const axios = require('axios');
const logger = require('../helpers/logger');
const log = logger('Helpers.apiCaller');

const request = (url, method, token) => {
  log.debug(`request ${method} ${url}`);
  const header = buildHeader(token);
  const reqData = buildRequestData(url, method, header);

  return fireRequest(reqData);
};


const buildHeader = (token) => {
  const header = { 'content-type': 'application/json' };

  if (typeof token !== 'undefined') {
    header.Authorization = `Bearer ${token}`;
  }

  return header;
};

const buildRequestData = (url, method, headers, params) => {
  const data = {
    url,
    method,
    headers,
    timeout: 10000,
    json: true
  };

  if (typeof params !== 'undefined') {
    data.body = params;
  }

  return data;
};

const fireRequest = (reqData) => {
  return axios(reqData)
  .then((response) => {
    return response;
  })
  .catch((err) => {
    log.error(err);
  })
};

module.exports = {
  request
};
