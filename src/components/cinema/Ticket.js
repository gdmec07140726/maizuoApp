
import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import store from '../../store';

export default class Ticket extends Component{

    render(){
        let {data} = this.props;
        let des = {
            "2D通兑票": "可在本影院兑换2D电影票",
            "3D通兑票": "可在本影院兑换3D电影票",
            "全景声通兑票": "可在本影院兑换全景声电影票"
        }
        return (
            <div className="ticket">
                <Link to="/login" className="box" onClick={this.changeTitle.bind(this)}>
                    <div className="left">
                        <h3>{data.name}</h3>
                        <p>{des[data.name]}</p>
                    </div>
                    <div className="right">
                        <h3>￥{data.price.maizuo.toFixed(2)}</h3>
                        <p>￥{data.price.cinema.toFixed(2)}</p>
                    </div>
                    <div className="rightBg"></div>
                </Link>
            </div>
        )
    }

    changeTitle(){
        // 修改全局title值
        store.dispatch({
            type: "modify-title",
            title: "登录"
        })
    }
}