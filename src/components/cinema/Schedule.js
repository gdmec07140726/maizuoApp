
import React, {Component} from 'react';

import {getTimeByformat, afterDay} from '../../utils/format';
import ScheduleList from '../../common/ScheduleList';

export default class Schedule extends Component{
    constructor(){
        super();
        this.state = {
            showSchedule: 0,
            id: ""
        }
    }

    render(){
        let {showSchedule, id} = this.state;
        let {data, showId} = this.props;
        // 切换电影时，重置选中第一个
        if(id != showId){
            this.state.id = showId;
            showSchedule = 0;
        }
        let navDom = [];
        let itemDom = [];
        if(data){
            let i = 0;
            for(var key in data[showId]){
                // 显示时间导航数据处理
                var showStr = data[showId][key][0] && getTimeByformat(data[showId][key][0].time);
                if(data[showId][key].length==0){
                    // 今天没数据时，添加今天日期
                    navDom.push(
                        <li key={key} onClick={this.changeFilmAction.bind(this, i)}>
                            今天({getTimeByformat(new Date().getTime())})
                            {i == showSchedule && <span></span>}
                        </li>
                    )
                }
                else if(afterDay(data[showId][key][0].time) == 0){
                    // 有今天数据时，遍历对象
                    navDom.push(
                        <li key={key} onClick={this.changeFilmAction.bind(this, i)}>
                            今天({showStr})
                            {i == showSchedule && <span></span>}
                        </li>
                    );
                }else if(afterDay(data[showId][key][0].time) == 1){
                    // 明天的数据遍历
                    navDom.push(
                        <li key={key} onClick={this.changeFilmAction.bind(this, i)}>
                            明天({showStr})
                            {i == showSchedule && <span></span>}
                        </li>
                    );
                }else if(afterDay(data[showId][key][0].time) == 2){
                    // 后天的数据遍历
                    navDom.push(
                        <li key={key} onClick={this.changeFilmAction.bind(this, i)}>
                            后天({showStr})
                            {i == showSchedule && <span></span>}
                        </li>
                    );
                }else{
                    // 其他天的数据遍历
                    showStr = getTimeByformat(data[showId][key][0].time, true);
                    navDom.push(
                        <li key={key} onClick={this.changeFilmAction.bind(this, i)}>
                            {showStr}
                            {i == showSchedule && <span></span>}
                        </li>
                    );
                }
                
                // 判断显示哪天日程安排
                if(i == showSchedule){
                    itemDom = data[showId][key].map((item, index)=>{
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
                if(navDom.length==0){
                    navDom.push(
                        <li key="0">
                            今天({getTimeByformat(new Date().getTime())})
                            <span></span>
                        </li>
                    )
                }
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

    changeFilmAction(index){
        // 日程点击事件，导航栏切换
        this.setState({showSchedule: index});
    }
}