<template>
  <div v-if="prevProject || nextProject" class="relative">
    <div class="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-1.5">
      <span class="text-emerald-500">⚡</span> SIGNAL_CHAIN // 訊號銜接
    </div>

    <div class="relative grid grid-cols-2 gap-3">
      <!-- 中央訊號節點：桌面版顯示，象徵前後兩台機器透過同一條訊號鏈相連 -->
      <div class="hidden sm:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 items-center justify-center w-7 h-7 rounded-full border shadow-sm"
           :class="[theme === 'light' ? 'bg-stone-100 border-stone-300' : 'bg-zinc-950 border-zinc-800']">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
      </div>

      <button
        v-if="prevProject"
        @click="$emit('navigate', prevProject.id)"
        class="group text-left border rounded-2xl p-4 pr-6 cursor-pointer transition-all duration-300 font-mono"
        :class="[theme === 'light'
          ? 'bg-white/60 border-stone-300 hover:border-stone-500 hover:shadow-md'
          : 'bg-zinc-900/30 border-zinc-800/80 hover:border-emerald-500/50 hover:shadow-[0_0_15px_rgba(16,185,129,0.1)]']"
      >
        <div class="flex items-center gap-1 text-[9px] text-zinc-500 uppercase tracking-widest">
          <span class="inline-block transition-transform duration-200 group-hover:-translate-x-1">◀</span>
          PREV_NODE // 上一篇
        </div>
        <div class="mt-1.5 flex items-center gap-1.5">
          <span :class="[theme === 'light' ? 'text-stone-700 border-stone-400 bg-stone-200/40' : 'text-emerald-400 border-emerald-500/30 bg-emerald-500/5']"
                class="text-[10px] font-bold border px-1.5 py-0.5 rounded-md shrink-0">
            {{ prevProject.deviceCode || 'CORE' }}
          </span>
        </div>
        <div :class="[theme === 'light' ? 'text-stone-800' : 'text-zinc-300']" class="mt-1 text-xs font-bold truncate">
          {{ prevProject.menuName || prevProject.fullName }}
        </div>
      </button>
      <div v-else></div>

      <button
        v-if="nextProject"
        @click="$emit('navigate', nextProject.id)"
        class="group text-right border rounded-2xl p-4 pl-6 cursor-pointer transition-all duration-300 font-mono"
        :class="[theme === 'light'
          ? 'bg-white/60 border-stone-300 hover:border-stone-500 hover:shadow-md'
          : 'bg-zinc-900/30 border-zinc-800/80 hover:border-emerald-500/50 hover:shadow-[0_0_15px_rgba(16,185,129,0.1)]']"
      >
        <div class="flex items-center justify-end gap-1 text-[9px] text-zinc-500 uppercase tracking-widest">
          NEXT_NODE // 下一篇
          <span class="inline-block transition-transform duration-200 group-hover:translate-x-1">▶</span>
        </div>
        <div class="mt-1.5 flex items-center justify-end gap-1.5">
          <span :class="[theme === 'light' ? 'text-stone-700 border-stone-400 bg-stone-200/40' : 'text-emerald-400 border-emerald-500/30 bg-emerald-500/5']"
                class="text-[10px] font-bold border px-1.5 py-0.5 rounded-md shrink-0">
            {{ nextProject.deviceCode || 'CORE' }}
          </span>
        </div>
        <div :class="[theme === 'light' ? 'text-stone-800' : 'text-zinc-300']" class="mt-1 text-xs font-bold truncate">
          {{ nextProject.menuName || nextProject.fullName }}
        </div>
      </button>
      <div v-else></div>
    </div>
  </div>
</template>

<script setup>
import { useTheme } from '../composables/useTheme'
const { theme } = useTheme()

defineProps({
  prevProject: { type: Object, default: null },
  nextProject: { type: Object, default: null }
})
defineEmits(['navigate'])
</script>
