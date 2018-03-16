
import React, {Component} from 'react';

export default class SeatCard extends Component{
    constructor(){
        super();
        this.state = {
            showCard: 0             //0表示选中第一个，1表示选中第二个
        }
    }
    
    render(){
        let {data} = this.props;
        let {showCard} = this.state;
        return (
            <ul className="pageNav">
                {
                    data.map((item, index)=>{
                        return (
                            <li key={index} className={showCard==index ? "active":""} onClick={this.changeCard.bind(this, index)}>
                                {item}
                            </li>
                        )
                    })
                }
            </ul>
        )
    }

    changeCard(index){
        // 改变选中状态
        this.state.showCard = index;
        // this.setState({showCard: index});
        // 改变显示内容
        this.props.handleChangeCard(index);
    }
}