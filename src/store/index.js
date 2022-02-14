import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)

const TOKEN_KEY = 'TOUTIAO_USER'

export default new Vuex.Store({
  state: {
    user: getItem(TOKEN_KEY),
    cachePages:['LayoutIndex']
  },
  mutations: {
    setUser(state, data) {
      state.user = data
      setItem(TOKEN_KEY, state.user)
    },
    // 添加缓存页面
    addCachePage (state,pageName){
      if (!state.cachePages.includes(pageName)){
        state.cachePages.push(pageName)
      }
    },
    // 移除缓存页面
    removeCachePage (state, pageName) {
      const index = state.cachePages.indexOf(pageName)
      if (index!==-1) {
        state.cachePages.splice(index,1)
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
