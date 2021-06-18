var path = require("path");
const Config = require("webpack-chain");
const config = new Config();

const babel_loader = require("babel-loader");
config.module
	.rule("babel-loader")
	.test(/\.m?js$|\.es6$|\.js$/i)
	.use(babel_loader)
	// .loader("babel-loader")
	.pre()
	.exclude.add(/node_modules/)
	.end()
	.include.add(path.resolve("./src"))
	.end();

// const style_loader = require("style-loader");
// const css_loader = require("css-loader");
// config.module
// 	.rule("css")
// 	.test(/\.(sa|sc|le|c)ss$/i)

// 	.use(style_loader)
// 	.end()

// 	.use(css_loader)
// 	.options({
// 		importLoaders: 1, // 一个css中引入了另一个css，也会执行之前两个loader，即postcss-loader和sass-loader
// 		sourceMap: false, //如果改为true，会导致不通机器上chunkhash不同
// 	});

// const html_loader = require("html-loader");
// config.module
// 	.rule("html_loader")
// 	.test(/\.html$/i)

// 	.use(html_loader);

// config.module
// 	.rule("asset")
// 	.test(/\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i)
// 	.type("asset");

module.exports = config.toConfig();
