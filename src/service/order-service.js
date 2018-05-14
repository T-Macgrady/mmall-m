/*
* @Author: Lizh
* @Date:   2018-05-11 21:02:33
* @Last Modified by:   Lizh
* @Last Modified time: 2018-05-14 02:57:27
*/

var _mm = require('util/mm.js');

var product = {
    // 加载商品列表
    getOrderProduct : function( resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/get_order_cart_product.do'),
            success : resolve,
            error   : reject
        });
    },
    // 加载商品列表
    creatOrder : function( shippingId,resolve, reject){
        _mm.request({
            url         : _mm.getServerUrl('/order/create.do'),
            data        : shippingId,
            success     : resolve,
            error       : reject
        });
    },
    // 加载订单列表
    getOrderList : function( OrderListInfo,resolve, reject){
        _mm.request({
            url             : _mm.getServerUrl('/order/list.do'),
            data            : OrderListInfo,
            success         : resolve,
            error           : reject
        });
    },
    // 加载订单详情
    getOrderDetail : function( OrderDetailInfo,resolve, reject){
        _mm.request({
            url            : _mm.getServerUrl('/order/detail.do'),
            data           : OrderDetailInfo,
            success        : resolve,
            error          : reject
        });
    },
    // 取消订单
    cacelOrder : function( orderNo,resolve, reject){
        _mm.request({
            url    		   : _mm.getServerUrl('/order/cancel.do'),
            data           : orderNo,
            success 	   : resolve,
            error   	   : reject
        });
    },
    
    
};
module.exports = product;