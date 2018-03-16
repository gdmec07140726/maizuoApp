
import axios from 'axios';

import API from '../api';
import {getMonthDay, subareaData, classifyData, getTime} from '../utils/format';


// 请求影片页面正在热映数据
export function getFilmNowPlayingData(option){
    return new Promise((resolve, reject)=>{
        axios.get(API.FILM_NEW_PLAYING_URL, {
            params: option
        })
        .then(response=>{
            // console.log(response);
            let data = response.data.data;
            let newData = {
                films: data.films.map(item=>{
                    return {
                        id: item.id,
                        img: item.poster.thumbnail,
                        name: item.name,
                        info: item.intro,
                        grade: item.grade,
                        cinemaCount: item.cinemaCount,
                        watchCount: item.watchCount
                    }
                }),
                page: data.page
            }
            resolve(newData);
        })
        .catch(error=>{
            console.log(error);
        })
    })
}


// 请求影片页面即将上映数据
export function getFilmComingSoonData(option){
    return new Promise((resolve, reject)=>{
        axios.get(API.FILM_COMING_SOON_URL, {
            params: option
        })
        .then(response=>{
            // console.log(response);
            let data = response.data.data;
            let newData = {
                films: data.films.map(item=>{
                    return {
                        id: item.id,
                        img: item.poster.thumbnail,
                        name: item.name,
                        info: item.intro,
                        time: getMonthDay(item.premiereAt, true)
                    }
                }),
                page: data.page
            }
            resolve(newData);
        })
        .catch(error=>{
            console.log(error);
        })
    })
}

// 请求电影详情页页面数据
export function getFilmDetail(id){
    return new Promise((resolve, reject)=>{
        var d = new Date().getTime();
        fetch(API.FILM_DETAIL_URL+id+"?__t="+d).then(response=>{
            return response.json();
        }).then(data=>{
            data = data.data.film;
            // console.log(data);
            let filmDetail = {
                id: data.id,
                name: data.name,
                img: data.cover.origin,
                director: data.director,
                actors: data.actors.map(item=>{
                    return item.name;
                }),
                language: data.language,
                category: data.category,
                premiereAt: getMonthDay(data.premiereAt),
                synopsis: data.synopsis
            }
            resolve(filmDetail);
        }).catch(error=>{
            console.log(error);
        })
    })
}


// 根据电影id请求影院数据
export function getDataByFilmID(id){
    return new Promise((resolve, reject)=>{
        var d = new Date().getTime();
        fetch(API.IMMEDIATELY_BUY_URL+id+"/cinema?__t="+d).then(response=>{
            return response.json();
        }).then(data=>{
            data = data.data.cinemas;
            // console.log(data)
            let newData = data.map(item=>{
                return {
                    id: item.id,
                    address: item.address,
                    name: item.name,
                    district: item.district.name,
                    price: item.minimumPrice,
                    surplus: item.avaliableSchedule,
                    isShow: false
                }
            })
            resolve(subareaData(newData));
        }).catch(error=>{
            console.log(error);
        })
    })
}


// 根据影院id和电影id请求日程安排数据
export function getScheduleData(filmID, cinemaID){
    return new Promise((resolve, reject)=>{
        var d = new Date().getTime();
        axios.get(API.CINEMA_SCHEDULE_URL, {
            params: {
                __t: d,
                film: filmID,
                cinema: cinemaID
            }
        })
        .then(response=>{
            let data = response.data.data.schedules;
            // console.log(data);
            let newData = data.map(item=>{
                return {
                    cinemaID: item.cinema.id,
                    time: item.showAt,
                    showAt: getMonthDay(item.showAt),
                    startTime: getTime(item.showAt),
                    endTime: getTime(item.showAt, item.film.mins),
                    film: {
                        id: item.film.id,
                        language: item.film.language
                    },
                    imagery: item.imagery,
                    price: {
                        cinema: item.price.cinema,
                        maizuo: item.price.maizuo
                    },
                    hall: item.hall.name,
                    stopSellingAt: item.stopSellingAt
                }
            })
            resolve(classifyData(newData, true));
        })
        .catch(error=>{
            console.log(error);
        })
    })
}