/*
* @Author: Lizh
* @Date:   2018-04-09 13:09:41
* @Last Modified by:   Lizh
* @Last Modified time: 2018-04-18 16:47:22
*/

var config = {
    serverHost:''
};
// var Hogan = require('hogan.js');
var _mm = {
    // 网络请求
    request : function(param){
        var _this = this;
        $.ajax({
            type     :param.method  || 'get',
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
        var reg       = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result    = window.location.search.substr(1).match(reg);
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
    validate : function(){
        var value = $.trim(value);
        //非空验证
        if('require' === type){
            return !!value;
        }
        //手机号验证
        if('phone' === type){
            return /^1\d{10}$/.test(value);
        }
        //邮箱格式验证
        if('email' === type){
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
        }
    },
    // 统一请求处理
    doLogin :function() {
        window.location.href = './login.html?redirect=' + encodeURIConponent(window.location.href);
    },
    //go home
    goHome : function(){
         window.location.href = './index.html'; 
    }  
};
module.exports = _mm;
// <script src="https://cdn.bootcss.com/hogan.js/3.0.2/hogan.min.js"></script>
