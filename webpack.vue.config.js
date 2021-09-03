var { merge } = require("webpack-merge");

var common = require("./webpack.config");

const Config = require("webpack-chain");
const vueloader = require("vue-loader");

const config = new Config();

config.module
	.rule("vue")
	.test(/\.vue$/i)
	.use(vueloader);
// .tap(options => {
// 	// modify the options...
// 	return options;
// });

// const { VueLoaderPlugin } = vueloader;
// config.plugin("vue").use(VueLoaderPlugin, []);

module.exports = merge(common, config.toConfig());
