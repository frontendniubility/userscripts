const path = require('path')
var {
  merge
} = require('webpack-merge');

var baseconfig = require('./webpack.config.base');

var userscriptconfig = require('./webpack.userscripts');

module.exports = merge(baseconfig, userscriptconfig);