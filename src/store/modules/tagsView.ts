import { defineStore } from 'pinia'
import { RouteRecordRaw } from 'vue-router'
import { tagsViewType } from '../types'
export const useTagsViewStore = defineStore({
  id: 'tagsView',
  state: ():tagsViewType => ({
    visitedViews: [],
    cachedViews: []
  }),
  actions: {
    addView(view:RouteRecordRaw) {
      this.addVisitedView(view)
    },
    addVisitedView(view:RouteRecordRaw) {
      if (this.visitedViews.some((v:RouteRecordRaw) => v.path === view.path)) return
      this.visitedViews.push(
        Object.assign({}, view, {
          title: view.meta?.title || 'no-name'
        })
      )
      if (view.meta?.keepAlive) {
        this.cachedViews.push(view.name as string)
      }
    },
    delView(view:RouteRecordRaw) {
      return new Promise((resolve) => {
        this.delVisitedView(view)
        this.delCachedView(view)
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews]
        })
      })
    },
    delVisitedView(view:RouteRecordRaw) {
      return new Promise((resolve) => {
        this.visitedViews = this.visitedViews.filter((v) => {
          return v.path !== view.path || v.meta?.affix
        })
        this.cachedViews = this.cachedViews.filter((v:any) => {
          return v.path !== view.path || v.meta.affix
        })
        resolve([...this.visitedViews])
      })
    },
    delCachedView(view:any) {
      return new Promise((resolve) => {
        const index = this.cachedViews.indexOf(view.name)
        index > -1 && this.cachedViews.splice(index, 1)
        resolve([...this.cachedViews])
      })
    },
    delAllViews() {
      return new Promise((resolve) => {
        this.visitedViews = this.visitedViews.filter((v:RouteRecordRaw) => v.meta?.affix)
        this.cachedViews = (this.visitedViews.filter((v:any) => v.meta.affix)) as any
        resolve([...this.visitedViews])
      })
    },
    updateVisitedView(view:RouteRecordRaw) {
      for (let v of this.visitedViews) {
        if (v.path === view.path) {
          v = Object.assign(v, view)
          break
        }
      }
    },
    removeView(routes:Array<string>) {
      return new Promise((resolve) => {
        this.visitedViews = this.visitedViews.filter((item) => !routes.includes(item.path))
        resolve(null)
      })
    }
  }

})
