/*
* @Author: TomChen
* @Date:   2019-04-11 20:15:26
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-12 20:09:18
*/
import { message } from 'antd';

import * as types from './actionTypes.js'
import { request } from 'util'
import { GET_USERS,ADD_CATEGORY,GET_CATEGORIES } from 'api'

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
const getAddRequestAction = ()=>{
	return {
		type:types.ADD_REQUEST
	}
}
const getAddDoneAction = ()=>{
	return {
		type:types.ADD_DONE
	}
}
// ————>进入./actionTypes.js文件中定义ADD_REQUEST，ADD_DONE

const setPageAction = (payload)=>{
	return {
		type:types.SET_PAGE, //进入actionTypes.js文件定义
		payload
	}
}

const setLevelOneCategoriesAction = (payload)=>{
	return {
		type:types.SET_LEVEL_ONE_CATEGORIES,//进入actionTypes.js文件定义
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

export const getAddAction = (values)=>{
	return (dispatch)=>{
		// 开始之前先将dispatch(getPageRequestAction())开发一下
		dispatch(getAddRequestAction())
		request({
			method:'post',
			url:ADD_CATEGORY,//————>进入api/index.js文件
			data:values
		})
		.then(result=>{
			console.log("result:::",result);
			if(result.code == 0){ //表明成功
				if(result.data){ //如果有data时，将页面一级分类重新加载一遍
					dispatch(setLevelOneCategoriesAction(result.data))
				}
				message.success('添加分类成功')
			}else if(result.code == 1){
				message.error(result.message)
			}
		})
		.catch(err=>{
			// console.log(err);
			message.error('添加分类失败')
		})
		.finally(()=>{
			// 结束时再将dispatch(getPageDoneAction())开发一下
			dispatch(getAddDoneAction())
	// ————>进入user/store/reducer.js文件将isFething处理一下
		})
	}
}

export const getLevelOneCategoriesAction = ()=>{
	return (dispatch)=>{
		request({
			//method:'get',
			url:GET_CATEGORIES,//————>进入api/index.js文件
			data:{
				pid:0
			}
		})
		.then(result=>{
			// console.log("result1:::",result);
			dispatch(setLevelOneCategoriesAction())
		})
	}
	
}