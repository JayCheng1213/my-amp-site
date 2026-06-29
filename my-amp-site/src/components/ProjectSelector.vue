<template>
  <div class="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible no-scrollbar border-b lg:border-b-0 lg:border-r lg:border-zinc-900/60 pb-3 lg:pb-0 lg:pr-4 shrink-0">
    <span class="text-[10px] font-mono text-zinc-600 uppercase tracking-wider pb-1 hidden lg:block border-b border-zinc-900/40 mb-1">
      SELECT_PROJECT:
    </span>
    
    <button
      v-for="amp in projects"
      :key="amp.id"
      @click="$emit('select', amp.id)"
      :class="[
        activeId === amp.id 
          ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 font-bold shadow-sm shadow-emerald-500/5' 
          : 'bg-zinc-900/20 border-zinc-900 text-zinc-500 hover:border-zinc-800 hover:text-zinc-300'
      ]"
      class="px-4 py-2 rounded-xl border text-xs font-mono transition-all duration-200 shrink-0 lg:w-full lg:text-left cursor-pointer"
    >
      <span class="hidden lg:inline mr-1 text-zinc-600">▪</span> {{ amp.menuName }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  projects: { type: Array, required: true },
  activeId: { type: String, required: true }
})
defineEmits(['select'])
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>