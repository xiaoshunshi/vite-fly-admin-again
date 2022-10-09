import Layout from '@/layout/index.vue'
import { permissionType } from './../types'
import { defineStore } from 'pinia'
import { getUserPermission, getUserInfo } from '@/api/loign'
import { constantRoutes } from '@/router'
import { RouteRecordRaw } from 'vue-router'
import { useUserStore } from './user'
// 匹配所有的vue文件

const modules = import.meta.glob('./../../views/**/*.vue')

export const usePermissionStore = defineStore({
  id: 'permissionState',
  state: (): permissionType => ({
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
        const useInfo = await getUserInfo()
        const UserStore = useUserStore()
        await UserStore.setInfo(useInfo.data)
        const result = await getUserPermission()
        const accessedRoutes: Array<RouteRecordRaw> = this.changeComponent(result.data)
        this.routes = constantRoutes.concat(accessedRoutes as Array<RouteRecordRaw>)
        this.addRoutes = accessedRoutes
        resolve(accessedRoutes)
      })
    },
    // 把请求回来的conponent路径转换为组件
    changeComponent(data: any) {
      data.forEach((item: any) => {
        if (item.component) {
          if (item.component === 'Layout') {
            item.component = Layout
          } else {
            item.component = this.loadView(item)
          }
        }
        if (item.children) {
          this.changeComponent(item.children)
        }
      })
      // const result = data.map((item:any) => {
      //   // item.component = import(item.component)
      //   return item
      // })
      // return result
      return data
    },
    // 提取views里面的文件，找到对应的文件懒加载函数并执行
    loadView(view: any) {
      let res
      for (const path in modules) {
        const dir = '/' + path.split('views/')[1]
        if (dir === view.component) {
          res = () => modules[path]()
        }
      }
      return res
    },
    // 清空路由
    clearRoutes() {
      this.routes = []
      this.addRoutes = []
      this.cacheRoutes = []
    }

  }
})
