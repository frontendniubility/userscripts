var { merge } = require("webpack-merge");

var baseconfig = require("./webpack.config.core");

var userscriptconfig = require("./webpack.userscripts.config");

module.exports = merge(baseconfig, userscriptconfig);
