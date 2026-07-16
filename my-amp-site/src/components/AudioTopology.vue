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
        <div class="grid grid-cols-1 md:grid-cols-4 min-h-[480px] flex-grow">
          
          <div 
            :class="[theme === 'light' ? 'border-stone-200 text-stone-400' : 'border-zinc-800 text-zinc-600']"
            class="p-6 flex flex-col border-b md:border-b-0 md:border-r border-dashed"
          >
            <div class="mb-6">
              <div class="text-[10px] font-bold tracking-widest text-emerald-600">[STAGE_01]</div>
              <div class="text-xs font-bold mt-1 uppercase" :class="[theme === 'light' ? 'text-stone-700' : 'text-zinc-400']">INPUT_SOURCES</div>
            </div>
            <div class="flex-grow flex flex-col space-y-4">
              
              <div :class="[theme === 'light' ? 'border-stone-300 bg-white text-stone-700' : 'border-zinc-700 bg-zinc-900/50 text-zinc-300']" class="flex-1 border rounded-lg flex flex-col items-center justify-center shadow-sm relative p-2">
                <span class="absolute top-2 left-2 text-[8px] font-bold opacity-50">PC</span>
                <svg viewBox="0 0 100 60" class="w-full h-10 stroke-current fill-none stroke-2">
                  <rect x="35" y="10" width="30" height="40" rx="2" />
                  <line x1="40" y1="20" x2="60" y2="20" />
                  <circle cx="50" cy="40" r="3" class="fill-emerald-500 stroke-none animate-pulse" />
                </svg>
              </div>
              
              <div :class="[theme === 'light' ? 'border-stone-300 bg-white text-stone-700' : 'border-zinc-700 bg-zinc-900/50 text-zinc-300']" class="flex-1 border rounded-lg flex flex-col items-center justify-center shadow-sm relative p-2">
                <span class="absolute top-2 left-2 text-[8px] font-bold opacity-50">CD</span>
                <svg viewBox="0 0 100 60" class="w-full h-10 stroke-current fill-none stroke-2">
                  <rect x="10" y="25" width="80" height="15" rx="1" />
                  <rect x="20" y="28" width="30" height="4" class="fill-current" />
                  <circle cx="75" cy="32" r="2" class="fill-emerald-500 stroke-none" />
                </svg>
              </div>
              
              <div :class="[theme === 'light' ? 'border-stone-300 bg-white text-stone-700' : 'border-zinc-700 bg-zinc-900/50 text-zinc-300']" class="flex-1 border rounded-lg flex flex-col items-center justify-center shadow-sm relative p-2">
                <span class="absolute top-2 left-2 text-[8px] font-bold opacity-50">LP</span>
                <svg viewBox="0 0 100 60" class="w-full h-10 stroke-current fill-none stroke-2">
                  <rect x="15" y="15" width="70" height="30" rx="2" />
                  <circle cx="40" cy="30" r="12" />
                  <circle cx="40" cy="30" r="2" class="fill-current" />
                  <line x1="75" y1="20" x2="50" y2="35" />
                  <circle cx="75" cy="20" r="4" />
                </svg>
              </div>
            </div>
          </div>

          <div 
            :class="[theme === 'light' ? 'border-stone-200 text-stone-400' : 'border-zinc-800 text-zinc-600']"
            class="p-6 flex flex-col border-b md:border-b-0 md:border-r border-dashed"
          >
            <div class="mb-6">
              <div class="text-[10px] font-bold tracking-widest text-emerald-600">[STAGE_02]</div>
              <div class="text-xs font-bold mt-1 uppercase" :class="[theme === 'light' ? 'text-stone-700' : 'text-zinc-400']">PROCESSING</div>
            </div>
            <div class="flex-grow flex flex-col space-y-4">
              
              <div :class="[theme === 'light' ? 'border-stone-300 bg-white text-stone-700' : 'border-zinc-700 bg-zinc-900/50 text-zinc-300']" class="flex-1 border rounded-lg flex flex-col items-center justify-center shadow-sm relative p-2">
                <span class="absolute top-2 left-2 text-[8px] font-bold opacity-50">DX5 II</span>
                <svg viewBox="0 0 100 60" class="w-full h-10 stroke-current fill-none stroke-2">
                  <rect x="10" y="20" width="80" height="20" rx="1" />
                  <circle cx="35" cy="30" r="6" class="stroke-emerald-500" />
                  <circle cx="75" cy="30" r="4" />
                  <circle cx="18" cy="30" r="1.5" class="fill-current" />
                </svg>
              </div>
              
              <div :class="[theme === 'light' ? 'border-stone-300 bg-white text-stone-700' : 'border-zinc-700 bg-zinc-900/50 text-zinc-300']" class="flex-1 border rounded-lg flex flex-col items-center justify-center shadow-sm relative p-2">
                <span class="absolute top-2 left-2 text-[8px] font-bold opacity-50">PHONO</span>
                <svg viewBox="0 0 100 60" class="w-full h-10 stroke-current fill-none stroke-2">
                  <rect x="30" y="25" width="40" height="15" rx="1" />
                  <circle cx="36" cy="32.5" r="2" />
                  <circle cx="44" cy="32.5" r="2" />
                  <circle cx="64" cy="32.5" r="1.5" class="fill-amber-500 stroke-none" />
                </svg>
              </div>
            </div>
          </div>

          <div 
            :class="[theme === 'light' ? 'border-stone-200 text-stone-400' : 'border-zinc-800 text-zinc-600']"
            class="p-6 flex flex-col border-b md:border-b-0 md:border-r border-dashed"
          >
            <div class="mb-6">
              <div class="text-[10px] font-bold tracking-widest text-emerald-600">[STAGE_03]</div>
              <div class="text-xs font-bold mt-1 uppercase" :class="[theme === 'light' ? 'text-stone-700' : 'text-zinc-400']">AMPLIFICATION</div>
            </div>
            <div class="flex-grow flex flex-col space-y-4">
              
              <div :class="[theme === 'light' ? 'border-stone-300 bg-white text-stone-700' : 'border-zinc-700 bg-zinc-900/50 text-zinc-300']" class="flex-1 border rounded-lg flex flex-col items-center justify-center shadow-sm relative p-2">
                <span class="absolute top-2 left-2 text-[8px] font-bold opacity-50">2A3 AMP</span>
                <svg viewBox="0 0 100 60" class="w-full h-10 stroke-current fill-none stroke-2">
                  <rect x="15" y="40" width="70" height="10" rx="1" />
                  <rect x="25" y="15" width="20" height="25" rx="2" />
                  <path d="M55 40 C50 20, 70 20, 65 40" class="fill-orange-500/20 stroke-orange-500" />
                  <path d="M70 40 C65 25, 80 25, 75 40" class="fill-orange-500/20 stroke-orange-500" />
                </svg>
              </div>
              
              <div :class="[theme === 'light' ? 'border-stone-300 bg-white text-stone-700' : 'border-zinc-700 bg-zinc-900/50 text-zinc-300']" class="flex-1 border rounded-lg flex flex-col items-center justify-center shadow-sm relative p-2">
                <span class="absolute top-2 left-2 text-[8px] font-bold opacity-50">6R-A3 AMP</span>
                <svg viewBox="0 0 100 60" class="w-full h-10 stroke-current fill-none stroke-2">
                  <rect x="20" y="40" width="60" height="10" rx="1" />
                  <rect x="30" y="20" width="15" height="20" rx="1" />
                  <rect x="55" y="25" width="8" height="15" rx="3" class="fill-orange-500/20 stroke-orange-500" />
                  <rect x="68" y="25" width="8" height="15" rx="3" class="fill-orange-500/20 stroke-orange-500" />
                </svg>
              </div>
            </div>
          </div>

          <div 
            :class="[theme === 'light' ? 'text-stone-400' : 'text-zinc-600']"
            class="p-6 flex flex-col"
          >
            <div class="mb-6">
              <div class="text-[10px] font-bold tracking-widest text-emerald-600">[STAGE_04]</div>
              <div class="text-xs font-bold mt-1 uppercase" :class="[theme === 'light' ? 'text-stone-700' : 'text-zinc-400']">TRANSDUCERS</div>
            </div>
            <div class="flex-grow flex flex-col space-y-4">
              
              <div :class="[theme === 'light' ? 'border-stone-300 bg-white text-stone-700' : 'border-zinc-700 bg-zinc-900/50 text-zinc-300']" class="flex-1 border rounded-lg flex flex-col items-center justify-center shadow-sm relative p-2">
                <span class="absolute top-2 left-2 text-[8px] font-bold opacity-50">SPK</span>
                <svg viewBox="0 0 100 60" class="w-full h-10 stroke-current fill-none stroke-2">
                  <rect x="35" y="5" width="30" height="50" rx="2" />
                  <circle cx="50" cy="18" r="5" />
                  <circle cx="50" cy="40" r="10" />
                  <circle cx="50" cy="40" r="3" />
                </svg>
              </div>
              
              <div :class="[theme === 'light' ? 'border-stone-300 bg-white text-stone-700' : 'border-zinc-700 bg-zinc-900/50 text-zinc-300']" class="flex-1 border rounded-lg flex flex-col items-center justify-center shadow-sm relative p-2">
                <span class="absolute top-2 left-2 text-[8px] font-bold opacity-50">IEM</span>
                <svg viewBox="0 0 100 60" class="w-full h-10 stroke-current fill-none stroke-2">
                  <path d="M40 30 C30 20, 20 40, 30 50" />
                  <path d="M60 30 C70 20, 80 40, 70 50" />
                  <path d="M40 30 Q50 10, 50 60" class="stroke-1" />
                  <path d="M60 30 Q50 10, 50 60" class="stroke-1" />
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
          
          <div class="flex-grow flex">
            <div :class="[theme === 'light' ? 'border-stone-300 bg-white text-stone-700' : 'border-zinc-700 bg-zinc-900/50 text-zinc-300']" class="flex-grow border rounded-lg flex items-center justify-center shadow-sm relative p-4">
              <span class="absolute top-2 left-2 text-[8px] font-bold opacity-50">ISOLATION TRANSFORMER</span>
              <svg viewBox="0 0 200 60" class="w-full h-12 stroke-current fill-none stroke-2">
                <rect x="70" y="10" width="60" height="40" rx="4" />
                <circle cx="100" cy="30" r="12" />
                <circle cx="100" cy="30" r="4" />
                <line x1="100" y1="18" x2="100" y2="42" class="stroke-1 stroke-dashed" />
                <line x1="88" y1="30" x2="112" y2="30" class="stroke-1 stroke-dashed" />
              </svg>
            </div>
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