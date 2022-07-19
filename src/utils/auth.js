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
