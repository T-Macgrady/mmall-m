/*
* @Author: Lizh
* @Date:   2018-04-06 23:59:09
* @Last Modified by:   Lizh
* @Last Modified time: 2018-05-19 02:23:45
*/
var HtmlWebpackPlugin   = require('html-webpack-plugin');
var extractTextPlugin   = require("extract-text-webpack-plugin");
var webpack             = require('webpack');
var path                = require('path');
// 环境变量配置，development / production
var WEBPACK_ENV         = process.env.WEBPACK_ENV; 
// 获取html-webpack-plugin参数的方法 
var getHtmlConfig       = function(name , title){
return {
        template            : './src/view/' + name + '.html',
        filename            : 'view/' + name + '.html',
        title               : title,
        hash                : true,
        inject              : true,
        showErrors          : true,
        chunks              : ['common',name],
        favicon             : './favicon.ico'
    };
};    
// webpack config
var config = {
    //入口文件的配置项  ./不能去掉
    entry:{
        'common'            : ['./src/page/common/index.js'],
        'index'             : ['./src/page/index/index.js']  ,
        'list'              : ['./src/page/list/index.js'] ,     
        'detail'            : ['./src/page/detail/index.js'] , 
        'cart'              : ['./src/page/cart/index.js'],    
        'order-confirm'     : ['./src/page/order-confirm/index.js'],       
        'order-list'        : ['./src/page/order-list/index.js'],       
        'order-detail'      : ['./src/page/order-detail/index.js'],       
        'payment'           : ['./src/page/payment/index.js'],       
        'user-login'        : ['./src/page/user-login/index.js'] ,
        'user-register'     : ['./src/page/user-register/index.js'] ,
        'user-pass-reset'   : ['./src/page/user-pass-reset/index.js'] ,
        'user-center'       : ['./src/page/user-center/index.js'] ,
        'user-info-update'  : ['./src/page/user-info-update/index.js'] ,
        'user-pass-update'  : ['./src/page/user-pass-update/index.js'] ,
        'result'            : ['./src/page/result/index.js'] ,
        'about'             : ['./src/page/about/index.js'] ,
    },
    //出口文件的配置项
    output : {
        //输出的文件名称     
        filename            : 'js/[name].js',
        path                : path.resolve(__dirname,"dist"),
        publicPath          : WEBPACK_ENV === 'development' ? "http://localhost:8080/dist/" : "//s.tmacmall.com/tmall-fe/dist/",
    },
    externals : {
        'jquery'            : 'window.jQuery'
},
    //模块：例如解读CSS,图片如何转换，压缩
    module : {
        rules : [
            {
                test : /\.css$/,
                use  : extractTextPlugin.extract({
                    fallback  : "style-loader",
                    use       : "css-loader"
                })
            },{
                test :/\.(png|jpg|gif|woff|svg|eot|ttf)\??.*$/,
                use  : [
                    {
                        loader :'url-loader?limit=8&name=resource/[hash:4096].[name].[ext]'
                    }
                ]
            },{ 
                test : /\.string$/, 
                use  : [
                    {
                        loader : 'html-loader',
                        query  : {
                            minimize              : true,
                            removeAttributeQuotes : false
                        }
                    }
                ]
            }
        ]
    },
     //配置文件目录别名
    resolve : {
        alias : {
            node_modules    :  __dirname + '/node_modules',
            util            :  __dirname + '/src/util',
            page            :  __dirname + '/src/page',            
            service         :  __dirname + '/src/service',
            image           :  __dirname + '/src/image'     
        }
     },
    //插件，用于生产模版和各项功能
    plugins : [
        //配置webpack开发服务功能
        new webpack.LoaderOptionsPlugin({
            options: {
              devServer: {
              }
            }
        }),
        // 独立通用模块到js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name            : 'common',
            filename        : 'js/base.js'
        }),      
        // 把css单独打包到文件里 
        new extractTextPlugin("css/[name].css"),
        // html模板的处理
        new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
        new HtmlWebpackPlugin(getHtmlConfig('list','商品列表页')),
        new HtmlWebpackPlugin(getHtmlConfig('detail','商品详细信息')),
        new HtmlWebpackPlugin(getHtmlConfig('cart', '购物车')),
        new HtmlWebpackPlugin(getHtmlConfig('order-confirm', '订单确认')),
        new HtmlWebpackPlugin(getHtmlConfig('order-list', '订单列表')),
        new HtmlWebpackPlugin(getHtmlConfig('order-detail', '订单详情')),
        new HtmlWebpackPlugin(getHtmlConfig('payment', '支付页面')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login','用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register','用户注册')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset','找回密码')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center','用户中心')),
        new HtmlWebpackPlugin(getHtmlConfig('user-info-update','修改个人信息')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-update','修改密码')),       
        new HtmlWebpackPlugin(getHtmlConfig('result','操作结果')),
        new HtmlWebpackPlugin(getHtmlConfig('about','关于TMacmall')),
    ]
};
module.exports = config;