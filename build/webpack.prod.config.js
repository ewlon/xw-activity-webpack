const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin") // 提取css
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); // js压缩，其实设置mode为production就会启用压缩
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // css压缩
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')


module.exports = merge(baseWebpackConfig, {
    output:{
        publicPath: './' //这里要放的是静态资源CDN的地址(一般只在生产环境下配置)
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/[name].[chunkhash:7].css", //打包到 dist目录下的css目录中
            //chunkFilename: "css/[id].css"
        }),

    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: false,
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
})
