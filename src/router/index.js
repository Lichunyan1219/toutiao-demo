import Vue from 'vue'
/* eslint-disable */

import VueRouter from 'vue-router'
// import Login from '@/views/Login'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/Login')
  },
  {
    path: '/',
    component: () => import('@/views/Layout'),
    redirect: '/my',
    children: [
      {
        path: '/my',
        component: () => import('@/views/My')
      },
      {
        path: '/home',
        component: () => import('@/views/Home')
      },
      {
        path: '/video',
        component: () => import('@/views/Video')
      },
      {
        path: '/qa',
        component: () => import('@/views/Qa')
      }
    ]
  },
  {
    path: '/search',
    component: () => import('@/views/Search')
  },
  {
    path: '/articledetails/:id',
    component: () => import('@/views/ArticleDetails')
  },
  {
    path: '/editdata',
    component: () => import('@/views/EditData')
  }
]

const router = new VueRouter({
  routes
})

export default router
