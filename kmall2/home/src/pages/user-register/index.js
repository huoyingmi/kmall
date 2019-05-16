// console.log('user-login...');
// console.log($);

require('./index.css')
require('pages/common/footer')
require('pages/common/logo')
var _util = require('util')
var _user = require('service/user')

var formErr = {
	show:function(msg){
		$('.error-item')
		.show()
		.find('.error-msg')
		.text(msg)
	},
	hide:function(){
		$('.error-item')
		.hide()
		.find('.error-msg')
		.text('')
	}
}

var page = {
	init:function(){
		this.bindEvent();
		// console.log('aaa');
	},
	bindEvent:function(){
		// console.log(this);
		var _this = this;
		// console.log(_this);
		// 验证用户名是否存在 
		// blur
		$('[name="username"]').on('blur',function(){
			var username = $(this).val();
			// alert(username);
			if(!_util.validate(username,'require')){
				return;
			}
			if(!_util.validate(username,'username')){
				return;
			}
			_user.checkUsername(username,function(){
				formErr.hide()
			},function(msg){
				formErr.show(msg)
			})
		})
		// 1.绑定事件用户登录
		$('#btn-submit').on('click',function(){
			_this.submitRegister();
		})
		// 点击回车提交登录
		$('input').on('keyup',function(ev){
			if(ev.keyCode == 13){
				_this.submitRegister();//提交函数
			}
		})
	},
	submitRegister:function(){
		// 1.获取数据
		var formData = {
			username:$.trim($('[name="username"]').val()),
			password:$.trim($('[name="password"]').val()),
			repassword:$.trim($('[name="repassword"]').val()),
			phone:$.trim($('[name="phone"]').val()),
			email:$.trim($('[name="email"]').val()),
		}
		// console.log(formData);
		// 2.验证数据
		var validateResult = this.validate(formData);//调用验证方法
		// 3.发送请求
		// console.log(validateResult);
		if(validateResult.status){//true说明验证通过
			formErr.hide()
			//三个参数
			_user.register(formData,function(){
				// console.log('register ok...');
				// 注册成功之后，有一个页面的跳转，跳转到结果页,显示不同的提示
				window.location.href = './result.html?type=register'
			},function(msg){
				formErr.show(msg)
			})
		}else{//验证失败
			formErr.show(validateResult.msg);
		}
	},
	validate:function(formData){
		var result = {
			status:false, //默认验证不通过
			msg:''
		}
		// 用户名不能为空
		if(!_util.validate(formData.username,'require')){
			result.msg = '用户名不能为空'
			return result;
		}
		// 用户名格式不正确
		if(!_util.validate(formData.username,'username')){
			// console.log('dfgdgdfgd')
			result.msg = '用户名格式不正确'
			return result;
		}
		// 密码不能为空
		if(!_util.validate(formData.password,'require')){
			result.msg = '密码不能为空'
			return result;
		}
		// 密码格式不正确
		if(!_util.validate(formData.password,'password')){
			result.msg = '密码格式不正确'
			return result;
		}
		// 两次密码不一致
		if(formData.password != formData.repassword){
			result.msg = '两次密码不一致'
			return result;
		}
		// 手机号不能为空
		if(!_util.validate(formData.phone,'require')){
			result.msg = '手机号不能为空'
			return result;
		}
		// 手机号格式不正确
		if(!_util.validate(formData.phone,'phone')){
			result.msg = '手机号格式不正确'
			return result;
		}
		// 邮箱不能为空
		if(!_util.validate(formData.email,'require')){
			result.msg = '邮箱不能为空'
			return result;
		}
		// 邮箱格式不正确
		if(!_util.validate(formData.email,'email')){
			result.msg = '邮箱格式不正确'
			return result;
		}
		// 验证通过执行
		result.status = true;
		// console.log(result.status)//true
		return result;
	}
}
$(function(){
	page.init();
})