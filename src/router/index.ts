import {
  createRouter,
  RouteRecordRaw,
  createWebHashHistory
} from 'vue-router'
import Layout from '@/layout/index.vue'

// 扩展继承属性 hidden
interface extendRoute{
  hidden?: boolean
}

export const constantRoutes :Array<RouteRecordRaw & extendRoute> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import( '@/views/login/index.vue' ),
    hidden: true,
    meta: { title: '登录' }
  },
  {
    path: '/',
    name: 'layout',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import( '@/views/home/index.vue' ),
        name: 'home',
        meta: { title: '首页', icon: 'film', affix: true, role: ['other'] }
      }
    ]
  }
]

// const constantRoutes = [
//   {
//     path: '/',
//     redirect: '/login'
//   },
//   {
//     path: '/login',
//     name: 'Login',
//     component: () => import( '@/views/login/index.vue' ),
//     meta: {
//       hidden: true,
//       title: '登录'
//     }
//   }
// ]

const router = createRouter( {
  history: createWebHashHistory( ),
  routes: constantRoutes,
  scrollBehavior: () => ( { left: 0, top: 0 } )
} )

export default router

