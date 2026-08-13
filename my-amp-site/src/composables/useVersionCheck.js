/**
 * 偵測瀏覽器是否拿到快取住的舊版 index.html（因而跑在舊的 JS bundle 上）。
 *
 * Synology Web Station 未送 Cache-Control，瀏覽器會套用啟發式快取，
 * 導致更新部署後訪客仍執行舊程式碼，得手動 Ctrl+F5 才會更新。
 * 這裡比對線上 version.json 與烘焙進 bundle 的 __BUILD_ID__，不一致就自動重載一次。
 */
export async function checkAppVersion() {
  try {
    const res = await fetch('/version.json', { cache: 'no-cache' })
    if (!res.ok) return

    const { buildId } = await res.json()
    if (!buildId || buildId === __BUILD_ID__) return

    // 防迴圈：若重載後仍拿到快取的舊 HTML，版本會永遠對不上而無限重載，
    // 因此同一個目標版本在同一個分頁工作階段中只重載一次。
    const guardKey = `app-reloaded-for:${buildId}`
    if (sessionStorage.getItem(guardKey)) {
      console.warn('[Version] 偵測到新版本，但重載後仍為舊程式碼，已停止自動重載。')
      return
    }
    sessionStorage.setItem(guardKey, '1')

    console.info(`[Version] 偵測到新版本（${__BUILD_ID__} → ${buildId}），重新載入頁面。`)
    location.reload()
  } catch {
    // 離線、預渲染環境或 version.json 不存在時靜默略過
  }
}
