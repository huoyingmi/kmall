
import React,{ Component,Fragment } from 'react'

// 1.react-redux 里面的connect方法负责把store中的数据和方法映射到UI组件中
// 2.因为connect来自react-redux，二顶层的组件Provider(src/index.js)中的Provider也来自react-redux，并且在Provider中指定了整个应用的store
// 所以connect方法中能够拿到整个应用的state和dispatch方法
// 3.connect会把state和dispatch传递成调用时的参数
import { connect } from 'react-redux'

// 1.引入login相关的action 
// 2.相当于从store/index.js中拿到的actionCreator
// 3.store/index.js中的actionCreator是从同级的actionCreator.js文件中getLoginAction方法中拿到的，重新命名
import { actionCreator } from './store'

// 在GitHub中查询
import axios from 'axios'
import {
  Form, Icon, Input, Button, message,
} from 'antd';

import './index.css'

class NormalLoginForm extends React.Component {
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleSubmit(e){
	    e.preventDefault();
	    this.props.form.validateFields((err, values) => {
	      if (!err) {
	      	// console.log("1::",values);
	      	this.props.handleLogin(values);
	      }
	    });
	}

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
    	<div className="Login">
	        <Form className="login-form">
	        <Form.Item>
	          {getFieldDecorator('username', {
	          	// 校验规则
	            rules: [{ required: true, message: '请输入用户名' },{pattern:/^[a-z0-9_]{3,6}$/,message:"用户名是3到6位字母，数字，下划线"}],
	          })(
	            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
	          )}
	        </Form.Item>
	        <Form.Item>
	          {getFieldDecorator('password', {
	            rules: [{ required: true, message: '请输入密码' },{pattern:/^\w{3,6}$/,message:"密码是3到6位字符"}],
	          })(
	            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
	          )}
	        </Form.Item>
	        <Form.Item>
	            <Button 
		            type="primary" 
		            onClick={this.handleSubmit} 
		            className="login-form-button"
		            loading={this.props.isFething}
	            >
	                登陆
	            </Button>
	        </Form.Item>
	        </Form>
        </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

/*
// mapStateToProps方法的作用是将出入的参数state中的数据映射到组件中返回一个对象
  1.mapStateToProps方法是connect的第一个参数
  2.connect方法会把整个应用的顶层数据state作为参数传递到整个方法
  3.整个应用的顶层数据state由创建store时传入的reducer生成，即src/store/reducer.js文件生成
  4.src/store/reducer.js文件里面的数据是由每个组件自己的reducer合并而成
  5.因此state里面有每个组件自己的数据
  6.该方法返回一个对象，对象上面的属性会映射到connect方法返回的方法指定的UI组件上的this.props上
*/
const mapStateToProps = (state)=>{
	// console.log("state::",state);
	return {
		// 想给组建传入什么值，就定义什么值，如isFething
		// state是从login>store>reeducer.js中拿到的
		// 后面的get方法是从store中拿到值的方法
		isFething:state.get('login').get('isFething')
	}
}
// 1.mapDispatchToProps方法是connect的第二个参数
// 2.connect方法会把store上的dispatch方法作为参数传递到这个方法中
// 3.该方法返回一个对象，对象上面的属性会映射到connect方法返回的方法指定的UI组件上的this.props上
// 4.返回对象的属性对应的值是一个方法
const mapDispatchToProps = (dispatch)=>{
	return {
		handleLogin:(values)=>{
			// 1.派发登陆的action
			// 2.其实这个登录的action是一个能够发送Ajax请求的函数
			// 3.dispatch能够派发函数是因为引用了redux-thunk
			// 4.getLoginAction是从store/actionCreator.js文件中得到的
			// 5.使用redux-thunk派发一个函数action的时候，会把dispatch方法自身传递到该函数action中
			const action = actionCreator.getLoginAction(values);
			dispatch(action);
		}
	}
}

/*
// connect方法具体应用，
{
 1.参数一是指定映射数据的方法
 2.参数二是指定映射方法的方法
 3.connect方法返回一个方法，用来指定UI组件，这个方法会返回一个容器组件
}
// 导出组件在App.js中接收
// connect方法出入两个参数是两个函数，connect返回函数，在传入一个参数是需要运用的组件名
*/
export default connect(mapStateToProps,mapDispatchToProps)(WrappedNormalLoginForm);