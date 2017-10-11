'use strict';

var events = require('nocms-events');

module.exports = function (setup) {
  return function (req, res) {
    var client = req.query.client;
    if (!client) {
      throw { status: 400, message: '400 Bad request. client missing in query string', response: '400 Bad request' };
    }

    var adapter = setup.adapters[client];
    if (!adapter) {
      throw { status: 500, message: 'Adapter missing for "' + client + '"', response: '500 Internal server error' };
    }

    var environmentConfig = setup.data[setup.environment];
    if (!environmentConfig) {
      events.trigger('warning', 'Config does not exist for environment ' + setup.environment + '. Using default');
    }

    var configData = Object.assign(setup.data.default, environmentConfig || {});

    var clientConfig = adapter(configData);

    res.status(200).json(clientConfig);
  };
};
//# sourceMappingURL=request_handler.js.map
