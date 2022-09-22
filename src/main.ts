import { createApp } from 'vue'
import router from './router' // 路由
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

const app = createApp( App )

app.use( ElementPlus )
app.use( router )
app.mount( '#app' )
