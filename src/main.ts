import { createApp } from 'vue'
import router from './router' // 路由
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import pinia from './store'
// 注册icon组件
import * as ElIconsModules from '@element-plus/icons-vue'
// svg-icons注册导入
import 'virtual:svg-icons-register'
import SvgIcon from '@/components/SvgIcon/index.vue' // svg component

const app = createApp(App)

app.use(ElementPlus)
app.component('SvgIcon', SvgIcon)
// 全局注册element-plus icon图标组件
Object.keys(ElIconsModules).forEach((key) => {
  // 循环遍历组件名称
  if (key !== 'Menu') {
    // 如果不是图标组件不是Menu，就跳过，否则加上ICon的后缀
    app.component(key, ElIconsModules[key])
  } else {
    app.component(key + 'Icon', ElIconsModules[key])
  }
})
app.use(pinia)
app.use(router)
app.mount('#app')
