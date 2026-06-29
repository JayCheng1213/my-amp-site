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
    
    <div :class="[isHovered ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100']"
         class="absolute left-full top-0 w-8 h-36 cursor-pointer transition-all duration-300 origin-top-left">
      
      <svg class="w-full h-full drop-shadow-[2px_2px_4px_rgba(0,0,0,0.15)]" viewBox="0 0 32 145" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0 L30 0 L24 14 L32 28 L20 45 L32 62 L20 80 L28 98 L16 115 L24 135 L0 145 Z"
              :fill="theme === 'light' ? 'rgba(231, 229, 228, 0.98)' : 'rgba(24, 24, 27, 0.98)'"
              :stroke="theme === 'light' ? '#d6d3d1' : '#27272a'"
              stroke-width="1"
              class="transition-colors duration-300"/>
      </svg>

      <span class="absolute left-2.5 top-8 text-[10px] text-zinc-500/60 font-bold tracking-widest pointer-events-none select-none">
        ⋮
      </span>
    </div>

    <aside :class="[
             isHovered ? 'translate-x-0 shadow-[25px_0_50px_-12px_rgba(0,0,0,0.5)]' : '-translate-x-full',
             theme === 'light' ? 'bg-stone-200/98 border-stone-300/80' : 'bg-zinc-900/98 border-zinc-900/80'
           ]"
           class="w-60 h-full backdrop-blur-md border-r p-5 flex flex-col justify-between transition-transform duration-300 cubic-bezier(0.16, 1, 0.3, 1)">
      
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