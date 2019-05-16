var _util = { //发送Ajax请求的方法request
	request:function(options){
		var _this = this;
	 //options从service/user/index.js文件中的request得到
		$.ajax({
			method:options.method || 'get',//请求方法
			url:options.url || '', //请求地址
			dataType:options.dataType || 'json',//数据类型
			data:options.data || '',//参数
			success:function(result){
				// 1.成功
				if(result.code == 0){ //&&是指如果有的话将要执行
					options.success && options.success(result.data);
				}
				// 2.失败 //此处是指后台的义务逻辑上的失败
				else if(result.code == 1){ //&&是指如果有的话将要执行
					options.error && options.error(result.message);
					// console.log('1')
				}
				// 3.没有权限
				else if(result.code == 10){
					// 跳转到登陆页面
					_this.goLogin();
					// console.log('2')
				}
			},
			//此处的失败是指整个Ajax请求失败
			error:function(err){ //&&是指如果有的话将要执行
				options.error && options.error(err.statusText);
				// console.log('3')
			}
		})
	},
	// 接受错误的信息
	showErrorMsg:function(msg){
		alert(msg);
	},
	// 接受成功的信息
	showSuccessMsg:function(msg){
		alert(msg);
	},
	// 跳转页面的方法
	goLogin:function(){
		window.location.href = './user-login.html';
	},
	//跳转到首页的方法
	goHome:function(){
		window.location.href = '/';
	},
	// 跳转到result页面显示某一个提示信息
	getParamFromUrl:function(key){
	 // 页面搜索的内容?type=register
	 // 页面搜索的内容?name=tom&&?type=register
	 // 页面搜索的内容?name=tom&&?type=register&&id=123
		var query = window.location.search.substr(1);
		// 传入的key的内容是正则的条件
		var reg = new RegExp('(^|&)'+key+'=([^&]*)(&|$)');
		var result = query.match(reg);
		// 有的话返回result下标是2，没有的话返回null
		return result ? decodeURIComponent(result[2]) : null;
		console.log(result);
	},
	// 数据的验证方法
	//两个参数value指输入的值，type指类型
	validate:function(value,type){
		var value = $.trim(value);
		// 非空验证
		if(type == 'require'){
			return !!value
		}
		// 用户名格式验证
		if(type == 'username'){
			return /^[a-zA-Z0-9_]{3,6}$/.test(value)
		}
		// 密码格式验证
		if(type == 'password'){
			return /^[a-zA-Z0-9_]{3,6}$/.test(value)
		}
		// 手机号格式验证
		if(type == 'phone'){
			return /^1[3568]\d{9}$/.test(value)
		}
		// 邮箱格式验证
		if(type == 'email'){
			// tom@kuazu.com
			return /^\w+@\w+\.\w{2,9}$/.test(value)
		}
	}
}
module.exports = _util;
