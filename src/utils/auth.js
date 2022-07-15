import storage from './storage'

const TONKEN_KEY = 'HEIMA_TOUTIAO_TOKEN'

export const setToken = (token) => storage.set(TONKEN_KEY, token)
export const getToken = () => storage.get(TONKEN_KEY)
export const removeToken = () => storage.remove(TONKEN_KEY)
