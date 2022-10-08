import Cookies from 'js-cookie'
import { getEnvs } from '@/utils/envs'
const { hostname } = window.location
interface ProxyCookie {
  getPrefix():string
  getAll():any
  clearAll():void
  get(key: string, hasPrefix: boolean): any
  set(key:string, value:any, params:any):any
  remove(key:string, hasPrefix:boolean):any
}

class CookieProxy implements ProxyCookie {
  protected prefix:string
  protected baseParams: any
  constructor() {
    this.prefix = this.getPrefix()
    this.baseParams = {
      expires: 7,
      path: '/',
      domain: hostname || undefined
      // Secure : true,
      // SameSite : 'none',
    }
  }

  // 根据环境添加token的前缀
  getPrefix():string {
    const env = getEnvs()
    return env.envStr === 'dev' ? 'dev_' : 'pro_'
  }

  get(key:string, hasPrefix = true) {
    const keyStr = hasPrefix ? this.prefix + '' + key : key
    return Cookies.get(keyStr)
  }

  set(key: string, value: any, params?: any) {
    const options = params === undefined ? this.baseParams : params
    const keyStr = this.prefix + '' + key
    return Cookies.set(keyStr, value, options)
  }

  // 获取全部cookise
  getAll():any {
    return Cookies.get()
  }

  clearAll(): void {
    const keys = Object.keys(this.getAll())
    keys.forEach(key => {
      this.remove(key, false)
    })
  }

  remove(key: string, hasPrefix = true) {
    const keyStr = !hasPrefix ? key : this.prefix + '' + key
    return Cookies.remove(keyStr, {
      path: '/',
      domain: hostname
    })
  }
}

const cookies = new CookieProxy()

export default cookies
