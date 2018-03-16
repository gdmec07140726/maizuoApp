
import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class NowPlaying extends Component{

    render(){
        let {data} = this.props;
        return (
            <li>
                <Link className="linkBox" to={"/film/"+data.id}>
                    <img src={data.img}/>
                    <div className="contentBox">
                        <div>
                            <h3>{data.name}</h3>
                            <p>
                                <span>{data.grade}</span>
                                <i className="iconfont icon-right"></i>
                            </p>
                        </div>
                        <p className="info">{data.info}</p>
                        <p className="count">
                            <span><i>{data.cinemaCount}</i>家影院上映</span>
                            <span><i>{data.watchCount}</i>人购票</span>
                        </p>
                    </div>
                </Link>
            </li>
        )
    }
}