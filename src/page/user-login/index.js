/*
* @Author:  Lizh
* @Date:   2018-04-07 01:09:55
* @Last Modified by:   Lizh
* @Last Modified time: 2018-05-16 23:08:57
*/
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm     = require ('util/mm.js');
var _user   = require('service/user-service.js');
// 表单里的错误提示
var formError = {
    show : function(errMsg){
        $('.err-item').show().find('.err-msg').text(errMsg);
    },
    hide : function(){
        $('.err-item').hide().find('.err-msg').text('');
    }
};
// page 逻辑部分
var page = {
	// 初始化页面
	init : function(){
		this.bindEvent();
	},
	// 绑定事件
	bindEvent : function(){
		var _this = this;
		$('#submit').click(function(){
			_this.submit();
		});
		$('.user-content').keyup(function(e){
			if(e.keyCode === 13){
				_this.submit();
			}
		});
	},
	// 提交按钮事件
	submit : function(){
		var _this = this,
			formData = {
                username : $.trim($('#username').val()),
                password : $.trim($('#password').val())
            };
		if(!_mm.validate(formData.username, 'require')){
                formError.show("用户名不能为空");
			}
        else if(!_mm.validate(formData.password, 'require')){
                	formError.show("密码不能为空");
			}		
		else{
            _user.login(formData, function(res){
                window.location.href ='./index.html';
            }, function(errMsg){
                formError.show(errMsg);
            });
		}
  	}		
};
$(function(){
	page.init();
});