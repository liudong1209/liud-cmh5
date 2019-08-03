import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import NProgress from 'nprogress'
import { Dialog } from 'mand-mobile'
import store from "../store";
import global from  '../globle/globle'

// 响应时间
axios.defaults.timeout = 20 * 1000
// 配置cookie
// axios.defaults.withCredentials = true
// 配置请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// 静态资源
Vue.prototype.$static = ''

// 配置接口地址
axios.defaults.baseURL = global.axiosDefaultsURL

// POST传参序列化(添加请求拦截器)
axios.interceptors.request.use(
  config => {
    NProgress.start()
    if (config.method === 'post') {
      config.data = qs.stringify(config.data)
    }
    if (store.getters.tokenString && store.getters.uIdString) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers['token'] = store.getters.tokenString;
      config.headers['userId'] = store.getters.uIdString;
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)
// 返回状态判断(添加响应拦截器)
axios.interceptors.response.use(
  res => {
    NProgress.done()
    return res
  },
  err => {
    NProgress.done()
    Dialog.alert({ content: '系统异常' })
    return Promise.reject(err)
  }
)


//上传附件
export function multipartPost(url, params, config) {
  let axiosInstance = axios.create({
    baseURL: this.GLOBAL.axiosDefaultsURL,
    headers: {
      'Content-Type': 'multipart/form-data',
			'token': store.getters.tokenString,
			'userId': store.getters.uIdString,
    }
  })

  return new Promise((resolve, reject) => {
    axiosInstance
      .post(url, params, config)
      .then(
        res => {
          resolve(res)
        },
        err => {
          reject(err.data)
        }
      )
      .catch(err => {
        reject(err)
      })
  })
}
//get不使用进度条
export function getNoProgress(url, params) {
  let axiosInstance2 = axios.create({
    baseURL:this.GLOBAL.axiosDefaultsURL,
    timeout: 20 * 1000,
  });

  return new Promise((resolve, reject) => {
    axiosInstance2
      .get(url, {
        params: params
      })
      .then(
        res => {
          resolve(res.data)
        },
      )
      .catch(err => {
        reject(err.data)
      })
  })
}
 //axios post方法
export function fetchPost (url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then(
        res => {
          resolve(res)
        },
        err => {
          reject(err.data)
        }
      )
      .catch(err => {
        reject(err)
      })
  })
}

//axios get方法
export function fetchGet (url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then(res => {
        console.log()
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}




