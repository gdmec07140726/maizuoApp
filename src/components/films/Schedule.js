
import React, {Component} from 'react';

import {getScheduleData} from '../../services/filmService';
import {getTimeByformat, afterDay} from '../../utils/format';
import ScheduleList from '../../common/ScheduleList';

export default class Schedule extends Component{
    constructor(){
        super();
        this.state = {
            showScheduleIndex: 0,
            scheduleData: ""
        }
    }

    render(){
        let {showScheduleIndex, scheduleData} = this.state;
        let {history} = this.props;
        let navDom = [];
        let itemDom = [];
        // 判断有无数据
        if(scheduleData){
            let i = 0;
            for(var key in scheduleData){
                // 显示时间导航数据处理
                var showStr = scheduleData[key][0] && getTimeByformat(scheduleData[key][0].time);
                if(scheduleData[key].length==0){
                    // 今天没数据是，添加今天日期
                    navDom.push(
                        <li key={key} className={i==showScheduleIndex ? "active":""}
                        onClick={this.changeFilmAction.bind(this, i)}>
                            今天({getTimeByformat(new Date().getTime())})
                        </li>
                    )
                }
                else if(afterDay(scheduleData[key][0].time) == 0){
                    // 有今天数据时，遍历对象
                    navDom.push(
                        <li key={key} className={i==showScheduleIndex ? "active":""}
                        onClick={this.changeFilmAction.bind(this, i)}>
                            今天({showStr})
                        </li>
                    );
                }else if(afterDay(scheduleData[key][0].time) == 1){
                    // 明天的数据遍历
                    navDom.push(
                        <li key={key} className={i==showScheduleIndex ? "active":""}
                        onClick={this.changeFilmAction.bind(this, i)}>
                            明天({showStr})
                        </li>
                    );
                }else if(afterDay(scheduleData[key][0].time) == 2){
                    // 后天的数据遍历
                    navDom.push(
                        <li key={key} className={i==showScheduleIndex ? "active":""}
                        onClick={this.changeFilmAction.bind(this, i)}>
                            后天({showStr})
                        </li>
                    );
                }else{
                    // 其他天的数据遍历
                    showStr = getTimeByformat(scheduleData[key][0].time, true);
                    navDom.push(
                        <li key={key} className={i==showScheduleIndex ? "active":""}
                        onClick={this.changeFilmAction.bind(this, i)}>
                            {afterDay(scheduleData[key][0].time)}天后
                            <br />
                            ({showStr})
                        </li>
                    );
                }
                
                // 判断显示哪天日程安排
                if(i == showScheduleIndex){
                    itemDom = scheduleData[key].map((item, index)=>{
                        return (
                            <ScheduleList key={index} item={item} history={this.props.history} />
                        )
                    })
                }
                i++;
            }

            // 数据长度为0时，显示默认信息
            if(itemDom.length==0){
                itemDom = <div className="noList">今日无排期</div>;
            }
        }
        return (
            <div className="schedule">
                <ul className="navList">
                    {navDom}
                </ul>
                <div className="item">
                    {itemDom}
                </div>
            </div>
        )
    }

    componentWillMount(){
        // 请求影院日程安排数据，并显示
        let {filmID, cinemaID} = this.props;
        getScheduleData(this.props.filmID, cinemaID).then(result=>{
            // console.log(result);
            this.setState({
                scheduleData: result
            });
        })
    }

    changeFilmAction(index){
        // 日程点击事件，导航栏切换
        this.setState({showScheduleIndex: index});
    }
}