<template>
  <div class="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible no-scrollbar pb-1 lg:pb-0 shrink-0">
    <span class="text-[0.6rem] font-mono text-zinc-600 uppercase tracking-wider pb-1 hidden lg:block mb-0.5">
      PROJECT_LIST:
    </span>
    
    <button
      v-for="amp in projects"
      :key="amp.id"
      @click="$emit('select', amp.id)"
      :class="[
        activeId === amp.id 
          ? (theme === 'light' ? 'bg-emerald-600/10 border-emerald-600 text-emerald-700 font-bold' : 'bg-emerald-500/10 border-emerald-500 text-emerald-400 font-bold') 
          : (theme === 'light' ? 'bg-stone-200/40 border-stone-300 text-stone-500 hover:text-stone-800 hover:border-stone-400' : 'bg-zinc-900/10 border-zinc-900/60 text-zinc-500 hover:border-zinc-800 hover:text-zinc-300')
      ]"
      class="px-3 py-1.5 rounded-xl border text-xs font-mono transition-all duration-200 shrink-0 lg:w-full lg:text-left cursor-pointer"
    >
      <span class="text-zinc-600 mr-1 lg:inline hidden">▪</span> {{ amp.menuName }}
    </button>
  </div>
</template>

<script setup>
import { useTheme } from '../composables/useTheme'
const { theme } = useTheme()
defineProps({ projects: Array, activeId: String })
defineEmits(['select'])
</script>