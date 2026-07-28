<template>
  <div :class="[theme === 'light' ? 'bg-stone-100 text-stone-800' : 'bg-zinc-950 text-zinc-300']"
       class="min-h-screen font-sans antialiased selection:bg-emerald-500/30 transition-colors duration-300 relative">
    
    <!-- ⚠️ 注意這裡：把 @select 改綁定為 handleSelectProject -->
    <Sidebar :activeProjects="activeProjects" :creativeProjects="creativeProjects" :archivedProjects="archivedProjects" :activeId="activeAmpId" @select="handleSelectProject" />

    <main class="max-w-6xl w-full mx-auto px-4 py-6 lg:py-12 lg:px-12 space-y-6 flex flex-col justify-between">
      
      <div class="space-y-6 flex-grow">
        <header :class="[theme === 'light' ? 'border-stone-300/80' : 'border-zinc-900/80']" 
                class="border-b pb-4 pl-12 lg:pl-12 flex justify-between items-center">
          <h1 :class="[theme === 'light' ? 'text-stone-900' : 'text-white']" class="text-lg font-bold tracking-wider font-mono uppercase">PROJECTS LAB DASHBOARD</h1>
          <div v-if="activeAmp" class="font-mono text-xs tracking-widest text-zinc-500/80 flex items-center space-x-2 animate-fadeIn">
            <span class="text-[9px] text-zinc-600 hidden sm:inline">// UNIT_ID</span>
            <span :class="[theme === 'light' ? 'text-stone-900 border-stone-400 bg-stone-200/30' : 'text-emerald-400 border-emerald-500/30 bg-emerald-500/5']" class="font-bold border px-2.5 py-0.5 rounded-lg text-[11px]">
              {{ activeAmp.deviceCode || 'JAY_UNKNOWN' }}
            </span>
          </div>
        </header>

        <div v-if="isLoading" class="p-12 text-center font-mono text-xs text-zinc-600 border border-dashed border-zinc-900 rounded-2xl">
          // FETCHING CORE BUFFER FROM NAS...
        </div>

        <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start pl-0 lg:pl-12">
          <template v-if="activeAmp">
            
            <div class="contents lg:block lg:col-span-1 lg:space-y-6">
              <ProjectSpec :amp="activeAmp" class="order-1 animate-fadeIn" />
              <ProjectGallery :items="galleryItems" :loading="isGalleryLoading" class="order-3 lg:mt-6 animate-fadeIn" />
            </div>

            <MarkdownViewer 
              :ampId="activeAmp.id" 
              :content="renderedMarkdown" 
              :path="activeAmp.markdownPath" 
              :loading="isMarkdownLoading" 
              class="order-2 lg:col-span-2 animate-fadeIn" 
            />

            <!-- 📡 拓撲晶片並聯 (維持在你指定的 bio 專案顯示) -->
            <AudioTopology
              v-if="activeAmpId === 'bio'"
              class="col-span-1 lg:col-span-3 w-full order-4 animate-fadeIn"
            />

            <SignalChainNav
              :prevProject="prevProject"
              :nextProject="nextProject"
              @navigate="handleSelectProject"
              class="col-span-1 lg:col-span-3 w-full order-5 animate-fadeIn"
            />

          </template>
        </div>
      </div> 

      <!-- 手機版控制列保持不變 -->
      <div :class="[theme === 'light' ? 'border-stone-300/80' : 'border-zinc-900']" class="block lg:hidden mt-12 pt-6 border-t space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-1.5">
            <div class="text-[0.6rem] font-mono text-zinc-500 uppercase tracking-wider">ENVIRONMENT // 燈光</div>
            <div :class="[theme === 'light' ? 'bg-stone-200/60 border-stone-300' : 'bg-zinc-950/60 border-zinc-900']" class="flex gap-1 p-1 border rounded-xl">
              <button @click="toggleTheme" :class="[theme === 'light' ? 'bg-amber-600/10 text-amber-700 border-amber-600/20 font-bold' : 'text-zinc-600 border-transparent']" class="flex-1 text-center py-1 text-xs font-mono border rounded-lg cursor-pointer">☀️</button>
              <button @click="toggleTheme" :class="[theme === 'dark' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 font-bold' : 'text-zinc-600 border-transparent']" class="flex-1 text-center py-1 text-xs font-mono border rounded-lg cursor-pointer">🌙</button>
            </div>
          </div>
          <div class="space-y-1.5">
            <div class="text-[0.6rem] font-mono text-zinc-500 uppercase tracking-wider">CONSOLE_SIZE // 縮放</div>
            <div :class="[theme === 'light' ? 'bg-stone-200/60 border-stone-300' : 'bg-zinc-950/60 border-zinc-900']" class="flex gap-1 p-1 border rounded-xl">
              <button v-for="size in ['small', 'medium', 'large']" :key="size" @click="setFontSize(size)" :class="[fontSize === size ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 font-bold' : 'text-zinc-600 border-transparent']" class="flex-1 text-center py-1 text-[0.65rem] font-mono border rounded-lg cursor-pointer">
                {{ size === 'small' ? 'S' : size === 'medium' ? 'M' : 'L' }}
              </button>
            </div>
          </div>
        </div>
        <div class="text-center font-mono text-[9px] text-zinc-600 uppercase tracking-widest pt-2">Mobile sync responsive node OK</div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useHead } from '@unhead/vue'

