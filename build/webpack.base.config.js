const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin') // 复制静态资源的插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 清空打包目录的插件
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const chalk = require('chalk');


function resolve (dir) {
    return path.join(__dirname, '..', dir)
}
module.exports ={
    entry: './src/index.js',
    output: {
        path: path.join(__dirname,'../dist'),
        filename: 'main.js',
        publicPath: '/'
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
                            name: '[name].[ext]?[hash:7]'
                        }
                    },

                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader','css-loader','postcss-loader']
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader", // creates style nodes from JS strings
                    'css-loader',  // translates CSS into CommonJS
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            config: {
                                path: 'postcss.config.js'
                            }
                        }
                    },
                    {
                        loader: 'sass-loader', // compiles Sass to CSS, using Node Sass by default
                        options: { sourceMap: true }
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
            },
        ]
    },
    plugins: [

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
        new CleanWebpackPlugin(),
    ],
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: { //设置import导入模块的路径的别名
            'vue$': 'vue/dist/vue.esm.js',  //用别名 vue$ 来代表真实的路径
            '@': resolve('src')
        }
    },
}

