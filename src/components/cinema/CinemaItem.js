
import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import store from '../../store';

export default class CinemaItem extends Component{
    constructor(){
        super();
        this.state = {
            isShow: false
        }
    }

    render(){
        let {isShow} = this.state;
        let {dataName, dataList} = this.props;
        let listDom = isShow && (
            <ul className="list">
                {
                    dataList.map((item, index) => {
                        return (
                            <li key={index}>
                                <Link to={"/cinema/"+item.id} onClick={this.showCinemaDetail.bind(this, item.name)}>
                                    <h2>
                                        <span>{item.name}</span>
                                        <i className="iconfont icon-right"></i>
                                    </h2>
                                    <p>{item.address}</p>
                                    <div>距离未知</div>
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        )
        return (
            <div className="district">
                <div className="title" onClick={this.showItem.bind(this)}>
                    {dataName}
                </div>
                {listDom}
            </div>
        )
    }

    componentWillMount(){
        this.state.isShow = this.props.isShow;
    }

    showItem(){
        // 显示隐藏地区影院信息
        this.setState({isShow: !this.state.isShow});
    }

    showCinemaDetail(name){
        // 进入详情页，改变全局头部标题状态
        store.dispatch({
            type: "modify-title",
            title: name
        })
    }
}