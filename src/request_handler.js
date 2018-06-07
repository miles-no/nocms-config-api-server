/* eslint no-throw-literal: off  */
const events = require('nocms-events');

module.exports = (setup) => {
  return (req, res) => {
    const client = req.query.client;
    if (!client) {
      throw { status: 400, message: '400 Bad request. client missing in query string', response: '400 Bad request' };
    }

    const adapter = setup.adapters[client];
    if (!adapter) {
      throw { status: 500, message: `Adapter missing for "${client}"`, response: '500 Internal server error' };
    }

    const environmentConfig = setup.data[setup.environment];
    if (!environmentConfig) {
      events.trigger('warning', `Config does not exist for environment ${setup.environment}. Using default`);
    }

    const configData = Object.assign(setup.data.default, environmentConfig || {});

    const clientConfig = adapter(configData);

    res.status(200).json(clientConfig);
  };
};
