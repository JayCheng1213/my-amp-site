<template>
  <div class="flex flex-row lg:flex-col gap-1.5 overflow-x-auto lg:overflow-x-visible no-scrollbar pb-1 lg:pb-0 shrink-0">
    <span class="text-[9px] font-mono text-zinc-600 uppercase tracking-wider pb-1 hidden lg:block mb-0.5">
      PROJECT_LIST:
    </span>
    
    <button
      v-for="amp in projects"
      :key="amp.id"
      @click="$emit('select', amp.id)"
      :class="[
        activeId === amp.id 
          ? 'bg-emerald-500/10 border-emerald-500/80 text-emerald-400 font-bold shadow-sm shadow-emerald-500/5' 
          : 'bg-zinc-900/10 border-zinc-900/60 text-zinc-500 hover:border-zinc-800 hover:text-zinc-300'
      ]"
      class="px-3 py-1.5 rounded-xl border text-[11px] font-mono transition-all duration-200 shrink-0 lg:w-full lg:text-left cursor-pointer"
    >
      <span class="text-zinc-600 mr-1 lg:inline hidden">▪</span> {{ amp.menuName }}
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
