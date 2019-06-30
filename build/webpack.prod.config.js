const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin') // 复制静态资源的插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 清空打包目录的插件
const HtmlWebpackPlugin = require('html-webpack-plugin') // 生成html的插件
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
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '..', 'src', 'index.html'),
            filename:'index.html',
            hash:true,//防止缓存
            minify:{
                removeAttributeQuotes:true//压缩 去掉引号
            }
        }),
        new CopyWebpackPlugin([
            {
                from: path.join(__dirname, '..', 'static'),
                to: path.join(__dirname,  '..', 'dist', 'static'),
                ignore: ['.*']
            }
        ]),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].[chunkhash:7].css",
            chunkFilename: "[id].css"
        }),

        new OptimizeCSSAssetsPlugin({})
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
