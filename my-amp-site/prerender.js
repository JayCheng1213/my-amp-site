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

  // 從 nas-media/project.json 動態讀取所有專案 id
  const projectJsonPath = path.resolve(__dirname, 'nas-media/project.json')
  let projectRoutes = []
  
  try {
    const rawData = fs.readFileSync(projectJsonPath, 'utf-8')
    const projects = JSON.parse(rawData)
    projectRoutes = projects.map(p => `/project/${p.id}`)
    console.log(`[Prerender] Successfully loaded ${projectRoutes.length} projects from JSON.`)
  } catch (err) {
    console.error('[Prerender] Warning: Could not read project.json, using fallback routes.', err)
  }

  // 結合首頁、bio 與動態讀取到的所有專案路由
  const routes = [
    '/',
    '/project/bio',
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
})