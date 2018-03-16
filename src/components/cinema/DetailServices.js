
import React, {Component} from 'react';

export default class DetailServices extends Component{
    constructor(){
        super();
        this.state = {
            showCard: 0
        }
    }

    render(){
        let {data} = this.props;
        let {showCard} = this.state;
        let servicesArr = [
            {name: "取票", className: "iconfont icon-ticket"},
            {name: "3D", className: "iconfont icon-3D"},
            {name: "停车", className: "iconfont icon-parking"},
            {name: "优惠", className: "iconfont icon-discount"},
            {name: "交通", className: "iconfont icon-transit"}
        ];
        let infoDom = <p className="des">暂无信息</p>;
        if(data){
            data.map(item=>{
                if(item.name == servicesArr[showCard].name){
                    infoDom = <p className="des">{item.des}</p>;
                }
            })
        }
        return (
            <div className="box">
                <ul className="services">
                    {
                        servicesArr.map((item, index)=>{
                            return (
                                <li key={index} className={showCard==index ? "active":""}
                                onClick={this.selectionItem.bind(this, index)}>
                                    <div>
                                        <i className={item.className}></i>
                                        <span>{item.name}</span>
                                    </div>
                                    {showCard==index && <b></b>}
                                </li>
                            )
                        })
                    }
                </ul>
                {infoDom}
            </div>
        )
    }

    selectionItem(card){
        // 修改显示卡片
        this.setState({showCard: card});
    }
}