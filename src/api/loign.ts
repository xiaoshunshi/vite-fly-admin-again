import http from '@/utils/request'
import { requestType } from './index'

// 登录
export function login(data?: object): requestType {
  return http.request({
    method: 'post',
    url: '/user/login',
    data
  })
}
// 获取用户信息
export function getUserInfo(data?: object): requestType {
  return http.request({
    method: 'get',
    url: '/user/getUserInfo',
    data
  })
}
// 获取路由
export function getUserPermission(): requestType {
  return http.request({
    method: 'post',
    url: '/user/getUserPermission'
  })
}
