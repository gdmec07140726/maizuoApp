
import React, {Component} from 'react';

import PageNav from '../../common/PageNav';
import {getFilmNowPlayingData, getFilmComingSoonData} from '../../services/filmService';
import NowPlaying from '../../components/films/NowPlaying';
import ComingSoon from '../../components/films/ComingSoon';

import '../../styles/film.css';

export default class Film extends Component{
    constructor({match}){
        super();
        // 默认请求7条数据一页
        this.page =  1;
        this.count = 7;
        this.canLoadMore = false;

        this.matchParams = match.params;
        
        this.state = {
            showCard: 0,                 //0表示正在热映， 1表示即将上映
            nowPlayingData: [],
            comingSoonData: []
        }
    }

    render(){
        let nav = ["正在热映", "即将上映"];
        let {showCard, nowPlayingData, comingSoonData} = this.state;
        let listDom;
        if(showCard == 0){
            listDom = (
                <ul className="list">
                    {
                        nowPlayingData.map((item, index)=>{
                            return <NowPlaying data={item} key={index} />
                        })
                    }
                </ul>
            )
        }else if(showCard == 1){
            listDom = (
                <ul className="list">
                    {
                        comingSoonData.map((item, index)=>{
                            return <ComingSoon data={item} key={index} />
                        })
                    }
                </ul>
            )
        }

        return (
            <div className="page" id="film" ref="film">
                <div className="wrapper">
                    <PageNav ref="nav" data={nav} handleChangeCard={this.changeCard.bind(this)} />

                    {listDom}
                </div>
            </div>
        )
    }

    componentWillMount(){
        // 判断是否是首页加载更多按钮进入的页面
        if(this.matchParams.card){
            this.state.showCard = this.matchParams.card;
            if(this.matchParams.card == 1){
                // 请求即将上映数据
                this.getDataOfComingSoon();
                return;
            }
        }
        // 请求正在热映数据
        this.getDataOfNowPlaying();
    }

    // 请求正在热映数据
    getDataOfNowPlaying(){
        getFilmNowPlayingData({
            page: this.page,
            count: this.count
        }).then(result=>{
            console.log(result);
            this.setState({nowPlayingData: this.state.nowPlayingData.concat(result.films)});
            if(result.page.current == result.page.total){
                this.canLoadMore = false;
            }else{
                this.canLoadMore = true;
                this.page = result.page.current + 1;
            }
        })
    }

    // 请求即将上映数据
    getDataOfComingSoon(){
        getFilmComingSoonData({
            page: this.page,
            count: this.count
        }).then(result=>{
            // console.log(result);
            this.setState({comingSoonData: this.state.comingSoonData.concat(result.films)});
            if(result.page.current == result.page.total){
                this.canLoadMore = false;
            }else{
                this.canLoadMore = true;
                this.page = result.page.current + 1;
            }
        })
    }

    componentDidMount(){
        // 创建滚动视图
        let filmScroll = new IScroll(this.refs.film, {
            mouseWheel: true,
            click: true,
            probeType: 3
        })

        filmScroll.on("scrollStart", ()=>{
            // 更新滚动视图
            filmScroll.refresh();
        })

        filmScroll.on("scroll", ()=>{
            if(!this.canLoadMore) return;
            // 如果this.canLoadMore
            filmScroll.refresh();
            if(filmScroll.y < filmScroll.maxScrollY+60){
                // 请求数据
                if(this.state.showCard == 0){
                    this.getDataOfNowPlaying();
                }else if(this.state.showCard == 1){
                    this.getDataOfComingSoon();
                }
                this.canLoadMore = false;
            }
        })

        // 判断是否是首页加载更多按钮进入的页面
        if(this.matchParams.card){
            this.refs.nav.state.showCard = this.matchParams.card;
            if(this.matchParams.card == 0){
                filmScroll.scrollTo(0, -293);
            }else{
                filmScroll.scrollTo(0, -387);
            }
            
        }
    }

    changeCard(index){
        // 修改显示模块，并且清空数据
        this.setState({
            showCard: index,
            nowPlayingData: [],
            comingSoonData: []
        });

        // 重置数据
        this.page = 1;

        // 请求数据
        if(index == 0){
            this.getDataOfNowPlaying();
        }else if(index == 1){
            this.getDataOfComingSoon();
        }
    }
}