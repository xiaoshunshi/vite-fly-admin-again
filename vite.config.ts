import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import eslintPlugin from 'vite-plugin-eslint'
const resolve = ( dir: string ) => path.join( __dirname, dir )
// https://vitejs.dev/config/
export default defineConfig( {
  plugins: [
    vue(),
    eslintPlugin( {
      cache: false
    } )
  ],
  resolve: {
    alias: {
      '@': resolve( 'src' )
    }
  }
} )
