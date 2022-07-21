import Vue from 'vue'
import Vuex from 'vuex'
// import storage from '@/utils/storage'
import {
  setToken,
  getToken,
  getHistory,
  setHistory,
  removeHistory
} from '@/utils'
/* eslint-disable */
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    // 存储token
    user: getToken() || {}, // 从本地获取token转换为对象赋值给user
    history: getHistory() || [] // 搜索历史
  },
  mutations: {
    // 改变数据
    setUser(state, user) {
      state.user = user
      setToken(user) // 把token存储到本地，转换为json字符串
    },
    getHistorys(state, history) {
      state.history.unshift(history) // 把历史记录存储到本地
      setHistory(state.history)
    },
    delHistorys(state, historys) {
      removeHistory()
      state.history = historys // 把历史记录存储到本地
      setHistory(state.history)
    }
  }
})
