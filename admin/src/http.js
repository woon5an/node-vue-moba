import axios from 'axios'
import Vue from 'vue'
import router from './router'
const http = axios.create({
    baseURL: process.env.VUE_APP_API_URL || '/admin/api',
    //baseURL: 'http://localhost:3000/admin/api'
})

http.interceptors.request.use(function (config) {
    // Do something before request is sent
    if(localStorage.token){     //有token才写请求头
        config.headers.Authorization = 'Bearer ' + localStorage.token //加bearer的时候别忘了后面有个空格
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

http.interceptors.response.use(res => {
    return res
}, err => {
    if(err.response.data.message){
        Vue.prototype.$message({                //当服务端有一个错误代码，而且有一个message，把它弹出来
            type: 'error',
            message: err.response.data.message
        })
        if (err.response.status === 401){
            router.push('/login')
        }
    }
    return Promise.reject(err)
})

export default http