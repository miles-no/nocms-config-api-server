const events = require('nocms-events');
const requestHandler = require('./request_handler');
const server = require('./server');

let api = null;

const setup = {
  port: 3000,
  data: {},
  adapters: {},
  environment: process.env.NODE_ENV || 'default',
};

const setData = (data) => {
  setup.data = Object.assign({}, data);
  return api;
};

const setAdapters = (adapters) => {
  setup.adapters = adapters;
  return api;
};

const setAdapter = (name, adapter) => {
  setup.adapters[name] = adapter;
  return api;
};

const setEnvironment = (env) => {
  setup.environment = env;
  return api;
};

const setPort = (port) => {
  setup.port = port;
  return api;
};

const on = (eventName, handler) => {
  events.listenTo(eventName, handler);
  return api;
};

const start = () => {
  server(setup);
  return api;
};

api = {
  setData,
  setAdapters,
  setAdapter,
  setEnvironment,
  setPort,
  on,
  start,
};

module.exports = api;
