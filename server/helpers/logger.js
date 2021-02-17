'use strict';

const { createLogger, format, transports } = require('winston');
const config = require('../config');

function logger(label) {
    return createLogger({
        level: config.LOG_LEVEL,
        format: format.combine(
                format.label({ label }),
                format.colorize(),
                format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                format.printf(info => `${info.timestamp} ${info.level}: [${info.label}] ${typeof info.message === Object ? JSON.stringify(info.message) : info.message}`)
        ),
        transports: [new transports.Console()]
    });
}

module.exports = logger;