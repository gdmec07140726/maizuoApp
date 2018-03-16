
import React, {Component} from 'react';

import HotList from '../../components/home/HotList';
import SoonList from '../../components/home/SoonList';
import {getHomeBannerData, getHomeHotFilmData, getHomeSoonFilmData} from '../../services/homeService';

import '../../styles/home.css';

export default class Home extends Component{
    constructor(){
        super();
        this.state = {
            bannerDom: null,
            hotFilmData: [],
            soonFilmData: [],
        }
    }

    render(){
        let {bannerDom, hotFilmData, soonFilmData} = this.state;
        return (
            <div className="page" id="home" ref="page">
                <div className="wrapper">
                    {/* 轮播图 */}
                    <div className="swiper-container" ref="banner">
                        {bannerDom}
                    </div>
                    

                    {/* 正在热映 */}
                    <HotList data={hotFilmData} />

                    <div className="soonTitle">
                        <span>即将上映</span>
                    </div>

                    {/* 即将上映 */}
                    <SoonList data={soonFilmData} />
                </div>
            </div>
        )
    }

    componentDidMount(){
        // 创建滚动视图
        let contentScroll = new IScroll(this.refs.page, {
            mouseWheel: true,
            bounce: false
        });

        // 滚动前更新滚动视图(可滚动范围)
        contentScroll.on("scrollStart", ()=>{
            contentScroll.refresh();
        })

        // 请求轮播图数据
        getHomeBannerData().then(result=>{
            // console.log(result);
            let bannerDom = (
                <div className="swiper-wrapper">
                    {
                        result.map((item, index)=>{
                            return (
                                <div key={index} className="swiper-slide">
                                    <img src={item.img} />
                                </div>
                            )
                        })
                    }
                </div>
            )

            this.setState({bannerDom}, ()=>{
                // 创建轮播视图
                let bannerSwiper = new Swiper(this.refs.banner, {
                    autoplay: 3000,
                    autoplayDisableOnInteraction: false,
                    loop: true
                });
            });
        })

        // 请求热映电影数据
        getHomeHotFilmData().then(result=>{
            // console.log(result);
            this.setState({hotFilmData: result});
        })

        // 请求即将上映电影数据
        getHomeSoonFilmData().then(result=>{
            // console.log(result);
            this.setState({soonFilmData: result});
        })
    }
}