/*
 * @Author: Lizh
 * @Date:   2018-04-06 23:59:09
 * @Last Modified by:   15156
 * @Last Modified time: 2018-05-31 11:52:52
 */
var HtmlWebpackPlugin = require('html-webpack-plugin');
var extractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');
var path = require('path');
// 环境变量配置，development / production
var WEBPACK_ENV = process.env.WEBPACK_ENV || "dev";
// 获取html-webpack-plugin参数的方法 
var getHtmlConfig = function(name, title) {
    return {
        template: './src/view/' + name + '.html',
        filename: 'view/' + name + '.html',
        title: title,
        hash: true,
        inject: true,
        showErrors: true,
        chunks: ['common', name],
        favicon: './favicon.ico'
    };
};
// webpack config
var config = {
    /* 【新增】：新增mode参数，webpack4中要指定模式，可以放在配置文件这里，也可以放在启动命令里，如--mode production*/
    mode: 'dev' === WEBPACK_ENV ? 'development' : 'production',
    //入口文件的配置项  ./不能去掉
    entry: {
        'common': ['./src/page/common/index.js'],
        'index': ['./src/page/index/index.js'],
        'list': ['./src/page/list/index.js'],
        'detail': ['./src/page/detail/index.js'],
        'cart': ['./src/page/cart/index.js'],
        'order-confirm': ['./src/page/order-confirm/index.js'],
        'order-list': ['./src/page/order-list/index.js'],
        'order-detail': ['./src/page/order-detail/index.js'],
        'payment': ['./src/page/payment/index.js'],
        'user-login': ['./src/page/user-login/index.js'],
        'user-register': ['./src/page/user-register/index.js'],
        'user-pass-reset': ['./src/page/user-pass-reset/index.js'],
        'user-center': ['./src/page/user-center/index.js'],
        'user-info-update': ['./src/page/user-info-update/index.js'],
        'user-pass-update': ['./src/page/user-pass-update/index.js'],
        'result': ['./src/page/result/index.js'],
        'about': ['./src/page/about/index.js'],
    },
    //出口文件的配置项
    output: {
        //输出的文件名称   【改动】：删除path的配置，在webpack4中文件默认生成的位置就是/dist
        filename: 'js/[name].js',
        //path: path.resolve(__dirname, "dist"),
        publicPath: WEBPACK_ENV === 'dev' ? "/dist/" : "//47.106.183.192/tmacmall/dist/",
    },
    externals: {
        'jquery': 'window.jQuery'
    },
    //模块：例如解读CSS,图片如何转换，压缩 【改动】：图片文件的加载方式变化，并和字体文件分开处理 图片小于2kb的按base64打包
    module: {
        rules: [{
            test: /\.css$/,
            use: extractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader"
            })
        }, {
            test: /\.(png|jpg|gif)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 2048,
                    name: 'resource/[name].[ext]'
                }
            }]
        }, {
            test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: 'resource/[name].[ext]'
                }
            }]
        }, {
            test: /\.string$/,
            use: [{
                loader: 'html-loader',
                options: {
                    minimize: true,
                    removeAttributeQuotes: false
                }
            }]
        }]
    },
    //配置webpack开发服务功能

    devServer: {
        port: '8080', //设置端口号
        // 路径的配置
        historyApiFallback: {
            index: '/dist/page/index/index.html'
        },
        proxy: {
            '/**/*.do': {
                target: 'http://test.happymmall.com',
                changeOrigin: true
            }
        }
    },
    //配置文件目录别名
    resolve: {
        alias: {
            node_modules: __dirname + '/node_modules',
            util: __dirname + '/src/util',
            page: __dirname + '/src/page',
            service: __dirname + '/src/service',
            image: __dirname + '/src/image'
        }
    },
    //【新增】：webpack4里面移除了commonChunksPulgin插件，放在了config.optimization里面
    optimization: {
        runtimeChunk: false,
        splitChunks: {
            cacheGroups: {
                common: {
                    name: "common",
                    chunks: "all",
                    minChunks: 2
                }
            }
        }
    },
    //插件，用于生产模版和各项功能
    plugins: [
        // 把css单独打包到文件里 
        new extractTextPlugin("css/[name].css"),
        // html模板的处理
        new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
        new HtmlWebpackPlugin(getHtmlConfig('list', '商品列表页')),
        new HtmlWebpackPlugin(getHtmlConfig('detail', '商品详细信息')),
        new HtmlWebpackPlugin(getHtmlConfig('cart', '购物车')),
        new HtmlWebpackPlugin(getHtmlConfig('order-confirm', '订单确认')),
        new HtmlWebpackPlugin(getHtmlConfig('order-list', '订单列表')),
        new HtmlWebpackPlugin(getHtmlConfig('order-detail', '订单详情')),
        new HtmlWebpackPlugin(getHtmlConfig('payment', '支付页面')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login', '用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register', '用户注册')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset', '找回密码')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center', '用户中心')),
        new HtmlWebpackPlugin(getHtmlConfig('user-info-update', '修改个人信息')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-update', '修改密码')),
        new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果')),
        new HtmlWebpackPlugin(getHtmlConfig('about', '关于TMacmall')),
    ]
};
module.exports = config;