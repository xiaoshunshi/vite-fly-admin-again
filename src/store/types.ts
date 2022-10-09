import { RouteRecordRaw } from 'vue-router'
export type userInfoType = {
  id: number;
  avatar: string;
  username: string;
  phone: string;
  email: string;
  identity: string;
  roles: string[];
}
export type userType = {
  token: string | null
  uid?: string
  avatar?: string
  name?: string
  phone?: string
  email?: string
  identity?: string
  roles?: string[],
  userInfo:userInfoType | Object
}
type themeConfig = {
  mode:string
  showTag:boolean
  showLogo:boolean
  globalComSize:string
  uniqueOpened:boolean
  fixedHeader:boolean
}
export type settingType = {
  isCollapse:boolean
  withoutAnimation:boolean
  device:string
  isReload:boolean
  themeConfig:themeConfig
}

export type permissionType = {
  // 路由
  routes: Array<RouteRecordRaw>,
  // 动态路由
  addRoutes: Array<RouteRecordRaw>,
  // 缓存路由
  cacheRoutes: any
}

export type tagsViewType = {
  visitedViews:Array<RouteRecordRaw>,
  cachedViews:Array<string>
}

