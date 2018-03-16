/*
    // 首页轮播请求url
    ?__t=1519966898377
*/
const HOME_BANNER_URL = "/v4/api/billboard/home";

/*
    // 首页热映电影url
    __t: 当前时间戳
    page: 1
    count: 5
*/
const HOME_HOT_FILM_URL = "/v4/api/film/now-playing";

/*
    // 首页即将上映电影url
    __t: 当前时间戳
    page: 1
    count: 3
*/
const HOME_SOON_FILM_URL = "/v4/api/film/coming-soon";

/*
    // 地址页面城市请求
    ?__t=1519995653208
*/
const ADDRESS_CITY_UTL = "/v4/api/city";

/*
    // 影片页面正在热映url
    page=1
    count=7
*/
const FILM_NEW_PLAYING_URL = "/v4/api/film/now-playing";

/*
    // 影片页面即将上映url
    page=1
    count=7
*/
const FILM_COMING_SOON_URL = "/v4/api/film/coming-soon";

/*
    // 影院页面数据请求url
    ?__t=1520078356376
*/
const CINEMA_URL = "/v4/api/cinema";

/*
    // 电影详情数据请求url
    3990    电影id
    ?__t=1520147519734  参数：时间戳
*/
const FILM_DETAIL_URL = "/v4/api/film/";

/*
    // 影院详情数据请求url
    4573    影院id
    ?__t=1520221021889  参数：时间戳
*/
const CINEMA_DETAIL_URL = "/v4/api/cinema/";

/*
    // 电影详情通兑票请求url
    4573/item   影院id和item地址字段
    ?__t=1520250869898  参数：时间戳
*/
const CINEMA_TICKET_URL = "/v4/api/cinema/";

/*
    // 订座页面电影列表请求url
    6599/film   影院id和film地址字段
    ?__t=1520296840119
*/
const SEAT_FILMLIST_URL = "/v4/api/cinema/";

/*
    // 订座页面电影日程安排请求url
    ?__t=1520296840121
    &film=0
    &cinema=6599    影院id
*/
const SEAT_FILM_SCHEDULE_URL = "/v4/api/schedule";

/*
    // 电影详情立即购买，购票页数据请求url
    4000/cinema     电影id和film地址字段
    ?__t=1520403303941
*/
const IMMEDIATELY_BUY_URL = "/v4/api/film/";

/*
    // 购票页的影院日程安排url
    ?__t=1520403337948
    &film=4000
    &cinema=5230
*/

const CINEMA_SCHEDULE_URL = "/v4/api/schedule";


/*
    // 商城页面数据列表请求url
*/
const MALL_LIST_URL = "/api/ad/list";

/*
    // 商城页面好货精选商品列表请求url(推荐)
    ?page=1
    &num=20
*/
const MALL_RECOMMEND_URL = "/api/recommend/home";

/*
    // 商城分类页面banner请求url
    ?id=26
*/
const MALL_CATEGORY_URL = "/api/category";

/*
    // 商城分类页面商品数据请求url
    ?id=26
    &page=1
    &num=20
*/
const MALL_CATEGORY_ITEM_URL = "/api/category/items";

/*
    // 商城活动页面数据请求url
    ?id=43
    &page=1
    &pageSize=20
*/
const MALL_ACTIVE_URL = "/api/active";

/*
    // 商城详情页商品数据url
    ?id=1724
*/
const MALL_DETAIL_URL = "/api/item";

/*
    // 商城详情页，商品详情图url
    ?id=1724
*/
const MALL_DETAIL_PIC_URL = "/api/item/desc";

export default {
    HOME_BANNER_URL,
    HOME_HOT_FILM_URL,
    HOME_SOON_FILM_URL,
    ADDRESS_CITY_UTL,
    FILM_NEW_PLAYING_URL,
    FILM_COMING_SOON_URL,
    CINEMA_URL,
    FILM_DETAIL_URL,
    CINEMA_DETAIL_URL,
    CINEMA_TICKET_URL,
    SEAT_FILMLIST_URL,
    SEAT_FILM_SCHEDULE_URL,
    IMMEDIATELY_BUY_URL,
    CINEMA_SCHEDULE_URL,
    MALL_LIST_URL,
    MALL_RECOMMEND_URL,
    MALL_CATEGORY_URL,
    MALL_CATEGORY_ITEM_URL,
    MALL_ACTIVE_URL,
    MALL_DETAIL_URL,
    MALL_DETAIL_PIC_URL
}


