'use strict';

module.exports = (() => {
    return {
        PORT: 8080,
        TIMEZONE: 'America/Chicago',
        LOG_DIR: './log',
        MORGAN_TEMPLATE: ':customTimestamp :http-version :method :remote-addr :response-time :status :url :port',
    };
})();