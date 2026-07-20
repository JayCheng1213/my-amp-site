import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import vitePrerender from 'vite-plugin-prerender'
import path from 'path'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    // 🟢 加上預渲染套件
    vitePrerender({
      // 告訴套件打包後的靜態檔案在哪裡
      staticDir: path.join(__dirname, 'dist'),
      
      // 🟢 列出所有你希望產生「實體目錄」的網址
      // 如果你還有其他專案，請繼續加在這邊
      routes: [
        '/',
        '/project/bio',
        '/project/1626', // 你的 1626 Darling 專案
        '/project/2a3', 
        '/project/6ra3',
      ],
      
      // 針對無頭瀏覽器的設定 (確保在 GitHub Actions 內能順利啟動)
      puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      }
    })
  ]
})