/*
* @Author: Lizh
* @Date:   2018-05-14 23:51:21
* @Last Modified by:   Lizh
* @Last Modified time: 2018-05-15 00:13:30
*/
var _mm = require('util/mm.js');

var payment = {
    // 获取支付二维码
    getPrCode : function(orderNo,resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/pay.do'),
            data 	: orderNo,
            success : resolve,
            error   : reject
        });
    },
    // 监听支付状态
    queryPayStatus : function(orderNo,resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/query_order_pay_status.do'),
            data 	: orderNo,
            success : resolve,
            error   : reject
        });
    },
};
module.exports = payment;