
import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import store from '../store';

export default class AppSide extends Component{
    constructor(){
        super();
        this.state = {
            type: store.getState().asideIndex
        }
    }
    
    render(){
        let {type} = this.state;
        let navArr;
        // toType参数，表示切换侧边导航栏显示内容
        if(type == 0){
            navArr = [
                {title: "首页", path: "/home", header: "卖座电影"},
                {title: "影片", path: "/film", header: "卖座电影"},
                {title: "影院", path: "/cinema", header: "全部影院"},
                {title: "商城", path: "/mall", header: "卖座商城", toType:1},
                {title: "我的", path: "/login", header: "登录"},
                {title: "卖座卡", path: "/seatCard", header: "查询/绑定/激活卖座卡"}
            ];
        }else if(type == 1){
            navArr = [
                {title: "首页", path: "/mall", header: "卖座商城"},
                {title: "影票", path: "/home", header: "卖座电影", toType:"0"},
                {title: "我的", path: "/login", header: "登录", toType:"0"},
                {title: "卖座卡", path: "/seatCard", header: "查询/绑定/激活卖座卡", toType:"0"}
            ];
        }
        
        return (
            <div className="app-side" onClick={this.hideSideMenu.bind(this)}>
                <div className="side-cover"></div>
                <div className="side-content" onClick={this.contentAction}>
                    {
                        navArr.map((item, index)=>{
                            return (
                                <Link to={item.path} key={index} onClick={this.sideItemAction.bind(this, item.header, item.toType)}
                                className="side-item">
                                    <span>{item.title}</span>
                                    <i className="iconfont icon-right"></i> 
                                </Link>
                            )
                        }) 
                    }
                </div>
            </div>
        )
    }

    hideSideMenu(){
        // 隐藏侧边栏
        this.props.menuClick();
    }

    contentAction(event){
        // 阻止事件冒泡
        event.stopPropagation();
    }

    // 导航点击事件
    sideItemAction(header, toType, e){
        // 隐藏侧边栏
        this.hideSideMenu();
        // 触发reducer，修改全局状态
        store.dispatch({
            type: "modify-title",
            title: header
        });
        // 如果有值，则修改全局显示状态
        if(toType){
            store.dispatch({
                type: "modify-asideNav",
                value: toType
            });
        }
    }
}