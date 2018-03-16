
import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {getFilmDetail} from '../../services/filmService';
import store from '../../store';

import '../../styles/filmDetail.css';

export default class FilmDetail extends Component{
    constructor({match}){
        super();
        this.matchParams = match.params;
        this.state = {
            showDetailData: {}
        }
    }

    render(){
        let {showDetailData} = this.state;
        return(
            <div className="page" id="filmDetail" ref="detail">
                <div className="wrapper">
                    <img src={showDetailData.img}/>
                    <div className="detail">
                        <h2>影片简介</h2>
                        <p>
                            <span>导&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;演：</span>
                            <span>{showDetailData.director}</span>
                        </p>
                        <p>
                            <span>主&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;演：</span>
                            <span>{showDetailData.actors ? showDetailData.actors.join(" | "):""}</span>
                        </p>
                        <p>
                            <span>地区语言：</span>
                            <span>{showDetailData.language}</span>
                        </p>
                        <p>
                            <span>类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型：</span>
                            <span>{showDetailData.category}</span>
                        </p>
                        <p>
                            <span>上映日期：</span>
                            <span>{showDetailData.premiereAt}上映</span>
                        </p>
                        <div>
                            {showDetailData.synopsis}
                        </div>
                    </div>
                </div>
                <Link to={"/film/"+ showDetailData.id +"/cinema"} className="buy"
                onClick={this.changeTitle.bind(this, showDetailData.name)}>
                    立即购票
                </Link>
            </div>
        )
    }

    componentWillMount(){
        // 请求电影详情
        getFilmDetail(this.matchParams.id).then(result=>{
            // console.log(result);
            this.setState({showDetailData: result});
        })
    }

    componentDidMount(){
        // 创建滚动视图
        let detailScroll = new IScroll(this.refs.detail, {
            mouseWheel: true,
            bounce: false
        })

        // 更新滚动视图
        detailScroll.on("scrollStart", ()=>{
            detailScroll.refresh();
        })
    }

    changeTitle(title){
        // 切换全局状态导航
        store.dispatch({
            type: "modify-title",
            title
        })
    }
}