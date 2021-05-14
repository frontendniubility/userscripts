const path = require('path')
const glob = require('glob')
const fs = require('fs')
const extend = require("extend");
const TerserPlugin = require('terser-webpack-plugin');
const WebpackUserscript = require('webpack-userscript');

const {
  parseMeta,
  p,
  stringIncludesAny,
  getVersionString
} = require('./webpack.comom')


let entry = glob
  .sync(path.resolve('./src/*/*.@(user.js|user.es6|user.mjs|user.cjs|user.ts)'))
  //  .filter((current, index, all) => stringIncludesAny(current, 'findteacher', 'test'))
  .reduce((entries, current) => {
    const item = path.parse(current);
    let entryName = item.name;
    entries[entryName] = current;
    return entries;
  }, {});


module.exports = (env, argv) => {
  return {
    mode: env.NODE_ENV === 'development' ? 'development' : 'production',
    optimization: {
      minimize: false,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: false,
            format: {
              comments: true,
            },
          },
          extractComments: false,
        })
      ],
      //removeEmptyChunks: true
    },

    entry,

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
    module: {
      rules: [{
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
          use: [{
              loader: 'style-loader' // 用style标签将样式插入到head中
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1 // 一个css中引入了另一个css，也会执行之前两个loader，即postcss-loader和sass-loader
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
      new WebpackUserscript({
        headers: function (data) {
          let origionpath = entry[data.chunkName];
          if (!fs.existsSync(origionpath)) {
            console.log(data)
            console.log(`--${data.chunkName}  --  ${entry[data.chunkName]}            
          END-------------------------
          `)
            return {};
          } else {

            let header = parseMeta(fs.readFileSync(origionpath, 'utf8'));
            var versionpath = path.resolve(path.parse(origionpath).dir, data.chunkName + '.version.json');

            if (process.env.WEBPACK_DEV_SERVER) {
              //开发状态下
              return extend(true, {}, header, {
                version: getVersionString(data.buildTime, 'dev')
              });
            } else { // 编译状态下（开发模式或者生产模式）
              let vstring = getVersionString(data.buildTime, 'pro');
              let curVersionJson = {
                [data.chunkHash]: vstring
              };
              if (!fs.existsSync(versionpath)) {
                fs.writeFileSync(versionpath, curVersionJson);
              }
              try {

                var newheader = {
                  version: vstring
                };
                let savedVersionJson = JSON.parse(fs.readFileSync(versionpath, 'utf8'));
                if (!!savedVersionJson[data.chunkHash]) { // 存在此hash
                  //keep  需要读取上次hash的版本，以及判断如果没有设置版本号，则需要生成
                  console.log(savedVersions);
                  var newsavedvers = extend({}, savedVersions.keys().reduce((pre, cur, i) => {
                    if (i < 5) pre[cur] = savedVersions[cur];
                    return pre
                  }, {}), {
                    [data.chunkHash]: savedVer
                  });
                  console.log(newsavedvers);
                  fs.writeFileSync(versionpath, JSON.stringify(newsavedvers), 'utf8');
                  return extend(true, {}, header, {
                    version: savedVer
                  });
                } else {
                  //hash不同
                  fs.writeFileSync(versionpath, JSON.stringify(curVersionJson), 'utf8');
                  return extend(true, {}, header, newheader);
                }
              } catch (e) {
                p(`JSON parse error, file path :${versionpath} `)
                return extend(true, {}, header, newheader);
              }
            }
          }
        },
        pretty: true,
        metajs: true,
        updateBaseUrl: 'https://raw.githubusercontent.com/niubilityfrontend/userscripts/master/dist/',
        updateBaseUrl: 'https://raw.githubusercontent.com/niubilityfrontend/userscripts/master/dist/',
        // proxyScript: {
        //   baseUrl: 'https://raw.githubusercontent.com/niubilityfrontend/userscripts/master/dist/',
        //   filename: '[chunkName].js',
        //   enable: false
        // },

      })
    ],
    devServer: {

      publicPath: '/',
      contentBase: path.join(__dirname, 'dist')
    },
  }
}