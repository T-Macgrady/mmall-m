/*
* @Author: Lizh
* @Date:   2018-05-13 16:00:22
* @Last Modified by:   Lizh
* @Last Modified time: 2018-05-16 00:10:33
*/
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm 			= require ('util/mm.js');
var navSide 		= require('page/common/nav-side/index.js');
var _order          = require('service/order-service.js');
var templateIndex   = require('./index.string');
var Pagination      = require('util/pagination/index.js');
// page 逻辑部分
var page = {
    // 初始化数据
	data : {
        listParam : {
            keyword         : '',
            categoryId      : '',
            orderBy         : 'default',
            pageNum         : 1,
            pageSize        : 10
        }
    },
    // 初始化页面
	init : function(){
		this.onload();
		this.bindEvent();
	},
    // 加载页面
	onload : function(){
		var _this = this;
		navSide.init({
			name : 'order-list'
		});
		_order.getOrderList({
			pageSize : _this.data.listParam.pageSize,
			pageNum  : _this.data.listParam.pageNum
		},function(res){
			var orderListHtml = _mm.renderHtml(templateIndex, res);
			$('.panel-body').html(orderListHtml);
            _this.loadPagination({
                hasPreviousPage : res.hasPreviousPage,
                prePage         : res.prePage,
                hasNextPage     : res.hasNextPage,
                nextPage        : res.nextPage,
                pageNum         : res.pageNum,
                pages           : res.pages
            });
		},function(errMsg){
			_mm.errorTips(errMsg);
		});
	},
    // 加载分页信息
    loadPagination : function(pageInfo){
        var _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({}, pageInfo, {
            container : $('.pagination'),
            onSelectPage : function(pageNum){
                _this.data.listParam.pageNum = pageNum;
                _this.onload();
            }
        }));
    },
    // 绑定事件
	bindEvent : function(){
		$(document).on('click','.order-toDetail',function(){
			var orderNo = $.trim($(this).siblings('.order-num').text());
			window.location.href = './order-detail.html?orderNo='+orderNo;
		});
	}
};
$(function(){
	page.init();
});