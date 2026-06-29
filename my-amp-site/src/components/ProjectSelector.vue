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

.jelly-btn {
  /* 鎖定高阻尼感過渡，讓推開鄰居時富有彈性感 */
  transition: transform 0.25s cubic-bezier(0.34, 1.75, 0.64, 1), 
              margin 0.35s cubic-bezier(0.34, 1.75, 0.64, 1), 
              background-color 0.2s, border-color 0.2s;
  will-change: transform, margin;
}

.jelly-btn:hover {
  animation: megaJelly 0.45s ease-in-out forwards;
}

/* 💻 電腦端：大幅朝上下推開鄰居 16px，張力直接拉滿 */
@media (min-width: 1024px) {
  .jelly-btn:hover {
    margin-top: 16px;
    margin-bottom: 16px;
  }
}

/* 📱 行動端：橫向朝左右推開鄰居 16px */
@media (max-width: 1023px) {
  .jelly-btn:hover {
    margin-left: 16px;
    margin-right: 16px;
  }
}

@keyframes megaJelly {
  0% {
    transform: scale(1, 1);
  }
  30% {
    transform: scale(1.22, 0.78); /* 壓得極扁 */
  }
  50% {
    transform: scale(0.82, 1.18); /* 拉得極長 */
  }
  70% {
    transform: scale(1.13, 0.92);
  }
  100% {
    transform: scale(1.12, 1.12); /* 💡 最終放大倍率灌到 1.12 倍 */
  }
}
</style>