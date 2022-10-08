import { permissionType } from './../types'
import { defineStore } from 'pinia'
import { getUserPermission } from '@/api/loign'
import { constantRoutes } from '@/router'
import { RouteRecordRaw } from 'vue-router'

export const usePermissionStore = defineStore({
  id: 'permissionState',
  state: ():permissionType => ({
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
    // 生成完整的路由表
    generateRoutes() {
      return new Promise(async resolve => {
        const result = await getUserPermission()
        const accessedRoutes:Array<RouteRecordRaw> = this.changeComponent(result.data)
        this.routes = constantRoutes.concat(accessedRoutes as Array<RouteRecordRaw>)
        this.addRoutes = accessedRoutes
        resolve(accessedRoutes)
      })
    },
    // 把请求回来的conponent路径转换为组件
    changeComponent(data:any) {
      const result = data.map((item:any) => {
        // item.component = import(item.component)
        return item
      })
      return result
    }
  }
})
