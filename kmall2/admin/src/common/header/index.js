import React,{ Component,Fragment } from 'react'

import {
  Layout,Menu,Dropdown,Icon
} from 'antd';

import { getUserName,request,removeUserName } from 'util'

import { USER_LOGOUT } from 'api'

import './index.css'

const { Header } = Layout;

class AdminHeader extends Component {
	constructor(props){
		super(props);
		this.handleLogout = this.handleLogout.bind(this);
	}
	handleLogout(){
		// console.log('aa');
		request({
			url:USER_LOGOUT
		})
		.then(result=>{
			// console.log("result",result);
			// 退出成功
			if(result.code == 0){
				// console.log('123');
				// 1.清除本地的存储信息
				removeUserName();
				// 2.页面跳转到登录页面
				window.location.href = '/login'
			}
		})
	}
	render(){
		const menu = (
			<Menu onClick={this.handleLogout}>
			    <Menu.Item key="0">
			        <Icon type="logout" />退出
			    </Menu.Item>
			</Menu>
		);
		return(
			<div className="AdminHeader">
			    <Header className="header">
			        <div className="logo">KMALL</div>
			        <Dropdown overlay={menu} trigger={['click']}>
					    <a className="ant-dropdown-link" href="#">
					        {getUserName()}<Icon type="down" />
					    </a>
					</Dropdown>
			    </Header>
			</div>
		)
	}
}

export default AdminHeader;