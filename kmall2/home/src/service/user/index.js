// 用户相关的服务
var _util = require('util');

var _user = {
	// 退出
	logout:function(success,error){
		_util.request({
			url:'/user/logout',
			success:success,
			error:error
		})
	},
	// 登录
	login:function(data,success,error){
		_util.request({
			method:'post',//请求方法//在server服务器的user.js中查看的
			url:'user/login',//请求地址
			data:data,//参数
			success:success,//成功
			error:error //失败
		})
	},
	// 注册
	register:function(data,success,error){
		_util.request({
			method:'post',//请求方法//在server服务器的user.js中查看的
			url:'user/register',//请求地址
			data:data,//参数
			success:success,//成功
			error:error //失败
		})
	},
	// 发送Ajax请求拿到用户名
	getUsername:function(success,error){
		_util.request({
			url:'/user/username',
			success:success,
			error:error
		})
	},
	// 
	checkUsername:function(username,success,error){
		_util.request({
			url:'/user/checkUsername',
			data:{
				username:username,
			},
			success:success,
			error:error
		})
	}
}
module.exports = _user;