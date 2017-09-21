'use strict';

var events = require('nocms-events');
var requestHandler = require('./request_handler');
var server = require('./server');

var api = null;

var setup = {
  port: 3000,
  data: {},
  adapters: {},
  environment: process.env.NODE_ENV || 'default'
};

var setData = function setData(data) {
  setup.data = Object.assign({}, data);
  return api;
};

var setAdapters = function setAdapters(adapters) {
  setup.adapters = adapters;
  return api;
};

var setAdapter = function setAdapter(name, adapter) {
  setup.adapters[name] = adapter;
  return api;
};

var setEnvironment = function setEnvironment(env) {
  setup.environment = env;
  return api;
};

var setPort = function setPort(port) {
  setup.port = port;
  return api;
};

var on = function on(eventName, handler) {
  events.listenTo(eventName, handler);
  return api;
};

var trigger = function trigger(eventName) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  events.trigger.apply([eventName].concat(args));
  return api;
};

var start = function start() {
  server(setup);
  return api;
};

api = {
  setData: setData,
  setAdapters: setAdapters,
  setAdapter: setAdapter,
  setEnvironment: setEnvironment,
  setPort: setPort,
  on: on,
  start: start
};

module.exports = api;
//# sourceMappingURL=index.js.map