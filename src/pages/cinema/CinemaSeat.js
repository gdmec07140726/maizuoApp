
import React, {Component} from 'react';

import {getSeatFilmListData, getSeatFilmScheduleData} from '../../services/cinemaService';
import Schedule from '../../components/cinema/Schedule';

import '../../styles/cinemaSeat.css';

export default class CinemaSeat extends Component{
    constructor({match, history}){
        super();
        this.matchParams = match.params;
        this.history = history;
        this.state = {
            filmList: <div></div>,
            scheduleList: {},
            showFilmId: 0
        }
    }

    render(){
        let {filmList, scheduleList, showFilmId} = this.state;
        return (
            <div className="page" id="seat" ref="seat">
                <div className="wrapper">
                    {/* 轮播视图 */}
                    <div className="swiper-container" ref="film">
                        {filmList}
                    </div>

                    <Schedule data={scheduleList} showId={showFilmId} history={this.history} />
                </div>
            </div>
        )
    }

    componentWillMount(){
        
    }
    componentDidMount(){
        let {id} = this.matchParams;

        // 请求订座电影列表数据
        getSeatFilmListData(id).then(result=>{
            // console.log(result);
            // 设置默认选择id
            this.state.showFilmId = result[0].id;

            let dom = (
                <div className="swiper-wrapper">
                    {
                        result.map((item, index)=>{
                            return (
                                <div key={index} className="swiper-slide">
                                    <img src={item.img} />
                                    <p>{item.name}</p>
                                </div>
                            )
                        })
                    }
                </div>
            )

            this.setState({filmList: dom}, ()=>{
                // 创建轮播视图
                let filmSwiper = new Swiper(this.refs.film, {
                    // spaceBetween: 50,
                    slidesPerView: 4,
                    centeredSlides: true,
                    slideToClickedSlide: true,
                    grabCursor: true,

                    onSlideChangeEnd: ()=>{
                        // 滑动结束后改变当前选择的id
                        // console.log(filmSwiper.activeIndex)
                        this.setState({showFilmId: result[filmSwiper.activeIndex].id});
                    }
                });
            });
        })

        // 请求订座电影日程安排数据
        getSeatFilmScheduleData(id).then(result=>{
            console.log(result);
            this.setState({scheduleList: result});
        })

        // 创建滚动视图
        let seatScroll = new IScroll(this.refs.seat, {
            mouseWheel: true,
            click: true,
            bounce: false
        })

        seatScroll.on("scrollStart", ()=>{
            seatScroll.refresh();
        })
    }
}