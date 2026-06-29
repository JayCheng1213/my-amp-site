<template>
  <div class="min-h-screen flex flex-col lg:flex-row bg-zinc-950 font-sans antialiased text-zinc-300 selection:bg-emerald-500/30">
    
    <Sidebar />

    <main class="flex-grow max-w-6xl w-full mx-auto px-4 py-6 lg:py-12 space-y-6 overflow-y-auto">
      <header class="border-b border-zinc-900/80 pb-4">
        <h1 class="text-lg font-bold tracking-wider text-white font-mono uppercase">PROJECTS LAB DASHBOARD</h1>
      </header>

      <div v-if="isLoading" class="p-12 text-center font-mono text-xs text-zinc-600 border border-dashed border-zinc-900 rounded-2xl">
        // FETCHING CORE BUFFER FROM NAS...
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        
        <ProjectSelector 
          :projects="ampProjects" 
          :activeId="activeAmpId" 
          @select="switchAmp" 
        />

        <template v-if="activeAmp">
          <ProjectSpec :amp="activeAmp" class="animate-fadeIn" />

          <MarkdownViewer 
            :ampId="activeAmp.id"
            :content="renderedMarkdown"
            :path="activeAmp.markdownPath"
            :loading="isMarkdownLoading"
            class="animate-fadeIn"
          />
        </template>
      </div>
    </main>
  </div>
</template>

<script setup>
// 💡 引進視覺零件
import Sidebar from './components/Sidebar.vue'
import ProjectSelector from './components/ProjectSelector.vue'
import ProjectSpec from './components/ProjectSpec.vue'
import MarkdownViewer from './components/MarkdownViewer.vue'

// 💡 引進控制晶片
import { useProjects } from './composables/useProjects'

// 解構晶片腳位，直接交付 HTML 渲染
const {
  ampProjects,
  activeAmpId,
  isLoading,
  isMarkdownLoading,
  activeAmp,
  renderedMarkdown,
  switchAmp
} = useProjects()
</script>

<style scoped>
.animate-fadeIn {
  animation: fadeIn 0.25s ease-out forwards;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(2px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>