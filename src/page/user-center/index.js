/*
* @Author: Lizh
* @Date:   2018-04-06 18:53:01
* @Last Modified by:   Lizh
* @Last Modified time: 2018-04-26 15:49:52
*
*/ 

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm 			= require ('util/mm.js');
var navSide 		= require('page/common/nav-side/index.js');
var _user           = require('service/user-service.js');
var templateIndex   = require('./index.string');
// page 逻辑部分
var page = {
	init : function(){
		this.onload();
	},
	onload : function(){
		navSide.init({
			name : 'user-center'
		});
		var userHtml = '';
		_user.getUserInfo(function(res){
			userHtml = _mm.renderHtml(templateIndex, res);
			$('.panel-body').html(userHtml);
		},function(errMsg){
			_mm.errorTips(errMsg);
		});
	}
};
$(function(){
	page.init();
});