/**
 * 封装 axios 请求模块
 */
/* eslint-disable */

import axios from 'axios'
import store from '@/store'

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net' // 基础路径
})
// 请求拦截器
// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    const token = store.state.user.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    // 在发送请求之前做些什么
    return config // 请求的配置，必须return
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

export default request
