<template>
  <aside class="w-full lg:w-60 bg-zinc-900/30 backdrop-blur-md border-b lg:border-b-0 lg:border-r border-zinc-900/80 p-5 flex flex-col justify-between shrink-0 lg:h-screen lg:sticky lg:top-0">
    <div class="space-y-5">
      <div>
        <div class="flex items-center space-x-2 text-[0.6rem] font-mono text-emerald-500 tracking-widest uppercase mb-1">
          <span class="animate-pulse">●</span> <span>CORE_RWD // ACTIVE</span>
        </div>
        <h1 class="text-lg font-black tracking-wider text-white font-mono">JAY_AUDIO</h1>
        <p class="text-[0.65rem] font-mono text-zinc-500 mt-0.5 uppercase">Research & Logs</p>
      </div>

      <nav class="space-y-4">
        <div class="pt-2">
          <ProjectSelector 
            :projects="projects" 
            :activeId="activeId" 
            @select="$emit('select', $event)" 
          />
        </div>
      </nav>
    </div>

    <div class="space-y-4">
      
      <div class="pt-4 border-t border-zinc-900/60 space-y-2">
        <div class="text-[0.6rem] font-mono text-zinc-600 uppercase tracking-wider">CONSOLE_SIZE // 字體增益</div>
        <div class="flex gap-1 bg-zinc-950/60 p-1 border border-zinc-900 rounded-xl">
          <button 
            @click="setFontSize('small')"
            :class="[fontSize === 'small' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 font-bold' : 'text-zinc-600 border-transparent hover:text-zinc-400']"
            class="flex-1 text-center py-1 text-[0.65rem] font-mono border rounded-lg cursor-pointer transition-all duration-200"
          >
            S (小)
          </button>
          <button 
            @click="setFontSize('medium')"
            :class="[fontSize === 'medium' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 font-bold' : 'text-zinc-600 border-transparent hover:text-zinc-400']"
            class="flex-1 text-center py-1 text-[0.65rem] font-mono border rounded-lg cursor-pointer transition-all duration-200"
          >
            M (中)
          </button>
          <button 
            @click="setFontSize('large')"
            :class="[fontSize === 'large' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 font-bold' : 'text-zinc-600 border-transparent hover:text-zinc-400']"
            class="flex-1 text-center py-1 text-[0.65rem] font-mono border rounded-lg cursor-pointer transition-all duration-200"
          >
            L (大)
          </button>
        </div>
      </div>

      <div class="hidden lg:block border-t border-zinc-900/60 pt-4 text-[0.6rem] font-mono text-zinc-600 space-y-0.5">
        <div>HOST // SYNOLOGY_NAS</div>
        <div>RENDER // SIDEBAR_INTEGRATED</div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import ProjectSelector from './ProjectSelector.vue'
import { useFontSize } from '../composables/useFontSize'

defineProps({
  projects: { type: Array, required: true },
  activeId: { type: String, required: true }
})
defineEmits(['select'])

const { fontSize, setFontSize } = useFontSize()
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>