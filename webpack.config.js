/*
* @Author: Lizh
* @Date:   2018-04-06 23:59:09
* @Last Modified by:   Lizh
* @Last Modified time: 2018-04-09 11:55:20
*/

// var website ={
//     publicPath:"http://192.168.1.108:1717/"
// }；
// 
// 环境变量配置，dev / online
var WEBPACK_ENV         = process.env.WEBPACK_ENV || 'dev';
var website ={
    publicPath:"http://localhost:8088/"
}
const getHtmlConfig = function(name){
    return {
            //template: path.join(__dirname, 'default_index.ejs'),
            template: './src/view/' + name + '.html',
            filename: 'view/' + name + '.html',
            hash: true,
            inject: true,
            showErrors: true,
            chunks: ['common',name],
           //excludeChunks: ['login'],
            title: 'Webpack App',
            minify:{  //压缩HTML文件
         removeComments:true //移除HTML中的注释
       }
    }
}    
const htmlPlugin= require('html-webpack-plugin');
const extractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');
const path = require('path');
const config = module.exports;
module.exports= {
    //入口文件的配置项  ./不能去掉
    entry:{
        //common:['./src/page/common/index.js','webpack-dev-server/client?http://localhost:8088/'],
        common:['./src/page/common/index.js'],
        index:'./src/page/index/index.js',
        login:'./src/page/login/index.js'
    },
    //出口文件的配置项
    output:{
        //path为输出的路径，用了Node语法，path.resolve(__dirname,'dist')就是获取了项目的绝对路径 别漏了,,,,,号_(¦3」∠)_
        //1）path:path.resolve(__dirname,'./dist/js/'),2）path: __dirname + 'dist/js',  会新建一个目录(C:\Users\15156\mmall\doc\mmall-mdist\js)
        //publicPath:'/dist/'  为访问资源地址  右边/不能少否则URL（）地址不对  
        filename:'js/[name].js',
        path: path.resolve(__dirname,"dist"),
        //publicPath:website.publicPath
         publicPath:"/C:/Users/15156/mmall/doc/mmall-m/dist/"
        //输出的文件名称  /js可放到filename： filename:'js/[name].js'      
    },
    externals : {
        'jquery' : 'window.jQuery'
},

    //模块：例如解读CSS,图片如何转换，压缩

    module:{
        rules:[
    /*{
        test:/\.css$/,
        use:[
        "style-loader","css-loader"
        ]
    }*/
    {
        test:/\.css$/,
        use: extractTextPlugin.extract({
        fallback: "style-loader",
        use: "css-loader"
        })
    },{
        test:/\.(png|jpg|gif|woff|svg|eot|ttf)\??.*$/,
        use: [{
            loader :'url-loader?limit=8&name=resource/[hash:4096].[name].[ext]'
        }]
    },
    {
        test: /\.(htm|html)$/i,
        use:[  'html-withimg-loader']  
    }
     // {
     //           test: /\.html$/,
     //           use: {
     //               loader: 'html-loader'
     //           }
     //        }
    ]
},
    //配置webpack开发服务功能
    devServer:{
        // 设置基本目录结构
        // contentBase:'/dist/',
        //contentBase:path.resolve(__dirname,'dist')
        //服务器的IP地址，可以使用IP也可以使用localhost
        host:'192.168.1.104',
        //服务端压缩是否开启
        compress:true,
        //配置服务端口号
        port:1717
    //     proxy: { 
    //         '*': {  
    //             target: 'http://localhost:7070',  
    //             changeOrigin: true,  
    //             secure: false,  
    //             ws: false,  
    //         }  
    //     }
     },
    //插件，用于生产模版和各项功能
   	    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
        name : 'common'
        }),
        new extractTextPlugin("css/[name].css"),
        new htmlPlugin(getHtmlConfig('index')),
        new htmlPlugin(getHtmlConfig('login'))
    ]

}
//     if('dev'=== WEBPACK_ENV){  
//   config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');  
// }
