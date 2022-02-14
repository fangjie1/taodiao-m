import request from '@/utils/request'

/**
 * 登录
 * @returns Promise
 */
export const login = data => {
    return request({
        method: 'POST',
        url: '/v1_0/authorizations',
        data
    })
}

/**
 * 发送验证码
 * @returns Promise
 */
export const sendSms = mobile => {
    return request({
        method: 'GET',
        url: `/v1_0/sms/codes/${mobile}`
    })
}

/**
 * 获取用户信息
 * @returns Promise
 */
export const getUserInfo = () => {
    return request({
        method: 'GET',
        url: `/v1_0/user`,
      
    })
}

/**
 * 获取用户频道列表
 * @returns Promise
 */
export const getUserChannels = () => {
    return request({
        method: 'GET',
        url: `/v1_0/user/channels`,

    })
}

/**
 * 关注用户
 * @returns Promise
 */
export const addFlow = target => {
    return request({
        method: 'POST',
        url: `/v1_0/user/followings`,
        data:{
            target
        }
    })
}

/**
 * 取消关注用户
 * @returns Promise
 */
export const deleteFlow = target => {
    return request({
        method: 'DELETE',
        url: `/v1_0/user/followings/${target}`
    })
}

/**
 * 获取用户个人资料
 * @returns Promise
 */
export const getUserProfile = () => {
    return request({
        method: 'GET',
        url: `/v1_0/user/profile`
    })
}

/**
 * 更新用户个人资料
 * @returns Promise
 */
export const updateUserProfile = data => {
    return request({
        method: 'PATCH',
        url: `/v1_0/user/profile`,
        data
    })
}

/**
 * 更新用户头像
 * @returns Promise
 */
export const updateUserPhoto = data => {
    return request({
        method: 'PATCH',
        url: `/v1_0/user/photo`,
        data
    })
}
