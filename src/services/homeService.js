
import axios from 'axios';

import API from '../api';
import {getMonthDay, sortByCity} from '../utils/format';

// 请求首页轮播数据
export function getHomeBannerData(){
    return new Promise((resolve, reject)=>{
        var d = new Date().getTime();
        fetch(API.HOME_BANNER_URL+"?__t="+d).then(response=>{
            return response.json();
        }).then(data=>{
            // console.log(data);
            data = data.data.billboards;
            let newData = data.map(item=>{
                return {
                    img: item.imageUrl,
                    name: item.name,
                    url: item.url
                }
            })
            resolve(newData);
        }).catch(error=>{
            console.log(error);
        })
    })
}

// export function getHomeBannerData(){
//     return new Promise((resolve, reject)=>{
//         axios.get(API.HOME_BANNER_URL)
//         .then(response=>{
//             console.log(response);
//         })
//         .catch(error=>{
//             console.log(error);
//         })
//     })
// }


// 请求首页热映电影数据
export function getHomeHotFilmData(){
    var d = new Date().getTime();
    return new Promise((resolve, reject)=>{
        axios.get(API.HOME_HOT_FILM_URL, {
            params: {
                __t: d,
                page: 1,
                count: 5,
            }
        })
        .then(response=>{
            // console.log(response);
            let data = response.data.data.films;
            var newData = data.map(item=>{
                return {
                    id: item.id,
                    name: item.name,
                    cinemaCount: item.cinemaCount,
                    watchCount: item.watchCount,
                    grade: item.grade,
                    img: item.cover.origin,
                    poster: item.poster
                }
            })
            resolve(newData);
        })
        .catch(error=>{
            console.log(error);
        })
    })
}


// 请求首页即将上映电影数据
export function getHomeSoonFilmData(){
    var d = new Date().getTime();
    return new Promise((resolve, reject)=>{
        axios.get(API.HOME_SOON_FILM_URL, {
            params: {
                __t: d,
                page: 1,
                count: 3,
            }
        })
        .then(response=>{
            // console.log(response);
            let data = response.data.data.films;
            var newData = data.map(item=>{
                return {
                    id: item.id,
                    name: item.name,
                    time: getMonthDay(item.premiereAt),
                    img: item.cover.origin,
                    poster: item.poster
                }
            })
            resolve(newData);
        })
        .catch(error=>{
            console.log(error);
        })
    })
}

// 地址页面城市数据请求
export function getAddressCityData(){
    return new Promise((resolve, reject)=>{
        var d = new Date().getTime();
        fetch(API.ADDRESS_CITY_UTL+"?__t="+d).then(response=>{
            return response.json();
        }).then(data=>{
            // console.log(data);
            var newData = sortByCity(data.data.cities);
            resolve(newData);
        }).catch(error=>{
            console.log(error);
        })
    })
}