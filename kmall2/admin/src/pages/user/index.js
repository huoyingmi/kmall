
import React,{ Component,Fragment } from 'react'
import { Table,Breadcrumb } from 'antd';
import { connect } from 'react-redux'
import moment from 'moment'

import { actionCreator } from './store'
import Layout from 'common/layout'

const columns = [
	{
	    title: '用户名',
	    dataIndex: 'username',
	    key: 'username',
	}, 
	{
	    title: '年龄',
	    dataIndex: 'age',
	    key: 'age',
	},
	{
	    title: '是否是管理员',
	    dataIndex: 'isAdmin',
	    key: 'isAdmin',
	    render:isAdmin=>isAdmin?'是':"否"
	}, 
	{
	    title: 'email',
	    dataIndex: 'email',
	    key: 'email',
	},
	{
	    title: '手机',
	    dataIndex: 'phone',
	    key: 'phone',
	},
	{
	    title: '注册时间',
	    dataIndex: 'createdAt',
	    key: 'createdAt',
	},
];

class User extends Component {
	// 生命周期函数
	componentDidMount(){
		this.props.handlePage(1)
	}
	render(){
		// console.log(this.props.list);
		const { list,current,pageSize,total,handlePage,isFething } = this.props;
		const dataSource = list.map(user=>{
			return {
				key: user.get('_id'),
			    username: user.get('username'),
			    age: user.get('age'),
			    isAdmin: user.get('isAdmin'),
			    email:user.get('email'),
			    phone:(user.get('phone')),
			    createdAt:moment(user.get('createdAt')).format('YYYY-MM-DD HH:mm:ss'),
			}
		}).toJS() //toJS是将对象list转换成数组
		// console.log('dataSource:',dataSource);
		return (
			<div className="User">
				<Layout>
					<Breadcrumb style={{ margin: '16px 0' }}>
			            <Breadcrumb.Item>首页</Breadcrumb.Item>
			            <Breadcrumb.Item>用户管理</Breadcrumb.Item>
			            <Breadcrumb.Item>用户列表</Breadcrumb.Item>
			        </Breadcrumb>
					<Table 
						dataSource={dataSource} 
						columns={columns}
						// 分页处理pagination
						pagination={{
							current:current, //当前页数
							pageSize:pageSize, //每页条数
							total:total //数据总数
				// ————>进入user/store/reducer.js文件添加current,pageSize,total属性
						}} 
						onChange={(page)=>{
							// console.log('page::',page);
							// 调用handlePage方法，将页码传进去
							handlePage(page.current);
						}}
						// 分页预加载
						loading={{
							spinning:isFething,
							tip:'正在加载数据'
				// ————>进入user/store/reducer.js文件添加新的属性isFething
						}}
					/>
				</Layout>
			</div>
		)
	}
}

const mapStateToProps = (state)=>{
	// console.log("state::",state);
	return {
		list:state.get('user').get('list'),
		current:state.get('user').get('current'),
		pageSize:state.get('user').get('pageSize'),
		total:state.get('user').get('total'),
		isFething:state.get('user').get('isFething'),
// ————>进入user/store/reducer.js文件
	}
}
const mapDispatchToProps = (dispatch)=>{
	// console.log("dispatch::",dispatch);
	return { 
		// handlePage方法的作用是
		handlePage:(page)=>{
			const action = actionCreator.getPageAction(page)
			dispatch(action)
// ————>进入user/store/actionCreator.js文件中
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(User);