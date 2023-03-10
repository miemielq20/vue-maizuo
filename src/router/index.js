import Vue from 'vue'
import VueRouter from 'vue-router'
/* import Center from '@/views/Center.vue' */
import Order from '@/views/Order.vue'
import Films from '@/views/Films.vue'
import NowPlaying from '@/views/films/NowPlaying.vue'
import ComingSoon from '@/views/films/ComingSoon.vue'
import Cinemas from '@/views/Cinemas.vue'
import Search from '@/views/Search.vue'
import Detail from '@/views/Detail.vue'
import Login from '@/views/Login.vue'
import City from '@/views/City.vue'

Vue.use(VueRouter)// 注册路由插件 两个全局 router-view  router-link

const routes = [
  {
    path: '/center',
    component: () => import('@/views/Center.vue'),
    // 懒加载 ：到指定路径才会加载对应的组件 ，解决单页面项目主页加载过慢问题
    meta: {
      isRequired: true
    }
    /* 路由独享拦截 * /
      /*  beforeEnter: (to, from, next) => {

      } */
  },
  {
    path: '/order',
    component: Order,
    meta: {
      isRequired: true
    }
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/films',
    component: Films,
    /* 嵌套路由 */
    children: [
      {
        path: '/films/nowplaying',
        component: NowPlaying
      },
      {
        path: '/films/comingsoon',
        component: ComingSoon
      },
      {
        path: '/films',
        redirect: '/films/nowplaying'
      }
    ]
  },
  {
    path: '/city',
    component: City
  },
  {
    name: 'myDetail', // 命名路由
    path: '/detail/:id', // 动态二级路由
    component: Detail
  },
  {
    path: '/cinemas',
    component: Cinemas
  },
  {
    path: '/cinemas/search',
    component: Search
  },
  /* 重定向 */
  {
    path: '*',
    redirect: '/films/nowplaying'
  }
]

const router = new VueRouter({
  mode: 'history', // 路由模式  history  hash(路径带#)
  routes
})

/* 全局拦截 */
router.beforeEach((to, from, next) => {
  if (to.meta.isRequired) {
    // 判断 本地是否有token字段
    if (localStorage.getItem('token')) {
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
})

export default router
