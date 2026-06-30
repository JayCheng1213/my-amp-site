import { ref, onMounted, computed } from 'vue'
import { marked } from 'marked'

// 個人簡介項目配置
const bioItem = {
  id: 'bio',
  menuName: '個人簡介',
  fullName: 'Jaycheng // 個人簡介',
  type: '電子工程架構 (EE)',
  tubes: '國立臺北科技大學 (NTUT)',
  power: '設計&組裝真空管擴大機 / MCU單晶系統開發 / 精品咖啡',
  statusText: 'ACTIVE',
  statusColor: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  markdownPath: '/nas-media/posts/mydata/mydata.md', // 💡 1. 簡介路徑同步內聚封裝
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

  const activeProjects = computed(() => ampProjects.value.filter(amp => !amp.archived))
  const archivedProjects = computed(() => ampProjects.value.filter(amp => amp.archived))

  // =========================================================================
  // 💡 智慧型動態路徑對焦電路 (關鍵改動)
  // =========================================================================
  const renderedMarkdown = computed(() => {
    const rawHtml = marked.parse(rawMarkdown.value)
    
    // 依據當前選定的機體 ID，自動判定多媒體基底資料夾
    const folderName = activeAmpId.value === 'bio' ? 'mydata' : activeAmpId.value
    const currentFolder = `/nas-media/posts/${folderName}/`
    
    // 🔍 施密特高階濾波：自動捕捉 src="..." 或 href="..." 
    // 只要排除（http:// 或 /）開頭的絕對訊號，一律自動補完為該專案的實體路徑！
    return rawHtml.replace(
      /(src|href)=["'](?!http|\/)([^"']+)["']/g, 
      `$1="${currentFolder}$2"`
    )
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
    activeProjects,
    archivedProjects,
    activeAmpId,
    isLoading,
    isMarkdownLoading,
    activeAmp,
    renderedMarkdown,
    switchAmp
  }
}