
import React,{ Component,Fragment } from 'react'

import { Alert } from 'antd';

import { Link } from  "react-router-dom";

import './index.css'

class Err extends Component {
	render(){
		return (
			<div className="Err">
				<Alert
			        message="出错了"
			        description="您访问的页面好想去火星了。"
			        type="error"
			        showIcon
			    />
			    <Link to="">返回首页</Link>
			</div>
		)
	}
}

export default Err;