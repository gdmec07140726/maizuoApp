
import React, {Component} from 'react';

import {getMallCategoryData, getMallCategoryItemData} from '../../services/mallService';
import RecommendItem from '../../components/mall/RecommendItem';

import '../../styles/mallCategory.css';

export default class MallCategory extends Component{
    constructor({match}){
        super();
        this.matchParams = match.params;
        this.page = 1;
        this.num = 20;
        this.canMoreData = false;
        this.isTotalData = false;
        this.state = {
            bannerData: {},
            recommendData: []
        }
    }
    
    render(){
        let {bannerData, recommendData} = this.state;
        // banner结构
        let bannerDom;
        if(bannerData.name){
            bannerDom = (
                <div className="banner">
                    <img src={bannerData.image} />
                    <p>{bannerData.name}</p>
                </div>
            )
        }
        // 数据加载提示框
        let tipsDom = <div className="tips">~貌似没有更多了~</div>;
        if(!this.isTotalData && !this.canMoreData){
            tipsDom = <div className="tips active">页面加载中,请稍候...</div>;
        }
        return (
            <div className="page" id="category" ref="category">
                <div className="wrapper">
                    {bannerDom}

                    <div className="recommend">
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
        let {id} = this.matchParams;
        // 请求banner数据
        getMallCategoryData(id).then(result=>{
            // console.log(result);
            this.setState({bannerData: result});
        })

        // 请求推荐数据
        this.getCategoryData(id);

        // 创建滚动视图
        let categoryScroll = new IScroll(this.refs.category, {
            mouseWheel: true,
            click: true,
            bounce: false,
            probeType: 3
        })

        categoryScroll.on("scrollStart", ()=>{
            // 更新滚动视图
            categoryScroll.refresh();
        })

        categoryScroll.on("scroll", ()=>{
            // 判断是否需要请求数据
            if(this.canMoreData && categoryScroll.y < categoryScroll.maxScrollY+40){
                // 数据请求中，不能继续请求，置为false
                this.canMoreData = false;
                // 强制刷新dom结构，更新下拉提示信息
                this.forceUpdate();
                // 请求数据
                this.getCategoryData(id);
            }
        })
    }

    getCategoryData(id){
        // 请求推荐数据
        getMallCategoryItemData({
            id,
            page: this.page,
            num: this.num
        }).then(result=>{
            console.log(result)
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