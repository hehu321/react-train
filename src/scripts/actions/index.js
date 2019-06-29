import axios from '@/utils/axios.js'

export const EXCHANGE = 'changecity';
export const exchangeCity = () => {
    return {
        type: EXCHANGE,
    }
}


export const CHANGEDATE = 'changedate';
export const changeDate = (date) => {
    return {
        type: CHANGEDATE,
        date
    }
}


export const CHANGEFLAG = 'chanegsdsajkd';
export const changeFlag = (flag) => {
    return {
        type: CHANGEFLAG,
        flag
    }
}



export const GETCITYLIST = 'GETCITYLASDI';
export const getCityList = (url) => {
    return axios.get(url).then(res => {
        return {
            type: GETCITYLIST,
            citylist:res.data
        }
    })
}
//控制城市选择组件切换
export const CHANGECITYFLG = 'CHANGECITYFLASDASD';
export const changeCitySwitch = ()=>{
    return{
        type:CHANGECITYFLG,
    }
}

//出发到达城市选择

export const CHOOSETYPE = 'CHOOSETYPE13142'
export const changeType = (ctype)=>{
    return{
        type:CHOOSETYPE,
        ctype
    }
}
//记录改变的的城市
export const GETCITYCHANGE = 'GETCITYCHANGE'
export const getCityChange = (val)=>{
    return{
        type:GETCITYCHANGE,
        val
    }
}

//车票列表获取
export const GETTICKET = 'GETTICKETDAS';
export const getTicketList = ({url,params})=>{
    return axios.get(url,{params}).then(res=>{
        return {
            type:GETTICKET,
            list:res.data.result.list
        }
    })
}

//订单页面获取
export const GETORDER = 'GETORDERLIST';
export const getOrder = ({url,params})=>{
    return axios.get(url,{params}).then(res=>{
        return {
            type:GETORDER,
            orderList:res.data.result,
        }
    })
}

//订单页面页面信息存储
export const GETORDERCONTENT = 'GETORDERCONTENTSDSAD';
export const getOrderContnet = (obj)=>{
    return {
        type:GETORDERCONTENT,
        obj
    }
}

//筛选列表ticketList
export const FILTERLIST = 'ticketListDASDASD';
export const filterList = ()=>{
    return {
        type:FILTERLIST,
    }
}

//订单历史记录

export const HISTORYLIST = 'HISTORYLISTQEWQ';
export const changeHistoryList = (obj)=>{
    return{
        type:HISTORYLIST,
        obj
    }
}

//存手机号
export const SAVEMOBILE ='SAVEMAMDKSADAS';
export const saveMobile = (val)=>{
    return{
        type:SAVEMOBILE,
        val
    }
}