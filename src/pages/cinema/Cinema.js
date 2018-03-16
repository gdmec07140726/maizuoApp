
import React, {Component} from 'react';

import {getCinemaData} from '../../services/cinemaService';
import CinemaItem from '../../components/cinema/CinemaItem';

import '../../styles/cinema.css';

export default class Cimema extends Component{
    constructor(){
        super();
        this.state = {
            data: {}
        }
    }

    render(){
        let {data} = this.state;
        
        return (
            <div className="page" id="cinema" ref="cinema">
                <div className="wrapper">
                    {
                        (function(){
                            var result = [];
                            var isShow = true;
                            for(var key in data){
                                result.push(
                                    <CinemaItem key={key} dataName={key} dataList={data[key]} isShow={isShow} />
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

    componentWillMount(){
        // 请求影院数据
        getCinemaData().then(result=>{
            console.log(result);
            this.setState({data: result});
        })
    }

    componentDidMount(){
        let cinemaScroll = new IScroll(this.refs.cinema, {
            mouseWheel: true,
            click: true
        })

        cinemaScroll.on("scrollStart", ()=>{
            cinemaScroll.refresh();
        })
    }
}