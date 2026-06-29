import { ref, onMounted } from 'vue'

// 💡 宣告全域單例變數，確保側邊欄、主機殼、面板的燈光步調百分之百同步
const theme = ref('dark') 

export function useTheme() {
  const toggleTheme = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
    localStorage.setItem('jay-audio-theme', theme.value)
  }

  onMounted(() => {
    // 讀取快取，預設依然為硬核暗黑模式
    theme.value = localStorage.getItem('jay-audio-theme') || 'dark'
  })

  return {
    theme,
    toggleTheme
  }
}