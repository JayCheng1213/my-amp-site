import { ref, onMounted } from 'vue'

// 宣告全域響應式變數
const fontSize = ref('medium') 

export function useFontSize() {
  // 💡 重新校正的字體增益表：加大基準、拉開階梯落差（每級大跨度 4px）
  const sizeMap = {
    small: '18px',   // 提升最小基準，原來的 16px 太小直接淘汰
    medium: '22px',  // 中字體跳級 4px，拉開與小字體的體感落差
    large: '26px'    // 大字體再灌 4px，徹底解脫老花與視覺疲勞
  }

  // 寫入快取與切換電路
  const setFontSize = (size) => {
    if (!sizeMap[size]) return
    
    fontSize.value = size
    // 鎖進瀏覽器快取緩衝區
    localStorage.setItem('jay-audio-user-fontsize', size)
    
    // 對準最頂層網頁節點注入實體偏壓
    document.documentElement.style.fontSize = sizeMap[size]
  }

  // 通電初始化
  onMounted(() => {
    // 讀取快取，若首次進站預設為 'medium'
    const savedSize = localStorage.getItem('jay-audio-user-fontsize') || 'medium'
    setFontSize(savedSize)
  })

  return {
    fontSize,
    setFontSize
  }
}