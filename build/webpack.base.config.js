const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin') // 复制静态资源的插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 清空打包目录的插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin") // 提取css
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const chalk = require('chalk');
var envMode = process.env.NODE_ENV !== "production";

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}
module.exports ={
    entry: {
        page:'./src/page.js',
        wrapper: './src/wrapper.js'
    },
    output: {
        path: path.join(__dirname,'../dist'),
        filename: 'js/[name].bundle.js',
        chunkFilename:'js/[name].chunk.js',
        publicPath: '/',
    },
    module:{
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /(node_modules|lib)/   // 需要忽略的文件夹
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            fallback: 'file-loader',
                            quality: 85,
                            name: '[name].[ext]?[hash:7]',
                            outputPath: './images',
                        }
                    },

                ]
            },
            {
                test: /\.(sc|sa|c)ss$/,
                use: [
                    envMode? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: envMode,
                        }
                    },  // translates CSS into CommonJS
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: envMode,
                            config: {
                                path: 'postcss.config.js'
                            }
                        }
                    },
                    {
                        loader: 'sass-loader', // compiles Sass to CSS, using Node Sass by default
                        options: { sourceMap: envMode }
                    }
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(ttf|eot|svg|woff|woff2)$/,
                use: "url-loader"
            },
            {
                test: require.resolve('zepto'),
                use: ['exports-loader?window.Zepto','script-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "..","src","index.html"),
            filename: 'page.html', //生成后的文件名,目录是相对于webpackConfig.output.path路径
            hash:true,//为插入的js和css文件添加hash值,防止缓存
            chunks: ['page','common','vendor'], //默认要往模板中引入的js和css文件，不设置的话会引入webpack打包生成的全部js和css
            minify:{
                removeAttributeQuotes:!envMode//压缩 去掉引号
            }
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "..","src","index.html"),
            filename: 'wrapper.html', //生成后的文件名
            hash:true,//为插入的js和css文件添加hash值,防止缓存
            chunks: ['wrapper','common','vendor'], //默认要往模板中引入的js和css文件，不设置的话会引入webpack打包生成的全部js和css
            minify:{
                removeAttributeQuotes:!envMode//压缩 去掉引号
            }
        }),
        new VueLoaderPlugin(),
        new ProgressBarPlugin({
            format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
            clear: false
        }),
        new CopyWebpackPlugin([
            {
                from: path.join(__dirname, '..', 'static'),
                to: path.join(__dirname,'..', 'dist', 'static'),
                ignore: ['.*']
            }
        ]),
        new CleanWebpackPlugin()
    ],
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: { //设置import导入模块的路径的别名
            'vue$': 'vue/dist/vue.esm.js',  //用别名 vue$ 来代表真实的路径
            '@': resolve('src')
        }
    },
    optimization: { //webpack4.x的最新优化配置项，用于打包多页面应用时，提取公共代码

        splitChunks: {
            cacheGroups: { // 缓存策略
                common: {
                    chunks: 'all',   // initial表示提取入口文件的公共css及js部分 ，all表示提取所有文件的公共css及js
                    name: "common",// 重写文件名称
                    minChunks: 2, //最小公用模块次数
                    minSize: 1, // This is example is too small to create commons chunks
                    // reuseExistingChunk: true // 可设置是否重用该chunk（查看源码没有发现默认值）
                },
                vendor: {
                    name: "vendor",
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "all",
                    priority: 10
                }
            }
        }
    }
}

