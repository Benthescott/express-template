'use strict';

const Constants = require('./constants');
const Winston = require('winston');
const Moment = require('moment-timezone');

/**
 * Custom logger using Winston (https://github.com/winstonjs/winston). Logs will rotate at 100MB. This class allows the
 * app to have two streams: one for transactions and one for API access logs.
 */
class Logger {
    constructor() {
        
        this.defaults = {
            timezone: Constants.TIMEZONE
        };

        this.customFormat = Winston.format.printf(info => `${info.timestamp} ${info.level} ${info.message}`);
        this.customStreamFormat = Winston.format.printf(info => `${info.message}`);

        this.appendTimestamp = Winston.format((info, opts) => {
            if(opts.tz) {
                info.timestamp = Moment().tz(opts.tz).format();
            }
            return info;
        });

        this.options = {
            accessLog: {
                level: 'info',
                filename: `${Constants.LOG_DIR}/access.log`,
                handleExceptions: true,
                json: false,
                maxsize: 100000000, // 100MB
                maxFiles: 1,
                colorize: false,
                format: Winston.format.combine(
                    this.customStreamFormat
                )
            },
            transactLog: {
                level: 'info',
                filename: `${Constants.LOG_DIR}/transact.log`,
                handleExceptions: true,
                json: false,
                maxsize: 100000000, // 100MB
                maxFiles: 1,
                colorize: false,
                format: Winston.format.combine(
                    this.appendTimestamp({ tz: this.defaults.timezone }),
                    this.customFormat
                )
            }
        };

        this.logger = Winston.createLogger({
            transports: [
                new Winston.transports.File(this.options.transactLog)
            ],
            exitOnError: false
        });

        this.streamLogger = Winston.createLogger({
            transports: [
                new Winston.transports.File(this.options.accessLog)
            ],
            exitOnError: false
        });

        // create a stream object with a 'write' function that will be used by `morgan`
        this.streamLogger.stream = {
            write: (message, encoding) => {
                // use the 'info' log level so the output will be picked up by both transports (file and console)
                this.streamLogger.info(message);
            },
        };
    }
}

const GLOBAL_LOGGER = new Logger();

module.exports.Log = GLOBAL_LOGGER.logger;
module.exports.StreamLog = GLOBAL_LOGGER.streamLogger;