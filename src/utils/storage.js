class Storage {
  set(key, value) {
    if (typeof value === 'object') {
      // 如果是对象，就转换为json字符串
      value = JSON.stringify(value)
    }
    localStorage.setItem(key, value) // 如果不是对象直接返回
  }

  get(key) {
    const value = localStorage.getItem(key) //  获取本地存储的值
    try {
      return JSON.parse(value) // 尝试转换为对象，转换失败走catch直接返回
    } catch (err) {
      return value
    }
  }

  remove(key) {
    localStorage.removeItem(key)
  }
}
const storage = new Storage()
export default storage
