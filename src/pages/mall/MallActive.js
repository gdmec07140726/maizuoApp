
import React, {Component} from 'react';

import {getMallActiveData} from '../../services/mallService';
import RecommendItem from '../../components/mall/RecommendItem';

import '../../styles/mallActive.css';

export default class MallActive extends Component{
    constructor({match}){
        super();
        this.matchParams = match.params;
        this.page = 1;
        this.num = 20;
        this.canMoreData = false;
        this.isTotalData = false;
        this.state = {
            activeData: []
        }
    }

    render(){
        let {activeData} = this.state;
        // 数据加载提示框
        let tipsDom = <div className="tips">~貌似没有更多了~</div>;
        if(!this.isTotalData && !this.canMoreData){
            tipsDom = <div className="tips active">页面加载中,请稍候...</div>;
        }
        return (
            <div className="page" id="Active" ref="active">
                <div className="wrapper">
                    <div className="recommend">
                        <ul className="contain">
                            {
                                activeData.map((item, index)=>{
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

        // 请求活动数据
        this.getMallActiveData(id);

        // 创建滚动视图
        let activeScroll = new IScroll(this.refs.active, {
            mouseWheel: true,
            click: true,
            bounce: false,
            probeType: 3
        })

        activeScroll.on("scrollStart", ()=>{
            // 更新滚动视图
            activeScroll.refresh();
        })

        activeScroll.on("scroll", ()=>{
            // 判断是否需要请求数据
            if(this.canMoreData && activeScroll.y < activeScroll.maxScrollY+40){
                // 数据请求中，不能继续请求，置为false
                this.canMoreData = false;
                // 强制刷新dom结构，更新下拉提示信息
                this.forceUpdate();
                // 请求数据
                this.getMallActiveData(id);
            }
        })
    }

    getMallActiveData(id){
        // 请求活动数据
        getMallActiveData({
            id,
            page: this.page,
            pageSize: this.num
        }).then(result=>{
            console.log(result);
            let {activeData} = this.state;
            if(this.page < Math.ceil(result.total/this.num)){
                this.canMoreData = true;
            }else{
                this.isTotalData = true;
            }
            this.page = this.page + 1;
            activeData = activeData.concat(result);
            this.setState({activeData});
        })
    }
}