
import React,{ Component } from 'react'
import { Route,Switch } from "react-router-dom"
import CategoryAdd from './add.js'
import CategoryList from './list.js'


class Category extends Component{
    render(){
        return(
            <Switch>
                <Route path="/category/add" component={CategoryAdd} />
                <Route path="/category/:pid?" component={CategoryList} />
            					{
            						// 此处表明接收到pid的参数
            					}
            </Switch>
        )
    }
}

export default Category