const path = require('path');
const config = require('../config'),
 logger = require('../helpers/logger'),
 log = logger('Apis');

module.exports = {
  index: (req, res, next) => {
    log.debug('index');
    return res.sendFile(path.resolve(config.BASE_PATH, 'build', 'index.html'));
  }
};
