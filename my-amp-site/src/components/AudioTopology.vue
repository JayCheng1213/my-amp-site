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
        <div class="grid grid-cols-1 md:grid-cols-4 min-h-[520px] flex-grow">
          
          <div 
            :class="[theme === 'light' ? 'border-stone-200 text-stone-400' : 'border-zinc-800 text-zinc-600']"
            class="p-6 flex flex-col border-b md:border-b-0 md:border-r border-dashed"
          >
            <div class="mb-4">
              <div class="text-[10px] font-bold tracking-widest text-emerald-600">[STAGE_01]</div>
              <div class="text-xs font-bold mt-1 uppercase" :class="[theme === 'light' ? 'text-stone-700' : 'text-zinc-400']">INPUT_SOURCES</div>
            </div>
            
            <div class="flex-grow grid grid-rows-5 gap-y-2 pb-2">
              
              <div class="row-start-1 flex flex-col items-center justify-center">
                <span class="text-xs font-bold opacity-70 tracking-widest" :class="[theme === 'light' ? 'text-stone-800' : 'text-zinc-200']">PC 串流</span>
                <svg viewBox="0 0 100 80" class="w-full h-16 stroke-current fill-none stroke-2 mt-1" :class="[theme === 'light' ? 'text-stone-700' : 'text-zinc-300']">
                  <rect x="30" y="5" width="40" height="60" rx="2" />
                  <line x1="35" y1="20" x2="65" y2="20" />
                  <circle cx="50" cy="52" r="3" class="fill-emerald-500 stroke-none animate-pulse" />
                </svg>
              </div>
              
              <div class="row-start-3 flex flex-col items-center justify-center">
                <span class="text-xs font-bold opacity-70 tracking-widest" :class="[theme === 'light' ? 'text-stone-800' : 'text-zinc-200']">CD 撥放器</span>
                <svg viewBox="0 0 100 80" class="w-full h-16 stroke-current fill-none stroke-2 mt-1" :class="[theme === 'light' ? 'text-stone-700' : 'text-zinc-300']">
                  <rect x="5" y="30" width="90" height="24" rx="2" />
                  <rect x="20" y="38" width="40" height="3" class="fill-current stroke-none" />
                  <circle cx="85" cy="42" r="3" class="fill-emerald-500 stroke-none" />
                </svg>
              </div>
              
              <div class="row-start-5 flex flex-col items-center justify-center">
                <span class="text-xs font-bold opacity-70 tracking-widest" :class="[theme === 'light' ? 'text-stone-800' : 'text-zinc-200']">黑膠唱盤</span>
                <svg viewBox="0 0 100 80" class="w-full h-16 stroke-current fill-none stroke-2 mt-1" :class="[theme === 'light' ? 'text-stone-700' : 'text-zinc-300']">
                  <rect x="5" y="15" width="90" height="50" rx="2" />
                  <circle cx="35" cy="40" r="18" />
                  <circle cx="35" cy="40" r="2" class="fill-current" />
                  <line x1="85" y1="25" x2="52" y2="50" />
                  <circle cx="85" cy="25" r="5" />
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
            
            <div class="flex-grow grid grid-rows-5 gap-y-2 pb-2">
              
              <div class="row-start-2 flex flex-col items-center justify-center">
                <span class="text-xs font-bold opacity-70 tracking-widest" :class="[theme === 'light' ? 'text-stone-800' : 'text-zinc-200']">DAC 解碼器</span>
                <svg viewBox="0 0 100 80" class="w-full h-16 stroke-current fill-none stroke-2 mt-1" :class="[theme === 'light' ? 'text-stone-700' : 'text-zinc-300']">
                  <rect x="5" y="25" width="90" height="30" rx="2" />
                  <circle cx="30" cy="40" r="8" class="stroke-emerald-500" />
                  <circle cx="80" cy="40" r="6" />
                  <circle cx="15" cy="40" r="2" class="fill-current" />
                </svg>
              </div>
              
              <div class="row-start-5 flex flex-col items-center justify-center">
                <span class="text-xs font-bold opacity-70 tracking-widest" :class="[theme === 'light' ? 'text-stone-800' : 'text-zinc-200']">唱頭放大器</span>
                <svg viewBox="0 0 100 80" class="w-full h-16 stroke-current fill-none stroke-2 mt-1" :class="[theme === 'light' ? 'text-stone-700' : 'text-zinc-300']">
                  <rect x="5" y="25" width="90" height="30" rx="2" />
                  <circle cx="30" cy="40" r="3" />
                  <circle cx="45" cy="40" r="3" />
                  <circle cx="80" cy="40" r="3" class="fill-amber-500 stroke-none" />
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
            
            <div class="flex-grow grid grid-rows-5 gap-y-2 pb-2">
              
              <div class="row-start-2 flex flex-col items-center justify-center">
                <span class="text-xs font-bold opacity-70 tracking-widest" :class="[theme === 'light' ? 'text-stone-800' : 'text-zinc-200']">2A3 AMP</span>
                <svg viewBox="0 0 100 80" class="w-full h-16 stroke-current fill-none stroke-2 mt-1" :class="[theme === 'light' ? 'text-stone-700' : 'text-zinc-300']">
                  <rect x="5" y="60" width="90" height="12" rx="2" />
                  <rect x="20" y="20" width="25" height="40" rx="2" />
                  <path d="M 60 60 C 56 25, 74 25, 70 60" class="fill-orange-500/20 stroke-orange-500" />
                  <path d="M 78 60 C 74 25, 92 25, 88 60" class="fill-orange-500/20 stroke-orange-500" />
                </svg>
              </div>
              
              <div class="row-start-5 flex flex-col items-center justify-center">
                <span class="text-xs font-bold opacity-70 tracking-widest" :class="[theme === 'light' ? 'text-stone-800' : 'text-zinc-200']">6R-A3 AMP</span>
                <svg viewBox="0 0 100 80" class="w-full h-16 stroke-current fill-none stroke-2 mt-1" :class="[theme === 'light' ? 'text-stone-700' : 'text-zinc-300']">
                  <rect x="10" y="60" width="80" height="12" rx="2" />
                  <rect x="25" y="25" width="20" height="35" rx="1.5" />
                  <rect x="55" y="35" width="12" height="25" rx="5" class="fill-orange-500/20 stroke-orange-500" />
                  <rect x="75" y="35" width="12" height="25" rx="5" class="fill-orange-500/20 stroke-orange-500" />
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
            
            <div class="flex-grow grid grid-rows-5 gap-y-2 pb-2">
              
              <div class="row-start-2 flex flex-col items-center justify-center">
                <span class="text-xs font-bold opacity-70 tracking-widest" :class="[theme === 'light' ? 'text-stone-800' : 'text-zinc-200']">喇叭</span>
                <svg viewBox="0 0 100 80" class="w-full h-16 stroke-current fill-none stroke-2 mt-1" :class="[theme === 'light' ? 'text-stone-700' : 'text-zinc-300']">
                  <rect x="25" y="2" width="50" height="76" rx="2" />
                  <circle cx="50" cy="22" r="8" />
                  <circle cx="50" cy="54" r="16" />
                  <circle cx="50" cy="54" r="4" />
                </svg>
              </div>
              
              <div class="row-start-5 flex flex-col items-center justify-center">
                <span class="text-xs font-bold opacity-70 tracking-widest" :class="[theme === 'light' ? 'text-stone-800' : 'text-zinc-200']">耳機</span>
                <svg viewBox="0 0 100 80" class="w-full h-16 stroke-current fill-none stroke-2 mt-1" :class="[theme === 'light' ? 'text-stone-700' : 'text-zinc-300']">
                  <circle cx="35" cy="22" r="8" />
                  <rect x="22" y="18" width="6" height="8" rx="1" />
                  <circle cx="65" cy="22" r="8" />
                  <rect x="72" y="18" width="6" height="8" rx="1" />
                  <path d="M 35 30 C 35 50, 48 55, 50 80" />
                  <path d="M 65 30 C 65 50, 52 55, 50 80" />
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
          <div class="flex-grow flex flex-col items-center justify-center pt-2">
            <span class="text-xs font-bold opacity-70 tracking-widest" :class="[theme === 'light' ? 'text-stone-800' : 'text-zinc-200']">隔離變壓器</span>
            <svg viewBox="0 0 100 80" class="w-full h-16 stroke-current fill-none stroke-2 mt-1" :class="[theme === 'light' ? 'text-stone-700' : 'text-zinc-300']">
              <path d="M 30 15 A 8 8 0 0 0 30 27 A 8 8 0 0 0 30 39 A 8 8 0 0 0 30 51 A 8 8 0 0 0 30 63" />
              <path d="M 70 15 A 8 8 0 0 1 70 27 A 8 8 0 0 1 70 39 A 8 8 0 0 1 70 51 A 8 8 0 0 1 70 63" />
              <line x1="46" y1="10" x2="46" y2="70" />
              <line x1="54" y1="10" x2="54" y2="70" />
              <line x1="10" y1="15" x2="30" y2="15" />
              <line x1="10" y1="63" x2="30" y2="63" />
              <line x1="90" y1="15" x2="70" y2="15" />
              <line x1="90" y1="63" x2="70" y2="63" />
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