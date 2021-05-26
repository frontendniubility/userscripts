const path = require('path')
var {
  merge
} = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin')

var rulesconfig = require('./webpack.common.rules');
var webpackUserscript = require('./webpack.userscripts').webpackUserscript;

const {
  VueLoaderPlugin
} = require('vue-loader')

const {
  parseMeta,
  p,
  stringIncludesAny,
  entries,
  log
} = require('./webpack.comom')

module.exports = (env, argv) => {
  return merge(rulesconfig, {
    mode: env.NODE_ENV === 'development' ? 'development' : 'production',
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
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
          },
        })
      ],
      //removeEmptyChunks: true
    },

    entry: entries,

    // watch: true,
    stats: 'normal',
    //  'errors-only'	none	Only output when errors happen
    // 'errors-warnings'	none	Only output errors and warnings happen
    // 'minimal'	none	Only output when errors or new compilation happen
    // 'none'	false	Output nothing
    // 'normal'	true	Standard output
    // 'verbose'	none	Output everything
    // 'detailed'	none	Output everything except chunkModules and chunkRootModules
    // 'summary'	none	Output webpack version, warnings count and errors 
    output: {
      path: path.join(__dirname, 'dist'),
      publicPath: '/dist/',
      filename: '[name].js',
      clean: false,
      chunkFilename: '[name].js'
    },
    externals: {
      jquery: '$',
      vue: 'Vue',
      axios: 'axios',
      'axios-userscript-adapter': 'axiosGmxhrAdapter',
    },
    resolve: {
      modules: [path.resolve(__dirname, 'libs'), path.resolve(__dirname, 'node_modules')],
      extensions: ['.es6', '.mjs', '.cjs', '.js', '.css', '.json', '.wasm'],
      alias: {
        // libs$: path.resolve('libs') // 直接引用src源码
      }
    },
    target: 'web',
    plugins: [
      webpackUserscript,
      new VueLoaderPlugin()
    ],
    devServer: {
      publicPath: '/',
      contentBase: path.join(__dirname, 'dist')
    },
  });
}