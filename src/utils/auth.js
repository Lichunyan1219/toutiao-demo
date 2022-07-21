import storage from './storage'
// token 封装
const TONKEN_KEY = 'HEIMA_TOUTIAO_TOKEN'
export const setToken = (token) => storage.set(TONKEN_KEY, token)
export const getToken = () => storage.get(TONKEN_KEY)
export const removeToken = () => storage.remove(TONKEN_KEY)

// 频道列表封装
const TOUTIAO_CHANNEL = 'HEIMA_TOUTIAO_CHANNEL'
export const SetChannel = (value) => storage.set(TOUTIAO_CHANNEL, value)
export const GetChannel = () => storage.get(TOUTIAO_CHANNEL)

// 搜索历史封装
const TOUTIAO_HISTORY = 'HEIMA_TOUTIAO_HISTORY'
export const setHistory = (history) => storage.set(TOUTIAO_HISTORY, history)
export const getHistory = () => storage.get(TOUTIAO_HISTORY)
export const removeHistory = () => storage.remove(TOUTIAO_HISTORY)
console.log(getHistory())
