/*
* @Author: Lizh
* @Date:   2018-04-06 18:53:01
* @Last Modified by:   Lizh
* @Last Modified time: 2018-04-18 14:59:15
*
*/ 
/*var $$=require("jquery");
_mm.request({
	url: 'http://localhost:8080/product/list.do?keyword=1',
	success: function(res){
		console.log(res);
	},
	error: function(errMsg){
		console.log(errMsg);
	}
});
console.log(_mm.getUrlParam('test'));
var htmlTemplate = '<div>{{data}}</div>';
var data = {
	data : 123
};
console.log(_mm.renderHtml(htmlTemplate,data));*/
console.log("i am indes.jsx");
require('./index.css');
require('../module.js');
var _mm = require ('util/mm.js');
 // require('page/common/nav-simple/index.js')
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
navSide.init({
	name : 'user-center'
});