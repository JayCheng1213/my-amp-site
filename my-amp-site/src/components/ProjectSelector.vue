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
          ? (theme === 'light' ? 'bg-emerald-600/10 border-emerald-600 text-emerald-700 font-bold shadow-sm' : 'bg-emerald-500/10 border-emerald-500 text-emerald-400 font-bold shadow-sm') 
          : (theme === 'light' ? 'bg-stone-200/40 border-stone-300 text-stone-500 hover:text-stone-800 hover:border-stone-400' : 'bg-zinc-900/10 border-zinc-900/60 text-zinc-500 hover:border-zinc-800 hover:text-zinc-300')
      ]"
      class="px-3 py-1.5 rounded-xl border text-xs font-mono shrink-0 lg:w-full lg:text-left cursor-pointer jelly-btn"
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

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

/* 🍮 升級版：超級果凍與外邊距動態排開電路 */
.jelly-btn {
  /* 💡 焊接高彈性阻尼過渡，確保擠開鄰近按鈕時絲滑不抖動 */
  transition: transform 0.2s, margin 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.2s, border-color 0.2s;
  will-change: transform, margin;
}

.jelly-btn:hover {
  animation: jellyAnimation 0.5s ease-in-out forwards;
}

/* 💻 電腦端（垂直排版）：觸碰時朝上下彈性擠開鄰居 */
@media (min-width: 1024px) {
  .jelly-btn:hover {
    margin-top: 6px;
    margin-bottom: 6px;
  }
}

/* 📱 行動端（橫向排版）：觸碰時朝左右彈性擠開鄰居 */
@media (max-width: 1023px) {
  .jelly-btn:hover {
    margin-left: 6px;
    margin-right: 6px;
  }
}

@keyframes jellyAnimation {
  0% {
    transform: scale(1, 1);
  }
  30% {
    transform: scale(1.15, 0.85); /* 壓得更扁 */
  }
  50% {
    transform: scale(0.90, 1.10); /* 縱向扯得更長 */
  }
  70% {
    transform: scale(1.07, 0.94);
  }
  100% {
    transform: scale(1.06, 1.06); /* 💡 終點增益放大到 1.06 倍，存在感極強 */
  }
}
</style>