const path = require("path")
var { merge } = require("webpack-merge")

var rulesconfig = require("./webpack.common.rules")

const { entries } = require("./webpack.common.entries")

let terserPlugin = compiler => {
	const TerserPlugin = require("terser-webpack-plugin")
	new TerserPlugin({
		parallel: true,
		test: /\.(js|es6|cjs|mjs)(\?.*)?$/i,
		extractComments: false,
		terserOptions: {
			warnings: false,
			parse: {},
			compress: false,
			// compress: {},
			mangle: false, // Note `mangle.properties` is `false` by default.
			output: {
				comments: false,
				beautify: true,
				inline_script: false,
			},
			toplevel: false,
			nameCache: null,
			ie8: false,
			keep_fnames: true,
			keep_classnames: true,
			// drop_debugger: true,
		},
	}).apply(compiler)
}
let cssMinimizer = compiler => {
	const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
	new CssMinimizerPlugin({
		parallel: true,
		test: /\.(sa|sc|le|c)ss$/i,
		minimizerOptions: {
			preset: [
				"advanced",
				{
					//
					cssDeclarationSorter: true,
					calc: true,
					colormin: true,
					convertValues: true,
					discardComments: { removeAll: true },
					discardDuplicates: true,
					discardEmpty: true,
					discardOverridden: true,
					discardUnused: true,
					mergeIdents: true,
					mergeLonghand: true,
					mergeRules: true,
					minifyFontValues: true,
					minifyGradients: true,
					minifyParams: true,
					minifySelectors: true,
					normalizeCharset: true,
					normalizeDisplayValues: true,
					normalizePositions: true,
					normalizeRepeatStyle: true,
					normalizeString: true,
					normalizeTimingFunctions: true,
					normalizeUnicode: true,
					normalizeUrl: true,
					normalizeWhitespace: true,
					orderedValues: true,
					reduceIdents: true,
					reduceInitial: true,
					reduceTransforms: true,
					svgo: true,
					uniqueSelectors: true,
					zindex: true,
				},
			],
			minify: [
				"...",
				//
				CssMinimizerPlugin.cssnanoMinify, //
				CssMinimizerPlugin.cleanCssMinify, //
				CssMinimizerPlugin.cssoMinify, //
				CssMinimizerPlugin.esbuildMinify,
			],
		},
	}).apply(compiler)
}
module.exports = merge(rulesconfig, {
	mode: "production", //env.NODE_ENV === 'development' ? 'development' : 'production',
	optimization: {
		emitOnErrors: true,
		minimize: true,
		minimizer: [
			// "...",
			compiler => {
				terserPlugin(compiler)
				cssMinimizer(compiler)
			},
		],
		usedExports: "global",
		//removeEmptyChunks: true
	},

	entry: entries,

	// watch: true,
	stats: "normal",
	//  'errors-only'	none	Only output when errors happen
	// 'errors-warnings'	none	Only output errors and warnings happen
	// 'minimal'	none	Only output when errors or new compilation happen
	// 'none'	false	Output nothing
	// 'normal'	true	Standard output
	// 'verbose'	none	Output everything
	// 'detailed'	none	Output everything except chunkModules and chunkRootModules
	// 'summary'	none	Output webpack version, warnings count and errors
	output: {
		path: path.join(__dirname, "dist"),
		publicPath: "/dist/",
		filename: "[name].js",
		clean: true,
		chunkFilename: "[name].js",
	},
	externals: {
		jquery: "$",
		// vue: "Vue",
		axios: "axios",
		"axios-userscript-adapter": "axiosGmxhrAdapter",
	},
	resolve: {
		modules: [path.resolve(__dirname, "libs"), path.resolve(__dirname, "node_modules")],
		extensions: [".es6", ".mjs", ".cjs", ".js", ".css", ".json", ".wasm"],
		alias: {
			// libs$: path.resolve('libs') // 直接引用src源码
		},
	},
	target: "web",

	devServer: {
		devMiddleware: {
			index: true,
			mimeTypes: { "text/html": ["html"] },
			publicPath: "/",
			serverSideRender: true,
			writeToDisk: true,
		},
		bonjour: true,
		compress: true,
		allowedHosts: "all",

		static: {
			directory: path.join(__dirname, "dist"),
		},
		// watchFiles: {
		// 	paths: ["dist/*.js", "public/**/*"],
		// 	options: {
		// 		usePolling: false,
		// 	},
		// },
		// port: 8080,
		// webSocketServer: "ws",
	},
})
