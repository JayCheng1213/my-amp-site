import { ref, onMounted, computed } from 'vue'
import { marked } from 'marked'

const bioItem = {
  id: 'bio',
  menuName: '個人簡介',
  fullName: 'Jaycheng // 個人簡介',
  type: '電子工程架構 (EE)',
  tubes: '國立臺北科技大學 (NYUT)',
  power: '設計&組裝真空管擴大機 / MCU單晶系統開發 / 精品咖啡',
  statusText: 'ACTIVE',
  statusColor: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  markdownPath: '/nas-media/posts/mydata.md',
  deviceCode: 'JAY_CORE',
  archived: false
}

export function useProjects() {
  const ampProjects = ref([])
  const activeAmpId = ref('bio')
  const isLoading = ref(true)
  const isMarkdownLoading = ref(false)
  const rawMarkdown = ref('')

  const activeAmp = computed(() => {
    if (activeAmpId.value === 'bio') return bioItem
    return ampProjects.value.find(amp => amp.id === activeAmpId.value) || null
  })

  // 💡 新增分流電路 A：捕捉現役專案 (archived 為 false)
  const activeProjects = computed(() => {
    return ampProjects.value.filter(amp => !amp.archived)
  })

  // 💡 新增分流電流 B：捕捉歷史老作品 (archived 為 true)
  const archivedProjects = computed(() => {
    return ampProjects.value.filter(amp => amp.archived)
  })

  const renderedMarkdown = computed(() => {
    return marked.parse(rawMarkdown.value)
  })

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
      
      // 依舊保持 01 02 03 自動化排序
      data.sort((a, b) => {
        const codeA = a.deviceCode || ''
        const codeB = b.deviceCode || ''
        return codeA.localeCompare(codeB, undefined, { numeric: true, sensitivity: 'base' })
      })

      ampProjects.value = data
      await switchAmp('bio')
    } catch (error) {
      console.error('前端讀取 NAS 專案目錄失敗：', error)
      await switchAmp('bio')
    } finally {
      isLoading.value = false
    }
  })

  return {
    ampProjects,
    activeProjects,   // 倒出引腳
    archivedProjects, // 倒出引腳
    activeAmpId,
    isLoading,
    isMarkdownLoading,
    activeAmp,
    renderedMarkdown,
    switchAmp
  }
}