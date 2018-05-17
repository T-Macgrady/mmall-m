/*
* @Author: Lizh
* @Date:   2018-05-14 23:25:59
* @Last Modified by:   Lizh
* @Last Modified time: 2018-05-15 17:21:31
*/
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm 			= require ('util/mm.js');
var _payment           = require('service/payment-service.js');
var templateIndex   = require('./index.string');
// page 逻辑部分
var page = {
	//初始化数据
	data : {
		orderNo : _mm.getUrlParam('orderNo') || ''
	},
	// 初始化页面
	init : function(){
		this.onload();
	},
	// 加载页面
	onload : function(){
		var paymentHtml = '',
			_this = this;
		_payment.getPrCode({
			orderNo : this.data.orderNo
		},function(res){
			paymentHtml = _mm.renderHtml(templateIndex, res);
			$('.pay-wrap').html(paymentHtml);
			_this.listenPayStatus();
		},function(errMsg){
			_mm.errorTips(errMsg);
		});
	},
	// 监听支付结果
	listenPayStatus : function(){
		var _this = this;
		var payTimer = window.setInterval(function(){
			_payment.queryPayStatus({
			orderNo : _this.data.orderNo
		},function(res){
			if(res){
			window.location.href = '.result.html?type=payment&orderNo=' + _this.data.orderNo;
			}
		},function(errMsg){
			_mm.errorTips(errMsg);
		});
		},5e3);
	}
};
$(function(){
	page.init();
});