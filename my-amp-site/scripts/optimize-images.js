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
 * 原圖保留不動（供「檢視原圖」連結與存檔）。
 * 已存在且比原圖新的變體會自動跳過，可重複執行。
 */
import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

const SOURCE_DIR = process.argv[2] || 'D:/真空管專案'
const OPT_DIR = '_opt'
const SOURCE_EXT = new Set(['.jpg', '.jpeg', '.png'])

const VARIANTS = [
  { suffix: 'thumb', width: 800, quality: 78 },
  { suffix: 'large', width: 1800, quality: 82 }
]

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

    totalSrc += projSrc
    totalOut += projOut
    totalProduced += projProduced

    const ratio = projOut > 0 ? (projSrc / projOut).toFixed(0) : '-'
    const note = projProduced === 0 ? ' (皆已是最新)' : ` (新產生 ${projProduced} 個檔)`
    console.log(
      `[Optimize] ${project.padEnd(16)} ${String(images.length).padStart(2)} 張  ` +
      `${fmtMB(projSrc).padStart(7)} → ${fmtKB(projOut).padStart(7)}  省 ${ratio}x${note}`
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
