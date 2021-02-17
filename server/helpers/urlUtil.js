'use strict';

function urlPathConcat (first, ...rest) {
  return rest.reduce((output, value) => {
    return [
      output.replace(/\/$/, ''),
      String(value).valueOf().replace(/^\//, '')
    ].join('/');
  }, String(first).valueOf());
}

module.exports = {
  urlPathConcat
};

