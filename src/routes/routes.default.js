/**
 * Default routes
 */

'use strict';

const router = require('express').Router();
const defaultController = require('../controllers/controller.default');

// Healthcheck route for the cloud LB
router.get('/', defaultController.ecv, defaultController.sendResponse);
router.get('/ecv', defaultController.ecv, defaultController.sendResponse);

module.exports = router;