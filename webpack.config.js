var { merge } = require("webpack-merge");

var baseconfig = require("./webpack.base.config");

var userscriptconfig = require("./webpack.userscripts.config");

module.exports = merge(baseconfig, userscriptconfig);
