import { ref, onMounted } from 'vue'

// 宣告全域響應式變數，確保多個組件引入時訊號同步
const fontSize = ref('medium') 

export function useFontSize() {
  // 💡 核心增益表：對應頂層 html 的實體像素基準
  const sizeMap = {
    small: '16px',   // 以目前文字大小為最小字體 (100% 基準)
    medium: '18px',  // 中字體 (放大約 12.5%)
    large: '20px'    // 大字體 (放大約 25%)
  }

  // 寫入快取與切換電路
  const setFontSize = (size) => {
    if (!sizeMap[size]) return
    
    fontSize.value = size
    // 1. 鎖進瀏覽器快取緩衝區 (LocalStorage)
    localStorage.setItem('jay-audio-user-fontsize', size)
    
    // 2. 直接對準最頂層網頁節點注入實體偏壓
    document.documentElement.style.fontSize = sizeMap[size]
  }

  // 通電初始化
  onMounted(() => {
    // 讀取快取，若首次進站則預設為 'medium'
    const savedSize = localStorage.getItem('jay-audio-user-fontsize') || 'medium'
    setFontSize(savedSize)
  })

  return {
    fontSize,
    setFontSize
  }
}