var { merge } = require("webpack-merge")

var baseconfig = require("./webpack.base.config.js")

var userscriptconfig = require("./webpack.userscripts.config.js")

process.traceDeprecation = true
module.exports = merge(baseconfig, userscriptconfig)
