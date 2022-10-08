import router from './router'
import NProgress from '@/utils/progress'
import cookies from '@/utils/cookies'
// 获取权限数据
import { usePermissionStore } from '@/store/modules/permission'

const whiteList = ['/login']

router.beforeEach(async(to, from, next) => {
  NProgress.start()

  if (typeof to.meta.title === 'string') {
    document.title = to.meta.title || 'vue-fly-admin'
  }

  const hasToken = cookies.get('token')
  // 有token
  if (hasToken) {
    // 跳转的是登录页面
    if (to.path === '/login') {
      // 直接重定向到主页
      next({ path: '/' })
      NProgress.done()
    } else {
      // 在这添加异步路由
      try {
        const PermissionStore = usePermissionStore()
        if (!PermissionStore.routes.length) {
        // 如果为0，说明没有添加进去路由
          const accessRoutes = await PermissionStore.generateRoutes()
          console.log(accessRoutes)
        } else {
          next()
        }
      } catch (error) {
        next(`/login?redirect=${to.path}`)
      }
    }
  } else {
    // 没有token

    if (whiteList.indexOf(to.path) !== -1) {
      // 在白名单内部，放行
      next()
    } else {
      // 跳转到登录页面
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
