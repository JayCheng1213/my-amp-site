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
         :theme-mode="theme"
         class="absolute left-5 top-6 w-9 h-9 flex items-center justify-center rounded-xl border border-zinc-900 bg-zinc-950/40 text-zinc-500 hover:text-emerald-400 hover:border-emerald-500/30 cursor-pointer transition-all duration-300 shadow-sm">
      <span class="text-sm tracking-widest leading-none font-bold">⋮</span>
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
import { ref } from 'vue' // 💡 引入 ref 驅動感應晶片
import ProjectSelector from './ProjectSelector.vue'
import { useFontSize } from '../composables/useFontSize'
import { useTheme } from '../composables/useTheme'

defineProps({ projects: Array, activeId: String })
defineEmits(['select'])

const { fontSize, setFontSize } = useFontSize()
const { theme, toggleTheme } = useTheme()

// 💡 宣告觸碰感應狀態，預設收起 (false)
const isHovered = ref(false)
</script>