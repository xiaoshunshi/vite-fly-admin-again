import { defineStore } from 'pinia'
import { userType } from '../types'

import { login } from '@/api/loign'

import cookies from '@/utils/cookies'
export const useUserStore = defineStore({
  // id: 必须的，在所有 Store 中唯一
  id: 'users',
  // state: 返回对象的函数
  state: ():userType => {
    return {
      // 登录token
      token: null,
      // 登录用户信息
      userInfo: {},
      // 角色
      roles: []
    }
  },
  getters: {},
  // 可以同步 也可以异步
  actions: {
    // 登录
    async login(userInfo:any) {
      const { data } = await login(userInfo)
      const { token } = data

      this.setToken(token)

      // const { username } = userInfo
      // return new Promise(async(resolve) => {
      //   this.token = username
      //   this.userInfo = userInfo
      //   await this.getRoles()
      //   resolve(username)
      // })
    },
    setToken(token:string) {
      cookies.set('token', token)
    },
    // 获取用户授权角色信息，实际应用中 可以通过token通过请求接口在这里获取用户信息
    getRoles() {
      return new Promise((resolve) => {
        // 获取权限列表 默认就是超级管理员，因为没有进行接口请求 写死
        this.roles = ['admin']
        resolve(this.roles)
      })
    },
    // 获取用户信息 ，如实际应用中 可以通过token通过请求接口在这里获取用户信息
    setInfo(userInfo:any) {
      return new Promise((resolve) => {
        this.userInfo = userInfo
        resolve(userInfo)
      })
    },
    // 退出
    logout() {
      return new Promise((resolve) => {
        cookies.clearAll()
        this.token = null
        this.userInfo = {}
        this.roles = []
        resolve(null)
      })
    }
  }

})

