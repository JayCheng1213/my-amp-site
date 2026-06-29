<template>
  <div class="bg-zinc-900/40 backdrop-blur-md border border-zinc-900/80 rounded-2xl p-5 space-y-4 lg:col-span-1">
    <div>
      <span class="text-[9px] font-mono text-zinc-500 block tracking-wider">SPECIFICATIONS</span>
      <h2 class="text-base font-bold text-white font-mono mt-0.5">{{ amp.fullName }}</h2>
    </div>

    <div class="border-t border-zinc-900/80 pt-3 space-y-2 font-mono text-xs">
      <div class="flex justify-between"><span class="text-zinc-500">架構類型</span><span class="text-zinc-300">{{ amp.type }}</span></div>
      <div class="flex justify-between"><span class="text-zinc-500">真空管配置</span><span class="text-emerald-400 font-semibold">{{ amp.tubes }}</span></div>
      <div class="flex justify-between"><span class="text-zinc-500">輸出功率</span><span class="text-zinc-300">{{ amp.power }}</span></div>
    </div>

    <div class="p-2.5 bg-zinc-950/60 border border-zinc-900 rounded-xl flex justify-between items-center text-[10px] font-mono">
      <span class="text-zinc-500">進度狀態</span>
      <span :class="amp.statusColor" class="px-2 py-0.5 rounded font-bold text-[9px] uppercase">
        {{ amp.statusText }}
      </span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  amp: { type: Object, required: true }
})
</script>