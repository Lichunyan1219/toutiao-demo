// 用户信息接口
/* eslint-disable */

import request from '@/utils/request'
// 登录注册接口
export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method:'POST',
    data: { mobile, code }
  })
}
// 发送短信验证码接口
export const find = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/:${mobile}`,
    method:'GET'
  })
}
//  default { login, find }
