// 频道接口
import request from '@/utils/request'

// 获取我的频道列表
export const getChannel = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}
// 获取所有频道列表
export const getChannelAll = () => {
  return request({
    url: '/v1_0/channels'
  })
}
