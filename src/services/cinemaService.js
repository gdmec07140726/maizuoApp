import axios from 'axios';

import API from '../api';
import {subareaData, getMonthDay, classifyData, getTime} from '../utils/format';

// 影院数据请求
export function getCinemaData(){
    return new Promise((resolve, reject)=>{
        var d = new Date().getTime();
        fetch(API.CINEMA_URL).then(response=>{
            return response.json();
        }).then(data=>{
            data = data.data.cinemas;
            // console.log(data);
            let newData = data.map(item=>{
                return {
                    id: item.id,
                    address: item.address,
                    name: item.name,
                    labels: item.labels,
                    district: item.district.name
                }
            })
            // console.log(newData);
            resolve(subareaData(newData));
        }).catch(error=>{
            console.log(error);
        })
    })
}


// 请求影院详情数据
export function getCinemaDetailData(id){
    return new Promise((resolve, reject)=>{
        var d = new Date().getTime();
        fetch(API.CINEMA_DETAIL_URL+id+"?__t="+d).then(response=>{
            return response.json();
        }).then(data=>{
            data = data.data.cinema;
            console.log(data);
            let newCinemaDetail = {
                id: data.id,
                address: data.address,
                tel: data.telephones,
                services: data.services.map(item=>{
                    return {
                        des: item.description,
                        iconUrl: item.iconUrl,
                        name: item.name
                    }
                })
            }
            resolve(newCinemaDetail);
        }).catch(error=>{
            console.log(error);
        })
    })
}


// 请求电影通兑票数据
export function getCinemaTicketData(id){
    var d = new Date().getTime();
    return new Promise((resolve, reject)=>{
        fetch(API.CINEMA_TICKET_URL+id+"/item?__t="+d).then(response=>{
            return response.json();
        }).then(data=>{
            data = data.data.items;
            // console.log(data);
            let newData = [];
            data.map(item=>{
                if((/通兑票/.test(item.name))){
                    newData.push({
                        name: item.name,
                        price: item.price
                    })
                }
            })
            resolve(newData);
        }).catch(error=>{
            console.log(error);
        })
    })
}


// 请求订座电影列表数据
export function getSeatFilmListData(id){
    return new Promise((resolve, reject)=>{
        var d = new Date().getTime();
        fetch(API.SEAT_FILMLIST_URL+id+"/film?__t="+d).then(response=>{
            return response.json();
        }).then(data=>{
            data = data.data.filmList;
            // console.log(data);
            let newData = data.map(item=>{
                return {
                    id: item.filmID,
                    name: item.filmName,
                    img: item.minposterAddress
                }
            })
            resolve(newData);
        }).catch(error=>{
            console.log(error);
        })
    })
}


// 请求订座电影日程安排数据
export function getSeatFilmScheduleData(id){
    return new Promise((resolve, reject)=>{
        var d = new Date().getTime();
        axios.get(API.SEAT_FILM_SCHEDULE_URL, {
            params: {
                __t: d,
                film: 0,
                cinema: id
            }
        }).then(response=>{
            response = response.data.data.schedules;
            // console.log(response);
            let data = response.map(item=>{
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
            resolve(classifyData(data));
        }).catch(error=>{
            console.log(error);
        })
    })
}