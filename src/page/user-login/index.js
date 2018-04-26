/*
* @Author: Lizh
* @Date:   2018-04-07 01:09:55
* @Last Modified by:   Lizh
* @Last Modified time: 2018-04-26 14:02:05
*/

console.log('i am login.js');
require('./index.css');
// import css from './index.css';
require('../module.js');
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
	init : function(){
		this.bindEvent();
	},
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
	submit : function(){
		var nousername = "用户名不能为空";
		var nopassword = "密码不能为空";
		var formData = {
                username : $.trim($('#username').val()),
                password : $.trim($('#password').val())
            };
		if(!_mm.validate(formData.username, 'require')){
                formError.show(nousername);
			}
        else if(!_mm.validate(formData.password, 'require')){
                	formError.show(nopassword);
			}		
		else{
			/*_mm.request({
				url  : _mm.getServerUrl('/user/login.do'),
				method : 'POST',
				data : {username:_username,password:_password},
				success : function(res){
					console.log('js'+JSON.stringify(res));
 					window.location.href = _mm.getUrlParam('redirect') || './index.html';
 				},
				error : function(error){
					console.log('js'+JSON.stringify(error));
                	formError.show(error);*/
                _user.login(formData, function(res){
                	console.log('js'+JSON.stringify(res));
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