import axios from 'axios'

import {Toast} from 'antd-mobile'


let token = '';
axios.defaults.withCredentials = false;
axios.defaults.headers.common['token'] = token;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

axios.interceptors.request.use(function(config){
    let userInfo = sessionStorage.userInfo
    if(userInfo){
        userInfo = JSON.parse(userInfo);
        token = userInfo.token
    }
    config.headers.common['token'] = token
    Toast.loading('玩命加载中', 500);
    return config;
},function(err){
    return Promise.reject(err)
})

axios.interceptors.response.use(function(response){
    Toast.hide()

    Toast.success(response.data.msg, 2);
    return response

},function(err){
    return Promise.reject(err)
})

export default axios;