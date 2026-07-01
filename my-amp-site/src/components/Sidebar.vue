<template>
  <button 
    @click="isMobileOpen = !isMobileOpen"
    :class="[theme === 'light' ? 'border-stone-300 text-stone-700 bg-stone-100/90' : 'border-zinc-800 text-zinc-400 bg-zinc-950/80']"
    class="lg:hidden fixed top-4 left-4 z-[60] w-9 h-9 border rounded-xl flex flex-col items-center justify-center gap-1.5 backdrop-blur-md shadow-sm transition-all duration-300 cursor-pointer"
  >
    <span class="w-4 h-0.5 bg-current transition-all duration-300 transform origin-center" :class="{ 'rotate-45 translate-y-2': isMobileOpen }"></span>
    <span class="w-4 h-0.5 bg-current transition-all duration-300" :class="{ 'opacity-0 scale-90': isMobileOpen }"></span>
    <span class="w-4 h-0.5 bg-current transition-all duration-300 transform origin-center" :class="{ '-rotate-45 -translate-y-2': isMobileOpen }"></span>
  </button>

  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isMobileOpen" @click="isMobileOpen = false" class="lg:hidden fixed inset-0 z-40 bg-zinc-950/60 backdrop-blur-sm"></div>
    </Transition>

    <Transition name="slide">
      <aside 
        v-if="isMobileOpen"
        :class="[theme === 'light' ? 'bg-stone-200/98 border-stone-300/80 text-stone-800' : 'bg-zinc-900/98 border-zinc-900/80 text-zinc-300']"
        class="lg:hidden fixed left-0 top-0 h-screen w-64 border-r z-50 p-5 flex flex-col justify-between shadow-2xl font-mono transition-colors duration-300"
      >
        <div class="space-y-6 pt-10">
          <div>
            <div class="flex items-center space-x-1.5 text-[0.6rem] text-emerald-500 tracking-widest uppercase mb-1">
              <span>●</span> <span>CORE_MOBILE // READY</span>
            </div>
            <h1 :class="[theme === 'light' ? 'text-stone-900' : 'text-white']" class="text-lg font-black tracking-wider">JAY_AUDIO</h1>
          </div>
          
          <nav class="space-y-3">
            <button @click="handleMobileSelect('bio')"
              :class="[activeId === 'bio' ? (theme === 'light' ? 'bg-emerald-600/10 border-emerald-600 text-emerald-700 font-bold' : 'bg-emerald-500/10 border-emerald-500 text-emerald-400 font-bold') : (theme === 'light' ? 'bg-stone-300/40 border-stone-300/60 text-stone-500' : 'bg-zinc-900/40 border-zinc-900/60 text-zinc-500')]"
              class="px-3 py-2 rounded-xl border text-xs w-full text-left cursor-pointer transition-colors duration-200">
              <span class="mr-1.5">👤</span> 個人簡介
            </button>
            <div :class="[theme === 'light' ? 'border-stone-300' : 'border-zinc-800/40']" class="h-[1px] border-b my-2 w-full"></div>
            <ProjectSelector :projects="activeProjects" :activeId="activeId" @select="handleMobileSelect" label="PROJECT_LIST:" />
          </nav>
        </div>

        <div class="space-y-4">
          <div v-if="archivedProjects.length > 0" :class="[theme === 'light' ? 'border-stone-300' : 'border-zinc-800/40']" class="pt-4 border-t">
            <ProjectSelector :projects="archivedProjects" :activeId="activeId" @select="handleMobileSelect" label="LEGACY_CORES // 歷代作品:" />
          </div>

          <div :class="[theme === 'light' ? 'border-stone-300' : 'border-zinc-800/40']" class="pt-4 border-t border-dashed space-y-1">
            <div class="text-[9px] text-zinc-500 uppercase tracking-wider">TELEMETRY // 訪客計數</div>
            <div :class="[theme === 'light' ? 'bg-stone-300/50 border-stone-300/80 text-emerald-700' : 'bg-zinc-950/40 border-zinc-900 text-emerald-400']"
                 class="text-xs font-bold font-mono tracking-widest px-2 py-1 rounded-lg border text-center transition-colors duration-300">
              {{ uniqueVisitors }} <span :class="[theme === 'light' ? 'text-stone-400' : 'text-zinc-600']" class="font-normal">/</span> {{ totalViews }}
            </div>
          </div>

          <div :class="[theme === 'light' ? 'border-stone-300' : 'border-zinc-800/40']" class="pt-3 border-t text-[9px] text-zinc-600 space-y-0.5">
            <div>NODE // MOBILE_DRAWER_ACTIVE</div>
          </div>
        </div>
      </aside>
    </Transition>
  </Teleport>

  <div class="hidden lg:block fixed left-0 top-0 h-screen z-50 font-mono" @mouseenter="isHovered = true" @mouseleave="isHovered = false">
    <div :class="[isHovered ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100']" class="absolute left-0 top-0 w-8 h-36 cursor-pointer transition-all duration-300 origin-top-left group">
      <svg class="w-full h-full drop-shadow-[2px_2px_4px_rgba(0,0,0,0.2)]" viewBox="0 0 32 145" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0 L30 0 L24 14 L32 28 L20 45 L32 62 L20 80 L28 98 L16 115 L24 135 L0 145 Z" :fill="theme === 'light' ? 'rgba(231, 229, 228, 0.98)' : 'rgba(24, 24, 27, 0.98)'" :stroke="theme === 'light' ? '#d6d3d1' : '#27272a'" stroke-width="1"/>
      </svg>
      <span class="absolute text-[11px] opacity-20 group-hover:opacity-90 group-hover:scale-110 transition-all duration-200 top-2.5 right-2">💡</span>
    </div>

    <aside :class="[isHovered ? 'translate-x-0 shadow-[25px_0_50px_-12px_rgba(0,0,0,0.5)]' : '-translate-x-full', theme === 'light' ? 'bg-stone-200/98 border-stone-300/80' : 'bg-zinc-900/98 border-zinc-900/80']" class="w-60 h-full backdrop-blur-md border-r p-5 flex flex-col justify-between transition-transform duration-300 cubic-bezier(0.16, 1, 0.3, 1)">
      <div class="space-y-5">
        <div class="pt-2">
          <h1 :class="[theme === 'light' ? 'text-stone-900' : 'text-white']" class="text-lg font-black tracking-wider">JAY_AUDIO</h1>
        </div>

        <nav class="space-y-3">
          <div class="jelly-wrapper w-full">
            <button @click="$emit('select', 'bio')" :class="[activeId === 'bio' ? (theme === 'light' ? 'bg-emerald-600/10 border-emerald-600 text-emerald-700 font-bold shadow-sm' : 'bg-emerald-500/10 border-emerald-500 text-emerald-400 font-bold shadow-sm') : (theme === 'light' ? 'bg-stone-200/40 border-stone-300 text-stone-500 hover:text-stone-800 hover:border-stone-400' : 'bg-zinc-900/10 border-zinc-900/60 text-zinc-500 hover:border-zinc-800 hover:text-zinc-300')]" class="px-3 py-1.5 rounded-xl border text-xs w-full text-left cursor-pointer jelly-btn">
              <span class="text-zinc-600 mr-1">👤</span> 個人簡介
            </button>
          </div>
          <div :class="[theme === 'light' ? 'border-stone-300/60' : 'border-zinc-800/40']" class="h-[1px] border-b my-1 w-full"></div>
          <ProjectSelector :projects="activeProjects" :activeId="activeId" @select="$emit('select', $event)" label="PROJECT_LIST:" />
        </nav>
      </div>

      <div class="space-y-4">
        <div v-if="archivedProjects.length > 0" :class="[theme === 'light' ? 'border-stone-300' : 'border-zinc-800/40']" class="pt-4 border-t">
          <ProjectSelector :projects="archivedProjects" :activeId="activeId" @select="$emit('select', $event)" label="LEGACY_CORES // 歷代作品:" />
        </div>

        <div :class="[theme === 'light' ? 'border-stone-300' : 'border-zinc-800/60']" class="pt-4 border-t space-y-2">
          <div class="text-[0.6rem] text-zinc-600 uppercase tracking-wider">ENVIRONMENT // 燈光</div>
          <div :class="[theme === 'light' ? 'bg-stone-200/60 border-stone-300' : 'bg-zinc-950/60 border-zinc-900']" class="flex gap-1 p-1 border rounded-xl">
            <button @click="toggleTheme" :class="[theme === 'light' ? 'bg-amber-600/10 text-amber-700 border-amber-600/20 font-bold' : 'text-zinc-600 border-transparent']" class="flex-1 text-center py-0.5 text-xs border rounded-lg cursor-pointer">☀️</button>
            <button @click="toggleTheme" :class="[theme === 'dark' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 font-bold' : 'text-zinc-600 border-transparent']" class="flex-1 text-center py-0.5 text-xs border rounded-lg cursor-pointer">🌙</button>
          </div>
        </div>

        <div :class="[theme === 'light' ? 'border-stone-300' : 'border-zinc-800/60']" class="border-t pt-3 space-y-2">
          <div class="text-[0.6rem] text-zinc-600 uppercase tracking-wider">CONSOLE_SIZE // 增益</div>
          <div :class="[theme === 'light' ? 'bg-stone-200/60 border-stone-300' : 'bg-zinc-950/60 border-zinc-900']" class="flex gap-1 p-1 border rounded-xl">
            <button v-for="size in ['small', 'medium', 'large']" :key="size" @click="setFontSize(size)" :class="[fontSize === size ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 font-bold' : 'text-zinc-600 border-transparent']" class="flex-1 text-center py-0.5 text-[0.65rem] border rounded-lg cursor-pointer">
              {{ size === 'small' ? 'S' : size === 'medium' ? 'M' : 'L' }}
            </button>
          </div>
        </div>

        <div :class="[theme === 'light' ? 'border-stone-300' : 'border-zinc-800/60']" class="border-t pt-3 space-y-1.5">
          <div class="text-[0.6rem] text-zinc-600 uppercase tracking-wider">TELEMETRY // 訪客計數</div>
          <div :class="[theme === 'light' ? 'bg-stone-300/50 border-stone-300/80 text-emerald-700' : 'bg-zinc-950/40 border-zinc-900 text-emerald-400']" 
               class="font-mono text-xs font-bold p-2 border rounded-xl text-center tracking-widest shadow-inner transition-colors duration-300">
            {{ uniqueVisitors }} <span :class="[theme === 'light' ? 'text-stone-400' : 'text-zinc-600']" class="font-normal">/</span> {{ totalViews }}
          </div>
        </div>

        </div>
    </aside>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ProjectSelector from './ProjectSelector.vue'
import { useFontSize } from '../composables/useFontSize'
import { useTheme } from '../composables/useTheme'
import { useAnalytics } from '../composables/useAnalytics'

defineProps({ activeProjects: Array, archivedProjects: Array, activeId: String })
const emit = defineEmits(['select'])

const isHovered = ref(false)
const isMobileOpen = ref(false)

const { fontSize, setFontSize } = useFontSize()
const { theme, toggleTheme } = useTheme()
const { uniqueVisitors, totalViews, triggerTelemetry } = useAnalytics()

onMounted(() => {
  triggerTelemetry()
})

const handleMobileSelect = (id) => {
  emit('select', id)
  isMobileOpen.value = false
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.25s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.slide-enter-active, .slide-leave-active { transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1); }
.slide-enter-from, .slide-leave-to { transform: translateX(-100%); }
</style>