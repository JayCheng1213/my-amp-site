#!/usr/bin/env node
/**
 * 相片壓縮腳本 — 在上傳 NAS 前於本機執行
 *
 *   npm run optimize            (預設處理 D:/真空管專案)
 *   npm run optimize -- "路徑"   (指定其他來源資料夾)
 *
 * 會在每個專案資料夾內產生 _opt/ 子目錄，內含兩種尺寸：
 *   {檔名}-thumb.webp   800px 寬 — 相簿格子用
 *   {檔名}-large.webp  1800px 寬 — 燈箱用
 *
 * 另外會為「精選照片」多產一張社群分享用的 JPG：
 *   {檔名}-og.jpg      1200px 寬 — og:image 用（LINE / FB 對 WebP 支援不穩，故用 JPG）
 * 精選照片由 gallery.md 中標記 [COVER] 的項目決定，未標記則取第一張。
 *
 * 原圖保留不動（供「檢視原圖」連結與存檔）。
 * 已存在且比原圖新的變體會自動跳過，可重複執行。
 */
import fs from 'fs'
import path from 'path'
import sharp from 'sharp'
import { OPT_DIR, COVER_TAG } from '../site.config.js'

const SOURCE_DIR = process.argv[2] || 'D:/真空管專案'
const SOURCE_EXT = new Set(['.jpg', '.jpeg', '.png'])

const VARIANTS = [
  { suffix: 'thumb', width: 800, quality: 78 },
  { suffix: 'large', width: 1800, quality: 82 }
]

// 社群分享預覽圖：固定用 JPG，確保各家爬蟲都讀得到
const OG_VARIANT = { suffix: 'og', width: 1200, quality: 82 }

/**
 * 從 gallery.md 找出精選照片的檔名。
 * 標記方式為在說明文字前加上 [COVER]，例如：
 *   3.[COVER] 完工開聲照片。
 *   ![完工](3_IMG_xxx.jpg)
 *
 * 未標記時回傳 null，不產生社群分享圖 —— 未完工的專案通常沒有值得當門面的照片，
 * 由作者明確標記才產生，避免自動挑到備料照當分享預覽圖。
 */
function findCoverImage(dir) {
  const galleryPath = path.join(dir, 'gallery.md')
  if (!fs.existsSync(galleryPath)) return null

  const lines = fs.readFileSync(galleryPath, 'utf-8').split('\n').map(l => l.trim()).filter(Boolean)
  let coverPending = false

  for (const line of lines) {
    if (line.startsWith('![')) {
      if (!coverPending) continue
      const match = line.match(/!\[.*?\]\((.*?)\)/)
      if (match) return match[1]
    } else if (line.includes(COVER_TAG)) {
      coverPending = true
    }
  }

  return null
}

const fmtMB = bytes => (bytes / 1048576).toFixed(1) + 'MB'
const fmtKB = bytes => Math.round(bytes / 1024) + 'KB'

async function processImage(dir, file) {
  const srcPath = path.join(dir, file)
  const base = path.basename(file, path.extname(file))
  const outDir = path.join(dir, OPT_DIR)
  const srcStat = fs.statSync(srcPath)

  fs.mkdirSync(outDir, { recursive: true })

  let produced = 0
  let outBytes = 0

  for (const v of VARIANTS) {
    const outPath = path.join(outDir, `${base}-${v.suffix}.webp`)

    // 增量處理：變體比原圖新就跳過
    if (fs.existsSync(outPath) && fs.statSync(outPath).mtimeMs >= srcStat.mtimeMs) {
      outBytes += fs.statSync(outPath).size
      continue
    }

    await sharp(srcPath, { limitInputPixels: false })
      .rotate() // 依 EXIF 轉正，避免手機直拍的照片躺著
      .resize({ width: v.width, withoutEnlargement: true })
      .webp({ quality: v.quality })
      .toFile(outPath)

    outBytes += fs.statSync(outPath).size
    produced++
  }

  return { srcBytes: srcStat.size, outBytes, produced }
}

