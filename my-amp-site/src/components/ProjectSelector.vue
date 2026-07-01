<template>
  <div class="flex flex-col gap-1 w-full shrink-0">
    
    <span class="text-[0.6rem] font-mono text-zinc-600 uppercase tracking-wider pb-1 block mb-0.5 select-none">
      {{ label }}
    </span>
    
    <div
      v-for="amp in projects"
      :key="amp.id"
      class="jelly-wrapper w-full"
    >
      <button
        @click="$emit('select', amp.id)"
        :class="[
          activeId === amp.id 
            ? (theme === 'light' ? 'bg-emerald-600/10 border-emerald-600 text-emerald-700 font-bold shadow-sm' : 'bg-emerald-500/10 border-emerald-500 text-emerald-400 font-bold shadow-sm') 
            : (theme === 'light' ? 'bg-stone-200/40 border-stone-300 text-stone-500 hover:text-stone-800 hover:border-stone-400' : 'bg-zinc-900/10 border-zinc-900/60 text-zinc-500 hover:border-zinc-800 hover:text-zinc-300')
        ]"
        class="px-3 py-1.5 rounded-xl border text-xs font-mono w-full text-left cursor-pointer jelly-btn"
      >
        <span class="text-zinc-600 mr-1 inline">▪</span> {{ amp.menuName }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { useTheme } from '../composables/useTheme'
const { theme } = useTheme()

defineProps({
  projects: Array,
  activeId: String,
  label: { type: String, default: 'PROJECT_LIST:' }
})
defineEmits(['select'])
</script>

<style scoped>
.jelly-wrapper {
  transition: padding 0.35s cubic-bezier(0.34, 1.75, 0.64, 1);
  padding: 0px;
  will-change: padding;
}

/* 💡 避震調校：只在電腦端（Desktop）允許 Hover 時上下撐開空間 */
/* 手機端大拇指觸控時保持原地壓彈，嚴防窄抽屜產生縱向暴增導致誤觸 */
@media (min-width: 1024px) {
  .jelly-wrapper:hover { 
    padding-top: 14px; 
    padding-bottom: 14px; 
  }
}

.jelly-btn {
  transition: transform 0.25s cubic-bezier(0.25, 0.8, 0.25, 1), background-color 0.2s, border-color 0.2s;
  will-change: transform;
}

/* 電腦端專屬的強力果凍膨脹波 */
@media (min-width: 1024px) {
  .jelly-wrapper:hover .jelly-btn {
    animation: megaJelly 0.45s ease-in-out forwards;
  }
}

/* 手機端專屬：原地阻尼輕微壓彈（手指按住時微縮 0.97，極具實體按鍵回饋感） */
.jelly-btn:active {
  transform: scale(0.97);
  transition: transform 0.1s ease;
}

@keyframes megaJelly {
  0% { transform: scale(1, 1); }
  30% { transform: scale(1.20, 0.80); }
  50% { transform: scale(0.83, 1.17); }
  70% { transform: scale(1.13, 0.93); }
  100% { transform: scale(1.12, 1.12); }
}
</style>