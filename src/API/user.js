// 用户信息接口
/* eslint-disable */
// import store from '@/store'
import request from '@/utils/request'
// 登录注册接口
export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: { mobile, code }
  })
}
// 发送短信验证码接口
export const find = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`,
    method: 'GET'
  })
}
//  default { login, find }

// 获取用户信息

export const users = () => {
  return request({
    url: '/v1_0/user',
    method: 'GET'
  })
}
// 关注请求
export const attention = (target) => {
  return request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target
    }
  })
}
// 取消关注请求
export const unfollow = (target) => {
  return request({
    url: `/v1_0/user/followings/${target}`,
    method: 'DELETE'
  })
}
