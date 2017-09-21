'use strict';

var express = require('express');
var correlator = require('express-correlation-id');
var events = require('nocms-events');
var requestHandler = require('./request_handler');

module.exports = function (setup) {
  var app = express();
  app.use(correlator());

  app.get('/', requestHandler(setup));

  app.use(function (err, req, res, next) {
    events.trigger('error', err.message);
    res.status(err.status).json({ status: err.status || 500, message: err.response });
  });

  app.listen(setup.port, function () {
    events.trigger('info', 'Config API Server running on port ' + setup.port + '. Environment is ' + setup.environment);
  });
};
//# sourceMappingURL=server.js.map