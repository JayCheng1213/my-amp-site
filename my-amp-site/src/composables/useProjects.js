import { ref, onMounted, computed } from 'vue'
import { marked } from 'marked'

const bioItem = {
  id: 'bio',
  menuName: '個人簡介',
  fullName: 'Jaycheng // 個人簡介',
  type: '電子工程架構 (EE)',
  tubes: '國立臺北科技大學 (NTUT)',
  power: '設計&組裝真空管擴大機 / MCU單晶系統開發 / 精品咖啡',
  statusText: 'ACTIVE',
  statusColor: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  markdownPath: '/nas-media/posts/mydata/mydata.md',
  deviceCode: 'JAY_CORE',
  archived: false
}

export function useProjects() {
  const ampProjects = ref([])
  const activeAmpId = ref('bio')
  const isLoading = ref(true)
  const isMarkdownLoading = ref(false)
  const rawMarkdown = ref('')

  // 💡 新增：展示櫃的響應式狀態引腳
  const galleryItems = ref([])
  const isGalleryLoading = ref(false)

  const activeAmp = computed(() => {
    if (activeAmpId.value === 'bio') return bioItem
    return ampProjects.value.find(amp => amp.id === activeAmpId.value) || null
  })

  const activeProjects = computed(() => ampProjects.value.filter(amp => !amp.archived))
  const archivedProjects = computed(() => ampProjects.value.filter(amp => amp.archived))

  const renderedMarkdown = computed(() => {
    const rawHtml = marked.parse(rawMarkdown.value)
    const folderName = activeAmpId.value === 'bio' ? 'mydata' : activeAmpId.value
    const currentFolder = `/nas-media/posts/${folderName}/`
    return rawHtml.replace(/(src|href)=["'](?!http|\/)([^"']+)["']/g, `$1="${currentFolder}$2"`)
  })

  // 💡 新增：展示櫃 Markdown 語法解析器
  const parseGalleryMarkdown = (text, folderPath) => {
    const lines = text.split('\n').map(l => l.trim()).filter(Boolean)
    const items = []
    let currentCaption = ''

    for (const line of lines) {
      if (line.match(/^\d+\./)) {
        // 抓取 1. 2. 後面的解釋詞句
        currentCaption = line.replace(/^\d+\./, '').trim()
      } else if (line.startsWith('![')) {
        // 抓取 Markdown 圖片語法
        const match = line.match(/!\[(.*?)\]\((.*?)\)/)
        if (match) {
          let src = match[2]
          if (!src.startsWith('http') && !src.startsWith('/')) {
            src = `${folderPath}${src}`
          }
          items.push({ caption: currentCaption || match[1], src })
          currentCaption = '' // 釋放快取
        }
      }
    }
    return items
  }

  const switchAmp = async (id) => {
    activeAmpId.value = id
    const target = id === 'bio' ? bioItem : ampProjects.value.find(amp => amp.id === id)
    if (!target) return

    isMarkdownLoading.value = true
    isGalleryLoading.value = true
    
    const folderName = id === 'bio' ? 'mydata' : id
    const currentFolderPath = `/nas-media/posts/${folderName}/`

    // 1. 抓取主日誌文章
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

    // 2. 💡 智慧對焦：自動非同步抓取該夾底下的 gallery.md 展示櫃
    try {
      const galleryRes = await fetch(`${currentFolderPath}gallery.md`)
      if (galleryRes.ok) {
        const galleryText = await galleryRes.text()
        galleryItems.value = parseGalleryMarkdown(galleryText, currentFolderPath)
      } else {
        galleryItems.value = [] // 404 代表該專案未配置展示櫃，乾淨隱形
      }
    } catch (e) {
      galleryItems.value = []
    } finally {
      isGalleryLoading.value = false
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
    galleryItems,       // 倒出引腳
    isGalleryLoading,   // 倒出引腳
    activeAmp,
    renderedMarkdown,
    switchAmp
  }
}