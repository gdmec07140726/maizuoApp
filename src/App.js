
import React, {Component} from 'react';
import {HashRouter as Router, Route, Redirect} from 'react-router-dom';

import AppHeader from './common/AppHeader';
import AppSide from './common/AppSide';

import Home from './pages/home/Home';
import Address from './pages/address/Address';
import Film from './pages/film/Film';
import FilmDetail from './pages/film/FilmDetail';
import FilmOfCinema from './pages/film/FilmOfCinema';
import Cinema from './pages/cinema/Cinema';
import CinemaDetail from './pages/cinema/CinemaDetail';
import CinemaTicket from './pages/cinema/CinemaTicket';
import CinemaSeat from './pages/cinema/CinemaSeat';
import Mall from './pages/mall/Mall';
import MallCategory from './pages/mall/MallCategory';
import MallActive from './pages/mall/MallActive';
import GoodsDetail from './pages/mall/GoodsDetail';
import Login from './pages/login/Login';
import SeatCard from './pages/seatCard/SeatCard';

export default class App extends Component{
    constructor(){
        super();
        this.state = {
            showSide: false
        }
    }

    render(){
        let {showSide} = this.state;

        
        let header = <AppHeader menuClick={this.handleMenuClick.bind(this)} />;
        let side = <AppSide menuClick={this.handleMenuClick.bind(this)} />;
        return (
            <Router>
            <div className="app">
                {header}
                {showSide && side}

                {/* 重定向到home页面 */}
                <Route exact path="/" render={()=>{
                    return <Redirect to="/home" />
                }} />
                <Route path="/home" component={Home} />

                <Route path="/address" component={Address} />


                <Route exact path="/film" component={Film} />
                {/* 电影详情页 */}
                <Route exact path="/film/:id" component={FilmDetail} />
                {/* 首页加载更多按钮路径传值(必传) */}
                <Route exact path="/film/more/:card" component={Film} />
                {/* 详情请页立即购买按钮跳转到够票页面 */}
                <Route path="/film/:id/cinema" component={FilmOfCinema} />


                <Route exact path="/cinema" component={Cinema} />
                {/* 影院详情页 */}
                <Route exact path="/cinema/:id" component={CinemaDetail} />
                {/* 影院通兑票页 */}
                <Route exact path="/cinema/:id/item" component={CinemaTicket} />
                {/* 影院订座页 */}
                <Route path="/cinema/:id/film" component={CinemaSeat} />


                <Route exact path="/mall" component={Mall} />
                {/* 商城类别页面 */}
                <Route exact path="/mall/category/:id" component={MallCategory} />
                {/* 商城活动页面 */}
                <Route exact path="/mall/active/:id" component={MallActive} />
                {/* 商城商品详情页面 */}
                <Route path="/mall/detail/:id" component={GoodsDetail} />

                {/* 没有登录，重定向到login页面 */}
                <Route exact path="/mine" render={()=>{
                    return <Redirect to="/login" />
                }} />
                <Route path="/login" component={Login} />

                <Route path="/seatCard" component={SeatCard} />
            </div>
            </Router>
        )
    }

    // 菜单栏点击事件
    handleMenuClick(){
        this.setState({showSide: !this.state.showSide});
    }
}