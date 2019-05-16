import axios from 'axios';

export const request = (options)=>{
	return new Promise((resolve,reject)=>{
		const params = {
			    method:options.method || 'get',
	        	url:options.url || '',
	        	withCredentials:true,
		}
		switch(params.method.toUpperCase()){ //toUpperCase转换小写转换大写
			case 'GET':
			case 'DELETE':
				params.params = options.data 
			//如果是‘get’‘delete’请求则用params.params获取
				break //停止
			default:
			params.data = options.data
			//如果是‘post’等其他的请求方式则用params.data获取
		}
		axios(params)
		.then(result=>{
			const data = result.data;
			if(data.code == 10){//code=10是没有了权限
				// 移除前端的登陆信息
				removeUserName();
				// 并且跳转到登陆页面
				window.location.href = '/login'
				reject('没有权限');
			}else{
				resolve(result.data);
			}
		})
		.catch(err=>{
			reject(err);
		})
	})
}
// ————>进入actionCreator.js文件

// 登录用户信息存储
export const setUserName = (username)=>{
	window.localStorage.setItem('username',username);
}
export const getUserName = (username)=>{
	return window.localStorage.getItem('username');
}
export const removeUserName = (username)=>{
	window.localStorage.removeItem('username');
} 