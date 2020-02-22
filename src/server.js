'use strict';

const Express = require('express'),
    Constants  = require('./util/constants'),
    Morgan = require('morgan'),
    compression = require('compression'),
    cors = require('cors'),
    swaggerUI = require('swagger-ui-express'),
    swaggerDoc = require('./swagger.json');

// Logging class wrapper for Winston
const StreamLog = require("./util/logger").StreamLog;
const Log = require("./util/logger").Log;

// Set up HTTP request logging via Morgan
const defaultController = require('./controllers/controller.default');

Morgan.token('port', (req) => {
    return req.port
});

Morgan.token('customTimestamp', (req) => {
    return req.customTimestamp
});

const app = Express();

app.use(defaultController.assignPort);
app.use(defaultController.assignDate);

app.use(Morgan(Constants.MORGAN_TEMPLATE, { stream: StreamLog.stream }));

// Auto-parse application/json
app.use(Express.json());

// Add gzip compression
app.use(compression());

// Allow CORs and complex pre-flight requests
app.use(cors());
app.options('*', cors());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

// Load routes
const defaultRoutes = require('./routes/routes.default');

app.use(defaultRoutes);

app.use((req, res) => {
    res.status(404).send();
});

// Start server
app.listen(Constants.PORT, () => {
    Log.info(`Server has started on port ${Constants.PORT}`);
});

module.exports = app;