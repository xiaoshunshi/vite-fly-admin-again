import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import eslintPlugin from 'vite-plugin-eslint'
// 引入svg的icon
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// 项目中使用mock
import { viteMockServe } from 'vite-plugin-mock'
import { isMock } from './mock/config'
// 打包分析
import { visualizer } from 'rollup-plugin-visualizer'
const resolve = (dir: string) => path.join(__dirname, dir)
// https://vitejs.dev/config/
export default ({ mode }:any) => {
  // console.log(mode, 'mode') // development
  // console.log(loadEnv(mode, process.cwd()), 'cwd')
  return defineConfig({
    plugins: [
      vue(),
      visualizer({
        open: true, // 注意这里要设置为true，否则无效
        gzipSize: true,
        brotliSize: true
      }),
      viteMockServe({
        mockPath: 'mock', // 解析，路径可根据实际变动
        localEnabled: mode === 'development' ? isMock : false, // 开发环境
        prodEnabled: false, // 生产环境设为true，也可以根据官方文档格式
        injectCode:
        ` import { setupProdMockServer } from './src/mock';
          setupProdMockServer(); `,
        watchFiles: true, // 监听文件内容变更
        injectFile: resolve('src/main.ts')
      }
      ),
      eslintPlugin({
        cache: false
      }),
      // * 使用 svg 图标
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/icons/svg')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]'
      })
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "./src/styles/index.scss" as *;`
        }
      }
    },
    resolve: {
      alias: {
        '@': resolve('src')
      },
      // 忽略后缀名的配置选项, 添加 .vue 选项时要记得原本默认忽略的选项也要手动写入
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    server: {
      // 服务器主机名
      host: '0.0.0.0',
      // 端口号
      port: 3088,
      // 设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口
      strictPort: false,
      // 服务器启动时自动在浏览器中打开应用程序,当此值为字符串时，会被用作 URL 的路径名
      open: true,
      // 自定义代理规则
      proxy: {
        // 选项写法
        '/api': {
          target: 'https://www.fastmock.site/mock/935974cbe8285109b2162d84b5d52c3c/api',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
        }
      }
    }
  })
}
