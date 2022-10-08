export type userType = {
  token: string | null
  uid?: string
  avatar?: string
  name?: string
  phone?: string
  email?: string
  identity?: string
  roles?: string[],
  userInfo:Object
}
type themeConfig = {
  globalComSize:string
}
export type settingType = {
  isCollapse:boolean
  withoutAnimation:boolean
  device:string
  isReload:boolean
  themeConfig:themeConfig
}

