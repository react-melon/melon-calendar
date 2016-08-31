/**
 * @file webpack 开发配置
 * @author leon <lupengyu@baidu.com>
 */

const webpack = require('webpack');
const path = require('path');

const config = {
    entry: [
        './example/index.js'
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel-loader'],
                exclude: /node_modules/
            },
            // 处理 stylus
            {
                test: /\.styl$/,
                loader: 'style!css!stylus?paths=node_modules&resolve url'
            },
            // 处理 iconfont
            {
                test: /\.(svg|eot|ttf|woff)($|\?)/,
                loader: 'file'
            }
        ]
    },
    // stylus loader 中引入 nib 库支持
    stylus: {
        use: [require('nib')()]
    },
    output: {
        path: path.join(__dirname, '../example'),
        publicPath: '/example/',
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    devtool: 'source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};


module.exports = config;
