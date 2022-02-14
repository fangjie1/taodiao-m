import request from '@/utils/request'

/**
 * 获取联想建议
 * @returns Promise
 */
export const getSearchSuggestions = q => {
  return request({
    method: 'GET',
    url: `/v1_0/suggestion`,
    params:{
      q
    }
  })
}

/**
 * 获取搜索结果
 * @returns Promise
 */
export const getSearchResult = params => {
  return request({
    method: 'GET',
    url: `/v1_0/search`,
    params
  })
}
