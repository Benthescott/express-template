'use strict';

const Constants = require('../util/constants');
const Moment = require('moment-timezone');

/**
 * Middleware for assigning values to the API access logs via Morgan, and generic middleware.
 *
 * @type {object}
 */
module.exports = (() => {

    function assignPort (req, res, next) {
        req.port = Constants.PORT;
        next()
    }

    function assignDate(req, res, next) {
        req.customTimestamp = Moment().tz(Constants.TIMEZONE).format();
        next();
    }

    function sendResponse(req, res) {
        res.status(res.locals.status).send(res.locals.body ? res.locals.body : {});
    }

    function ecv(req, res, next) {
        res.locals.status = 200;
        res.locals.body = {"message": "node template is up and running."};
        next();
    }

    return {
        assignPort: assignPort,
        assignDate: assignDate,
        sendResponse: sendResponse,
        ecv: ecv
    };

})();