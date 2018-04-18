/*
* @Author: Lizh
* @Date:   2018-04-06 23:59:09
* @Last Modified by:   Lizh
* @Last Modified time: 2018-04-18 15:40:15
*/
// 环境变量配置，dev / online
    var WEBPACK_ENV         = process.env.WEBPACK_ENV || 'dev';
    var HtmlWebpackPlugin   = require('html-webpack-plugin');
    var extractTextPlugin   = require("extract-text-webpack-plugin");
    var webpack             = require('webpack');
    var path                = require('path');
    var getHtmlConfig       = function(name , title){
    return {
            template: './src/view/' + name + '.html',
            filename: 'view/' + name + '.html',
            hash: true,
            inject: true,
            showErrors: true,
            chunks: ['common',name],
           //excludeChunks: ['login'],
            title: title,
            minify:{  //压缩HTML文件
            removeComments:true //移除HTML中的注释
       }
    }
}    
    console.log(WEBPACK_ENV);
    module.exports= {
    //入口文件的配置项  ./不能去掉
    entry:{
        //common:['./src/page/common/index.js','webpack-dev-server/client?http://192.168.1.104:1717/dist/'],
        common:['./src/page/common/index.js'],
        index:['./src/page/index/index.js']  ,
        login:['./src/page/login/index.js'] ,
        result:['./src/page/result/index.js'] ,
    },
    //出口文件的配置项
    output:{
        //输出的文件名称  /js可放到filename： filename:'js/[name].js'      
        filename:'js/[name].js',
        path: path.resolve(__dirname,"dist"),
        //publicPath:'/dist/'  为访问资源地址  右边/不能少否则URL（）地址不对  
        //publicPath:"/C:/Users/15156/mmall/doc/mmall-m/dist/"
        //publicPath:"http://192.168.1.104:1717/dist/"
        publicPath:"http://localhost:8080/dist/"
    },
    externals : {
        'jquery' : 'window.jQuery'
},

    //模块：例如解读CSS,图片如何转换，压缩
    module:{
        rules:[
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
    }/*,
    {
      test: /\.html$/,
      use: "raw-loader" // loaders: ['raw-loader'] is also perfectly acceptable.
    
  }*/
  ,
    { test: /\.string$/, use: 'html-loader'}

    /*,{
         test: /\.(htm|html)$/i,
         use:[  'html-withimg-loader']  
     }
      {
                test: /\.html$/,
                use: {
                    loader: 'html-loader'
                }
             }*/
    ]
},
    //配置webpack开发服务功能
    devServer:{
     },
/*     devtool: 'inline-source-map',
     devtool: 'cheap-eval-source-map',*/
    resolve: {
        alias : {
            node_modules    :  __dirname + '/node_modules',
            util    :  __dirname + '/src/util',
            page    :  __dirname + '/src/page',            
            service :  __dirname + '/src/service',
            image   :  __dirname + '/src/image'     
        }
     },
    //插件，用于生产模版和各项功能
    plugins: [
        /*new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),*/
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename :'js/base.js'
        }),       
        new extractTextPlugin("css/[name].css"),
        new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
        new HtmlWebpackPlugin(getHtmlConfig('login','用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('result','操作结果')),
    ]
}