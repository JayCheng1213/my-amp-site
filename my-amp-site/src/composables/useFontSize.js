import { ref } from 'vue'

// 💡 1. 完整保留大師的精密字體增益表（直接控制實體像素偏壓）
const sizeMap = {
  small: '18px',   // 手機端預設緊湊級
  medium: '22px',  // 桌機端預設舒適級
  large: '26px'    // 深度發燒大字體
}

// 💡 2. 導入動態分頻偵測器（自動判斷初始檔位）
const getInitialFontSize = () => {
  // 優先讀取訪客原有的「手動調校紀錄」
  const savedSize = localStorage.getItem('jay-audio-user-fontsize')
  if (savedSize && sizeMap[savedSize]) return savedSize

  // 若為全新的外網訪客，啟動硬體分流（對齊 1024px 斷點）
  if (typeof window !== 'undefined') {
    // 📱 手機/平板小於 1024px ➡️ 預設 small (18px)
    // 💻 電腦桌機大於等於 1024px ➡️ 預設 medium (22px)
    return window.innerWidth < 1024 ? 'small' : 'medium'
  }
  
  return 'medium'
}

// 初始化響應式狀態暫存器
const fontSize = ref(getInitialFontSize())

export function useFontSize() {

  // 💡 3. 切換電路：同時封存快取並強行改寫頂層實體電壓
  const setFontSize = (size) => {
    if (!sizeMap[size]) return
    
    fontSize.value = size
    // 鎖進你原有的瀏覽器快取緩衝區
    localStorage.setItem('jay-audio-user-fontsize', size)
    
    // 直接對準最頂層網頁節點（<html>）注入實體像素偏壓，全站即時縮放！
    if (typeof window !== 'undefined') {
      document.documentElement.style.fontSize = sizeMap[size]
    }
  }

  // 💡 4. 網頁初次加載時，立刻讓當前檔位通電點火（防止畫面閃爍）
  if (typeof window !== 'undefined') {
    document.documentElement.style.fontSize = sizeMap[fontSize.value]
  }

  return {
    fontSize,
    setFontSize
  }
}