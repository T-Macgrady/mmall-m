/*
* @Author: Lizh
* @Date:   2018-04-18 15:15:50
* @Last Modified by:   Lizh
* @Last Modified time: 2018-04-18 17:02:06
*/
require('./index.css');
var _mm = require ('util/mm.js');
require('page/common/nav-simple/index.js');
$(function(){
	var type = _mm.getUrlParam('type') || 'defualt';
	$element = $('.' + type + '-success');
	$element.show();
})