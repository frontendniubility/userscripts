var path = require('path');

module.exports = {
    module: {
        rules: [
            {
                test: /\.m?js$|\.es6$|\.js$/i, //不能对js文件进行babel,有文件有问题
                include: [path.resolve('./src')],
                exclude: /node_modules/, //不需要对第三方模块进行转换，耗费性能
                loader: 'babel-loader', //bable-loader打通了webpack和bable  bable-core
                options: {},
            },

            {
                //use数组中loader执行顺序：从右到左，从下到上，依次执行
                test: /\.(sa|sc|le|c)ss$/i, // 针对 .scss 或者 .css 后缀的文件设置 loader
                use: [
                    {
                        loader: 'style-loader', // 用style标签将样式插入到head中
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1, // 一个css中引入了另一个css，也会执行之前两个loader，即postcss-loader和sass-loader
                            sourceMap: false, //如果改为true，会导致不通机器上chunkhash不同
                        },
                    },
                ],
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
            {
                test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
                // More information here https://webpack.js.org/guides/asset-modules/
                type: 'asset',
            },
        ],
    },
};
