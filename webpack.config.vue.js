const path = require('path')
var { merge } = require('webpack-merge')

var common = require('./webpack.config')

var vueconfig = require('./webpack.vue.loader')

module.exports = merge(common, vueconfig)
