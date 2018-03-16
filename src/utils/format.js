

// 获得月日，星期字符串
// 参数flag：为true时，表示需要显示星期
export function getMonthDay(time, flag){
    var d = new Date(time);
    var month = d.getMonth() + 1;
    var date = d.getDate();

    if(flag){
        var day = d.getDay();
        var dayStr = "";
        switch(day){
            case 0: 
                dayStr = "日";
                break;
            case 1: 
                dayStr = "一";
                break;
            case 2: 
                dayStr = "二";
                break;
            case 3: 
                dayStr = "三";
                break;
            case 4: 
                dayStr = "四";
                break;
            case 5: 
                dayStr = "五";
                break;
            case 6: 
                dayStr = "六";
                break;
        }
        return {monthDay: month + "月" + date + "日", day: dayStr};
    }

    return month + "月" + date + "日"
}

// 地址数据筛选，整理
export function sortByCity(arr){
    let citiesMap = {};
    // 将数据按字母分类
    arr.map(item=>{
        let letter = item.pinyin[0];
        if(!citiesMap[letter]){
            citiesMap[letter] = []
        }
        citiesMap[letter].push(item);
    })
    
    // 取出对象中的数组，并排序
    var letter = [];
    for(var key in citiesMap){
        letter.push(key);
    }
    letter.sort();

    // 将数据按所需格式整理
    let citysArr = [];
    for(var i=0; i<letter.length; i++){
        citysArr.push({
            name: letter[i],
            item: citiesMap[letter[i]].map(item=>{
                return item.name
            })
        });
    }
    
    return citysArr;
}


// 将影院按市区区分
export function subareaData(arr){
    var data = {};
    arr.map(item=>{
        if(!data[item.district]){
            data[item.district] = [];
        }
        data[item.district].push(item);
    })
    return data;
}


// 订座电影分类
// 参数flag: 是否需要按id划分，ture为不需要
export function classifyData(arr, flag){
    var data = {};
    if(flag){
        arr.map(item=>{
            // 给数据固定添加今天的日期
            if(!data[getMonthDay(new Date().getTime())]){
                data[getMonthDay(new Date().getTime())] = [];
            }
            if(!data[item.showAt]){
                data[item.showAt] = [];
            }
            data[item.showAt].push(item);
        })
    }else{
        arr.map(item=>{
            if(!data[item.film.id]){
                data[item.film.id] = {};
            }
            // 给数据固定添加今天的日期
            if(!data[item.film.id][getMonthDay(new Date().getTime())]){
                data[item.film.id][getMonthDay(new Date().getTime())] = [];
            }
            if(!data[item.film.id][item.showAt]){
                data[item.film.id][item.showAt] = [];
            }
            data[item.film.id][item.showAt].push(item);
        })
    }
    return data;
}

// 订座页面时间戳按格式转换年月
export function getTimeByformat(time, flag){
    var d = new Date(time);
    var month = d.getMonth() + 1;
    var date = d.getDate();
    month = month<10 ? "0"+month:month;
    date = date<10 ? "0"+date:date;
    if(flag){
        return month + "月" + date + "日";
    }
    return month + "/" + date;
}

// 获得天数差
export function afterDay(time){
    var now = new Date();
    var d = new Date(time);
    var diff = d.getDate()-now.getDate();
    return Math.abs(diff);  
}

// 时间戳获取几时几分
export function getTime(time, long){
    var d = new Date(time);
    var hour = d.getHours();
    var min = d.getMinutes();

    if(long){
        hour = (hour+parseInt(long/60))%24;
        min = (min + long%60)%60;
    }

    hour = hour<10 ? "0"+hour:hour;
    min = min<10 ? "0"+min:min;
    
    return hour + ":" + min;
}


// 获取字符串中的src值
export function getImageSrc(str){
    let reg = /^https.*\.(jpg|png|jpeg|gif)$/;
    let arr = str.split("\"");
    // let newArr = [];
    // for(var i=0; i<arr.length; i++){
    //     if(reg.test(arr[i])){
    //         newArr.push(arr[i]);
    //     }
    // }
    let newArr = arr.filter(item => {
        return reg.test(item);
    });
    return newArr;
}