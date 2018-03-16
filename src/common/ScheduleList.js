
import React, {Component} from 'react';

import store from '../store';

export default class ScheduleList extends Component{
    
    render(){
        let {item} = this.props;
        // 判断是否显示过期样式
        var isStopSell = false;
        if(new Date(item.stopSellingAt) - new Date() < 0){
            isStopSell = true;
        }
        return (
            <a onClick={this.isGoToBuy.bind(this, item.stopSellingAt)}>
                <h3>
                    <span>{item.startTime}</span>
                    <i style={isStopSell ? {color: "#999"}:{}}>
                        ￥{item.price.maizuo.toFixed(2)}
                    </i>
                </h3>
                <p>
                    <span>
                        预计{item.endTime}结束/
                        {item.film.language}
                        {item.imagery}/
                        {item.hall}
                    </span>
                    <i>￥{item.price.cinema.toFixed(2)}</i>
                </p>
                <b className="iconfont icon-right"></b>
            </a>
        )
    }

    isGoToBuy(time){
        // 是否跳转页面
        let {history} = this.props;
        var diff = new Date(time) - new Date();
        // 购票时间已经过了
        if(diff<0){
            return;
        }
        // 没有登录，跳转到登录界面
        history.push("/login");
        store.dispatch({
            type: "modify-title",
            title: "登录"
        })
    }
}