import Sidebar from '../components/Sidebar.vue'
import ProjectSpec from '../components/ProjectSpec.vue'
import MarkdownViewer from '../components/MarkdownViewer.vue'
import ProjectGallery from '../components/ProjectGallery.vue'
import AudioTopology from '../components/AudioTopology.vue'
import SignalChainNav from '../components/SignalChainNav.vue'
import { useProjects } from '../composables/useProjects'
import { useTheme } from '../composables/useTheme'
import { useFontSize } from '../composables/useFontSize'

const route = useRoute()
const router = useRouter()

const { 
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
  activeAmp, 
  renderedMarkdown, 
  switchAmp 
} = useProjects()

const { theme, toggleTheme } = useTheme()
const { fontSize, setFontSize } = useFontSize()

// 🟢 核心修改 1：網址改變時，觸發資料切換
watch(
  () => route.params.id,
  (newId) => {
    if (newId) switchAmp(newId)
  },
  { immediate: true } // 讓元件剛掛載時就先跑一次，取代 onMounted
)

// 🟢 核心修改 2：Sidebar 點擊時，改為推進網址，而不是直接切資料
const handleSelectProject = (projectId) => {
  // 強制結尾斜線，避免 Synology nginx 301 補斜線時帶入內部 port
  router.push(`/project/${projectId}/`)
}

// 🟢 核心修改 3：動態 SEO 設定
// useHead 只能在 setup 期間呼叫一次（watch callback 裡呼叫會因脫離注入環境而失效），
// 改傳 computed 讓 unhead 自行追蹤 activeAmp / renderedMarkdown 的變化
const pageTitle = computed(() => {
  const amp = activeAmp.value
  return amp ? `${amp.fullName || amp.menuName || amp.deviceCode || 'Project'} | JAY_LAB.` : 'JAY_LAB.'
})
// 擷取 Markdown 內容的前 100 個字作為 description (去除 html 標籤)；
// markdown 缺檔（如 CI 預渲染環境）時改用規格欄位組合，避免把錯誤訊息寫進 SEO
const pageDescription = computed(() => {
  if (markdownAvailable.value && renderedMarkdown.value) {
    return renderedMarkdown.value.replace(/<[^>]*>?/gm, '').replace(/\s+/g, ' ').trim().substring(0, 100) + '...'
  }
  const amp = activeAmp.value
  if (amp) {
    return [amp.fullName || amp.menuName, amp.type, amp.tubes, amp.power].filter(Boolean).join(' / ')
  }
  return 'Explore projects in JAY_LAB.'
})

useHead(() => ({
  title: pageTitle.value,
  meta: [
    { name: 'description', content: pageDescription.value },
    { property: 'og:title', content: pageTitle.value },
    { property: 'og:description', content: pageDescription.value }
  ],
  link: [
    { rel: 'canonical', href: `https://jaycheng1213.synology.me/project/${activeAmpId.value}/` }
  ]
}))

</script>

<style scoped>
.animate-fadeIn { animation: fadeIn 0.25s ease-out forwards; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(2px); } to { opacity: 1; transform: translateY(0); } }
</style>