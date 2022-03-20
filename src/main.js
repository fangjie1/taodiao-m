import '@/utils/console'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.less'
import 'highlight.js/styles/default.css' // 代码高亮的样式

import Vant from 'vant'
import 'vant/lib/index.css'
import { Lazyload } from 'vant'
Vue.use(Lazyload)
Vue.use(Vant)

import 'amfe-flexible'
import './utils/dayjs'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
