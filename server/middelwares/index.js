const config = require('../config'),
 apiCaller = require('../helpers/apiCaller'),
 { urlPathConcat } = require('../helpers/urlUtil'),
 logger = require('../helpers/logger'),
 log = logger('Middlewares'),
 { errorObjects } = require('../helpers/error');

function callLocationTracking (req, res, next) {
  log.debug('callLocationTracking')
    const pathWithoutApiPrefix = req.originalUrl.split('/api')[1];
    const url = urlPathConcat(config.ENDPOINTS.LOCATION_TRACKING, pathWithoutApiPrefix || '');

    return apiCaller.request(url, req.method)
      .then((response) => {
        if (response && response.status) { return res.status(response.status).send(response.data); }
        return res.status(errorObjects.INTERNAL_SERVER_ERROR.status).send(errorObjects.INTERNAL_SERVER_ERROR);
      });
}

module.exports = {
    callLocationTracking
}