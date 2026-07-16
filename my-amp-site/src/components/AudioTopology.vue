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
              <div class="text-xs font-bold mt-1 uppercase" :class="[theme === 'light' ? 'text-stone-700' : 'text-zinc-400']">
                INPUT_SOURCES
              </div>
            </div>
            
            <div class="flex-grow flex flex-col space-y-4">
              <div :class="[theme === 'light' ? 'border-stone-300 bg-white text-stone-800' : 'border-zinc-700 bg-zinc-900/40 text-zinc-200']" class="flex-1 border rounded-lg p-3 flex flex-col justify-between shadow-sm">
                <div class="flex justify-between items-center">
                  <span class="text-xs font-bold tracking-wider">PC STREAMER</span>
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                </div>
                <div class="text-[9px] text-zinc-500">USB OUT // 192KHZ 32BIT</div>
              </div>
              
              <div :class="[theme === 'light' ? 'border-stone-300 bg-white text-stone-800' : 'border-zinc-700 bg-zinc-900/40 text-zinc-200']" class="flex-1 border rounded-lg p-3 flex flex-col justify-between shadow-sm">
                <div class="flex justify-between items-center">
                  <span class="text-xs font-bold tracking-wider">CD PLAYER</span>
                  <span class="text-[9px] text-emerald-500 font-mono">TR_01</span>
                </div>
                <div class="text-[9px] text-zinc-500">COAX OUT // 44.1KHZ</div>
              </div>
              
              <div :class="[theme === 'light' ? 'border-stone-300 bg-white text-stone-800' : 'border-zinc-700 bg-zinc-900/40 text-zinc-200']" class="flex-1 border rounded-lg p-3 flex flex-col justify-between shadow-sm">
                <div class="flex justify-between items-center">
                  <span class="text-xs font-bold tracking-wider">TURNTABLE</span>
                  <span class="text-[8px] border border-amber-500 text-amber-500 px-1 rounded">33 RPM</span>
                </div>
                <div class="text-[9px] text-zinc-500">PHONO OUT // ANALOG</div>
              </div>
            </div>
          </div>

          <div 
            :class="[theme === 'light' ? 'border-stone-200 text-stone-400' : 'border-zinc-800 text-zinc-600']"
            class="p-6 flex flex-col border-b md:border-b-0 md:border-r border-dashed"
          >
            <div class="mb-6">
              <div class="text-[10px] font-bold tracking-widest text-emerald-600">[STAGE_02]</div>
              <div class="text-xs font-bold mt-1 uppercase" :class="[theme === 'light' ? 'text-stone-700' : 'text-zinc-400']">
                PROCESSING
              </div>
            </div>
            
            <div class="flex-grow flex flex-col space-y-4">
              <div :class="[theme === 'light' ? 'border-stone-300 bg-white text-stone-800' : 'border-zinc-700 bg-zinc-900/40 text-zinc-200']" class="flex-1 border rounded-lg p-3 flex flex-col justify-between shadow-sm">
                <div class="flex justify-between items-center">
                  <span class="text-xs font-bold tracking-wider">TOPPING DX5 II</span>
                  <span class="text-[9px] text-emerald-500 font-mono">-12.5DB</span>
                </div>
                <div class="text-[9px] text-zinc-500">ES9068AS DAC // NFCA</div>
              </div>
              
              <div :class="[theme === 'light' ? 'border-stone-300 bg-white text-stone-800' : 'border-zinc-700 bg-zinc-900/40 text-zinc-200']" class="flex-1 border rounded-lg p-3 flex flex-col justify-between shadow-sm">
                <div class="flex justify-between items-center">
                  <span class="text-xs font-bold tracking-wider">PHONO STAGE</span>
                  <span class="text-[8px] bg-zinc-800 text-zinc-300 px-1 rounded">MC</span>
                </div>
                <div class="text-[9px] text-zinc-500">GAIN 60DB // R-EQ active</div>
              </div>
            </div>
          </div>

          <div 
            :class="[theme === 'light' ? 'border-stone-200 text-stone-400' : 'border-zinc-800 text-zinc-600']"
            class="p-6 flex flex-col border-b md:border-b-0 md:border-r border-dashed"
          >
            <div class="mb-6">
              <div class="text-[10px] font-bold tracking-widest text-emerald-600">[STAGE_03]</div>
              <div class="text-xs font-bold mt-1 uppercase" :class="[theme === 'light' ? 'text-stone-700' : 'text-zinc-400']">
                AMPLIFICATION
              </div>
            </div>
            
            <div class="flex-grow flex flex-col space-y-4">
              <div :class="[theme === 'light' ? 'border-stone-300 bg-white text-stone-800' : 'border-zinc-700 bg-zinc-900/40 text-zinc-200']" class="flex-1 border rounded-lg p-3 flex flex-col justify-between shadow-sm">
                <div class="flex justify-between items-center">
                  <span class="text-xs font-bold tracking-wider">2A3 AMP</span>
                  <span class="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]"></span>
                </div>
                <div class="text-[9px] text-zinc-500">SINGLE-ENDED CLASS A // 3.5W</div>
              </div>
              
              <div :class="[theme === 'light' ? 'border-stone-300 bg-white text-stone-800' : 'border-zinc-700 bg-zinc-900/40 text-zinc-200']" class="flex-1 border rounded-lg p-3 flex flex-col justify-between shadow-sm">
                <div class="flex justify-between items-center">
                  <span class="text-xs font-bold tracking-wider">6R-A3 AMP</span>
                  <span class="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]"></span>
                </div>
                <div class="text-[9px] text-zinc-500">OTL HEADPHONE DRIVER // CLASS A</div>
              </div>
            </div>
          </div>

          <div 
            :class="[theme === 'light' ? 'text-stone-400' : 'text-zinc-600']"
            class="p-6 flex flex-col"
          >
            <div class="mb-6">
              <div class="text-[10px] font-bold tracking-widest text-emerald-600">[STAGE_04]</div>
              <div class="text-xs font-bold mt-1 uppercase" :class="[theme === 'light' ? 'text-stone-700' : 'text-zinc-400']">
                TRANSDUCERS
              </div>
            </div>
            
            <div class="flex-grow flex flex-col space-y-4">
              <div :class="[theme === 'light' ? 'border-stone-300 bg-white text-stone-800' : 'border-zinc-700 bg-zinc-900/40 text-zinc-200']" class="flex-1 border rounded-lg p-3 flex flex-col justify-between shadow-sm">
                <div class="flex justify-between items-center">
                  <span class="text-xs font-bold tracking-wider">SPEAKERS</span>
                  <span class="text-[9px] text-zinc-500">8 OHM</span>
                </div>
                <div class="text-[9px] text-zinc-500">CORAL 8 INCH FULL-RANGE</div>
              </div>
              
              <div :class="[theme === 'light' ? 'border-stone-300 bg-white text-stone-800' : 'border-zinc-700 bg-zinc-900/40 text-zinc-200']" class="flex-1 border rounded-lg p-3 flex flex-col justify-between shadow-sm">
                <div class="flex justify-between items-center">
                  <span class="text-xs font-bold tracking-wider">IEM HEADPHONES</span>
                  <span class="text-[9px] text-zinc-500">18 OHM</span>
                </div>
                <div class="text-[9px] text-zinc-500">SEEAUDIO BRAVERY</div>
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
            <div class="text-xs font-bold mt-1 uppercase" :class="[theme === 'light' ? 'text-stone-700' : 'text-zinc-400']">
              POWER_DISTRIBUTION_UNIT
            </div>
          </div>
          
          <div class="flex-grow flex">
            <div :class="[theme === 'light' ? 'border-stone-300 bg-white text-stone-800' : 'border-zinc-700 bg-zinc-900/40 text-zinc-200']" class="flex-grow border rounded-lg p-4 flex justify-between items-center shadow-sm">
              <div class="flex flex-col">
                <span class="text-sm font-bold tracking-wider">ISOLATION TRANSFORMER</span>
                <span class="text-[9px] text-zinc-500 mt-1">TOROIDAL CORE SYSTEM // LOW AC NOISE FLOOR</span>
              </div>
              <div class="text-right">
                <div class="text-xs font-bold text-amber-600">110V TO 110V</div>
                <div class="text-[9px] text-zinc-500 mt-0.5">ISOLATION LEVEL: 1000V</div>
              </div>
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