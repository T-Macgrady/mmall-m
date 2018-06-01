# 从零开始打造一个企业级电商平台

## 项目说明：

- 项目来源于慕课，包括用户端和后台管理系统，前者可了解电商网站从设计到上线整个流程；后者采用React16 + React-Router4结合yarn、webpack、ES6和Sass、Bootstrap等技术，体验前开发端新技术。
- 对于前端新人，从前到后撸一把还是很有必要的，此项目旨在交流学习，后续会整理项目中笔记及相关知识放在博客上，欢迎交流学习~
- [后台管理系统项目 >>](https://gitee.com/happymmallmac/admin-fe)
<a id="demo"></a> 
### 上线demo:
- [前台展示 >>](http://47.106.183.192)
- [后台管理 >>](http://47.106.183.192:8080)

## 项目运行

### 下载项目

``git clone git@gitee.com:happymmallmac/mmall-m.git``

### 运行

-  [安装nodejs环境,使用v6.12.3](https://nodejs.org/download/release/v6.12.3/)
-  [安装包管理工具yarn@1.6.0](https://yarn.bootcss.com/docs/install.html)，yarn比npm好
-  在项目根目录执行yarn初始化``yarn / yarn install``
-  启动项目
 - 开发模式 :
     ``yarn run dev /yarn run dev_win``
    生产模式 :
     ``yarn run dist /yarn run dist_win``
-  [开发模式下预览项目](http://localhost:8080/dist/view/index.html)
	[接口文档 >>](https://gitee.com/happymmallmac/mmall-m/wikis/Home)


## 实战目标

- 了解一个电商网站从设计到上线的整个流程
- 掌握开发过程中遇到各种坑的解决思路和能力

## 需求分析

- 需求：用户 购买 后台 统计 运营 市场
- 核心：用户 购买 
- 流程：展示 -> 购物车 -> 下单 -> 订单 -> 支付 -> 用户中心
- 功能拆分：
  商品 ：首页、商品列表、商品详情
	
  购物车：购物车数量、添加删除商品、购物车提交

  订单：订单确认（地址管理）、订单提交、订单列表、订单详情

  支付：支付

  用户：登录、注册、个人信息、找回密码、修改密码

## 架构设计

### 前后端完全分离

- 把纯静态的html模板完全放在前端，数据全部通过RESTful接口来进行交互

### 分层架构

- 逻辑层

![逻辑层2](https://gitee.com/happymmallmac/admin-fe/attach_files/download?i=140135&u=http%3A%2F%2Ffiles.git.oschina.net%2Fgroup1%2FM00%2F03%2FCE%2FPaAvDFsQLkCAZit8AAA2LuOGFko946.PNG%3Ftoken%3D7f7cc1a3089bdc432dec42bab7fa2cf6%26ts%3D1527787108%26attname%3D%25E9%2580%25BB%25E8%25BE%2591%25E5%25B1%25822.PNG)   ![逻辑层1](https://gitee.com/happymmallmac/admin-fe/attach_files/download?i=140134&u=http%3A%2F%2Ffiles.git.oschina.net%2Fgroup1%2FM00%2F03%2FCE%2FPaAvDFsQLjaAFg4XAAAiGIfL7qQ421.PNG%3Ftoken%3Db915fe4513625f8e8161d116dd641cd8%26ts%3D1527787166%26attname%3D%25E9%2580%25BB%25E8%25BE%2591%25E5%25B1%25821.PNG)		     	
- 数据层  
![数据层](https://gitee.com/happymmallmac/admin-fe/attach_files/download?i=140132&u=http%3A%2F%2Ffiles.git.oschina.net%2Fgroup1%2FM00%2F03%2FCE%2FPaAvDFsQLeyAWVd2AAAZOI3pjWg471.PNG%3Ftoken%3Dd5efed3bfc8dfa8e142e9bf328f57221%26ts%3D1527786988%26attname%3Dservice.PNG)
- 工具层

![ 工具层](https://gitee.com/happymmallmac/admin-fe/attach_files/download?i=140133&u=http%3A%2F%2Ffiles.git.oschina.net%2Fgroup1%2FM00%2F03%2FCE%2FPaAvDFsQLiiAB42gAAAN0ttrC1c429.PNG%3Ftoken%3Df6f7d34d8b649b29bfdc68b40a0bf246%26ts%3D1527787166%26attname%3D%25E5%25B7%25A5%25E5%2585%25B7%25E5%25B1%2582.PNG)
- 优点：
  易维护、易复用、易扩展

### 模块化

- 在分层的基础上利用commonjs进行模块化的拆分，通过组件化的拼装达到业务的实现

![模块化](https://gitee.com/happymmallmac/admin-fe/attach_files/download?i=140141&u=http%3A%2F%2Ffiles.git.oschina.net%2Fgroup1%2FM00%2F03%2FCE%2FPaAvDFsQMQyAfvy8AACQ02rzb7c424.PNG%3Ftoken%3Db61fd4df8df1b5937c8389697c939026%26ts%3D1527787788%26attname%3D%25E6%25A8%25A1%25E5%259D%2597%25E5%258C%25962.PNG)
![模块化](https://gitee.com/happymmallmac/admin-fe/attach_files/download?i=140140&u=http%3A%2F%2Ffiles.git.oschina.net%2Fgroup1%2FM00%2F03%2FCE%2FPaAvDFsQMQSASlgHAABWHVxDnP8494.PNG%3Ftoken%3Dc485d7fb1f182a846d31a607531f204b%26ts%3D1527787788%26attname%3D%25E6%25A8%25A1%25E5%259D%2597%25E5%258C%2596.PNG)
- 优点： 
  进一步的解耦
  支持并行开发，提高团队效率
###技术选型&工具

### 框架？

| 项目      |  用户端   |   后台    |
| :--------: | :--------:| :------: |
| 特点    |   要求稳定 用户类型多样 兼容性好 有SEO要求 多页应用 |  开发快 企业内部使用 不要求兼容性和SEO 单页应用  |
|  选型    |   javascript +  jquery + commonjs + hogan |  html5 + css3 + sass + Bootstrap + React16 + React-Router4 + ES6   |

### 构建工具

  构建工具将源代码转换成可以执行的JavaScript、CSS、HTML 代码，用来让我们不再做机械重复的事情，解放我们的双手的。

| 项目      |  Gulp   |   webpack    |
| :--------: | :--------:| :------: |
| 优点   |   好用又不失灵活,既可以单独完成构建，也可以和其他工具搭配使用 | *天生支持CommonJS,专注于处理模块化的项目，完整好用又不失灵活性；*  |
| 缺点   |   集成度不高，要写很多配置后才可以用 | 只能用于采用模块化开发的项目  |
| 选择   |   × |  √  |

### 版本控制工具

  毫无疑问，非git莫属

- 工具一栏

|  工具   |    构建工具 |依赖环境 |包管理 | 自动化发布脚本|  代码编写 |代码调试 |请求挟持 | 版本控制|
| :---: | :---------:| :------: |:------: |:------: |:------: |:------: |:------: |:------: |
|  名称   |   webpack | NodeJS  |NPM  | Shell|   sublime |chrome |charles/fiddler4 | git|

>注：更新webpack@4.2.0后webpack-dev-server新增了devServer的配置，用自带的代理就可以访问接口

## 业务部分

### 通用功能开发

- 为业务开发打下基础，加快开发速度
```javascript
/*
* @Author: Lizh
* @Date:   2018-04-09 13:09:41
* @Last Modified by:   Lizh
* @Last Modified time: 2018-05-16 23:04:43
*/

var config = {
    serverHost:''
};
var _mm = {
    // 网络请求
    request : function(param){
        var _this = this;
        $.ajax({
            type     : param.method || 'get',
            url      : param.url    || '',
            dataType : param.type   || 'json',
            data     : param.data   || '',
            success  : function(res){
                //登陆成功
                if( 0 === res.status){
                    typeof param.success === 'function' && param.success(res.data , res.msg );
                }
                //无登陆状态需请求登陆
                else if (10 === res.status){               
                    _this.doLogin();
                }
                // 请求数据错误
                else if (1 === res.status) {
                    typeof param.error === 'function' && param.error( res.msg );
                } 
            },
            error    : function(err){
                    typeof param.error === 'function' && param.error( err.statusText );
                }
        });
    },
    // 获取服务器地址
    getServerUrl:function(path) {
        return config.serverHost+path;
    },
    //请求url参数
    getUrlParam : function(name) {
        var reg         = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result      = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },
    //渲染html模板
    renderHtml : function(htmlTemplate, data){
        var template    = Hogan.compile(htmlTemplate),
            result      = template.render(data);
        return result;
    },
    //成功提示
    successTips : function(msg){
        alert(msg || '操作成功！');
    },
    //错误提示
    errorTips : function(msg){
        alert(msg || '哪里不对了~');
    },
    //字段的验证，支持非空、手机、邮箱的判断
    validate : function(value, type){
        var _value = $.trim(value);
        //非空验证
        if('require' === type){
            return !!_value;
        }
        //手机号验证
        if('phone' === type){
            return /^1\d{10}$/.test(_value);
        }
        //邮箱格式验证
        if('email' === type){
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(_value);
        }
    },
    // 统一请求处理
    doLogin :function() {
        window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
    },
    //go home
    goHome : function(){
         window.location.href = './index.html'; 
    }  
};
module.exports = _mm;
```

### 业务开发

![业务开发](https://gitee.com/happymmallmac/mmall-m/raw/master/src/image/readme/%E5%89%8D%E5%8F%B0-%E4%B8%9A%E5%8A%A1.png)

## 生产环境适配及基本SEO

### 生产环境适配
-  利用webpack添加favicon
-  线上域名分离，HTML路径简化

|  文件   |    html |js + css |image | 
| :---: | :---------:| :------: |:------: |
|  位置   |   www/admin. + 根域名 | s. + 根域名     |img. + 根域名  |

  - 添加dns-prefecth
  - 对线上打包结果进行回归测试，防止压缩后显示不一致
	
## 基本SEO
- 增加页面数量
- 减少页面层级
- 关键词密度
- 高质量友链
- 分析竞对
- SEO数据监控

## 项目上线

### 上线准备
- 购买服务器和域名  
 - [阿里云服务器注册免费体验 >>](https://free.aliyun.com/ntms/free/personal.html?handle=true)
 - [获取实例公网IP  登录密码 >>](https://ecs.console.aliyun.com/?spm=5176.2020520001.1011.2.69864bd3mI9irR&accounttraceid=1e26d2e5-35d6-45e6-8733-bb2fc7a75871#/server/i-wz9ewlqw5noo6zk4iyfn/detail?regionId=cn-shenzhen) ，本次项目使用CentOS7
 
### 生产环境配置
  
1. 使用git bash远程连接服务器
2. [安装nodejs环境,使用v6.12.3](https://nodejs.org/download/release/v6.12.3/) 
   
3. [安装yarn@1.6.0,也可使用npm,推荐yarn](https://yarn.bootcss.com/docs/install.html#linux-tab) 
	
4. 安装git,可使用yum安装 ：
``yum install git``
5. 建立developer product 文件夹，拉取代码至developer

6. 安装nginx  ：
``yum install nginx``

### 发布脚本编写

1. 编写发布脚本前先手动执行一次，确保脚本准确
2. 编写自动发布脚本
####nginx和域名配置（这次没有进行域名分离）
3. 新建vhost/*.conf并将其引入nginx.conf主文件
4. nginx配置域名
5. [域名解析 >>](https://dns.console.aliyun.com/#/dns/domainList)

6. [查看网站并测试 >>](#demo)


## 说明

- 如果对您有帮助，您可以点 "Star" 支持一下 十分感谢!

## 相关链接

[本人博客 ](#) 
[对应后台管理系统](https://gitee.com/happymmallmac/admin-fe)


## 项目截图

### 用户端

![首页-用户端](https://gitee.com/happymmallmac/admin-fe/attach_files/download?i=140154&u=http%3A%2F%2Ffiles.git.oschina.net%2Fgroup1%2FM00%2F03%2FCE%2FPaAvDFsQoWaAO0C8AAdJupeT9Is594.png%3Ftoken%3D28d5c6c0ad8f9d887f08dc45d28fcf90%26ts%3D1527816623%26attname%3D%25E6%2588%25AA%25E5%259B%25BE-qian1.png)
![订单确认-用户端](https://gitee.com/happymmallmac/admin-fe/attach_files/download?i=140158&u=http%3A%2F%2Ffiles.git.oschina.net%2Fgroup1%2FM00%2F03%2FCE%2FPaAvDFsQoZKAO1OGAAEWeHtspx8300.png%3Ftoken%3D6f6ad415e94bac85eecb0b97111ba0c0%26ts%3D1527816623%26attname%3D%25E6%2588%25AA%25E5%259B%25BE-qian5.png)

### 后台管理系统

![首页-后台](https://gitee.com/happymmallmac/admin-fe/attach_files/download?i=140162&u=http%3A%2F%2Ffiles.git.oschina.net%2Fgroup1%2FM00%2F03%2FCE%2FPaAvDFsQosWARAKRAACKFHDSJb4474.png%3Ftoken%3Dea2040802c6a8d1c0eb4c3c91f88c9e3%26ts%3D1527816901%26attname%3D%25E6%2588%25AA%25E5%259B%25BE-hou.png)
![商品-后台](https://gitee.com/happymmallmac/admin-fe/attach_files/download?i=140159&u=http%3A%2F%2Ffiles.git.oschina.net%2Fgroup1%2FM00%2F03%2FCE%2FPaAvDFsQoZyAdd0EAAEDDvYcI_Y651.png%3Ftoken%3Decf09e16769abcbeb123b61c83fb9122%26ts%3D1527816623%26attname%3D%25E6%2588%25AA%25E5%259B%25BE-%25E5%2590%258E1.png)


