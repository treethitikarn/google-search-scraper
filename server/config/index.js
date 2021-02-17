const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '..', '..', '.env') });

const config = {
    PORT: normalizePort(process.env.PORT || '3000'),
    NODE_ENV: process.env.NODE_ENV || 'development',
    LOG_LEVEL: process.env.LOG_LEVEL || 'debug',
    BASE_PATH: path.resolve(__dirname, '..', '..'),
    ENDPOINTS: {
        LOCATION_TRACKING: process.env.ENDPOINTS_LOCATION_TRACKING
    }
};

function normalizePort(val) {
    const port = parseInt(val, 10);
  
    if (isNaN(port)) { return val; }
    if (port >= 0) { return port; }
    return false;
}

module.exports = config;