<template>
  <aside :class="[theme === 'light' ? 'bg-stone-200/50 border-stone-300/80' : 'bg-zinc-900/30 border-zinc-900/80']"
         class="w-full lg:w-60 backdrop-blur-md border-b lg:border-b-0 lg:border-r p-5 flex flex-col justify-between shrink-0 lg:h-screen lg:sticky lg:top-0 transition-colors duration-300">
    <div class="space-y-5">
      <div>
        <div class="flex items-center space-x-2 text-[0.6rem] font-mono text-emerald-500 tracking-widest uppercase mb-1">
          <span class="animate-pulse">●</span> <span>CORE_RWD // ACTIVE</span>
        </div>
        <h1 :class="[theme === 'light' ? 'text-stone-900' : 'text-white']" class="text-lg font-black tracking-wider font-mono">JAY_AUDIO</h1>
        <p class="text-[0.65rem] font-mono text-zinc-500 mt-0.5 uppercase">Research & Logs</p>
      </div>

      <nav class="space-y-4">
        <div class="pt-2">
          <ProjectSelector :projects="projects" :activeId="activeId" @select="$emit('select', $event)" />
        </div>
      </nav>
    </div>

    <div class="hidden lg:block space-y-4">
      
      <div class="pt-4 border-t border-zinc-900/60 space-y-2">
        <div class="text-[0.6rem] font-mono text-zinc-600 uppercase tracking-wider">ENVIRONMENT // 環境燈光</div>
        <div :class="[theme === 'light' ? 'bg-stone-200/60 border-stone-300' : 'bg-zinc-950/60 border-zinc-900']" class="flex gap-1 p-1 border rounded-xl">
          <button @click="toggleTheme" :class="[theme === 'light' ? 'bg-amber-600/10 text-amber-700 border-amber-600/20 font-bold' : 'text-zinc-600 border-transparent hover:text-zinc-400']"
                  class="flex-1 text-center py-1 text-xs font-mono border rounded-lg cursor-pointer transition-all duration-200">
            ☀️
          </button>
          <button @click="toggleTheme" :class="[theme === 'dark' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 font-bold' : 'text-zinc-600 border-transparent hover:text-zinc-400']"
                  class="flex-1 text-center py-1 text-xs font-mono border rounded-lg cursor-pointer transition-all duration-200">
            🌙
          </button>
        </div>
      </div>

      <div class="border-t border-zinc-900/60 pt-3 space-y-2">
        <div class="text-[0.6rem] font-mono text-zinc-600 uppercase tracking-wider">CONSOLE_SIZE // 字體增益</div>
        <div :class="[theme === 'light' ? 'bg-stone-200/60 border-stone-300' : 'bg-zinc-950/60 border-zinc-900']" class="flex gap-1 p-1 border rounded-xl">
          <button v-for="size in ['small', 'medium', 'large']" :key="size" @click="setFontSize(size)"
                  :class="[fontSize === size ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 font-bold' : 'text-zinc-600 border-transparent hover:text-zinc-400']"
                  class="flex-1 text-center py-1 text-[0.65rem] font-mono border rounded-lg cursor-pointer transition-all duration-200">
            {{ size === 'small' ? 'S' : size === 'medium' ? 'M' : 'L' }}
          </button>
        </div>
      </div>

      <div class="border-t border-zinc-900/60 pt-3 text-[0.6rem] font-mono text-zinc-600 space-y-0.5">
        <div>HOST // SYNOLOGY_NAS</div>
        <div>THEME // {{ theme.toUpperCase() }}_MODE</div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import ProjectSelector from './ProjectSelector.vue'
import { useFontSize } from '../composables/useFontSize'
import { useTheme } from '../composables/useTheme'

defineProps({ projects: Array, activeId: String })
defineEmits(['select'])

const { fontSize, setFontSize } = useFontSize()
const { theme, toggleTheme } = useTheme()
</script>