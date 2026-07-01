import { ref } from 'vue'

export function useAnalytics() {
  const uniqueVisitors = ref('-----')
  const totalViews = ref('-----')

  const formatNumber = (num) => {
    if (isNaN(num)) return '-----'
    return String(num).padStart(5, '0')
  }

  const triggerTelemetry = async () => {
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.get('auth') === 'jaymaster') {
      localStorage.setItem('jay_audio_admin', 'true')
      console.log('⚡ [SYSTEM] 管理員防刷保護晶片已成功解鎖通電！')
    }

    const isAdmin = localStorage.getItem('jay_audio_admin') === 'true'

    try {
      // 💡 終極優化：加入動態時間戳記 _t 與 no-store 控制參數
      // 徹底強迫行動端瀏覽器（Chrome/Safari）擊穿快取，直接向 NAS 索取最新電壓數據
      const response = await fetch(
        `/api/counter.php?action=${isAdmin ? 'read' : 'hit'}&_t=${Date.now()}`, 
        { cache: 'no-store' }
      )
      
      if (response.ok) {
        const data = await response.json()
        uniqueVisitors.value = formatNumber(data.uv)
        totalViews.value = formatNumber(data.pv)
      } else {
        console.error('後端回應異常，狀態碼：', response.status)
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