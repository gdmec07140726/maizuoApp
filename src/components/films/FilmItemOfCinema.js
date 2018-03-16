
import React, {Component} from 'react';

import Schedule from '../../components/films/Schedule';

export default class FilmItemOfCinema extends Component{
    constructor(){
        super();
        this.state = {
            isShow: false
        }
    }

    render(){
        let {isShow} = this.state;
        let {dataName, dataList, history} = this.props;

        let listDom = isShow && (
            <div className="list">
                {
                    dataList.map((item, index) => {
                        return (
                            <div key={index} className="box">
                                <div className="subarea" onClick={this.showSchedule.bind(this, item)}>
                                    <h2>
                                        <span>{item.name}</span>
                                        <i>￥{item.price}</i>
                                    </h2>
                                    <p>{item.address}</p>
                                    <div>距离未知 | 剩余{item.surplus}场</div>
                                </div>
                                {item.isShow ? <Schedule history={this.props.history} cinemaID={item.id} filmID={this.props.filmID} />:""}
                            </div>
                        )
                    })
                }
            </div>
        )
        return (
            <div className="district">
                <div className="title" onClick={this.showItem.bind(this)}>
                    {dataName}
                </div>
                {listDom}
            </div>
        )
    }

    componentWillMount(){
        // 设置默认显示与否
        this.state.isShow = this.props.isShow;
    }

    showItem(){
        // 显示隐藏地区影院信息
        this.setState({isShow: !this.state.isShow});
    }

    showSchedule(item){
        // 控制组件的显示与否
        item.isShow = !item.isShow;
        // 强制刷新dom结构
        this.forceUpdate(()=>{
            if(!item.isShow){
                this.props.updateScroll();
            }
        });
    }
}