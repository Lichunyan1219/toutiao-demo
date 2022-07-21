import request from '@/utils/request'

// 搜索结果
export const getSearchResult = (q, page, perPage) => {
  return request({
    url: '/v1_0/search',
    params: {
      q,
      page,
      per_page: perPage
    }
  })
}
// 搜索建议
export const getSearchSuggest = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}
