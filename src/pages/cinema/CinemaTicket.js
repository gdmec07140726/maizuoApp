
import React, {Component} from 'react';

import {getCinemaTicketData} from '../../services/cinemaService';
import Ticket from '../../components/cinema/Ticket';

import '../../styles/cinemaTicket.css';

export default class CinemaTicket extends Component{
    constructor({match}){
        super();
        this.matchParams = match.params;
        this.state = {
            data: []
        }
    }

    render(){
        let {data} = this.state;
        return (
            <div className="page" id="ticket" ref="ticket">
                <div className="wrapper">
                    {
                        data.map((item, index)=>{
                            return <Ticket key={index} data={item} />
                        })
                    }
                </div>
            </div>
        )
    }

    componentWillMount(){
        // 请求通兑票数据
        getCinemaTicketData(this.matchParams.id).then(result=>{
            // console.log(result);
            this.setState({data: result});
        })
    }

    componentDidMount(){
        // 创建滚动视图
        let ticketScroll = new IScroll(this.refs.ticket, {
            mouseWheel: true,
            click: true,
            bounce: false
        })

        ticketScroll.on("scrollStart", ()=>{
            // 更新滚动视图
            ticketScroll.refresh();
        })
    }
}