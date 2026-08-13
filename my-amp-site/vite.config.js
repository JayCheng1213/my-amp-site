import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// 每次建置產生唯一 ID，同時烘焙進 bundle 並寫出 version.json，
// 讓前端能偵測到「HTML 被瀏覽器快取住、跑在舊版程式碼」的情況
const BUILD_ID = Date.now().toString(36)

export default defineConfig({
  base: '/',
  define: {
    __BUILD_ID__: JSON.stringify(BUILD_ID)
  },
  plugins: [
    vue(),
    tailwindcss(),
    {
      name: 'emit-version-json',
      generateBundle() {
        this.emitFile({
          type: 'asset',
          fileName: 'version.json',
          source: JSON.stringify({ buildId: BUILD_ID })
        })
      }
    }
  ],
})
