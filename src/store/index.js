import Vue from 'vue'
import Vuex from 'vuex'
// import storage from '@/utils/storage'
import { setToken, getToken } from '@/utils/auth'
/* eslint-disable */
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    // 存储token
    user: getToken() || {} // 从本地获取token转换为对象赋值给user
  },
  mutations: {
    // 改变数据
    setUser(state, user) {
      state.user = user
      setToken(user) // 把token存储到本地，转换为json字符串
    }
  }
})
