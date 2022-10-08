import { defineStore } from 'pinia'
import { getUserPermission } from '@/api/loign'
export const usePermissionStore = defineStore({
  id: 'permissionState',
  state: () => ({
    // 路由
    routes: [],
    // 动态路由
    addRoutes: [],
    // 缓存路由
    cacheRoutes: {}
  }),
  getters: {
    permission_routes: (state) => {
      return state.routes
    }
  },
  actions: {
    generateRoutes() {
      return new Promise(async resolve => {
        await getUserPermission()
        resolve(123)
      })
    }
  }
})