/** 為精選照片產生社群分享用的 JPG，並清掉換封面（或取消標記）後殘留的舊檔 */
async function processCover(dir, coverFile) {
  const outDir = path.join(dir, OPT_DIR)
  if (!fs.existsSync(outDir)) return { produced: 0, cover: null }

  const base = coverFile ? path.basename(coverFile, path.extname(coverFile)) : null
  const outName = base ? `${base}-${OG_VARIANT.suffix}.jpg` : null

  // 換過封面或取消標記時，移除不再使用的 og 檔
  for (const f of fs.readdirSync(outDir)) {
    if (f.endsWith(`-${OG_VARIANT.suffix}.jpg`) && f !== outName) {
      fs.unlinkSync(path.join(outDir, f))
    }
  }

  if (!coverFile) return { produced: 0, cover: null }

  const srcPath = path.join(dir, coverFile)
  if (!fs.existsSync(srcPath)) {
    console.warn(`[Optimize] ${path.basename(dir)}：gallery.md 指定的封面 ${coverFile} 不存在，已略過。`)
    return { produced: 0, cover: null }
  }

  const outPath = path.join(outDir, outName)
  if (fs.existsSync(outPath) && fs.statSync(outPath).mtimeMs >= fs.statSync(srcPath).mtimeMs) {
    return { produced: 0, cover: coverFile }
  }

  await sharp(srcPath, { limitInputPixels: false })
    .rotate()
    .resize({ width: OG_VARIANT.width, withoutEnlargement: true })
    .jpeg({ quality: OG_VARIANT.quality, mozjpeg: true })
    .toFile(outPath)

  return { produced: 1, cover: coverFile }
}

async function main() {
  if (!fs.existsSync(SOURCE_DIR)) {
    console.error(`[Optimize] 找不到來源資料夾：${SOURCE_DIR}`)
    process.exit(1)
  }

  const projects = fs.readdirSync(SOURCE_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name)

  let totalSrc = 0
  let totalOut = 0
  let totalProduced = 0

  for (const project of projects) {
    const dir = path.join(SOURCE_DIR, project)
    const images = fs.readdirSync(dir)
      .filter(f => SOURCE_EXT.has(path.extname(f).toLowerCase()))

    if (images.length === 0) continue

    let projSrc = 0
    let projOut = 0
    let projProduced = 0

    for (const file of images) {
      const { srcBytes, outBytes, produced } = await processImage(dir, file)
      projSrc += srcBytes
      projOut += outBytes
      projProduced += produced
    }

    // 精選照片（社群分享預覽圖）— 需在 gallery.md 明確標記 [COVER]
    const { produced: coverProduced, cover } = await processCover(dir, findCoverImage(dir))
    projProduced += coverProduced
    const coverNote = cover
      ? `  封面:${cover.replace(/\.[^.]+$/, '')}`
      : '  (未標記 COVER)'

    totalSrc += projSrc
    totalOut += projOut
    totalProduced += projProduced

    const ratio = projOut > 0 ? (projSrc / projOut).toFixed(0) : '-'
    console.log(
      `[Optimize] ${project.padEnd(16)} ${String(images.length).padStart(2)} 張  ` +
      `${fmtMB(projSrc).padStart(7)} → ${fmtKB(projOut).padStart(7)}  省 ${ratio}x${coverNote}`
    )
  }

  console.log('─'.repeat(72))
  console.log(
    `[Optimize] 總計 ${fmtMB(totalSrc)} → ${fmtKB(totalOut)}  ` +
    `(縮減 ${totalOut > 0 ? (totalSrc / totalOut).toFixed(0) : '-'} 倍，本次新產生 ${totalProduced} 個檔)`
  )
  console.log('[Optimize] 完成，現在可以把資料夾同步到 NAS 了。')
}

main().catch(err => {
  console.error('[Optimize] 失敗：', err.message)
  process.exit(1)
})
