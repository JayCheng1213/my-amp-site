import fs from 'fs'
import path from 'path'
import http from 'http'
import { fileURLToPath } from 'url'
import puppeteer from 'puppeteer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PORT = 4173
const DIST_DIR = path.resolve(__dirname, 'dist')
const SITE_URL = 'https://jaycheng1213.synology.me'

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.md': 'text/markdown; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
}

// 啟動本地靜態伺服器
const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split('?')[0])

  // 模擬 NAS 環境：/nas-media/ 由專案目錄下的實體檔案提供（repo 內僅同步 projects.json）
  let filePath = urlPath.startsWith('/nas-media/')
    ? path.join(__dirname, urlPath)
    : path.join(DIST_DIR, urlPath === '/' ? 'index.html' : urlPath)

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html')
  }

  if (!fs.existsSync(filePath)) {
    if (path.extname(filePath)) {
      // 缺少實體資源（如 markdown、圖片）時回 404，讓前端走既有的容錯畫面
      res.writeHead(404)
      res.end('Not found')
      return
    }
    // 無副檔名視為 SPA 路由，退回 index.html
    filePath = path.join(DIST_DIR, 'index.html')
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500)
      res.end('Error loading file')
    } else {
      res.writeHead(200, { 'Content-Type': MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream' })
      res.end(data)
    }
  })
})

server.listen(PORT, async () => {
  console.log(`[Prerender] Local server started at http://localhost:${PORT}`)

  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })

  // 從 nas-media/project.json 動態讀取所有專案 id
  // 從 nas-media/project.json 動態讀取（加裝防呆機制）
  const projectJsonPath = path.resolve(__dirname, 'nas-media/projects.json')
  let projectRoutes = []
  
  try {
    if (fs.existsSync(projectJsonPath)) {
      const rawData = fs.readFileSync(projectJsonPath, 'utf-8')
      const projects = JSON.parse(rawData)
      // 一律帶結尾斜線，與 NAS 上的實體目錄格式一致
      projectRoutes = projects.map(p => `/project/${p.id}/`)
      console.log(`[Prerender] Successfully loaded ${projectRoutes.length} projects from JSON.`)
    } else {
      console.log('[Prerender] Notice: nas-media/projects.json not found locally/cloud, skipping dynamic routes.')
    }
  } catch (err) {
    console.error('[Prerender] Warning: Error reading projects.json, using fallback routes.')
  }

  // 結合首頁、bio 與動態讀取到的所有專案路由
  const routes = [
    '/',
    '/project/bio/',
    ...projectRoutes
  ]

  for (const route of routes) {
    const page = await browser.newPage()
    await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle0' })
    
    // 給 Vue Router 緩衝時間，確保動態參數渲染完成
    await new Promise(r => setTimeout(r, 800))

    const html = await page.content()

    let targetPath
    if (route === '/') {
      targetPath = path.join(DIST_DIR, 'index.html')
    } else {
      const cleanRoute = route.startsWith('/') ? route.slice(1) : route
      const dir = path.join(DIST_DIR, cleanRoute)
      fs.mkdirSync(dir, { recursive: true })
      targetPath = path.join(dir, 'index.html')
    }

    fs.writeFileSync(targetPath, html)
    console.log(`[Prerender] Generated: ${route} -> ${targetPath}`)
    await page.close()
  }

  await browser.close()
  server.close()
  console.log('[Prerender] All routes successfully prerendered!')

  // 產生 sitemap.xml 供 Google Search Console 提交
  const today = new Date().toISOString().slice(0, 10)
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>\n    <loc>${SITE_URL}${route}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`).join('\n')}
</urlset>
`
  fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemapXml)
  console.log(`[Prerender] Generated: sitemap.xml (${routes.length} urls)`)
})