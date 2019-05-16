/*
整个项目的入口，从index.js开始
原因是在webpack中entry指定的入口是'./src/index.js'
*/
import React from 'react'
import ReactDOM from 'react-dom'

// Provider的作用是将整个应用的唯一store传递到所有的子组件中
import { Provider } from 'react-redux'

// 整个应用唯一的store
import store from './store'

// 引入App文件开始
import App from './App.js'

// 注意：Provider的作用是让包裹起来的所有组件和子组件能够拿到store中的数据
// 注意：Provider组件的store属性用来指定唯一的store
ReactDOM.render(<Provider store={store}><App /></Provider>,document.getElementById('root'))

// ————>下一步进入App.js 文件中