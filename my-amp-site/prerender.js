import fs from 'fs'
import path from 'path'
import http from 'http'
import { fileURLToPath } from 'url'
import puppeteer from 'puppeteer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PORT = 4173
const DIST_DIR = path.resolve(__dirname, 'dist')
const SITE_URL = 'https://jaycheng1213.synology.me'
// 建置期間暫存從線上抓回的文章，讓預渲染能烘焙真實內容（.md 不進 repo）
const CONTENT_CACHE = path.resolve(__dirname, '.prerender-content')

const fetchText = async (url) => {
  const res = await fetch(url, { cache: 'no-store' })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.text()
}

const cacheWrite = (urlPath, body) => {
  const target = path.join(CONTENT_CACHE, urlPath)
  fs.mkdirSync(path.dirname(target), { recursive: true })
  fs.writeFileSync(target, body)
}

/**
 * 從線上網站抓取 projects.json 與所有 markdown，暫存供預渲染使用。
 * 文章原始檔只存在 NAS，不進版控，因此 CI 於建置時即時取得。
 */
const hydrateContent = async () => {
  fs.rmSync(CONTENT_CACHE, { recursive: true, force: true })

  let projects = null
  try {
    const raw = await fetchText(`${SITE_URL}/nas-media/projects.json`)
    projects = JSON.parse(raw)
    cacheWrite('/nas-media/projects.json', raw)
    console.log(`[Prerender] 已從線上取得 projects.json（${projects.length} 個專案）`)
  } catch (err) {
    console.warn(`[Prerender] 無法從線上取得 projects.json（${err.message}），改用本機副本。`)
    const local = path.resolve(__dirname, 'nas-media/projects.json')
    if (!fs.existsSync(local)) {
      console.error('[Prerender] 本機也沒有 projects.json，無法建置。')
      process.exit(1)
    }
    projects = JSON.parse(fs.readFileSync(local, 'utf-8'))
  }

  // bio 是硬編碼的特例專案，其內容位於 mydata 資料夾。
  // 文章本文為必要內容；gallery.md 屬選用（部分專案沒有相簿）。
  const articles = ['/nas-media/posts/mydata/mydata.md']
  const galleries = ['/nas-media/posts/mydata/gallery.md']
  for (const p of projects) {
    if (p.markdownPath) articles.push(p.markdownPath)
    galleries.push(`/nas-media/posts/${p.id}/gallery.md`)
  }

  const missing = []
  const grab = async (docPath, required) => {
    try {
      cacheWrite(docPath, await fetchText(`${SITE_URL}${docPath}`))
      return true
    } catch {
      if (required) missing.push(docPath)
      return false
    }
  }

  const results = await Promise.all([
    ...articles.map(p => grab(p, true)),
    ...galleries.map(p => grab(p, false))
  ])
  const galleryCount = results.slice(articles.length).filter(Boolean).length

  console.log(
    `[Prerender] 已取得文章 ${articles.length - missing.length}/${articles.length} 份` +
    `、相簿 ${galleryCount}/${galleries.length} 份。`
  )

  if (missing.length === articles.length) {
    console.error('[Prerender] 完全無法取得文章內容（NAS 可能離線），中止建置以免產出殘缺的靜態頁。')
    process.exit(1)
  }
  if (missing.length > 0) {
    console.warn(`[Prerender] 以下文章取得失敗，該頁將烘焙為讀取失敗畫面：\n  ${missing.join('\n  ')}`)
  }

  return projects
}

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

  // 模擬 NAS 環境：/nas-media/ 優先取用建置期抓回的內容，其次才是本機副本
  let filePath
  if (urlPath.startsWith('/nas-media/')) {
    const cached = path.join(CONTENT_CACHE, urlPath)
    filePath = fs.existsSync(cached) ? cached : path.join(__dirname, urlPath)
  } else {
    filePath = path.join(DIST_DIR, urlPath === '/' ? 'index.html' : urlPath)
  }

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

const projects = await hydrateContent()

server.listen(PORT, async () => {
  console.log(`[Prerender] Local server started at http://localhost:${PORT}`)

  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })

  // 一律帶結尾斜線，與 NAS 上的實體目錄格式一致
  const projectRoutes = projects.map(p => `/project/${p.id}/`)

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

  // 建置期暫存的文章內容不需保留
  fs.rmSync(CONTENT_CACHE, { recursive: true, force: true })
})