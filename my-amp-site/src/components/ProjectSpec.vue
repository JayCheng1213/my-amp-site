<template>
  <div :class="[theme === 'light' ? 'bg-white/80 border-stone-300/80 text-stone-800' : 'bg-zinc-900/40 border-zinc-900/80 text-zinc-300']"
       class="backdrop-blur-md border rounded-2xl p-5 space-y-4 lg:col-span-1 transition-colors duration-300">
    <div>
      <span class="text-xs font-bold font-mono text-zinc-500 block tracking-wider uppercase">SPECIFICATIONS</span>
      <h2 :class="[theme === 'light' ? 'text-stone-900' : 'text-white']" class="text-base font-bold font-mono mt-0.5">{{ amp.fullName }}</h2>
    </div>

    <div :class="[theme === 'light' ? 'border-stone-200' : 'border-zinc-900/80']" class="border-t pt-3 space-y-2 font-mono text-xs">
      <div class="flex justify-between"><span class="text-zinc-500">架構類型</span><span>{{ amp.type }}</span></div>
      <div class="flex justify-between">
        <span class="text-zinc-500">真空管配置</span>
        <span :class="[theme === 'light' ? 'text-emerald-700 font-bold' : 'text-emerald-400 font-semibold']">{{ amp.tubes }}</span>
      </div>
      <div class="flex justify-between"><span class="text-zinc-500">輸出功率</span><span>{{ amp.power }}</span></div>
    </div>

    <div :class="[theme === 'light' ? 'bg-stone-100 border-stone-200' : 'bg-zinc-950/60 border-zinc-900']" class="p-2.5 border rounded-xl flex justify-between items-center text-[10px] font-mono">
      <span class="text-zinc-500">進度狀態</span>
      <span :class="amp.statusColor" class="px-2 py-0.5 rounded font-bold text-[9px] uppercase">
        {{ amp.statusText }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { useTheme } from '../composables/useTheme'
const { theme } = useTheme()
defineProps({ amp: Object })
</script>