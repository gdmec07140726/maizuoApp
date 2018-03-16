
import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {getMallDetailData, getMallDetailPicData} from '../../services/mallService';
import store from '../../store';

import '../../styles/mallGoodsDetail.css';

export default class GoodsDetail extends Component{
    constructor({match}){
        super();
        this.matchParams = match.params;
        this.state = {
            bannerDom: [],
            data: {},
            detailPic: [],
            buyCount: 1,             // 购买数量，默认为1
            showMark: false,
            typeIndex: -1,
            selectItem: ""
        }
    }

    render(){
        let {bannerDom, data, buyCount, detailPic, showMark, typeIndex, selectItem} = this.state;
        let infoDom;
        let typeDom;
        let buySelectDom;
        // console.log(data);
        if(data.name){
            infoDom = (
                <div className="info">
                    <h2>{data.name}</h2>
                    <p>{data.slaveName}</p>
                    <h1>￥{data.price}</h1>
                    <div>
                        <span>快递：{data.fee}元</span>
                        <i>销量：{data.salesCount}</i>
                        <em>全国</em>
                    </div>
                </div>
            )

            typeDom = (
                <div className="typePick" onClick={this.showSelectBox.bind(this)}>
                    <span>
                        {/* 如果选择了，则显示选择规格，如果没有选择，判断是否有规格选项 */}
                        {!selectItem ? (!data.options[0]?" x "+buyCount:"选择 规格 数量 "): ("已选择："+selectItem+" x "+buyCount)}
                    </span>
                    <i className="iconfont icon-right"></i>
                </div>
            )

            !showMark ? "":buySelectDom = (
                <div className="mark">
                    <div className="selectBox">
                        <div className="selectInfo">
                            <img src={data.imgs ? data.imgs[0]:""} />
                            <div>
                                <h3>￥{data.price ? data.price:""}</h3>
                                <p>选择 规格 数量</p>
                            </div>
                            <i onClick={this.showSelectBox.bind(this)}>
                                X
                            </i>
                        </div>
                        {!data.options[0] ? "": (
                            <div className="type">
                            <h3>规格</h3>
                            <p>
                                {
                                    data.options[0].item.map((item, index)=>{
                                        return (
                                            <span key={index} onClick={this.selectAction.bind(this, index, item)}
                                            className={typeIndex==index?"active":""}>
                                                {item}
                                            </span>
                                        )
                                    })
                                }
                                
                            </p>
                        </div>
                        )}
                        <div className="count">
                            <h3>数量</h3>
                            <p>
                                <span className={buyCount==1 ? "hide": ""} onClick={this.changeCount.bind(this, '-')}>
                                    -
                                </span>
                                <i ref="count">1</i>
                                <span onClick={this.changeCount.bind(this, '+')}>
                                    +
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div className="page" id="detail">
                <div className="scrollBox" ref="detail">
                    <div className="wrapper">
                        {/* 轮播图 */}
                        <div className="swiper-container" ref="banner">
                            {bannerDom}
                            {/* 分页器 */}
                            <div className="swiper-pagination"></div>
                        </div>

                        {infoDom}

                        {typeDom}

                        <div className="desc">
                            {
                                detailPic.map((item, index)=>{
                                    return (
                                        <img key={index} src={item} />
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="bottomNav">
                    <div className="nav">
                        <div>
                            <Link to="/mall">
                                <span className="iconfont icon-home"></span>
                                <p>首页</p>
                            </Link>
                        </div>
                    </div>
                    <Link className="buy" to="/login" onClick={this.buyBtnAction.bind(this)}>
                        立即购买
                    </Link>
                </div>
                {buySelectDom}
            </div>
        )
    }

    componentDidMount(){
        let {id} = this.matchParams;

        // 请求详情数据
        getMallDetailData(id).then(result=>{
            // console.log(result);
            // 创建轮播dom结构
            let bannerDom = (
                <div className="swiper-wrapper">
                    {
                        result.imgs.map((item, index)=>{
                            return (
                                <div key={index} className="swiper-slide">
                                    <img src={item} />
                                </div>
                            )
                        })
                    }
                </div>
            )
            this.setState({
                bannerDom,
                data: result
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

        // 请求详情图
        getMallDetailPicData(id).then(result=>{
            // console.log(result)
            this.setState({detailPic: result});
        })

        // 创建滚动视图
        let detailScroll = new IScroll(this.refs.detail, {
            mouseWheel: true,
            click: true,
            bounce: false
        })

        detailScroll.on('scrollStart', ()=>{
            // 更新滚动视图
            detailScroll.refresh();
        })
    }

    showSelectBox(){
        // 点击弹出/关闭选择框
        this.setState({showMark: !this.state.showMark});
    }

    changeCount(type){
        let count = parseInt(this.refs.count.innerHTML);
        let {buyCount} = this.state;
        // 点击修改数量
        if(type == '-'){
            if(count==1) return;
            this.refs.count.innerHTML = count - 1;
            buyCount = count - 1;
        }else{
            this.refs.count.innerHTML = count + 1;
            buyCount = count + 1;
        }
        this.setState({buyCount});
    }

    selectAction(index, item){
        // 高亮选中类型/取消高亮
        if(index == this.state.typeIndex){
            index = -1;
            item = "";
        }
        this.setState({
            typeIndex: index,
            selectItem: item
        });
    }

    buyBtnAction(){
        // 立即购买按钮点击事件
        store.dispatch({
            type: "modify-title",
            title: "登录"
        })
        store.dispatch({
            type: "modify-asideNav",
            value: 0
        })
    }
}