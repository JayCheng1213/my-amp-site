import { ref, onMounted, computed } from 'vue'
import { marked } from 'marked'
import { COVER_TAG } from '../../site.config.js'

// 💡 終極幾何校正：徹底拉開 g1 與燈絲頂點的 Y 軸座標，確保 100% 絕緣不短路
const TUBE_SVG_REGISTRY = {
  FILAMENT: `
    <svg class="inline-block w-5 h-5 mr-2 align-middle transform -translate-y-[1px]" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="34" height="34" rx="6" stroke="currentColor" stroke-width="1.5" class="opacity-30"/>
      <path d="M14 30 L20 16 L26 30" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,
  DIODE: `
    <svg class="inline-block w-5 h-5 mr-2 align-middle transform -translate-y-[1px]" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="34" height="34" rx="6" stroke="currentColor" stroke-width="1.5" class="opacity-30"/>
      <path d="M12 12 H28" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M14 30 L20 20 L26 30" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,
  TRIODE: `
    <svg class="inline-block w-5 h-5 mr-2 align-middle transform -translate-y-[1px]" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="34" height="34" rx="6" stroke="currentColor" stroke-width="1.5" class="opacity-30"/>
      <path d="M12 10 H28" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M13 18 H27" stroke="currentColor" stroke-width="1.8" stroke-dasharray="2 2"/>
      <path d="M14 32 L20 26 L26 32" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,
  TETRODE: `
    <svg class="inline-block w-5 h-5 mr-2 align-middle transform -translate-y-[1px]" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="34" height="34" rx="6" stroke="currentColor" stroke-width="1.5" class="opacity-30"/>
      <path d="M12 10 H28" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M13 16 H27" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/>
      <path d="M13 22 H27" stroke="currentColor" stroke-width="1.8" stroke-dasharray="2 2"/>
      <path d="M14 34 L20 28 L26 34" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,
  PENTODE: `
    <svg class="inline-block w-5 h-5 mr-2 align-middle transform -translate-y-[1px]" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="34" height="34" rx="6" stroke="currentColor" stroke-width="1.5" class="opacity-30"/>
      <path d="M12 10 H28" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M13 15 H27" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/>
      <path d="M13 20 H27" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/>
      <path d="M13 25 H27" stroke="currentColor" stroke-width="1.8" stroke-dasharray="2 2"/>
      <path d="M14 35 L20 30 L26 35" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `
}

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
  // markdown 是否真的載入成功（預渲染環境缺檔時為 false，SEO description 會改用規格欄位）
  const markdownAvailable = ref(false)
  const galleryItems = ref([])
  const isGalleryLoading = ref(false)
  // 精選作品區（bio 頁最上方）用：帶封面縮圖的代表作
  const featuredProjects = ref([])

  // 目前專案的封面照，供社群分享預覽圖（og:image）使用
  const coverImage = computed(() => {
    const found = galleryItems.value.find(item => item.isCover) || galleryItems.value[0]
    return found?.src || null
  })

  const activeAmp = computed(() => {
    if (activeAmpId.value === 'bio') return bioItem
    return ampProjects.value.find(amp => amp.id === activeAmpId.value) || null
  })

  // category: 'creative' 標記的專案獨立成一欄，其餘現役專案維持在主清單
  const activeProjects = computed(() => ampProjects.value.filter(amp => !amp.archived && amp.category !== 'creative'))
  const creativeProjects = computed(() => ampProjects.value.filter(amp => !amp.archived && amp.category === 'creative'))
  const archivedProjects = computed(() => ampProjects.value.filter(amp => amp.archived))

  // 「訊號鏈」上一篇/下一篇導覽：依 deviceCode 排序（與側邊欄同順序），bio 視為起點，首尾循環銜接
  const navSequence = computed(() => [bioItem, ...ampProjects.value])
  const currentNavIndex = computed(() => navSequence.value.findIndex(p => p.id === activeAmpId.value))
  const prevProject = computed(() => {
    const list = navSequence.value
    const idx = currentNavIndex.value
    if (idx === -1 || list.length < 2) return null
    return list[(idx - 1 + list.length) % list.length]
  })
  const nextProject = computed(() => {
    const list = navSequence.value
    const idx = currentNavIndex.value
    if (idx === -1 || list.length < 2) return null
    return list[(idx + 1) % list.length]
  })

  const renderedMarkdown = computed(() => {
    let rawHtml = marked.parse(rawMarkdown.value)
    const folderName = activeAmpId.value === 'bio' ? 'mydata' : activeAmpId.value
    const currentFolder = `/nas-media/posts/${folderName}/`
    
    rawHtml = rawHtml.replace(/(src|href)=["'](?!http|\/)([^"']+)["']/g, `$1="${currentFolder}$2"`)
    // 內文直接嵌入的 <img> 補上延遲載入，減少長文章首屏載入時間
    rawHtml = rawHtml.replace(/<img /g, '<img loading="lazy" decoding="async" ')

    return rawHtml.replace(/\[(FILAMENT|DIODE|TRIODE|TETRODE|PENTODE)\]/g, (match, type) => {
      return TUBE_SVG_REGISTRY[type] || match
    })
  })

  const parseGalleryMarkdown = (text, folderPath) => {
    const lines = text.split('\n').map(l => l.trim()).filter(Boolean)
    const items = []
    let currentCaption = ''
    let currentIsCover = false
    for (const line of lines) {
      if (line.match(/^\d+\./)) {
        currentCaption = line.replace(/^\d+\./, '').trim()
        // 說明文字前的 [COVER] 代表精選照片，解析後移除以免顯示在相簿說明中
        currentIsCover = currentCaption.includes(COVER_TAG)
        if (currentIsCover) currentCaption = currentCaption.replace(COVER_TAG, '').trim()
      } else if (line.startsWith('![')) {
        const match = line.match(/!\[(.*?)\]\((.*?)\)/)
        if (match) {
          let src = match[2]
          if (!src.startsWith('http') && !src.startsWith('/')) src = `${folderPath}${src}`
          items.push({ caption: currentCaption || match[1], src, isCover: currentIsCover })
          currentCaption = ''
          currentIsCover = false
        }
      }
    }
    return items
  }

  /**
   * 載入精選作品的封面照。挑選已完成的代表作（最多 3 台），
   * 各自讀取 gallery.md 取出標記 [COVER] 的照片，未標記則取第一張。
   */
  const loadFeatured = async (projects) => {
    const picks = projects
      .filter(p => !p.archived && (p.statusText || '').includes('已完成'))
      .slice(0, 3)

    featuredProjects.value = await Promise.all(picks.map(async (project) => {
      const folderPath = `/nas-media/posts/${project.id}/`
      try {
        const res = await fetch(`${folderPath}gallery.md`, { cache: 'no-cache' })
        if (!res.ok) return { ...project, cover: null }
        const items = parseGalleryMarkdown(await res.text(), folderPath)
        const picked = items.find(item => item.isCover) || items[0]
        return { ...project, cover: picked?.src || null }
      } catch {
        return { ...project, cover: null }
      }
    }))
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
      // no-cache：帶 ETag 重新驗證，內容沒變時伺服器回 304 空內容，
      // 避免 Synology 未送 Cache-Control 而觸發瀏覽器啟發式快取，讀者卡在舊版文章
      const response = await fetch(target.markdownPath, { cache: 'no-cache' })
      if (response.ok) {
        rawMarkdown.value = await response.text()
        markdownAvailable.value = true
      } else {
        rawMarkdown.value = `### ⚠️ 讀取失敗\n無法在 NAS 中找到 \`${target.markdownPath}\` 的實體日誌檔案。`
        markdownAvailable.value = false
      }
    } catch (error) {
      rawMarkdown.value = '### ⚠️ 訊號中斷\n解析 Markdown 發生例外錯誤。'
      markdownAvailable.value = false
    } finally {
      isMarkdownLoading.value = false
    }

    try {
      const galleryRes = await fetch(`${currentFolderPath}gallery.md`, { cache: 'no-cache' })
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
      const response = await fetch('/nas-media/projects.json', { cache: 'no-cache' })
      const data = await response.json()
      data.sort((a, b) => {
        const codeA = a.deviceCode || ''
        const codeB = b.deviceCode || ''
        return codeA.localeCompare(codeB, undefined, { numeric: true, sensitivity: 'base' })
      })
      ampProjects.value = data
      // 尊重路由已設定的 id（直接訪問 /project/1626/ 時不可被蓋回 bio）
      await switchAmp(activeAmpId.value || 'bio')
      await loadFeatured(data)
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
    creativeProjects,
    archivedProjects,
    prevProject,
    nextProject,
    activeAmpId,
    isLoading,
    isMarkdownLoading,
    markdownAvailable,
    galleryItems,
    isGalleryLoading,
    featuredProjects,
    coverImage,
    activeAmp,
    renderedMarkdown,
    switchAmp
  }
}