
import React,{ Component,Fragment } from 'react'

import { connect } from 'react-redux'

import { Card, Col, Row } from 'antd';

import { actionCreator } from './store'

import Layout from 'common/layout'


class Home extends Component {
	// 当组件挂载完成时，调用函数
	componentDidMount(){
		this.props.handleCount()
	}
	render(){
		const { usernum,goodsnum,ordernum } = this.props
		return (
			<div className="Home">
				<Layout>
				    <Row gutter={16}>
				        <Col span={8}>
					        <Card title="用户数量" bordered={false}>{this.props.usernum}</Card>
				        </Col>
				        <Col span={8}>
					        <Card title="商品数量" bordered={false}>{this.props.goodsnum}</Card>
				        </Col>
				        <Col span={8}>
					        <Card title="订单数量" bordered={false}>{this.props.ordernum}</Card>
				        </Col>
				    </Row>
				</Layout>
			</div>
		)
	}
}

const mapStateToProps = (state)=>{
	// console.log("state::",state);
	return {
		usernum:state.get('home').get('usernum'),
		goodsnum:state.get('home').get('goodsnum'),
		ordernum:state.get('home').get('ordernum')
	}
}
const mapDispatchToProps = (dispatch)=>{
	// console.log("dispatch::",dispatch);
	return { 
		handleCount:()=>{
			// console.log('aaa');
			const action = actionCreator.getCountAction()
			dispatch(action)
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);