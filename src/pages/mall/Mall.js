
import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {getMallListData, getMallRecommendData} from '../../services/mallService';
import SubjectItem from '../../components/mall/SubjectItem';
import RecommendItem from '../../components/mall/RecommendItem';

import '../../styles/mall.css';

export default class Mall extends Component{
    constructor(){
        super();
        this.page = 1;
        this.num = 20;
        this.canMoreData = false;
        this.isTotalData = false;
        this.state = {
            bannerDom: [],
            categoryData: [],
            areaData: [],
            subjectData: [],
            recommendData: []
        }
    }

    render(){
        let {bannerDom, categoryData, areaData, subjectData, recommendData} = this.state;
        // 从url中获取id
        areaData.map(item=>{
            var arr = item.url.split("/");
            item.id = arr[arr.length-1];
        })
        
        // 有品专区数据dom结构
        let areaDom;
        if(areaData.length>0){
            areaDom = (
                <div className="contain">
                    <div className="left">
                        <Link to={"/mall/Active/"+areaData[0].id}>
                            <img src={areaData[0].imageSrc} />
                        </Link>
                    </div>
                    <div className="right">
                        <Link to={"/mall/Active/"+areaData[1].id}>
                            <img src={areaData[1].imageSrc} />
                        </Link>
                        <Link to={"/mall/Active/"+areaData[3].id}>
                            <img src={areaData[3].imageSrc} />
                        </Link>
                    </div>
                </div>
            )
        }

        // 数据加载提示框
        let tipsDom = <div className="tips">~貌似没有更多了~</div>;
        if(!this.isTotalData && !this.canMoreData){
            tipsDom = <div className="tips active">页面加载中,请稍候...</div>;
        }
        return (
            <div className="page" id="mall" ref="mall">
                <div className="wrapper">
                    {/* 轮播图 */}
                    <div className="swiper-container" ref="banner">
                        {bannerDom}
                        {/* 分页器 */}
                        <div className="swiper-pagination"></div>
                    </div>

                    <ul className="shops">
                        {
                            categoryData.map((item, index)=>{
                                {/* 从url中获取id */}
                                var arr = item.url.split("/");
                                var id = arr[arr.length-1];
                                return (
                                    <li key={index}>
                                        <Link to={"/mall/category/"+id}>
                                            <img src={item.imageSrc} />
                                            <p>{item.name}</p>
                                        </Link>
                                    </li>
                                )
                            })
                        }
                    </ul>

                    <div className="area">
                        <h3>— 有品专区 —</h3>
                        {areaDom}
                    </div>

                    <div className="subject">
                        {
                            subjectData.map((item, index)=>{
                                return (
                                    <SubjectItem key={index} data={item} />
                                )
                            })
                        }
                    </div>

                    <div className="recommend">
                        <h1>— 好货精选 —</h1>
                        <ul className="contain">
                            {
                                recommendData.map((item, index)=>{
                                    return (
                                        <RecommendItem key={index} data={item} />
                                    )
                                })
                            }
                        </ul>
                    </div>

                    {tipsDom}
                </div>
            </div>
        )
    }

    componentDidMount(){
        // 创建滚动视图
        let mallScroll = new IScroll(this.refs.mall, {
            mouseWheel: true,
            click: true,
            bounce: false,
            probeType: 3
        })

        mallScroll.on("scrollStart", ()=>{
            // 更新滚动视图
            mallScroll.refresh();
        })

        mallScroll.on("scroll", ()=>{
            // 判断是否需要请求数据
            if(this.canMoreData && mallScroll.y < mallScroll.maxScrollY+40){
                // 数据请求中，不能继续请求，置为false
                this.canMoreData = false;
                // 强制刷新dom结构，更新下拉提示信息
                this.forceUpdate();
                // 请求数据
                this.getRecommendList();
            }
        })

        // 请求商城主体数据
        getMallListData().then(result=>{
            // console.log(result);
            let bannerDom = (
                <div className="swiper-wrapper">
                    {
                        result["2"].map((item, index)=>{
                            return (
                                <div key={index} className="swiper-slide">
                                    <img src={item.imageSrc} />
                                </div>
                            )
                        })
                    }
                </div>
            )
            this.setState({
                bannerDom,
                categoryData: result["1"],
                areaData: result["4"],
                subjectData: result["5"]
            }, ()=>{
                // 创建轮播视图
                let bannerSwiper = new Swiper(this.refs.banner, {
                    pagination: '.swiper-pagination',
                    autoplay: 3000,
                    autoplayDisableOnInteraction: false,
                    loop: true
                });
            })
        })

        //  请求商城推荐数据
        this.getRecommendList();
    }

    getRecommendList(){
        //  请求商城推荐数据
        getMallRecommendData({
            page: this.page,
            num: this.num
        }).then(result=>{
            // console.log(result);
            let {recommendData} = this.state;
            if(this.page < Math.ceil(result.total/this.num)){
                this.canMoreData = true;
            }else{
                this.isTotalData = true;
            }
            this.page = this.page + 1;
            recommendData = recommendData.concat(result.list);
            this.setState({recommendData});
        })
    }
}