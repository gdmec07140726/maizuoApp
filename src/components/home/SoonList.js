
import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class SoonList extends Component{
    constructor(){
        super();
    }

    render(){
        let {data} = this.props;
        return (
            <div className="list-box">
                <ul className="list">
                    {
                        data.map((item, index)=>{
                            return (
                                <li key={index}>
                                    <Link to={"/film/"+item.id}>
                                        <img src={item.img} />
                                        <h5>
                                            <em>{item.name}</em>
                                            <b>{item.time}上映</b>
                                        </h5>
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>
                <Link to="/film/more/1" className="moreFilm">更多即将上映电影</Link>
            </div>
        )
    }
}