// console.log('user-login...');
// console.log($);

require('./index.css')
require('pages/common/footer')
require('pages/common/logo')
var _util = require('util');

$(function(){
	// console.log('result ok...');
	// 获取到result结果页上面的register提示信息
	// 如果是空的，则返回default
	var type = _util.getParamFromUrl('type') || 'default';
	console.log("type::",type);
	$('.'+type).show();
})