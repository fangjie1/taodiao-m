import request from '@/utils/request'

/**
 * 获取评论
 * @returns Promise
 */
export const getComments = params => {
  return request({
    method: 'GET',
    url: `/v1_0/comments`,
    params
  })
}

/**
 * 评论点赞
 * @returns Promise
 */
export const addCommentLike = target => {
  return request({
    method: 'POST',
    url: `/v1_0/comment/likings`, 
    data: {
      target
    }
  })
}

/**
 * 取消点赞
 * @returns Promise
 */
export const deleteCommentLike = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/comment/likings/${target}`
  })
}


/**
 * 发布文章评论或评论回复
 * @returns Promise
 */
export const addComment = data => {
  return request({
    method: 'POST',
    url: `/v1_0/comments`,
    data
  })
}


