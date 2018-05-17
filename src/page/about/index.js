/*
* @Author: Lizh
* @Date:   2018-05-15 16:09:44
* @Last Modified by:   Lizh
* @Last Modified time: 2018-05-17 23:23:03
*/
require('page/common/nav/index.js');
require('page/common/header/index.js'); 
var navSide 		= require('page/common/nav-side/index.js');
$(function(){
	navSide.init({
			name : 'about'
		});
});