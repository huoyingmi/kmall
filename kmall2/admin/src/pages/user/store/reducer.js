/*
* @Author: TomChen
* @Date:   2019-04-11 18:56:06
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-12 20:51:38
*/
import { fromJS } from 'immutable'

import * as types from './actionTypes.js'

const defaultState = fromJS({
	list:[],
// ————>进入store/reducer.js文件配置
	current:1, //默认值为1
	pageSize:0, //默认值为0
	total:0, //默认值为0
	isFething:false
// ————>将current,pageSize,total,isFething映射回user/index.js文件mapStateToProps方法中
})

export default (state=defaultState,action)=>{
	// 
	if(action.type == types.SET_PAGE){
		return state.merge({
			list:fromJS(action.payload.list),
			current:action.payload.current,
			pageSize:action.payload.pageSize,
			total:action.payload.total
		})
	}
	// 处理isFething loading分页预加载
	if(action.type == types.PAGE_REQUEST){
		return state.set('isFething',true)
	}
	if(action.type == types.PAGE_DONE){
		return state.set('isFething',false)
	}

	return state;
}