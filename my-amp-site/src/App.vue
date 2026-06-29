<template>
  <div :class="[theme === 'light' ? 'bg-stone-100 text-stone-800' : 'bg-zinc-950 text-zinc-300']"
       class="min-h-screen flex flex-col lg:flex-row font-sans antialiased selection:bg-emerald-500/30 transition-colors duration-300">
    
    <Sidebar :projects="ampProjects" :activeId="activeAmpId" @select="switchAmp" />

    <main class="flex-grow max-w-6xl w-full mx-auto px-4 py-6 lg:py-12 space-y-6 flex flex-col justify-between">
      
      <div class="space-y-6 flex-grow">
        <header :class="[theme === 'light' ? 'border-stone-300/80' : 'border-zinc-900/80']" class="border-b pb-4">
          <h1 :class="[theme === 'light' ? 'text-stone-900' : 'text-white']" class="text-lg font-bold tracking-wider font-mono uppercase">PROJECTS LAB DASHBOARD</h1>
        </header>

        <div v-if="isLoading" class="p-12 text-center font-mono text-xs text-zinc-600 border border-dashed border-zinc-900 rounded-2xl">
          // FETCHING CORE BUFFER FROM NAS...
        </div>

        <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <template v-if="activeAmp">
            <ProjectSpec :amp="activeAmp" class="animate-fadeIn" />
            <MarkdownViewer :ampId="activeAmp.id" :content="renderedMarkdown" :path="activeAmp.markdownPath" :loading="isMarkdownLoading" class="animate-fadeIn" />
          </template>
        </div>
      </div>

      <div :class="[theme === 'light' ? 'border-stone-300/80' : 'border-zinc-900']" 
           class="block lg:hidden mt-12 pt-6 border-t space-y-4">
        
        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-1.5">
            <div class="text-[0.6rem] font-mono text-zinc-500 uppercase tracking-wider">ENVIRONMENT // 燈光</div>
            <div :class="[theme === 'light' ? 'bg-stone-200/60 border-stone-300' : 'bg-zinc-950/60 border-zinc-900']" class="flex gap-1 p-1 border rounded-xl">
              <button @click="toggleTheme" :class="[theme === 'light' ? 'bg-amber-600/10 text-amber-700 border-amber-600/20 font-bold' : 'text-zinc-600 border-transparent']"
                      class="flex-1 text-center py-1 text-xs font-mono border rounded-lg cursor-pointer">☀️</button>
              <button @click="toggleTheme" :class="[theme === 'dark' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 font-bold' : 'text-zinc-600 border-transparent']"
                      class="flex-1 text-center py-1 text-xs font-mono border rounded-lg cursor-pointer">🌙</button>
            </div>
          </div>

          <div class="space-y-1.5">
            <div class="text-[0.6rem] font-mono text-zinc-500 uppercase tracking-wider">CONSOLE_SIZE // 縮放</div>
            <div :class="[theme === 'light' ? 'bg-stone-200/60 border-stone-300' : 'bg-zinc-950/60 border-zinc-900']" class="flex gap-1 p-1 border rounded-xl">
              <button v-for="size in ['small', 'medium', 'large']" :key="size" @click="setFontSize(size)"
                      :class="[fontSize === size ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 font-bold' : 'text-zinc-600 border-transparent']"
                      class="flex-1 text-center py-1 text-[0.65rem] font-mono border rounded-lg cursor-pointer">
                {{ size === 'small' ? 'S' : size === 'medium' ? 'M' : 'L' }}
              </button>
            </div>
          </div>
        </div>
        
        <div class="text-center font-mono text-[9px] text-zinc-600 uppercase tracking-widest pt-2">
          Mobile sync responsive node OK
        </div>
      </div>

    </main>
  </div>
</template>

<script setup>
import Sidebar from './components/Sidebar.vue'
import ProjectSpec from './components/ProjectSpec.vue'
import MarkdownViewer from './components/MarkdownViewer.vue'
import { useProjects } from './composables/useProjects'
import { useTheme } from './composables/useTheme'
import { useFontSize } from './composables/useFontSize' // 💡 引入字體控制，讓行動端底部按鈕連動

const { ampProjects, activeAmpId, isLoading, isMarkdownLoading, activeAmp, renderedMarkdown, switchAmp } = useProjects()
const { theme, toggleTheme } = useTheme()
const { fontSize, setFontSize } = useFontSize() // 💡 接入引腳
</script>

<style scoped>
.animate-fadeIn { animation: fadeIn 0.25s ease-out forwards; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(2px); } to { opacity: 1; transform: translateY(0); } }
</style>