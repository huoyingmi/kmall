/*
* @Author: TomChen
* @Date:   2019-04-12 20:04:31
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-12 20:05:55
*/

// 1.这个reducer就是login组件自己的reducer
import reducer from './reducer.js'

//此处的actionCreator是从同级的actionCreator.js文件中getLoginAction方法中拿到的，重新命名
import * as actionCreator from './actionCreator.js'

// 2.把login组件自己的reducer导出，在src/store/reducer.js文件中引入
export { reducer,actionCreator }

// ————>进入src/store/reducer.js文件中