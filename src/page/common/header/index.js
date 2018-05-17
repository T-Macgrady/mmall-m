/*
* @Author: Lizh
* @Date:   2018-04-17 16:44:10
* @Last Modified by:   Lizh
* @Last Modified time: 2018-05-15 16:37:51
*/
require('./index.css');
var _mm = require ('util/mm.js');
// 通用页面头部
var header = {
	//页面初始化
	init : function(){
		this.bindEvent();
		this.onLoad();
	},
	//页面加载
	onLoad : function(){
		var keyword = _mm.getUrlParam('keyword');
		if (keyword) {
			$('#search-input').val(keyword);
		}
	},
	//事件绑定
	bindEvent : function(){
		var _this = this;
		$('#search-btn').click(function(){
			_this.searchSubmit();
		});
		$('#search-input').keyup(function(event){
			event = event || window.event;
			if(event.keyCode === 13){
			 	_this.searchSubmit();	
			}
		});
	},
	//搜索按钮事件
	searchSubmit : function(){
		var keyword = $.trim($('#search-input').val());
		if (keyword){
			window.location.href = './list.html?keyword=' + keyword;
		}
		else {
			_mm.goHome();
		}
	}
};
header.init();