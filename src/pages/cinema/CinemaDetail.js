
import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import DetailServices from '../../components/cinema/DetailServices';
import {getCinemaDetailData} from '../../services/cinemaService';
import store from '../../store';

import '../../styles/cinemaDetail.css';

export default class CinemaDetail extends Component{
    constructor({match}){
        super();
        this.matchParams = match.params;
        this.state = {
            data: {}
        }
    }

    render(){
        let {data} = this.state;
        return (
            <div className="page" id="cinemaDetail" ref="detail">
                <div className="wrapper">
                    <img className="banner" src="//static.m.maizuo.com/v4/static/app/asset/66461d1a02a9eaa64876c90952c42aed.png" />
                    <div className="info">
                        <i className="iconfont icon-seat seat"></i>
                        <div>
                            <h3>
                                <span>订座票</span>
                                <Link className="seat" to={"/cinema/"+data.id+"/film"}>
                                    立即订座
                                </Link>
                            </h3>
                            <p>选好场次及座位，到影院自助机取票</p>
                        </div>
                    </div>
                    <div className="info">
                        <i className="iconfont icon-ticket ticket"></i>
                        <div>
                            <h3>
                                <span>通兑票</span>
                                <Link className="booking" to={"/cinema/"+data.id+"/item"}
                                onClick={this.changeTitle.bind(this)}>
                                    立即订票
                                </Link>
                            </h3>
                            <p>有效期内到影院前台兑换影票</p>
                        </div>
                    </div>
                    <div className="info">
                        <i className="iconfont icon-position position"></i>
                        <div>
                            <h4>{data.address}</h4>
                        </div>
                    </div>
                    <div className="info">
                        <i className="iconfont icon-tel tel"></i>
                        <div className="tel">
                            <h4>{data.tel}</h4>
                        </div>
                    </div>
                    
                    <DetailServices data={data.services} />
                </div>
            </div>
        )
    }

    componentWillMount(){
        // 请求电影详情数据
        getCinemaDetailData(this.matchParams.id).then(result=>{
            console.log(result);
            this.setState({data: result});
        })
    }

    componentDidMount(){
        // 创建滚动视图
        let detailScroll = new IScroll(this.refs.detail, {
            mouseWheel: true,
            click: true,
            bounce: false
        })

        detailScroll.on("scrollStart", ()=>{
            // 更新滚动视图
            detailScroll.refresh();
        })
    }

    changeTitle(){
        // 修改全局状态title的值
        store.dispatch({
            type: "modify-title",
            title: "选择通兑票"
        })
    }
}