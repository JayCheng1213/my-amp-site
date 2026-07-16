<template>
  <div class="p-6 font-mono selection:bg-emerald-500/30">
    <div 
      :class="[theme === 'light' ? 'bg-white border-stone-200 shadow-sm' : 'bg-zinc-900 border-zinc-800 shadow-inner']"
      class="border rounded-2xl p-6 transition-colors duration-300"
    >
      <div class="flex items-center justify-between mb-8 pb-4 border-b border-dashed" :class="[theme === 'light' ? 'border-stone-200' : 'border-zinc-800']">
        <div>
          <h2 :class="[theme === 'light' ? 'text-stone-900' : 'text-white']" class="text-xl font-extrabold tracking-tighter uppercase">
            SYSTEM_AUDIO_PATH
          </h2>
          <p class="text-[11px] text-zinc-500 mt-0.5">STAGE 01 TO 05: UNIFIED CHASSIS AND POWER ISOLATION LAYOUT</p>
        </div>
        <div class="flex items-center space-x-2 text-xs">
          <span class="text-zinc-500">CHASSIS_STATE:</span>
          <span class="text-emerald-500 font-bold">READY</span>
        </div>
      </div>

      <div 
        :class="[theme === 'light' ? 'border-stone-300 bg-stone-50/30' : 'border-zinc-800 bg-zinc-950/30']"
        class="border rounded-xl overflow-hidden relative flex flex-col"
      >
        <div class="grid grid-cols-1 md:grid-cols-4 min-h-[500px] flex-grow">
          
          <div 
            :class="[theme === 'light' ? 'border-stone-200 text-stone-400' : 'border-zinc-800 text-zinc-600']"
            class="p-6 flex flex-col border-b md:border-b-0 md:border-r border-dashed"
          >
            <div class="mb-4">
              <div class="text-[10px] font-bold tracking-widest text-emerald-600">[STAGE_01]</div>
              <div class="text-xs font-bold mt-1 uppercase" :class="[theme === 'light' ? 'text-stone-700' : 'text-zinc-400']">INPUT_SOURCES</div>
            </div>
            
            <div class="flex-grow flex flex-col justify-between space-y-2">
              
              <div class="flex-1 flex flex-col items-center justify-center relative">
                <span class="absolute top-0 text-[10px] font-bold opacity-60 tracking-wider">PC STREAMER</span>
                <svg viewBox="0 0 100 80" class="w-full h-20 stroke-current fill-none stroke-2 mt-4" :class="[theme === 'light' ? 'text-stone-700' : 'text-zinc-300']">
                  <rect x="35" y="10" width="30" height="50" rx="2" />
                  <line x1="40" y1="22" x2="60" y2="22" />
                  <circle cx="50" cy="50" r="3" class="fill-emerald-500 stroke-none animate-pulse" />
                </svg>
              </div>
              
              <div class="flex-1 flex flex-col items-center justify-center relative">
                <span class="absolute top-0 text-[10px] font-bold opacity-60 tracking-wider">CD PLAYER</span>
                <svg viewBox="0 0 100 80" class="w-full h-20 stroke-current fill-none stroke-2 mt-4" :class="[theme === 'light' ? 'text-stone-700' : 'text-zinc-300']">
                  <rect x="10" y="30" width="80" height="20" rx="2" />
                  <rect x="25" y="36" width="35" height="3" class="fill-current stroke-none" />
                  <circle cx="75" cy="40" r="2" class="fill-emerald-500 stroke-none" />
                </svg>
              </div>
              
              <div class="flex-1 flex flex-col items-center justify-center relative">
                <span class="absolute top-0 text-[10px] font-bold opacity-60 tracking-wider">TURNTABLE</span>
                <svg viewBox="0 0 100 80" class="w-full h-20 stroke-current fill-none stroke-2 mt-4" :class="[theme === 'light' ? 'text-stone-700' : 'text-zinc-300']">
                  <rect x="15" y="20" width="70" height="40" rx="2" />
                  <circle cx="40" cy="40" r="14" />
                  <circle cx="40" cy="40" r="1.5" class="fill-current" />
                  <line x1="80" y1="25" x2="52" y2="48" />
                  <circle cx="80" cy="25" r="4" />
                </svg>
              </div>
            </div>
          </div>

          <div 
            :class="[theme === 'light' ? 'border-stone-200 text-stone-400' : 'border-zinc-800 text-zinc-600']"
            class="p-6 flex flex-col border-b md:border-b-0 md:border-r border-dashed"
          >
            <div class="mb-4">
              <div class="text-[10px] font-bold tracking-widest text-emerald-600">[STAGE_02]</div>
              <div class="text-xs font-bold mt-1 uppercase" :class="[theme === 'light' ? 'text-stone-700' : 'text-zinc-400']">PROCESSING</div>
            </div>
            
            <div class="flex-grow flex flex-col justify-around space-y-2">
              
              <div class="flex-1 flex flex-col items-center justify-center relative">
                <span class="absolute top-0 text-[10px] font-bold opacity-60 tracking-wider">TOPPING DX5 II</span>
                <svg viewBox="0 0 100 80" class="w-full h-20 stroke-current fill-none stroke-2 mt-4" :class="[theme === 'light' ? 'text-stone-700' : 'text-zinc-300']">
                  <rect x="10" y="25" width="80" height="25" rx="2" />
                  <circle cx="35" cy="37.5" r="7" class="stroke-emerald-500" />
                  <circle cx="75" cy="37.5" r="4" />
                  <circle cx="20" cy="37.5" r="2" class="fill-current" />
                </svg>
              </div>
              
              <div class="flex-1 flex flex-col items-center justify-center relative">
                <span class="absolute top-0 text-[10px] font-bold opacity-60 tracking-wider">PHONO STAGE</span>
                <svg viewBox="0 0 100 80" class="w-full h-20 stroke-current fill-none stroke-2 mt-4" :class="[theme === 'light' ? 'text-stone-700' : 'text-zinc-300']">
                  <rect x="25" y="30" width="50" height="20" rx="2" />
                  <circle cx="35" cy="40" r="2.5" />
                  <circle cx="45" cy="40" r="2.5" />
                  <circle cx="65" cy="40" r="2" class="fill-amber-500 stroke-none" />
                </svg>
              </div>
            </div>
          </div>

          <div 
            :class="[theme === 'light' ? 'border-stone-200 text-stone-400' : 'border-zinc-800 text-zinc-600']"
            class="p-6 flex flex-col border-b md:border-b-0 md:border-r border-dashed"
          >
            <div class="mb-4">
              <div class="text-[10px] font-bold tracking-widest text-emerald-600">[STAGE_03]</div>
              <div class="text-xs font-bold mt-1 uppercase" :class="[theme === 'light' ? 'text-stone-700' : 'text-zinc-400']">AMPLIFICATION</div>
            </div>
            
            <div class="flex-grow flex flex-col justify-around space-y-2">
              
              <div class="flex-1 flex flex-col items-center justify-center relative">
                <span class="absolute top-0 text-[10px] font-bold opacity-60 tracking-wider">2A3 AMP</span>
                <svg viewBox="0 0 100 80" class="w-full h-20 stroke-current fill-none stroke-2 mt-4" :class="[theme === 'light' ? 'text-stone-700' : 'text-zinc-300']">
                  <rect x="10" y="55" width="80" height="10" rx="2" />
                  <rect x="25" y="20" width="20" height="35" rx="2" />
                  <path d="M55 55 C52 25, 68 25, 65 55" class="fill-orange-500/20 stroke-orange-500" />
                  <path d="M72 55 C69 25, 85 25, 82 55" class="fill-orange-500/20 stroke-orange-500" />
                </svg>
              </div>
              
              <div class="flex-1 flex flex-col items-center justify-center relative">
                <span class="absolute top-0 text-[10px] font-bold opacity-60 tracking-wider">6R-A3 AMP</span>
                <svg viewBox="0 0 100 80" class="w-full h-20 stroke-current fill-none stroke-2 mt-4" :class="[theme === 'light' ? 'text-stone-700' : 'text-zinc-300']">
                  <rect x="15" y="55" width="70" height="10" rx="2" />
                  <rect x="25" y="25" width="15" height="30" rx="1.5" />
                  <rect x="50" y="35" width="10" height="20" rx="4" class="fill-orange-500/20 stroke-orange-500" />
                  <rect x="65" y="35" width="10" height="20" rx="4" class="fill-orange-500/20 stroke-orange-500" />
                </svg>
              </div>
            </div>
          </div>

          <div 
            :class="[theme === 'light' ? 'text-stone-400' : 'text-zinc-600']"
            class="p-6 flex flex-col"
          >
            <div class="mb-4">
              <div class="text-[10px] font-bold tracking-widest text-emerald-600">[STAGE_04]</div>
              <div class="text-xs font-bold mt-1 uppercase" :class="[theme === 'light' ? 'text-stone-700' : 'text-zinc-400']">TRANSDUCERS</div>
            </div>
            
            <div class="flex-grow flex flex-col justify-around space-y-2">
              
              <div class="flex-1 flex flex-col items-center justify-center relative">
                <span class="absolute top-0 text-[10px] font-bold opacity-60 tracking-wider">SPEAKERS</span>
                <svg viewBox="0 0 100 80" class="w-full h-20 stroke-current fill-none stroke-2 mt-4" :class="[theme === 'light' ? 'text-stone-700' : 'text-zinc-300']">
                  <rect x="30" y="5" width="40" height="70" rx="2" />
                  <circle cx="50" cy="22" r="7" />
                  <circle cx="50" cy="52" r="14" />
                  <circle cx="50" cy="52" r="3" />
                </svg>
              </div>
              
              <div class="flex-1 flex flex-col items-center justify-center relative">
                <span class="absolute top-0 text-[10px] font-bold opacity-60 tracking-wider">IEM</span>
                <svg viewBox="0 0 100 80" class="w-full h-20 stroke-current fill-none stroke-2 mt-4" :class="[theme === 'light' ? 'text-stone-700' : 'text-zinc-300']">
                  <circle cx="35" cy="25" r="6" />
                  <rect x="25" y="23" width="4" height="4" rx="1" />
                  <circle cx="65" cy="25" r="6" />
                  <rect x="71" y="23" width="4" height="4" rx="1" />
                  <path d="M 35 31 C 35 50, 48 55, 50 80" />
                  <path d="M 65 31 C 65 50, 52 55, 50 80" />
                </svg>
              </div>
            </div>
          </div>

        </div>

        <div class="border-t border-dashed" :class="[theme === 'light' ? 'border-stone-200' : 'border-zinc-800']"></div>

        <div 
          :class="[theme === 'light' ? 'text-stone-400' : 'text-zinc-600']"
          class="p-6 min-h-[140px] flex flex-col"
        >
          <div class="mb-4">
            <div class="text-[10px] font-bold tracking-widest text-amber-600">[POWER_STAGE]</div>
            <div class="text-xs font-bold mt-1 uppercase" :class="[theme === 'light' ? 'text-stone-700' : 'text-zinc-400']">POWER_DISTRIBUTION_UNIT</div>
          </div>
          
          <div class="flex-grow flex items-center justify-center relative">
            <span class="absolute top-0 text-[10px] font-bold opacity-60 tracking-wider">ISOLATION TRANSFORMER</span>
            <svg viewBox="0 0 100 80" class="w-full h-20 stroke-current fill-none stroke-2 mt-4" :class="[theme === 'light' ? 'text-stone-700' : 'text-zinc-300']">
              <path d="M 35 20 A 6 6 0 0 0 35 32 A 6 6 0 0 0 35 44 A 6 6 0 0 0 35 56 A 6 6 0 0 0 35 68" />
              <path d="M 65 20 A 6 6 0 0 1 65 32 A 6 6 0 0 1 65 44 A 6 6 0 0 1 65 56 A 6 6 0 0 1 65 68" />
              <line x1="47" y1="15" x2="47" y2="73" />
              <line x1="53" y1="15" x2="53" y2="73" />
              <line x1="20" y1="20" x2="35" y2="20" />
              <line x1="20" y1="68" x2="35" y2="68" />
              <line x1="80" y1="20" x2="65" y2="20" />
              <line x1="80" y1="68" x2="65" y2="68" />
            </svg>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { useTheme } from '../composables/useTheme'
const { theme } = useTheme()
</script>