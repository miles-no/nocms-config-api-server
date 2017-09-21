# NoCMS Config API Server

Stores for NoCMS forms.

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Dependency Status](https://david-dm.org/miles-no/nocms-config-api-server.svg)](https://david-dm.org/miles-no/nocms-config-api-server)
[![devDependencies](https://david-dm.org/miles-no/nocms-config-api-server/dev-status.svg)](https://david-dm.org/miles-no/nocms-config-api-server?type=dev)

## Installation

Install nocms-config-api-server from NPM into your NoCMS config_api container.

```
npm install nocms-config-api-server --save
```

## Usage

```
const configApiServer = require('nocms-config-api-server');

const myAdapter = require('./my_adapter');
const configData = require('./config_data.json');

configApiServer
  .setData(data)
  .setAdapter('myAdapter', myAdapter)
  .start();

```
