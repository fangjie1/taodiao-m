import request from '@/utils/request'

/**
 * 获取所有频道列表
 * @returns Promise
 */
export const getAllChannels = () => {
  return request({
    method: 'GET',
    url: `/v1_0/channels`,
  })
}

/**
 * 添加用户指定频道
 * @returns Promise
 */
export const addUserChannel = channels => {
  return request({
    method: 'PATCH',
    url: `/v1_0/user/channels`,
    data:{
      channels: [channels]
    }
  })
}

/**
 * 删除用户指定频道
 * @returns Promise
 */
export const deleteUserChannel = channelId => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/channels/${channelId}`,
  })
}


/**
 * 批量删除用户频道列表
 * @returns Promise
 */
export const batchDeleteUserChannel =data => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/channels`,
    data
  })
}
