/*
* @Author: TomChen
* @Date:   2019-04-11 20:15:26
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-12 20:09:18
*/
import * as types from './actionTypes.js'

import { request } from 'util'

import { GET_USERS } from 'api'

// 处理isFething loading分页预加载
const getPageRequestAction = ()=>{
	return {
		type:types.PAGE_REQUEST
	}
}
const getPageDoneAction = ()=>{
	return {
		type:types.PAGE_DONE
	}
}
// ————>进入./actionTypes.js文件中定义PAGE_REQUEST，PAGE_DONE

const setPageAction = (payload)=>{
	return {
		type:types.SET_PAGE,
		payload
	}
}

export const getPageAction = (page)=>{
	return (dispatch)=>{
		// 开始之前先将dispatch(getPageRequestAction())开发一下
		dispatch(getPageRequestAction())
		request({
			url:GET_USERS,//————>进入api/index.js文件
			data:{
				page:page
			}
		})
		.then(result=>{
			// console.log("result:::",result);
			if(result.code == 0){
				dispatch(setPageAction(result.data))
			}
		})
		.catch(err=>{
			console.log(err);
		})
		.finally(()=>{
			// 结束时再将dispatch(getPageDoneAction())开发一下
			dispatch(getPageDoneAction())
	// ————>进入user/store/reducer.js文件将isFething处理一下
		})
	}
}
// ————>进入home/index.js文件中

