import { ref, onMounted, computed } from 'vue'
import { marked } from 'marked'

// 💡 核心配置：定義個人簡介的實體規格參數（完美對接 Spec 面板）
const bioItem = {
  id: 'bio',
  menuName: '個人簡介',
  fullName: 'Jaycheng // 核心工程師檔案',
  type: '電子工程架構 (EE)',
  tubes: '國立臺北科技大學 (Taipei Tech)',
  power: 'IC Design / Embedded System',
  statusText: 'ACTIVE',
  statusColor: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  markdownPath: '/nas-media/posts/mydata.md'
}

export function useProjects() {
  const ampProjects = ref([])
  const activeAmpId = ref('bio') // 預設開機直接鎖定在個人簡介
  const isLoading = ref(true)
  const isMarkdownLoading = ref(false)
  const rawMarkdown = ref('')

  // 智慧型波段選擇：相容動態專案與個人簡介項目
  const activeAmp = computed(() => {
    if (activeAmpId.value === 'bio') return bioItem
    return ampProjects.value.find(amp => amp.id === activeAmpId.value) || null
  })

  const renderedMarkdown = computed(() => {
    return marked.parse(rawMarkdown.value)
  })

  // 核心通訊函式
  const switchAmp = async (id) => {
    activeAmpId.value = id
    const target = id === 'bio' ? bioItem : ampProjects.value.find(amp => amp.id === id)
    if (!target) return

    isMarkdownLoading.value = true
    try {
      const response = await fetch(target.markdownPath)
      if (response.ok) {
        rawMarkdown.value = await response.text()
      } else {
        rawMarkdown.value = `### ⚠️ 讀取失敗\n無法在 NAS 中找到 \`${target.markdownPath}\` 的實體日誌檔案。`
      }
    } catch (error) {
      rawMarkdown.value = '### ⚠️ 訊號中斷\n解析 Markdown 發生例外錯誤。'
    } finally {
      isMarkdownLoading.value = false
    }
  }

  onMounted(async () => {
    try {
      const response = await fetch('/nas-media/projects.json')
      const data = await response.json()
      ampProjects.value = data
      
      // 保持開機加載預設的 bio 內容
      await switchAmp('bio')
    } catch (error) {
      console.error('前端讀取 NAS 專案目錄失敗：', error)
      // 若 JSON 失敗，至少確保預設的 bio 還能通電
      await switchAmp('bio')
    } finally {
      // 💡 修正完畢：重新換回標準 finally 閘門，解鎖載入狀態
      isLoading.value = false
    }
  })

  return {
    ampProjects,
    activeAmpId,
    isLoading,
    isMarkdownLoading,
    activeAmp,
    renderedMarkdown,
    switchAmp
  }
}