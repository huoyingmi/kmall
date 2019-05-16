/*
* @Author: TomChen
* @Date:   2019-04-11 20:15:26
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-12 20:09:18
*/
import * as types from './actionTypes.js'

import { request } from 'util'

import { ADMIN_COUNT } from 'api'

const setCountAction = (payload)=>{
	return {
		type:types.SET_COUNT,
		payload
	}
}

export const getCountAction = ()=>{
	return (dispatch)=>{
		request({
			url:ADMIN_COUNT
		})
		.then(result=>{
			console.log("result:::",result);
			if(result.code == 0){
				const action = setCountAction(result.data)
				dispatch(action)
				// ————>进入store/reducer.js文件
			}
		})
		.catch(err=>{
			console.log(err);
		})
	}
}
// ————>进入home/index.js文件中

