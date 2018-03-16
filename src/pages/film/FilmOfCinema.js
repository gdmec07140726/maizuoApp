
import React, {Component} from 'react';

import {getDataByFilmID} from '../../services/filmService';
import FilmItemOfCinema from '../../components/films/FilmItemOfCinema';

import '../../styles/filmItemOfCinema.css';

export default class FilmOfCinema extends Component{
    constructor({match, history}){
        super();
        this.matchParams = match.params;
        this.history = history;
        this.state = {
            data: {}
        }
    }

    render(){
        let {data} = this.state;
        let {id} = this.matchParams;
        return (
            <div className="page" id="ticketSelect" ref="buyTicket">
                <div className="wrapper">
                    {
                        (()=>{
                            var result = [];
                            var isShow = true;
                            for(var key in data){
                                result.push(
                                    <FilmItemOfCinema key={key} history={this.history}
                                    dataName={key} dataList={data[key]} isShow={isShow} filmID={id}
                                    updateScroll={this.handleRefreshScroll.bind(this)} />
                                )
                                isShow = false;
                            }
                            return result;
                        })()
                    }
                </div>
            </div>
        )
    }

    componentDidMount(){
        let {id} = this.matchParams;
        getDataByFilmID(id).then(result=>{
            // console.log(result);
            this.setState({data: result});
        })

        // 创建滚动视图
        this.ticketScroll = new IScroll(this.refs.buyTicket, {
            mouseWheel: true,
            click: true,
            bounce: false
        })

        this.ticketScroll.on("scrollStart", ()=>{
            // 更新滚动视图
            this.ticketScroll.refresh();
        })
    }

    handleRefreshScroll(){
        // 更新滚动视图，解决组件折叠问题
        this.ticketScroll.refresh();
    }
}