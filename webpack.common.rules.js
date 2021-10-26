var path = require("path")
const Config = require("webpack-chain")
const config = new Config()

config.module
	.rule("babel-loader")
	.test(/\.m?js$|\.es6$|\.js$/i)
	.use("babel-loader")
	.loader("babel-loader")
	.end()
	.exclude.add(/node_modules/)
	.end()
	.include.add(path.resolve("./src"))
	.end()

config.module
	.rule("css")
	.test(/\.(c)ss$/i)
	.use("vue-style-loader")
	.loader("vue-style-loader")
	.end()
	.use("css-loader")
	.loader("css-loader")
	.options({
		importLoaders: 1, // 一个css中引入了另一个css，也会执行之前两个loader，即postcss-loader和sass-loader
		sourceMap: false, //如果改为true，会导致不通机器上chunkhash不同
	})
	.end()
// .use("postcss-loader")
// .loader("postcss-loader")

config.module
	.rule("sass") // vue-style-loader相关配置
	.test(/\.s[ac]ss$/i)
	.use("vue-style-loader")
	.loader("vue-style-loader")
	.end()
	.use("css-loader")
	.loader("css-loader")
	.options({
		importLoaders: 1, // 一个css中引入了另一个css，也会执行之前两个loader，即postcss-loader和sass-loader
		sourceMap: false, //如果改为true，会导致不通机器上chunkhash不同
	})
	.end()
	.use("sass-loader")
	.loader("sass-loader")
	.options({
		implementation: require("sass"),
		sassOptions: {
			indentedSyntax: true, // optional
		},
	})
	.end()
// .use("postcss-loader")
// .loader("postcss-loader")

config.module
	.rule("html")
	.test(/\.html$/i)

	.use("html-loader")
	.loader("html-loader")

config.module
	.rule("asset")
	.test(/\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i)
	.type("asset")

config.module
	.rule("vue") // vue-loader 相关配置
	.test(/\.vue$/) // 匹配 .vue 文件
	.use("vue-loader")
	.loader("vue-loader")
	.end()
	.end()

const { VuetifyLoaderPlugin } = require("vuetify-loader")
config.plugin("VuetifyLoaderPlugin").use(VuetifyLoaderPlugin, [
	{
		/**
		 * This function will be called for every tag used in each vue component
		 * It should return an array, the first element will be inserted into the
		 * components array, the second should be a corresponding import
		 *
		 * originalTag - the tag as it was originally used in the template
		 * kebabTag    - the tag normalised to kebab-case
		 * camelTag    - the tag normalised to PascalCase
		 * path        - a relative path to the current .vue file
		 * component   - a parsed representation of the current component
		 */
		match(originalTag, { kebabTag, camelTag, path, component }) {
			if (kebabTag.startsWith("core-")) {
				return [camelTag, `import ${camelTag} from '@/components/core/${camelTag.substring(4)}.vue'`]
			}
		},
	},
])
module.exports = config.toConfig()
