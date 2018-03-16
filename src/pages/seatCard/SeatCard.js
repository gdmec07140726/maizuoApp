
import React, {Component} from 'react';

import PageNav from '../../common/PageNav';

import '../../styles/seatCard.css'

export default class SeatCard extends Component{
    constructor(){
        super();
        this.state = {
            showCard: 0         //0表示卖座卡，1表示电子卖座卡
        }
    }

    render(){
        let {showCard} = this.state;
        let showCardName = ["卖座卡", "电子卖座卡"];
        let cardDom;
        if(showCard == 0){
            cardDom = (
                <div className="card">
                    <div>
                        <label>卡号 : </label>
                        <input type="text" placeholder="请输入卡号" />
                        <p></p>
                    </div>
                    <div>
                        <label>密码 : </label>
                        <input type="password" placeholder="请输入密码" />
                        <p></p>
                    </div>
                </div>
            )
        }else if(showCard == 1){
            cardDom = (
                <div className="card">
                    <div>
                        <label>卡号 : </label>
                        <input type="text" placeholder="请输入15位电子卖座卡号" />
                        <p></p>
                    </div>
                </div>
            )
        }
        
        return (
            <div className="page" id="seatCard">
                <PageNav data={showCardName} handleChangeCard={this.changeCard.bind(this)} />
                
                {cardDom}
                <button className="find">查询</button>
            </div>
        )
    }

    changeCard(index){
        // 改变卡片显示模块
        this.setState({showCard: index});
    }
}