import { ref } from 'vue'

// ⚡ 核心優化：將出廠預設值（Fallback）從 'dark' 焊死改為 'light'
// 當全新訪客（手機或電腦）第一次進站、LocalStorage 還沒有任何紀錄時，全自動導通亮色畫面！
const theme = ref(localStorage.getItem('theme') || 'light')

export function useTheme() {
  
  // 監聽並將色彩類別（Class）注入到 HTML 最頂層，導通 Tailwind 的 light/dark 樣式
  const updateDOM = (currentTheme) => {
    const root = document.documentElement
    if (currentTheme === 'light') {
      root.classList.add('light')
      root.classList.remove('dark')
    } else {
      root.classList.add('dark')
      root.classList.remove('light')
    }
  }

  // 網頁初次通電（初始化）時立刻調校波形
  updateDOM(theme.value)

  // 燈光切換開關
  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme', theme.value) // 記錄使用者手動調整的偏好
    updateDOM(theme.value)
  }

  return {
    theme,
    toggleTheme
  }
}