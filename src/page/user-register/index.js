/*
* @Author: Lizh
* @Date:   2018-04-07 01:09:55
* @Last Modified by:   Lizh
* @Last Modified time: 2018-04-24 23:19:14
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
	init : function(){
		this.bindEvent();
	},
	bindEvent : function(){
		var _this = this;
		//异步验证用户名是否存在
		$('#username').blur(function(){
			var username = $.trim($(this).val());
			//用户名为空时无需验证
			if(!username){
				return;
			}
			_user.checkUsername(username,
	            function(){
	             	formError.hide();           		
	            },
	            function(errMsg){
	            	formError.show(errMsg);
	        });
        });
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
		//表单数据
		var formData = {
                username         : $.trim($('#username').val()),
                password         : $.trim($('#password').val()),
                passwordConfirm  : $.trim($('#passwordConfirm').val()),
                phone            : $.trim($('#phone').val()),
                email 			 : $.trim($('#email').val()),
                question 		 : $.trim($('#question').val()),
                answer   		 : $.trim($('#answer').val())
            };
		if(!_mm.validate(formData.username , 'require')){
                formError.show("用户名不能为空");
                return ;
			}
        else if(!_mm.validate(formData.password, 'require')){
                formError.show("密码不能为空");
                return;
			}
		else if(formData.password.length < 6){
                formError.show("密码不能小于六位");
            	return;
        }
		else if(formData.passwordConfirm !== formData.password){
                formError.show("输入密码不一致");
                return;
			}
		else if(!_mm.validate(formData.phone, 'phone')){
                formError.show("号码格式不正确");
                return;
			}
		else if(!_mm.validate(formData.email, 'email')){
                formError.show("邮箱格式不正确");
                return;
			}
		else if(!_mm.validate(formData.question, 'require')){
                formError.show("密码提示问题不能为空");
                return;
			}
		else if(!_mm.validate(formData.answer, 'require')){
                formError.show("密码提示答案不能为空");
                return;
			}		
		else{
            _user.register(formData, function(res){
			 	window.location.href = 'result.html?type=register';
            }, function(errMsg){
                formError.show(errMsg);
            });
		}	
	}
};
$(function(){
	page.init();
});