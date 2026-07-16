<template>
  <section 
    :class="[theme === 'light' ? 'bg-stone-100/50 border-stone-300/80' : 'bg-zinc-950/20 border-zinc-900/80']"
    class="w-full rounded-2xl border p-6 font-mono transition-colors duration-300 mt-12 shadow-sm"
  >
    <div class="flex items-center justify-between mb-6 border-b border-dashed pb-4" :class="[theme === 'light' ? 'border-stone-300' : 'border-zinc-800/60']">
      <div>
        <h2 :class="[theme === 'light' ? 'text-stone-900' : 'text-white']" class="text-sm font-bold tracking-wider">
          SYSTEM_AUDIO_PATH // 音訊實體拓撲圖
        </h2>
        <p class="text-[10px] text-zinc-500 mt-0.5">STAGE 01 ~ 04: SIGNAL FLOW & GAIN STAGE</p>
      </div>
      <div class="flex items-center space-x-2 text-[10px]">
        <span class="relative flex h-2 w-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span class="text-emerald-500 font-bold">BIAS_OK</span>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 relative">
      
      <div :class="[theme === 'light' ? 'bg-stone-200/30 border-stone-300/60' : 'bg-zinc-900/10 border-zinc-900/40']" 
           class="border rounded-xl p-4 min-h-[380px] flex flex-col justify-between relative">
        <div>
          <div class="text-[10px] text-emerald-500 font-bold tracking-widest">[STAGE_01]</div>
          <h3 :class="[theme === 'light' ? 'text-stone-800' : 'text-zinc-300']" class="text-xs font-black tracking-wider mt-1">
            INPUT_SOURCES // 訊源區
          </h3>
          <p class="text-[9px] text-zinc-500 mt-0.5">DIGITAL & ANALOG FEED</p>
        </div>
        
        <div class="flex-1 flex items-center justify-center border border-dashed rounded-lg my-4" :class="[theme === 'light' ? 'border-stone-300/80 text-stone-400' : 'border-zinc-800/80 text-zinc-600']">
          <span class="text-[10px] text-center px-4">WAITING_FOR_DEVICES<br>(PC / CD / PLATER)</span>
        </div>

        <div class="text-[9px] text-zinc-500 text-right">Z_IN: High Impedance</div>
      </div>

      <div :class="[theme === 'light' ? 'bg-stone-200/30 border-stone-300/60' : 'bg-zinc-900/10 border-zinc-900/40']" 
           class="border rounded-xl p-4 min-h-[380px] flex flex-col justify-between relative">
        <div>
          <div class="text-[10px] text-sky-500 font-bold tracking-widest">[STAGE_02]</div>
          <h3 :class="[theme === 'light' ? 'text-stone-800' : 'text-zinc-300']" class="text-xs font-black tracking-wider mt-1">
            DECODING_CENTER // 解碼區
          </h3>
          <p class="text-[9px] text-zinc-500 mt-0.5">D/A SIGNAL RESOLUTION</p>
        </div>

        <div class="flex-1 flex items-center justify-center border border-dashed rounded-lg my-4" :class="[theme === 'light' ? 'border-stone-300/80 text-stone-400' : 'border-zinc-800/80 text-zinc-600']">
          <span class="text-[10px] text-center px-4">WAITING_FOR_DEVICES<br>(TOPPING DX5 II)</span>
        </div>

        <div class="text-[9px] text-zinc-500 text-right">Z_OUT: 100 Ohm</div>
      </div>

      <div :class="[theme === 'light' ? 'bg-stone-200/30 border-stone-300/60' : 'bg-zinc-900/10 border-zinc-900/40']" 
           class="border rounded-xl p-4 min-h-[380px] flex flex-col justify-between relative">
        <div>
          <div class="text-[10px] text-amber-500 font-bold tracking-widest">[STAGE_03]</div>
          <h3 :class="[theme === 'light' ? 'text-stone-800' : 'text-zinc-300']" class="text-xs font-black tracking-wider mt-1">
            POWER_AMPLIFIERS // 功放區
          </h3>
          <p class="text-[9px] text-zinc-500 mt-0.5">VACUUM_TUBE_GAIN</p>
        </div>

        <div class="flex-1 flex items-center justify-center border border-dashed rounded-lg my-4" :class="[theme === 'light' ? 'border-stone-300/80 text-stone-400' : 'border-zinc-800/80 text-zinc-600']">
          <span class="text-[10px] text-center px-4">WAITING_FOR_DEVICES<br>(2A3 / 6R-A3 AMPS)</span>
        </div>

        <div class="text-[9px] text-zinc-500 text-right">CLASS-A CONFIG</div>
      </div>

      <div :class="[theme === 'light' ? 'bg-stone-200/30 border-stone-300/60' : 'bg-zinc-900/10 border-zinc-900/40']" 
           class="border rounded-xl p-4 min-h-[380px] flex flex-col justify-between relative">
        <div>
          <div class="text-[10px] text-rose-500 font-bold tracking-widest">[STAGE_04]</div>
          <h3 :class="[theme === 'light' ? 'text-stone-800' : 'text-zinc-300']" class="text-xs font-black tracking-wider mt-1">
            TRANSDUCERS_LOAD // 負載區
          </h3>
          <p class="text-[9px] text-zinc-500 mt-0.5">ACOUSTIC OUTPUT</p>
        </div>

        <div class="flex-1 flex items-center justify-center border border-dashed rounded-lg my-4" :class="[theme === 'light' ? 'border-stone-300/80 text-stone-400' : 'border-zinc-800/80 text-zinc-600']">
          <span class="text-[10px] text-center px-4">WAITING_FOR_DEVICES<br>(SPEAKERS / IEMs)</span>
        </div>

        <div class="text-[9px] text-zinc-500 text-right">Z_LOAD: 8Ω / 16Ω</div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { useTheme } from '../composables/useTheme'
const { theme } = useTheme()
</script>