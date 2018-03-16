
import axios from 'axios';

import API from '../api';
import {getImageSrc} from '../utils/format';

// 商城页面主体数据请求
export function getMallListData(){
    return new Promise((resolve, reject)=>{
        fetch(API.MALL_LIST_URL).then(response=>{
            return response.json();
        }).then(data=>{
            data = data.data;
            // console.log(data);
            let newData = {};
            data.map(item=>{
                if(!newData[item.type]){
                    newData[item.type] = [];
                }
                newData[item.type].push(item);
            })
            resolve(newData);
        }).catch(error=>{
            console.log(error);
        })
    })
}

// 商城页面推荐商品请求
export function getMallRecommendData(option){
    return new Promise((resolve, reject)=>{
        axios.get(API.MALL_RECOMMEND_URL, {
            params: option
        })
        .then(response=>{
            response = response.data.data;
            // console.log(response);
            let data = {
                list: response.list.map(item=>{
                    return {
                        id: item.id,
                        name: item.masterName,
                        skuList: {
                            img: item.skuList[0].image,
                            price: (item.skuList[0].price/100).toFixed(2),
                            salesCount: item.skuList[0].salesCount
                        }
                    }
                }),
                total: response.total
            }
            resolve(data);
        })
        .catch(error=>{
            console.log(error);
        })
    })
}


// 商城分类页面banner请求
export function getMallCategoryData(id){
    return new Promise((resolve, reject)=>{
        fetch(API.MALL_CATEGORY_URL+"?id="+id).then(response=>{
            return response.json();
        }).then(data=>{
            data = data.data;
            // console.log(data);
            resolve(data);
        }).catch(error=>{
            console.log(error);
        })
    })
}


// 商城分类页面商品数据请求
export function getMallCategoryItemData(option){
    return new Promise((resolve, reject)=>{
        axios.get(API.MALL_CATEGORY_ITEM_URL, {
            params: option
        }).then(response=>{
            response = response.data.data;
            // console.log(response);
            let data = {
                list: response.list.map(item=>{
                    return {
                        id: item.id,
                        name: item.masterName,
                        skuList: {
                            img: item.skuList[0].image,
                            price: (item.skuList[0].price/100).toFixed(2),
                            salesCount: item.skuList[0].salesCount
                        }
                    }
                }),
                total: response.total
            }
            resolve(data);
        }).catch(error=>{
            console.log(error);
        })
    })
}


// 商城活动页面数据请求
export function getMallActiveData(option){
    return new Promise((resolve, reject)=>{
        axios.get(API.MALL_ACTIVE_URL, {
            params: option
        }).then(response=>{
            let data = response.data.data.products;
            // console.log(data);
            let newData = data.map(item=>{
                return {
                    id: item.id,
                    name: item.name,
                    skuList: {
                        img: item.image,
                        price: (item.price/100).toFixed(2),
                        salesCount: item.salesCount
                    }
                }
            })
            resolve(newData);
        }).catch(error=>{
            console.log(error);
        })
    })
}


// 商城详情页商品数据请求
export function getMallDetailData(id){
    return new Promise((resolve, reject)=>{
        fetch(API.MALL_DETAIL_URL+"?id="+id).then(response=>{
            return response.json();
        }).then(data=>{
            data = data.data;
            // console.log(data);
            let newData = {
                id: data.id,
                name: data.masterName,
                slaveName: data.slaveName,
                options: data.options,
                imgs: data.skuList[0].images,
                salesCount: data.skuList[0].salesCount,
                price: (data.skuList[0].price/100).toFixed(2),
                fee: data.skuList[0].marketPrice.toFixed(2),
                inventory: data.skuList[0].inventory
            }
            resolve(newData);
        }).catch(error=>{
            console.log(error);
        })
    })
}

// 商城详情页，商品详情图请求
export function getMallDetailPicData(id){
    return new Promise((resolve, reject)=>{
        fetch(API.MALL_DETAIL_PIC_URL+"?id="+id).then(response=>{
            return response.json();
        }).then(data=>{
            // console.log(data);
            let desc = data.data.desc;
            resolve(getImageSrc(desc));
        }).catch(error=>{
            console.log(error);
        })
    })
}