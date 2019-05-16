// 对应view/common/nav.html文件
require('./index.css');
var _user = require('service/user')
var _util = require('util')

var nav = {
	// 初始化方法
	init:function(){
		this.bindEvent();//this上面的bindEvent事件
		this.loadUsername();//加载用户名
		return this;//得到this指nav对象
	},
	bindEvent:function(){
		// 1.绑定退出事件
		$('#logout').on('click',function(){
			// console.log('logout...');
			_user.logout(function(result){
				// console.log(result);
				// console.log('success');
				window.location.reload();//刷新页面
			},function(msg){//msg是message错误的缩写
				// alert(msg);
				_util.showErrorMsg(msg);
			})
		})
	},
	loadUsername:function(){
		// 发送Ajax请求拿到用户名在service/user中
		_user.getUsername(function(data){
			// console.log(data);
			$('.not-login').hide(); //隐藏登陆注册
			$('.login')   //显示退出欢迎
			.show()
			.find('.username') //找到类标签username
			.text(data.username);//将用户名添加到username标签中
		})
	}
}

module.exports = nav.init();//调用方法