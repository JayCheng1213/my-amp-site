import fs from 'fs'
import path from 'path'
import http from 'http'
import { fileURLToPath } from 'url'
import puppeteer from 'puppeteer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PORT = 4173
const DIST_DIR = path.resolve(__dirname, 'dist')

// 啟動一個極速的本地靜態伺服器來讀取剛剛 build 好的 dist
const server = http.createServer((req, res) => {
  let filePath = path.join(DIST_DIR, req.url === '/' ? 'index.html' : req.url)
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(DIST_DIR, 'index.html') // SPA 路由 fallback
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

  // 🟢 在這裡列出你所有需要預渲染的專案路由！
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
    const html = await page.content()

    let targetPath
    if (route === '/') {
      targetPath = path.join(DIST_DIR, 'index.html')
    } else {
      const dir = path.join(DIST_DIR, route)
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