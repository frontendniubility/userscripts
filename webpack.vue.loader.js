// var path = require('path');

const {
  VueLoaderPlugin
} = require('vue-loader')

module.exports = {

  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loaders: {
          scss: 'vue-style-loader!css-loader!postcss-loader!sass-loader',
          // <style lang="scss">
        }
      }
    }]
  },
  plugins: [
    webpackUserscript,
    new VueLoaderPlugin()
  ],
}