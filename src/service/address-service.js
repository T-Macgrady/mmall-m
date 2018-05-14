/*
* @Author: Lizh
* @Date:   2018-05-11 21:02:10
* @Last Modified by:   Lizh
* @Last Modified time: 2018-05-13 01:30:16
*/
var _mm = require('util/mm.js');

var _address = {
    // 加载地址列表
    getAddressList : function(addressInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/list.do'),
            data    : addressInfo,
            success : resolve,
            error   : reject
        });
    },
    // 保存地址信息
    saveAddress : function(addressInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/add.do'),
            data    : addressInfo,
            success : resolve,
            error   : reject
        });
    },
    // 更新地址
    updateAddress : function(addressInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/update.do'),
            data    : addressInfo,
            success : resolve,
            error   : reject
        });
    },
    // 删除地址
    delectAddress : function(addressInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/del.do'),
            data    : addressInfo,
            success : resolve,
            error   : reject
        });
    },
    // 加载地址模板后回填地址
    selectAddress : function(addressInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/select.do'),
            data    : {
                shippingId :addressInfo
            },
            success : resolve,
            error   : reject
        });
    },
    
    
};
module.exports = _address;