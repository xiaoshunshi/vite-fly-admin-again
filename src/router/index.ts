import {
  createRouter,
  createWebHashHistory
} from 'vue-router'

const constantRoutes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import( '@/views/login/index.vue' ),
    meta: {
      hidden: true,
      title: '登录'
    }
  }
]

const router = createRouter( {
  history: createWebHashHistory( ),
  routes: constantRoutes,
  scrollBehavior: () => ( { left: 0, top: 0 } )
} )

export default router

