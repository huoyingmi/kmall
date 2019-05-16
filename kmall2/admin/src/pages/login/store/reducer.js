/*
* @Author: TomChen
* @Date:   2019-04-11 18:56:06
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-12 20:51:38
*/
// 1.这个reducer是login组件自己的reducer
// 2.需要把这个reducer合并到整个应用的reducer中，即src/store/reducer.js文件
import { fromJS } from 'immutable'

import * as types from './actionTypes.js'

// 
const defaultState = fromJS({
	isFething:false
})

export default (state=defaultState,action)=>{
	if(action.tpe == types.LOGIN_REQUEST){
		// 1.发送登录请求前把state里面的isFething改为true并且返回一个新的数据
		// 2.当数据返回给store时，执行组件中的mapStateToProps方法重新映射数据
		// 3.UI组件中的this.props中的数据发生改变，导致UI页面发生变化
		return state.set('isFething',true)
	}
	if(action.tpe == types.LOGIN_DONE){
		// 1.发送登录请求前把state里面的isFething改为true并且返回一个新的数据
		// 2.当数据返回给store时，执行组件中的mapStateToProps方法重新映射数据
		// 3.UI组件中的this.props中的数据发生改变，导致UI页面发生变化
		return state.set('isFething',false)
	}

	// 返回的state数据在store>reducer.js中进行合并
	return state;
}

// ————>进入文件login/store/index.js中