<template>
  <div v-if="amp.id === 'bio'"
       :class="[theme === 'light' ? 'bg-white/90 border-stone-300/80 text-stone-800' : 'bg-zinc-900/40 border-zinc-900/80 text-zinc-300']"
       class="backdrop-blur-md border rounded-2xl p-5 space-y-4 lg:col-span-1 transition-colors duration-300 font-mono relative overflow-hidden">
    
    <div class="absolute top-0 right-0 w-16 h-16 border-b border-l border-dashed opacity-20 pointer-events-none"
         :class="[theme === 'light' ? 'border-stone-400' : 'border-emerald-500']"></div>

    <div>
      <div class="flex items-center space-x-1.5 text-xs font-bold text-emerald-500 tracking-wider">
        <span>[🧠]</span> <span>SYS_REG_MATRIX // 核心暫存器</span>
      </div>
      <h2 :class="[theme === 'light' ? 'text-stone-900' : 'text-white']" class="text-base font-black mt-1 uppercase tracking-tight">
        Jaycheng // 個人簡介
      </h2>
    </div>

    <div :class="[theme === 'light' ? 'border-stone-200' : 'border-zinc-900/80']" class="border-t pt-3 space-y-3.5 text-xs">
      
      <div class="space-y-0.5">
        <span class="text-[10px] text-zinc-500 block">MAIN // 要去不去的學校</span>
        <span class="text-sm font-bold tracking-wide" :class="[theme === 'light' ? 'text-stone-800' : 'text-zinc-200']">
          國立臺北科技大學 (NTUT)
        </span>
      </div>
      
      <div class="space-y-0.5">
        <span class="text-[10px] text-zinc-500 block">CURRENT_STATE // 狀態暫存</span>
        <span class="text-sm font-bold tracking-wide text-emerald-500">
          電機系 大二
        </span>
      </div>
      
      <div class="space-y-0.5">
        <span class="text-[10px] text-zinc-500 block">PASSION_BUS // 興趣總線</span>
        <span class="text-[11px] font-medium tracking-wide leading-relaxed block" :class="[theme === 'light' ? 'text-stone-700' : 'text-zinc-300']">
          設計&組裝真空管擴大機 / MCU單晶系統開發 / 精品咖啡
        </span>
      </div>

      <div class="border-t border-dashed pt-2.5" :class="[theme === 'light' ? 'border-stone-200' : 'border-zinc-800']">
        <span class="text-[9px] text-zinc-500 block">UPTIME // 運行時長</span>
        <span class="text-sm font-bold text-amber-500 tracking-wider">SINCE_2005.12</span>
      </div>
      <div class="space-y-1">
  <span class="text-[10px] text-zinc-500 block">IO_CHANNELS // 外部通訊埠</span>
  <div class="font-mono text-xs space-y-2 pt-1 w-full">
    
    <div class="flex items-center justify-between w-full h-7">
      <span class="text-emerald-500 font-bold">[0x01_GMAIL] :</span>
      <a href="mailto:Jaycheng1213@gmail.com" 
         :class="[theme === 'light' ? 'bg-stone-300/30 border-stone-300/60 text-stone-800 hover:bg-emerald-600/10 hover:text-emerald-700 hover:border-emerald-600/30 shadow-[0_1px_2px_rgba(0,0,0,0.02)]' : 'bg-zinc-800/30 border-zinc-800/60 text-zinc-300 hover:bg-emerald-500/10 hover:text-emerald-400 hover:border-emerald-500/30 shadow-inner']" 
         class="px-2 py-0.5 rounded-lg border transition-all duration-200 text-[11px]">
        Jaycheng1213@gmail.com
      </a>
    </div>
    
    <div class="flex items-center justify-between w-full h-7">
      <span class="text-sky-500 font-bold">[0x02_LINE_ID] :</span>
      <span :class="[theme === 'light' ? 'text-stone-800' : 'text-zinc-300']" class="pr-2 font-medium tracking-wide">
        jaycheng1213
      </span>
    </div>
    
    <div class="flex items-center justify-between w-full h-7">
      <span class="text-fuchsia-500 font-bold">[0x03_IG] :</span>
      <a href="https://instagram.com/jaycheng1213" target="_blank" 
         :class="[theme === 'light' ? 'bg-stone-300/30 border-stone-300/60 text-stone-800 hover:bg-fuchsia-600/10 hover:text-fuchsia-700 hover:border-fuchsia-600/30 shadow-[0_1px_2px_rgba(0,0,0,0.02)]' : 'bg-zinc-800/30 border-zinc-800/60 text-zinc-300 hover:bg-fuchsia-500/10 hover:text-fuchsia-400 hover:border-fuchsia-500/30 shadow-inner']" 
         class="px-2 py-0.5 rounded-lg border transition-all duration-200 text-[11px]">
        jaycheng1213
      </a>
    </div>

  </div>
</div>
    </div>

    <div :class="[theme === 'light' ? 'bg-stone-100 border-stone-200' : 'bg-zinc-950/60 border-zinc-900']" 
         class="p-2.5 border rounded-xl flex justify-between items-center text-[10px]">
      <span class="text-zinc-500">FIRMWARE_STATUS</span>
      <span class="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded font-bold text-[9px] uppercase tracking-widest animate-pulse">
        ACTIVE
      </span>
    </div>
  </div>

  <div v-else
       :class="[theme === 'light' ? 'bg-white/80 border-stone-300/80 text-stone-800' : 'bg-zinc-900/40 border-zinc-900/80 text-zinc-300']"
       class="backdrop-blur-md border rounded-2xl p-5 space-y-4 lg:col-span-1 transition-colors duration-300 font-sans">
    <div>
      <span class="text-xs font-bold font-mono text-zinc-500 block tracking-wider uppercase">SPECIFICATIONS</span>
      <h2 :class="[theme === 'light' ? 'text-stone-900' : 'text-white']" class="text-base font-bold font-mono mt-0.5">{{ amp.fullName }}</h2>
    </div>

    <div :class="[theme === 'light' ? 'border-stone-200' : 'border-zinc-900/80']" class="border-t pt-3 space-y-2 font-mono text-xs">
      <div class="flex justify-between"><span class="text-zinc-500">架構類型</span><span class="font-medium">{{ amp.type }}</span></div>
      <div class="flex justify-between">
        <span class="text-zinc-500">真空管配置</span>
        <span :class="[theme === 'light' ? 'text-emerald-700 font-bold' : 'text-emerald-400 font-semibold']">{{ amp.tubes }}</span>
      </div>
      <div class="flex justify-between"><span class="text-zinc-500">輸出功率</span><span class="font-medium">{{ amp.power }}</span></div>
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