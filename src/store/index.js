
import {createStore} from 'redux';

// 初始化全局状态
let initialState = {
    title: "卖座电影",
    address: "深圳",
    asideIndex: 0       //0表示卖座网导航，1表示商城导航，默认为0
}

// 声明reducer函数
// 参数1：全局状态
// 参数2：执行修改状态的事件对象
// reducer函数作用：修改全局状态的函数，根据事件进行修改state
// 返回值：全局使用的新的state
let reducer = function(state, action){
    // console.log('reducer执行了');
    // console.log(state);
    // console.log(action);

    // 赋初始值
    if(action.type == "@@redux/INIT"){
        // 对全局数据进行初始化
        state = initialState
        
        return state;
    }

    // 修改头部组件状态
    if(action.type == "modify-title"){
        // 深拷贝
        state = Object.assign({}, state, {title: action.title});
        // state.title = action.title;

        return state;
    }

    // 修改全局地址状态
    if(action.type == "modify-address"){
        // 深拷贝
        state = Object.assign({}, state, {address: action.address});
        // state.address = action.address;

        return state;
    }

    // 修改侧边导航显示状态
    if(action.type == "modify-asideNav"){
        // 深拷贝
        state = Object.assign({}, state, {asideIndex: action.value});

        return state;
    }

    // 返回旧值
    return state;
}

// 创建管理全局状态的仓库
const store = createStore(reducer);

export default store;

// // 触发reducer函数
// store.dispatch({
//     type: "modify-title",
//     title: '666'
// })

// // 触发reducer函数
// store.dispatch({
//     type: "modify-title",
//     title: "aaa"
// })