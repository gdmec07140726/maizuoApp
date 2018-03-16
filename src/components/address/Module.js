
import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import store from '../../store';

export default class Module extends Component{
    constructor(){
        super();
    }

    render(){
        let {data, name} = this.props;
        let styleObj = name=="gps" ? {color: "#e2941a"}:{};
        let addressDom = data.map((item, index)=>{
            return (
                <div key={index} className="addressBox">
                    <div className="header">
                        {item.name}
                    </div>
                    <div className="item">
                        {
                            item.item.map((letterItem, index)=>{
                                return (
                                    (name == "letter") ? 
                                    <a key={index} style={styleObj} onClick={this.changeAddress.bind(this, letterItem)}>
                                        {letterItem}
                                    </a> :
                                    <Link to="/home" key={index} style={styleObj} onClick={this.changeAddress.bind(this, letterItem)}>
                                        {letterItem}
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>
            )
        })
        return (
            <div>
                {addressDom}
            </div>
        )
    }

    // 按钮点击事件
    changeAddress(address){
        var ascii = address.charCodeAt();
        if(ascii>=65 && ascii<=90){
            this.props.letterAction(address);
            return;
        }
        // 触发事件，修改全局状态
        store.dispatch({
            type: "modify-address",
            address
        })
    }
}