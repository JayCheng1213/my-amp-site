import fs from 'fs'
import path from 'path'
import http from 'http'
import { fileURLToPath } from 'url'
import puppeteer from 'puppeteer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PORT = 4173
const DIST_DIR = path.resolve(__dirname, 'dist')

// 啟動本地靜態伺服器
const server = http.createServer((req, res) => {
  let filePath = path.join(DIST_DIR, req.url === '/' ? 'index.html' : req.url)
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(DIST_DIR, 'index.html')
  }
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500)
      res.end('Error loading file')
    } else {
      res.writeHead(200)
      res.end(data)
    }
  })
})

server.listen(PORT, async () => {
  console.log(`[Prerender] Local server started at http://localhost:${PORT}`)

  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })

  const routes = [
    '/',
    '/project/bio',
    '/project/1626',
    '/project/2a3',
    '/project/6ra3'
  ]

  for (const route of routes) {
    const page = await browser.newPage()
    await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle0' })
    
    // 如果是首頁，多等一秒讓重新導向或穩定
    if (route === '/') {
      await new Promise(r => setTimeout(r, 500))
    }

    const html = await page.content()

    let targetPath
    if (route === '/') {
      targetPath = path.join(DIST_DIR, 'index.html')
    } else {
      // 確保跨平台路徑正確，去掉開頭的斜線
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
})