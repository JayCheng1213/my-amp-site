<template>
  <aside :class="[theme === 'light' ? 'bg-stone-200/50 border-stone-300/80' : 'bg-zinc-900/30 border-zinc-900/80']"
         class="w-full lg:hidden backdrop-blur-md border-b p-5 flex flex-col justify-between shrink-0 transition-colors duration-300">
    <div class="space-y-4">
      <div>
        <div class="flex items-center space-x-2 text-[0.6rem] font-mono text-emerald-500 tracking-widest uppercase mb-1">
          <span>●</span> <span>CORE_MOBILE // READY</span>
        </div>
        <h1 :class="[theme === 'light' ? 'text-stone-900' : 'text-white']" class="text-lg font-black tracking-wider font-mono">JAY_AUDIO</h1>
      </div>
      <nav class="pt-1">
        <ProjectSelector :projects="projects" :activeId="activeId" @select="$emit('select', $event)" />
      </nav>
    </div>
  </aside>

  <div class="hidden lg:block fixed left-0 top-0 h-screen z-50 font-mono"
       @mouseenter="isHovered = true"
       @mouseleave="isHovered = false">
    
    <div :class="[isHovered ? 'opacity-0 scale-75 pointer-events-none' : 'opacity-100 scale-100']"
         class="absolute left-5 top-6 w-10 h-10 cursor-pointer transition-all duration-300 shadow-md group">
      
      <svg class="absolute inset-0 w-full h-full transition-all duration-300 drop-shadow-sm" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 1H39V39H1V11L11 1Z"
              :stroke="theme === 'light' ? '#a8a29e' : '#27272a'"
              :fill="theme === 'light' ? 'rgba(231, 229, 228, 0.95)' : 'rgba(9, 9, 11, 0.65)'"
              stroke-width="1"
              class="transition-colors duration-300"/>
      </svg>
      
      <span class="absolute text-[11px] opacity-20 group-hover:opacity-90 group-hover:scale-110 transition-all duration-200 top-2.5 right-2">
        💡
      </span>
      
      <span class="absolute text-xs font-bold bottom-1.5 left-2.5 group-hover:text-emerald-400 transition-colors">
        ⋮
      </span>
    </div>

    <aside :class="[
             isHovered ? 'translate-x-0 shadow-2xl shadow-black/60' : '-translate-x-full',
             theme === 'light' ? 'bg-stone-200/95 border-stone-300/80' : 'bg-zinc-900/95 border-zinc-900/80'
           ]"
           class="w-60 h-full backdrop-blur-md border-r p-5 flex flex-col justify-between transition-transform duration-300 ease-in-out">
      
      <div class="space-y-5">
        <div class="flex justify-between items-start">
          <div>
            <div class="flex items-center space-x-1.5 text-[0.6rem] text-emerald-500 tracking-widest uppercase mb-1">
              <span class="animate-pulse">●</span> <span>DRAWER // OPEN</span>
            </div>
            <h1 :class="[theme === 'light' ? 'text-stone-900' : 'text-white']" class="text-lg font-black tracking-wider">JAY_AUDIO</h1>
          </div>
          <span class="text-[9px] px-1.5 py-0.5 rounded border border-zinc-800 text-zinc-600 bg-zinc-950/20">CTRL_PNL</span>
        </div>

        <nav class="space-y-4">
          <div class="pt-2">
            <ProjectSelector :projects="projects" :activeId="activeId" @select="$emit('select', $event)" />
          </div>
        </nav>
      </div>

      <div class="space-y-4">
        <div class="pt-4 border-t border-zinc-800/60 space-y-2">
          <div class="text-[0.6rem] text-zinc-600 uppercase tracking-wider">ENVIRONMENT // 燈光</div>
          <div :class="[theme === 'light' ? 'bg-stone-200/60 border-stone-300' : 'bg-zinc-950/60 border-zinc-900']" class="flex gap-1 p-1 border rounded-xl">
            <button @click="toggleTheme" :class="[theme === 'light' ? 'bg-amber-600/10 text-amber-700 border-amber-600/20 font-bold' : 'text-zinc-600 border-transparent']" class="flex-1 text-center py-0.5 text-xs border rounded-lg cursor-pointer">☀️</button>
            <button @click="toggleTheme" :class="[theme === 'dark' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 font-bold' : 'text-zinc-600 border-transparent']" class="flex-1 text-center py-0.5 text-xs border rounded-lg cursor-pointer">🌙</button>
          </div>
        </div>

        <div class="border-t border-zinc-800/60 pt-3 space-y-2">
          <div class="text-[0.6rem] text-zinc-600 uppercase tracking-wider">CONSOLE_SIZE // 增益</div>
          <div :class="[theme === 'light' ? 'bg-stone-200/60 border-stone-300' : 'bg-zinc-950/60 border-zinc-900']" class="flex gap-1 p-1 border rounded-xl">
            <button v-for="size in ['small', 'medium', 'large']" :key="size" @click="setFontSize(size)"
                    :class="[fontSize === size ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 font-bold' : 'text-zinc-600 border-transparent']"
                    class="flex-1 text-center py-0.5 text-[0.65rem] border rounded-lg cursor-pointer">
              {{ size === 'small' ? 'S' : size === 'medium' ? 'M' : 'L' }}
            </button>
          </div>
        </div>

        <div class="border-t border-zinc-800/60 pt-3 text-[0.6rem] text-zinc-600 space-y-0.5">
          <div>HOST // SYNOLOGY_NAS</div>
          <div>THEME // {{ theme.toUpperCase() }}_DRAWER</div>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ProjectSelector from './ProjectSelector.vue'
import { useFontSize } from '../composables/useFontSize'
import { useTheme } from '../composables/useTheme'

defineProps({ projects: Array, activeId: String })
defineEmits(['select'])

const { fontSize, setFontSize } = useFontSize()
const { theme, toggleTheme } = useTheme()
const isHovered = ref(false)
</script>