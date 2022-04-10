import Vue from 'vue'
import VueRouter from 'vue-router'
import { Dialog } from 'vant'
import store from '@/store'
import { toPairs } from 'lodash'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
    // name: 'layout',
    component: () => import(/* webpackChunkName: "layout" */ '@/views/layout'),
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/home'),
        meta: { requiresAuth: false, index: 0 },
      },
      {
        path: '/my',
        name: 'my',
        component: () => import(/* webpackChunkName: "my" */ '@/views/my'),
        meta: { requiresAuth: false, index: 0 },
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login'),
    beforeEnter: (to, from, next) => {
      if (store.state.user) {
        next('/')
      } else {
        next()
      }
    },
    meta: { requiresAuth: false, index: 1 },
  },
  {
    path: '/search',
    name: 'search',
    component: () => import(/* webpackChunkName: "search" */ '@/views/search'),
    meta: { requiresAuth: false, index: 1 },
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () =>
      import(/* webpackChunkName: "article" */ '@/views/article'),
    props: true, //开启Props传参,把路由参数映射到组件的props参数中,
    meta: { index: 1 },
  },
  {
    path: '/user/profile',
    name: 'user-profile',
    component: () =>
      import(/* webpackChunkName: "user-profile" */ '@/views/user-profile'),
    meta: { requiresAuth: true, index: 1 },
  },
  {
    path: '/user/chat',
    name: 'user-chat',
    component: () =>
      import(/* webpackChunkName: "user-chat" */ '@/views/user-chat'),
    meta: { requiresAuth: true, index: 1 },
  },
]

const router = new VueRouter({
  routes,
})

router.beforeEach((to, from, next) => {
  // 判断页面是否已经登录
  if (store.state.user) {
    // 登录了直接通过
    return next()
  }
  if (to.meta.requiresAuth) {
    // 没有登录，提示登录
    Dialog.confirm({
      title: '访问提示',
      message: '该功能需要登录才能访问，确认登录吗？',
    })
      .then(() => {
        router.replace({
          name: 'login',
          query: {
            redirect: router.currentRoute.fullPath,
          },
        })
      })
      .catch((e) => {
        next(false)
      })
  } else {
    next()
  }
})

export default router
