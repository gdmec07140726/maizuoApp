
import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class RecommendItem extends Component{

    render(){
        let {data} = this.props;
        if(!data) return <li></li>;
        return (
            <li>
                <Link to={"/mall/detail/"+data.id}>
                    <img src={data.skuList.img} />
                    <h3>{data.name}</h3>
                    <p>
                        <span>￥{data.skuList.price}</span>
                        <i>已售{data.skuList.salesCount}</i>
                    </p>
                </Link>
            </li>
        )
    }
}