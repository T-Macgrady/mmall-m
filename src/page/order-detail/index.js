 /*
* @Author: Lizh
* @Date:   2018-05-14 00:22:03
* @Last Modified by:   Lizh
* @Last Modified time: 2018-05-14 03:01:39
*/
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm 			= require ('util/mm.js');
var navSide 		= require('page/common/nav-side/index.js');
var _order           = require('service/order-service.js');
var templateIndex   = require('./index.string');
// page 逻辑部分
var page = {
	init : function(){
		this.onload();
		this.bindEvent();
	},
	onload : function(){
		var _this = this,
			orderNo = _mm.getUrlParam('orderNo');
		navSide.init({
			name : 'order-list'
		});
		_order.getOrderDetail({
			orderNo : orderNo
		},function(res){
			_this.dataFilter(res);
			var orderDetailHtml = _mm.renderHtml(templateIndex, res);
			$('.content').html(orderDetailHtml);
		},function(errMsg){
			_mm.errorTips(errMsg);
		});
	},
	dataFilter : function(data){
		data.needPay = data.status == 10;
		data.isCancelable = data.status == 10;
	},
	bindEvent : function(){
		var _this = this;
		$(document).on('click','.order-cancel',function(){
			var orderNo = $(this).parents('.order-info').find('.orderNo').text();
			if(window.confirm('你确定要取消订单？')){
				_order.cacelOrder({
					orderNo : orderNo
				},function(){
					_mm.successTips('取消订单成功！');
					_this.onload();
				},function(){
					_mm.errorTips('errMsg');
				});
			}
		});
	}
};
$(function(){
	page.init();
});