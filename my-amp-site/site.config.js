/**
 * 全站共用設定 — 前端、prerender 與壓縮腳本共用同一份來源，
 * 避免網域字串散落各處而不一致（canonical、og:image、sitemap 都依賴它）。
 */
export const SITE_URL = 'https://jaycheng1213.synology.me'

/** 壓縮變體的輸出子目錄名稱 */
export const OPT_DIR = '_opt'

/** gallery.md 中標記精選照片（作為專案封面與社群分享預覽圖）的標籤 */
export const COVER_TAG = '[COVER]'

/**
 * 由原圖路徑推導壓縮變體路徑：
 *   a/b.jpg → a/_opt/b-thumb.webp
 *   a/b.jpg → a/_opt/b-og.jpg   (ext = 'jpg')
 */
export const variantPath = (src, suffix, ext = 'webp') => {
  const cut = src.lastIndexOf('/')
  const base = src.slice(cut + 1).replace(/\.[^.]+$/, '')
  return `${src.slice(0, cut)}/${OPT_DIR}/${base}-${suffix}.${ext}`
}
