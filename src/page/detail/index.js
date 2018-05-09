/*
* @Author: Lizh
* @Date:   2018-05-02 14:14:57
* @Last Modified by:   Lizh
* @Last Modified time: 2018-05-06 01:34:03
*/
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm             = require('util/mm.js');
var _product        = require('service/product-service.js');
var templateDetail   = require('./index.string');
var _cart           = require('service/cart-service.js');
var page = {
    data : {
            productId    : _mm.getUrlParam('productId')    || '',
            detailInfo   : ''           
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        this.loadDetail();
    },
    bindEvent : function(e){
        var _this = this;
            /*图片的悬浮事件 this（绑定）  event.target（实际触发事件） currentTarget（监听器）都是p-img 
            this永远指向绑定事件的元素，target永远指向触发事件的元素。 
            event.currentTarget存在于冒泡过程中：哪个元素的监听器触发了事件
            获取属性：1-原生JS 设置属性 .setAttribute("属性","值")
            获取属性 .getAttribute("属性")
            jquery： 设置属性 .attr("属性","值") 获取属性 .attr("属性")*/
        $(document).on('mouseenter','.p-img',function(event){
            // $('.p-img-main').attr('src',event.target['src']) ;
            $('.p-img-main').attr('src',event.currentTarget.src) ;
            // $('.p-img-main').attr('src', this.src);
            // $('.p-img-main').attr('src', $(this).attr('src'));
            //绑定.p-img-item情况下
            /*$('.main-img').attr('src', $(this).find('.p-img').attr('src'));*/
        });
        // 商品数量设置 
        $(document).on('click', '.p-count', function(){
            var type        = $(this).hasClass('plus') ? 'plus' : 'minus',
                $pCount     = $('.p-info-count'),
                currCount   = parseInt($pCount.val()),
                minCount    = 1,
                maxCount    = _this.data.detailInfo.stock || 1;
            if(type === 'plus'){
                $pCount.val(currCount < maxCount ? currCount + 1 : maxCount);
            }
            else if(type === 'minus'){
                $pCount.val(currCount > minCount ? currCount - 1 : minCount);
            }
        });
        // 加入购物车
        $(document).on('click', '.btn', function(){
            _cart.addToCart({
                productId   : _this.data.productId,
                count       : $('.p-info-count').val()
            }, function(res){
                window.location.href = './result.html?type=cart-add';
            }, function(errMsg){
                _mm.errorTips(errMsg);
            });
        });
    },
    // 加载Detail数据
    loadDetail : function(){
        var _this         = this,
            listHtml      = '',
            $detailwrap   = $('.detail-wrap');
        // 判断productid是否存在，不存在则跳回首页
        if(!this.data.productId){
            _mm.goHome();
        }
        // loading
        $detailwrap.html('<div class="loading"></div>');
        // 请求接口
        _product.getProductDetail(this.data, function(res){
            // 将返回的subImages从，分解
            // _this.getsubImages(res.subImages); res.subImages为原始类型，由于按值传递，复制一份副本，执行后res不变；
            _this.filter(res);
            // 缓存住detail的数据
            _this.data.detailInfo = res;
            detailHtml = _mm.renderHtml(templateDetail, res);
            $detailwrap.html(detailHtml);
        }, function(errMsg){
            $detailwrap.html('<p class="err-tip">不好意思，该商品淘气了，我找不着/(ㄒoㄒ)/~~</p>');
        });
    },
    // 数据匹配
    filter : function(data){
        data.subImages = data.subImages.split(',');
    }
};
$(function(){
    page.init();
});




