
import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import store from '../store';

export default class AppHeader extends Component{
    constructor(){
        super();
        this.state = {
            title: store.getState().title,
            address: store.getState().address
        }
    }
    
    render(){
        let {title, address} = this.state;
        return (
            <header className="app-header">
                <div className="left">
                    <span className="iconfont icon-menu" onClick={this.showSideMenu.bind(this)}></span>
                    <h1 className="title">{title}</h1>
                </div>
                <div className="right">
                    <Link to="/address" className="address" onClick={this.addressAction.bind(this)}>
                        <span>{address}</span>
                        <i className="iconfont icon-down"></i>
                    </Link>
                    {/* <span className="mine iconfont icon-mine"></span> */}
                    <Link to="/mine" className="mine iconfont icon-mine" onClick={this.mineBtnAction.bind(this)} />
                </div>
            </header>
        )
    }

    componentDidMount(){
        // 监听全局状态变化事件
        this.unSubscribe = store.subscribe(()=>{
            // console.log("监听到了全局状态变化");
            this.setState({
                title: store.getState().title,
                address: store.getState().address
            });
        })
    }

    componentWillUnmount(){
        // 移除全局状态的监听
        this.unSubscribe();
    }

    showSideMenu(){
        // 显示侧边栏
        this.props.menuClick();
    }

    // '我的'按钮点击事件
    mineBtnAction(){
        store.dispatch({
            type: "modify-title",
            title: "登录"
        })
    }

    // 定位地址栏点击事件
    addressAction(){
        store.dispatch({
            type: "modify-title",
            title: "选择城市"
        })
    }
}