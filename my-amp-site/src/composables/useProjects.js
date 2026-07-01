import { ref, onMounted, computed } from 'vue'
import { marked } from 'marked'

// 真空管核心電路圖 SVG 矩陣（採用標準 40x40 網格精密走線）
const TUBE_SVG_REGISTRY = {
  FILAMENT: `
    <svg class="inline-block w-5 h-5 mr-2 align-middle transform -translate-y-[1px]" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="34" height="34" rx="6" stroke="currentColor" stroke-width="1.5" class="opacity-30"/>
      <path d="M14 32 L20 16 L26 32" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,
  DIODE: `
    <svg class="inline-block w-5 h-5 mr-2 align-middle transform -translate-y-[1px]" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="34" height="34" rx="6" stroke="currentColor" stroke-width="1.5" class="opacity-30"/>
      <path d="M12 10 H28" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M14 30 L20 18 L26 30" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,
  TRIODE: `
    <svg class="inline-block w-5 h-5 mr-2 align-middle transform -translate-y-[1px]" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="34" height="34" rx="6" stroke="currentColor" stroke-width="1.5" class="opacity-30"/>
      <path d="M12 10 H28" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M13 20 H27" stroke="currentColor" stroke-width="2" stroke-dasharray="2.5 2.5"/>
      <path d="M14 32 L20 22 L26 32" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,
  TETRODE: `
    <svg class="inline-block w-5 h-5 mr-2 align-middle transform -translate-y-[1px]" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="34" height="34" rx="6" stroke="currentColor" stroke-width="1.5" class="opacity-30"/>
      <path d="M12 10 H28" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M13 17 H27" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/>
      <path d="M13 24 H27" stroke="currentColor" stroke-width="2" stroke-dasharray="2.5 2.5"/>
      <path d="M14 33 L20 25 L26 33" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,
  PENTODE: `
    <svg class="inline-block w-5 h-5 mr-2 align-middle transform -translate-y-[1px]" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="34" height="34" rx="6" stroke="currentColor" stroke-width="1.5" class="opacity-30"/>
      <path d="M12 10 H28" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M13 15 H27" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/>
      <path d="M13 21 H27" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/>
      <path d="M13 27 H27" stroke="currentColor" stroke-width="2" stroke-dasharray="2.5 2.5"/>
      <path d="M14 34 L20 28 L26 34" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `
}

const bioItem = {
  id: 'bio',
  menuName: '個人簡介',
  fullName: 'Jaycheng // 個人簡介',
  type: '電子工程架構 (EE)',
  tubes: '國立臺北科技大學 (NYUT)',
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
  const galleryItems = ref([])
  const isGalleryLoading = ref(false)

  const activeAmp = computed(() => {
    if (activeAmpId.value === 'bio') return bioItem
    return ampProjects.value.find(amp => amp.id === activeAmpId.value) || null
  })

  const activeProjects = computed(() => ampProjects.value.filter(amp => !amp.archived))
  const archivedProjects = computed(() => ampProjects.value.filter(amp => amp.archived))

  const renderedMarkdown = computed(() => {
    let rawHtml = marked.parse(rawMarkdown.value)
    const folderName = activeAmpId.value === 'bio' ? 'mydata' : activeAmpId.value
    const currentFolder = `/nas-media/posts/${folderName}/`
    
    // 1. 資產相對路徑修正
    rawHtml = rawHtml.replace(/(src|href)=["'](?!http|\/)([^"']+)["']/g, `$1="${currentFolder}$2"`)
    
    // 2. 💡 核心優化：真空管電路符號巨集解調線路
    // 自動將 [FILAMENT]、[TRIODE] 等識別碼，熱熔替換成高精度的 inline SVG 符號
    return rawHtml.replace(/\[(FILAMENT|DIODE|TRIODE|TETRODE|PENTODE)\]/g, (match, type) => {
      return TUBE_SVG_REGISTRY[type] || match
    })
  })

  const parseGalleryMarkdown = (text, folderPath) => {
    const lines = text.split('\n').map(l => l.trim()).filter(Boolean)
    const items = []
    let currentCaption = ''
    for (const line of lines) {
      if (line.match(/^\d+\./)) {
        currentCaption = line.replace(/^\d+\./, '').trim()
      } else if (line.startsWith('![')) {
        const match = line.match(/!\[(.*?)\]\((.*?)\)/)
        if (match) {
          let src = match[2]
          if (!src.startsWith('http') && !src.startsWith('/')) src = `${folderPath}${src}`
          items.push({ caption: currentCaption || match[1], src })
          currentCaption = ''
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

    try {
      const galleryRes = await fetch(`${currentFolderPath}gallery.md`)
      if (galleryRes.ok) {
        const galleryText = await galleryRes.text()
        galleryItems.value = parseGalleryMarkdown(galleryText, currentFolderPath)
      } else {
        galleryItems.value = []
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
    galleryItems,
    isGalleryLoading,
    activeAmp,
    renderedMarkdown,
    switchAmp
  }
}