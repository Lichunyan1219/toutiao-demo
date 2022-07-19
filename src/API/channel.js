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
// 删除用户频道
export const delChannel = (id) => {
  return request({
    url: `/v1_0/user/channels/${id}`,
    method: 'DELETE'
  })
}

// 添加用户频道
export const addChannel = (id, seq) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [{ id, seq }]
    }
  })
}
