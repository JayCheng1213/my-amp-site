<template>
  <div class="flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible no-scrollbar pb-1 lg:pb-0 shrink-0">
    <span class="text-[0.6rem] font-mono text-zinc-600 uppercase tracking-wider pb-1 hidden lg:block mb-0.5 select-none">
      PROJECT_LIST:
    </span>
    
    <div
      v-for="amp in projects"
      :key="amp.id"
      class="jelly-wrapper shrink-0 lg:w-full"
    >
      <button
        @click="$emit('select', amp.id)"
        :class="[
          activeId === amp.id 
            ? (theme === 'light' ? 'bg-emerald-600/10 border-emerald-600 text-emerald-700 font-bold shadow-sm' : 'bg-emerald-500/10 border-emerald-500 text-emerald-400 font-bold shadow-sm') 
            : (theme === 'light' ? 'bg-stone-200/40 border-stone-300 text-stone-500 hover:text-stone-800 hover:border-stone-400' : 'bg-zinc-900/10 border-zinc-900/60 text-zinc-500 hover:border-zinc-800 hover:text-zinc-300')
        ]"
        class="px-3 py-1.5 rounded-xl border text-xs font-mono w-full lg:text-left cursor-pointer jelly-btn"
      >
        <span class="text-zinc-600 mr-1 lg:inline hidden">▪</span> {{ amp.menuName }}
      </button>
    </div>
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

/* ========================================================================= */
/* 💡 施密特遲滯防抖外殼電路 */
/* ========================================================================= */
.jelly-wrapper {
  /* 鎖定緩衝區形變時間，與內層果凍完美步調一致 */
  transition: padding 0.35s cubic-bezier(0.34, 1.75, 0.64, 1);
  padding: 0px; /* 預設靜態無增益 */
  will-change: padding;
}

/* 💻 電腦端（垂直流向）：外殼 Hover 時，改動 padding-top/bottom 擠開鄰居 */
@media (min-width: 1024px) {
  .jelly-wrapper:hover {
    padding-top: 14px;
    padding-bottom: 14px;
  }
}

/* 📱 行動端（橫向流向）：外殼 Hover 時，改動 padding-left/right 擠開鄰居 */
@media (max-width: 1023px) {
  .jelly-wrapper:hover {
    padding-left: 14px;
    padding-right: 14px;
  }
}

/* ========================================================================= */
/* 🍮 內層果凍按鈕晶片（當父階 wrapper 被 Hover 時才觸發動畫） */
/* ========================================================================= */
.jelly-btn {
  transition: transform 0.25s cubic-bezier(0.25, 0.8, 0.25, 1), background-color 0.2s, border-color 0.2s;
  will-change: transform;
}

/* 當外殼被偵測到懸停時，內部按鈕才發射 Q 彈動畫 */
.jelly-wrapper:hover .jelly-btn {
  animation: megaJelly 0.45s ease-in-out forwards;
}

@keyframes megaJelly {
  0% { transform: scale(1, 1); }
  30% { transform: scale(1.20, 0.80); } /* 橫向壓扁 */
  50% { transform: scale(0.83, 1.17); } /* 縱向拉長 */
  70% { transform: scale(1.13, 0.93); }
  100% { transform: scale(1.12, 1.12); } /* 穩定鎖定在 1.12 倍 */
}
</style>