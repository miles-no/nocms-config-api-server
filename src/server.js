const express = require('express');
const correlator = require('express-correlation-id');
const events = require('nocms-events');
const requestHandler = require('./request_handler');

module.exports = (setup) => {
  const app = express();
  app.use(correlator());

  app.get('/', requestHandler(setup));

  app.use((err, req, res) => {
    events.trigger('error', err.message);
    res.status(err.status).json({ status: err.status || 500, message: err.response });
  });

  app.listen(setup.port, () => {
    events.trigger('info', `Config API Server running on port ${setup.port}. Environment is ${setup.environment}`);
  });
};
