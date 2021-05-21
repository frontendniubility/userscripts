var path = require('path');

module.exports = {

  module: {
    rules: [

      {
        test: /\.m?js$|\.es6$|\.js$/, //不能对js文件进行babel,有文件有问题
        include: [path.resolve('./src')],
        exclude: /node_modules/, //不需要对第三方模块进行转换，耗费性能
        loader: 'babel-loader', //bable-loader打通了webpack和bable  bable-core
        options: {}
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          minetype: 'application/font-woff',
        },
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          minetype: 'application/font-woff',
        },
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          minetype: 'application/octet-stream',
        },
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          minetype: 'application/vnd.ms-fontobject',
        },
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          minetype: 'image/svg+xml',
        },
      },
      {
        //use数组中loader执行顺序：从右到左，从下到上，依次执行
        test: /\.(sa|sc|le|c)ss$/, // 针对 .scss 或者 .css 后缀的文件设置 loader
        use: [

          {
            loader: 'style-loader' // 用style标签将样式插入到head中
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1, // 一个css中引入了另一个css，也会执行之前两个loader，即postcss-loader和sass-loader
              sourceMap: false //如果改为true，会导致不通机器上chunkhash不同
            }
          }
        ]
      },
      {
        test: /\.(jpg|JPG|png)$/,
        //处理不了html中的图片
        //下载url-loader和file-loader
        loader: 'url-loader',
        options: {
          //图片小于8kb（一般8~12），就会被base64处理,在built.js里变成字符串形式 文件夹下不会生产相应图片
          //优点：减少请求数量（减轻服务器压力）
          //缺点：图片体积会更大（速度更慢）
          limit: 8 * 1024,
          //可能有小问题：url-loader默认使用es6模块化解析，而html-loader引入图片是commonjs
          //解析时会出现 [object Module]
          //解决：关闭url-loader的es6模块化，使用commonjs解析
          // esModule:false,

          //给图片进行重命名
          //[hash:10]取图片前10位
          //[ext]取文件原来扩展名
          name: '[hash:10].[ext]',
        }
      },

      {
        test: /\.html?$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
    ]
  }
}