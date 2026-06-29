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
      
      <nav class="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
        <button
          @click="$emit('select', 'bio')"
          :class="[
            activeId === 'bio' 
              ? (theme === 'light' ? 'bg-emerald-600/10 border-emerald-600 text-emerald-700 font-bold shadow-sm' : 'bg-emerald-500/10 border-emerald-500 text-emerald-400 font-bold shadow-sm') 
              : (theme === 'light' ? 'bg-stone-200/40 border-stone-300 text-stone-500' : 'bg-zinc-900/10 border-zinc-900/60 text-zinc-500')
          ]"
          class="px-3 py-1.5 rounded-xl border text-xs font-mono shrink-0 cursor-pointer"
        >
          👤 簡介
        </button>
        <div class="h-4 w-[1px] bg-zinc-800 shrink-0"></div>
        <ProjectSelector :projects="projects" :activeId="activeId" @select="$emit('select', $event)" />
      </nav>
    </div>
  </aside>

  <div class="hidden lg:block fixed left-0 top-0 h-screen z-50 font-mono"
       @mouseenter="isHovered = true"
       @mouseleave="isHovered = false">
    
    <div :class="[isHovered ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100']"
         class="absolute left-0 top-0 w-8 h-36 cursor-pointer transition-all duration-300 origin-top-left group">
      <svg class="w-full h-full drop-shadow-[2px_2px_4px_rgba(0,0,0,0.2)]" viewBox="0 0 32 145" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0 L30 0 L24 14 L32 28 L20 45 L32 62 L20 80 L28 98 L16 115 L24 135 L0 145 Z"
              :fill="theme === 'light' ? 'rgba(231, 229, 228, 0.98)' : 'rgba(24, 24, 27, 0.98)'"
              :stroke="theme === 'light' ? '#d6d3d1' : '#27272a'"
              stroke-width="1"
              class="transition-colors duration-300"/>
      </svg>
      <span class="absolute text-[11px] opacity-20 group-hover:opacity-90 group-hover:scale-110 transition-all duration-200 top-2.5 right-2">
        💡
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

        <nav class="space-y-3 pt-2">
          
          <div class="jelly-wrapper w-full">
            <button
              @click="$emit('select', 'bio')"
              :class="[
                activeId === 'bio' 
                  ? (theme === 'light' ? 'bg-emerald-600/10 border-emerald-600 text-emerald-700 font-bold shadow-sm' : 'bg-emerald-500/10 border-emerald-500 text-emerald-400 font-bold shadow-sm') 
                  : (theme === 'light' ? 'bg-stone-200/40 border-stone-300 text-stone-500 hover:text-stone-800 hover:border-stone-400' : 'bg-zinc-900/10 border-zinc-900/60 text-zinc-500 hover:border-zinc-800 hover:text-zinc-300')
              ]"
              class="px-3 py-1.5 rounded-xl border text-xs font-mono w-full text-left cursor-pointer jelly-btn"
            >
              <span class="text-zinc-600 mr-1">👤</span> 個人簡介
            </button>
          </div>

          <div class="h-[1px] border-b border-zinc-800/40 my-1 w-full"></div>

          <ProjectSelector :projects="projects" :activeId="activeId" @select="$emit('select', $event)" />
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

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

/* 💡 讓個人簡介按鈕也完美適配施密特防抖與大果凍排開效果 */
.jelly-wrapper {
  transition: padding 0.35s cubic-bezier(0.34, 1.75, 0.64, 1);
  padding: 0px;
  will-change: padding;
}
@media (min-width: 1024px) {
  .jelly-wrapper:hover { padding-top: 14px; padding-bottom: 14px; }
}
.jelly-btn {
  transition: transform 0.25s cubic-bezier(0.25, 0.8, 0.25, 1), background-color 0.2s, border-color 0.2s;
  will-change: transform;
}
.jelly-wrapper:hover .jelly-btn {
  animation: megaJelly 0.45s ease-in-out forwards;
}
@keyframes megaJelly {
  0% { transform: scale(1, 1); }
  30% { transform: scale(1.20, 0.80); }
  50% { transform: scale(0.83, 1.17); }
  70% { transform: scale(1.13, 0.93); }
  100% { transform: scale(1.12, 1.12); }
}
</style>