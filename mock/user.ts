import { MockMethod } from 'vite-plugin-mock'
type mapType = {
  id: number;
  avatar: string;
  name: string;
  phone: string;
  email: string;
  identity: string;
  roles: string[];
}

const userInfo = (): mapType => {
  const result: mapType = {
    id: 9527,
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: '灰是小灰灰的灰',
    phone: '15988888888',
    email: '454539387@qq.com',
    identity: '',
    roles: ['admin']
  }
  return result
}
type result = {
  id: string;
  method: number;
  deviceType: string;
  deviceOs: string;
  loginAddr: string;
  loginTime: string;
}

const list = () => {
  const result: result[] = []
  const total: number = 10000 * 0.01
  for (let i = 1; i <= total; i++) {
    const item = {
      id: '@increment',
      method: i % 4,
      deviceType: '@pick(["web", "glass", "mobile", "desktop", "others"])', // 设备名称
      deviceOs: '@pick(["win10", "win11", "ios", "android", "others"])', // 系统
      loginAddr: '@city(true)', // 登录地点
      loginTime: ' @datetime()' // 最后登录时间
    }
    result.push(item)
  }
  return result
}

interface UserPermissionResultType {
  path: string
  name: string
  component?: string
  meta: any
  redirect?: string
  children?: Array<UserPermissionResultType>
}

const UserPermission = () => {
  const UserPermissionResult: Array<UserPermissionResultType> = [

    {
      path: '/dictionary',
      name: '基础配置',
      redirect: '/dictionary/pathConfig',
      component: 'Layout',
      meta: { title: '基础配置', icon: 'film', affix: true },
      children: [
        {
          path: '/dictionary/pathConfig',
          name: '路径配置',
          component: '/dictionary/pathConfig/index.vue',
          meta: { title: '路径配置', icon: 'film', affix: true }
        },
        {
          path: '/dictionary/permissionConfig',
          name: '权限配置',
          component: '/dictionary/permissionConfig/index.vue',
          meta: { title: '权限配置', icon: 'film', affix: true }
        }
      ]
    }

  ]
  return UserPermissionResult
}

export default [

  // 登录
  {
    url: '/api/user/login',
    type: 'post',
    response: () => {
      return {
        code: 200,
        message: 'success',
        data: {
          token: '9ce3b6ed-332f-7C48-241b-eD6583E33B3A'
        }
      }
    }
  },
  // 获取用户信息
  {
    url: '/api/getUserInfo',
    type: 'get',
    response: () => {
      return {
        code: 200,
        message: 'success',
        data: userInfo()
      }
    }
  },
  // 登录获取路由权限
  {
    url: '/api/user/getUserPermission',
    type: 'get',
    response: () => {
      return {
        code: 200,
        message: 'success',
        data: UserPermission()
      }
    }
  },
  // ceshi
  {
    url: '/api/test',
    type: 'get',
    response: () => {
      return {
        code: 5004,
        message: 'fail',
        data: []
      }
    }
  },

  {
    url: '/api/logout',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: 'success'
      }
    }
  },

  {
    url: '/api/login/history',
    type: 'get',
    response: () => {
      return {
        code: 200,
        message: 'success',
        data: list()
      }
    }
  }

] as MockMethod[]
