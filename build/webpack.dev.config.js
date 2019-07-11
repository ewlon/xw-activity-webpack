const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const baseWebpackConfig = require('./webpack.base.config')

// 开启服务器，用于模拟请求
const express = require('express');
const app = express();
const mock = require('../mock/mock');
mock(app);
app.listen(3000);

module.exports = merge(baseWebpackConfig,{
    devtool: 'eval-source-map', // 指定加source-map的方式
    devServer: {
        inline:true,//打包后加入一个websocket客户端
        hot: true,
        contentBase: false, // 设置基本目录结构,我们用了所以不需要设置
        compress: true, // 开启服务器端压缩
        port: 8081,
        open: true,
        proxy: {
            /*'/api': {
                target: '', // 目标接口的域名
                // secure: true,  // https 的时候 使用该参数
                changeOrigin: true,  // 是否跨域
                pathRewrite: {
                    '^/api' : ''  // 重写路径
                }
            }*/
        }
    },
    watchOptions: {
        ignored: /node_modules/, //忽略不用监听变更的目录
        aggregateTimeout: 500, //防止重复保存频繁重新编译,500毫米内重复保存不打包
        poll:1000 //每秒询问的文件变更的次数
    },
    plugins: [


        new webpack.HotModuleReplacementPlugin(), //HMR
        // new webpack.NamedModulesPlugin() // HMR
    ]
})
