'use strict';

var events = require('nocms-events');

module.exports = function (config) {
  return function (req, res) {
    var client = req.query.client;
    if (!client) {
      throw { status: 400, message: '400 Bad request. client missing in query string', response: '400 Bad request' };
    }

    var adapter = config.adapters[client];
    if (!adapter) {
      throw { status: 500, message: 'Adapter missing for "' + client + '"', response: '500 Internal server error' };
    }

    var environmentConfig = config[config.environment];
    if (!environmentConfig) {
      events.trigger('warning', 'Config does not exist for environment ' + config.environment + '. Using default');
    }

    var configData = Object.assign(config.data.default, environmentConfig || {});

    var clientConfig = adapter(configData);

    res.status(200).json(clientConfig);
  };
};
//# sourceMappingURL=request_handler.js.map