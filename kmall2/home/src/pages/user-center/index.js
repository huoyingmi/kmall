require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')

require('./index.css')
var _util = require('util')
var _user = require('service/user')
// var _side = require('pages/common/side')
// var tpl = require('./index.tpl')

var page = {
	init:function(){
		this.bindEvent();
	},
	bindEvent:function(){

	}
}
$(function(){
	page.init();
})