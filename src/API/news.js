import request from '@/utils/request'

// 频道文章列表
export const getChannel = (times, id) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: id,
      timestamp: times
    }
  })
}
