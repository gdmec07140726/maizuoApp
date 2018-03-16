
import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class ComingSoon extends Component{

    render(){
        let {data} = this.props;
        return (
            <li>
                <Link className="linkBox" to={"/film/"+data.id}>
                    <img src={data.img}/>
                    <div className="contentBox">
                        <div>
                            <h4>{data.name}</h4>
                            <p>
                                <i className="iconfont icon-right"></i>
                            </p>
                        </div>
                        <p className="info">{data.info}</p>
                        <p className="showAt">
                            <span>{data.time.monthDay}</span>
                            <b>星期{data.time.day}</b>
                        </p>
                    </div>
                </Link>
            </li>
        )
    }
}