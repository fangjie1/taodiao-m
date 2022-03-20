import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'
import { get } from 'lodash'

Vue.use(Vuex)

const TOKEN_KEY = 'TOUTIAO_USER'
const USER_INFO = 'TOUTIAO_USERINFO'
export default new Vuex.Store({
  state: {
    user: getItem(TOKEN_KEY),
    cachePages: ['LayoutIndex'],
    userInfo: getItem(USER_INFO),
  },
  mutations: {
    setUser(state, data) {
      state.user = data
      setItem(TOKEN_KEY, state.user)
    },
    setUserInfo(state, data) {
      state.userInfo = data
      setItem(USER_INFO, state.userInfo)
    },
    // 添加缓存页面
    addCachePage(state, pageName) {
      if (!state.cachePages.includes(pageName)) {
        state.cachePages.push(pageName)
      }
    },
    // 移除缓存页面
    removeCachePage(state, pageName) {
      const index = state.cachePages.indexOf(pageName)
      if (index !== -1) {
        state.cachePages.splice(index, 1)
      }
    },
  },
  actions: {},
  modules: {},
})
