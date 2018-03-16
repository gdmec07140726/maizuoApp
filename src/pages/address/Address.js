
import React, {Component} from 'react';

import Module from '../../components/address/Module';
import {getAddressCityData} from '../../services/homeService';
import store from '../../store';

import '../../styles/address.css';

export default class Address extends Component{
    constructor(){
        super();
        let hotCity = [
            {name: "热门城市", item: ["北京", "上海", "广州", "深圳"]}
        ];
        this.state = {
            GPS: [{name: "GPS定位你所在城市", item: ["深圳"]}],
            hotCity,
            letter: [],
            data: []
        }
    }

    render(){
        let {GPS, hotCity, letter ,data} = this.state;
        return (
            <div className="page" id="address" ref="address">
                <div>
                    <Module data={GPS} name="gps" />
                    <Module data={hotCity} />
                    <Module data={letter} name="letter" letterAction={this.handleLetter.bind(this)} />
                    <Module data={data} />
                </div>
            </div>
        )
    }

    componentWillMount(){
        // 请求城市数据
        getAddressCityData().then(result=>{
            console.log(result);
            var letter = [{name: "按字母排序", item: []}];
            result.map(item=>{
                letter[0].item.push(item.name);
            })
            this.setState({data: result, letter}, ()=>{
                this.addressScroll.refresh();
            });
        })
    }

    componentDidMount(){
        // 创建滚动视图
        this.addressScroll = new IScroll(this.refs.address, {
            mouseWheel: true,
            click: true,
            bounce: false
        })
    }

    // 字母组件点击事件
    handleLetter(letter){
        // console.log(letter);
        // 点击字母移动到指定位置
        switch(letter){
            case "A":
                this.addressScroll.scrollTo(0, -491, 200);
                break;
            case "B":
                this.addressScroll.scrollTo(0, -625, 200);
                break;
            case "C":
                this.addressScroll.scrollTo(0, -898, 200);
                break;
            case "D":
                this.addressScroll.scrollTo(0, -1173, 200);
                break;
            case "E":
                this.addressScroll.scrollTo(0, -1400, 200);
                break;
            case "F":
                this.addressScroll.scrollTo(0, -1486, 200);
                break;
            case "G":
                this.addressScroll.scrollTo(0, -1665, 200);
                break;
            case "H":
                this.addressScroll.scrollTo(0, -1848, 200);
                break;
            case "J":
                this.addressScroll.scrollTo(0, -2260, 200);
                break;
            case "K":
                this.addressScroll.scrollTo(0, -2581, 200);
                break;
            case "L":
                this.addressScroll.scrollTo(0, -2667, 200);
                break;
            case "M":
                this.addressScroll.scrollTo(0, -3085, 200);
                break;
            case "N":
                this.addressScroll.scrollTo(0, -3216, 200);
                break;
            case "P":
                this.addressScroll.scrollTo(0, -3396, 200);
                break;
            case "Q":
                this.addressScroll.scrollTo(0, -3532, 200);
                break;
            case "R":
                this.addressScroll.scrollTo(0, -3756, 200);
                break;
            case "S":
                this.addressScroll.scrollTo(0, -3845, 200);
                break;
            case "T":
                this.addressScroll.scrollTo(0, -4211, 200);
                break;
            case "W":
                this.addressScroll.scrollTo(0, -4437, 200);
                break;
            case "X":
                this.addressScroll.scrollTo(0, -4712, 200);
                break;
            case "Y":
                this.addressScroll.scrollTo(0, -5032, 200);
                break;
            case "Z":
                this.addressScroll.scrollTo(0, this.addressScroll.maxScrollY, 200);
                break;
        }
    }
}