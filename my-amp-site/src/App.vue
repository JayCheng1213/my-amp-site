<template>
  <div :class="[theme === 'light' ? 'bg-stone-100 text-stone-800' : 'bg-zinc-950 text-zinc-300']"
       class="min-h-screen font-sans antialiased selection:bg-emerald-500/30 transition-colors duration-300 relative">
    
    <Sidebar :activeProjects="activeProjects" :archivedProjects="archivedProjects" :activeId="activeAmpId" @select="switchAmp" />

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

        <div v-else class="grid gap-6 items-start pl-0 lg:pl-12 matrix-grid-layout">
          <template v-if="activeAmp">
            
            <ProjectSpec :amp="activeAmp" class="spec-zone animate-fadeIn" />
            
            <MarkdownViewer 
              :ampId="activeAmp.id" 
              :content="renderedMarkdown" 
              :path="activeAmp.markdownPath" 
              :loading="isMarkdownLoading" 
              class="markdown-zone animate-fadeIn" 
            />
            
            <ProjectGallery :items="galleryItems" :loading="isGalleryLoading" class="gallery-zone animate-fadeIn" />

          </template>
        </div>
      </div>

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
import Sidebar from './components/Sidebar.vue'
import ProjectSpec from './components/ProjectSpec.vue'
import MarkdownViewer from './components/MarkdownViewer.vue'
import ProjectGallery from './components/ProjectGallery.vue'
import { useProjects } from './composables/useProjects'
import { useTheme } from './composables/useTheme'
import { useFontSize } from './composables/useFontSize'

const { activeProjects, archivedProjects, activeAmpId, isLoading, isMarkdownLoading, galleryItems, isGalleryLoading, activeAmp, renderedMarkdown, switchAmp } = useProjects()
const { theme, toggleTheme } = useTheme()
const { fontSize, setFontSize } = useFontSize()
</script>

<style scoped>
.animate-fadeIn { animation: fadeIn 0.25s ease-out forwards; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(2px); } to { opacity: 1; transform: translateY(0); } }

/* 📱 手機端：純單行垂直通道，卡片完美貼齊兩側邊緣並保持原生空隙 */
.matrix-grid-layout {
  grid-template-columns: 1fr;
  grid-template-areas:
    "spec"
    "markdown"
    "gallery";
}

/* 宣告各零件的封裝引腳 */
.spec-zone { grid-area: spec; }
.markdown-zone { grid-area: markdown; }
.gallery-zone { grid-area: gallery; }

/* 💻 桌機端：啟動雙軌分流矩陣（強行解鎖行高鎖定） */
@media (min-width: 1024px) {
  .matrix-grid-layout {
    grid-template-columns: 1fr 2fr; /* 保持左側面板與右側日誌的黃金比例 */
    grid-template-areas:
      "spec    markdown"
      "gallery markdown";
  }
}
</style>