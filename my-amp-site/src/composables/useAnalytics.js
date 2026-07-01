import { ref } from 'vue'

export function useAnalytics() {
  const uniqueVisitors = ref('-----') // UV
  const totalViews = ref('-----')      // PV

  // 💡 格式化輸出：幫數字補零，維持量測儀器的工整排版 (例如 12 -> 00012)
  const formatNumber = (num) => {
    if (isNaN(num)) return '-----'
    return String(num).padStart(5, '0')
  }

  const triggerTelemetry = async () => {
    // 🔍 1. 檢查網址是否有管理員啟動密鑰 (例如：JAY_AUDIO.tw/?auth=jaymaster)
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.get('auth') === 'jaymaster') {
      localStorage.setItem('jay_audio_admin', 'true')
      console.log('⚡ [SYSTEM] 管理員防刷保護晶片已成功解鎖通電！')
    }

    // 🔍 2. 判定是否為管理員瀏覽？若是，直接斷電，不回傳任何計數訊號
    const isAdmin = localStorage.getItem('jay_audio_admin') === 'true'

    try {
      // 📡 3. 向 NAS 端的微型計數器 API 發送請求
      // 傳送 isAdmin 參數讓後端決定要「只讀取不計數」還是「計數並讀取」
      const response = await fetch(`/api/counter?action=${isAdmin ? 'read' : 'hit'}`)
      if (response.ok) {
        const data = await response.json()
        uniqueVisitors.value = formatNumber(data.uv)
        totalViews.value = formatNumber(data.pv)
      }
    } catch (error) {
      console.error('計數器數據通訊失敗：', error)
    }
  }

  return {
    uniqueVisitors,
    totalViews,
    triggerTelemetry
  }
}