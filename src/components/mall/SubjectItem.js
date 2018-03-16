
import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class SubjectItem extends Component{

    render(){
        let {data} = this.props;
        // 从url中获取id
        var arr = data.url.split("/");
        data.id = arr[arr.length-1];
        if(!data) return <div className="contain"></div>;
        return (
            <div className="contain">
                <Link to={"/mall/Active/"+data.id}>
                    <img className="contain-banner" src={data.imageSrc} />
                </Link>
                <ul className="list">
                    {
                        data.products.map((item, index)=>{
                            return (
                                <li key={index}>
                                    <Link to={"/mall/detail/"+item.id}>
                                        <img src={item.image} />
                                        <h4>{item.name}</h4>
                                        <p>￥{(item.price/100).toFixed(2)}</p>
                                    </Link>
                                </li>
                            )
                        })
                    }
                    <li>
                        <Link to={"/mall/Active/"+data.id}>
                            <b>全部</b>
                        </Link>
                    </li>
                </ul>
            </div>
        )
    }
}