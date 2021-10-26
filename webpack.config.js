var { merge } = require("webpack-merge");

var baseconfig = require("./webpack.base.config");

var userscriptconfig = require("./webpack.userscripts.config");

process.traceDeprecation = true;
module.exports = merge(baseconfig, userscriptconfig);
