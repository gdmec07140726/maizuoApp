
import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class HotList extends Component{
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
                                        <h4>{item.name}</h4>
                                        <p>
                                            <span>{item.cinemaCount}家影院上映 </span>
                                            <span> {item.watchCount}人购票</span>
                                        </p>
                                        <i>{item.grade}</i>
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>
                <Link to="/film/more/0" className="moreFilm">更多热映电影</Link>
            </div>
        )
    }
}