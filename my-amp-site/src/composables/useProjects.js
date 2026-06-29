import { ref, onMounted, computed } from 'vue'
import { marked } from 'marked' // 💡 只有這裡需要 marked，其他地方完全不引入

export function useProjects() {
  const ampProjects = ref([])
  const activeAmpId = ref('')
  const isLoading = ref(true)
  const isMarkdownLoading = ref(false)
  const rawMarkdown = ref('')

  // 智慧型波段選擇：捕捉當前選中的專案物件
  const activeAmp = computed(() => {
    return ampProjects.value.find(amp => amp.id === activeAmpId.value) || null
  })

  // 智慧型解碼器：將 Markdown 轉譯為網頁 HTML
  const renderedMarkdown = computed(() => {
    return marked.parse(rawMarkdown.value)
  })

  // 核心通訊函式：切換專案並動態向 NAS 索取對應的文章純文字
  const switchAmp = async (id) => {
    activeAmpId.value = id
    const target = ampProjects.value.find(amp => amp.id === id)
    if (!target) return

    isMarkdownLoading.value = true
    try {
      const response = await fetch(target.markdownPath)
      if (response.ok) {
        rawMarkdown.value = await response.text()
      } else {
        rawMarkdown.value = `### ⚠️ 讀取失敗\n無法在 NAS 中找到 \`${target.markdownPath}\` 的實體檔案。`
      }
    } catch (error) {
      rawMarkdown.value = '### ⚠️ 訊號中斷\n解析 Markdown 發生例外錯誤。'
    } finally {
      isMarkdownLoading.value = false
    }
  }

  // 初始化：網頁通電時立刻讀取由 Google 雲端同步到 NAS 的 projects.json
  onMounted(async () => {
    try {
      const response = await fetch('/nas-media/projects.json')
      const data = await response.json()
      ampProjects.value = data
      if (data.length > 0) {
        await switchAmp(data[0].id)
      }
    } catch (error) {
      console.error('前端讀取 NAS 專案目錄失敗：', error)
    } finally {
      isLoading.value = false
    }
  })

  // 倒出引腳供外部組件對接
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