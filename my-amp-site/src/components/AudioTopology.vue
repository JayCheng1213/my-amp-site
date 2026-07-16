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
            class="p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-dashed"
          >
            <div>
              <div class="text-[10px] font-bold tracking-widest text-emerald-600">[STAGE_01]</div>
              <div class="text-xs font-bold mt-1 uppercase" :class="[theme === 'light' ? 'text-stone-700' : 'text-zinc-400']">
                INPUT_SOURCES
              </div>
            </div>
            <div class="text-center text-xs tracking-widest uppercase">SLOT_EMPTY</div>
            <div class="text-[10px]">Z_IN: HIGH IMPEDANCE</div>
          </div>

          <div 
            :class="[theme === 'light' ? 'border-stone-200 text-stone-400' : 'border-zinc-800 text-zinc-600']"
            class="p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-dashed"
          >
            <div>
              <div class="text-[10px] font-bold tracking-widest text-emerald-600">[STAGE_02]</div>
              <div class="text-xs font-bold mt-1 uppercase" :class="[theme === 'light' ? 'text-stone-700' : 'text-zinc-400']">
                PROCESSING
              </div>
            </div>
            <div class="text-center text-xs tracking-widest uppercase">SLOT_EMPTY</div>
            <div class="text-[10px]">D/A CONVERSION</div>
          </div>

          <div 
            :class="[theme === 'light' ? 'border-stone-200 text-stone-400' : 'border-zinc-800 text-zinc-600']"
            class="p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-dashed"
          >
            <div>
              <div class="text-[10px] font-bold tracking-widest text-emerald-600">[STAGE_03]</div>
              <div class="text-xs font-bold mt-1 uppercase" :class="[theme === 'light' ? 'text-stone-700' : 'text-zinc-400']">
                AMPLIFICATION
              </div>
            </div>
            <div class="text-center text-xs tracking-widest uppercase">SLOT_EMPTY</div>
            <div class="text-[10px]">CLASS_A GAIN</div>
          </div>

          <div 
            :class="[theme === 'light' ? 'text-stone-400' : 'text-zinc-600']"
            class="p-6 flex flex-col justify-between"
          >
            <div>
              <div class="text-[10px] font-bold tracking-widest text-emerald-600">[STAGE_04]</div>
              <div class="text-xs font-bold mt-1 uppercase" :class="[theme === 'light' ? 'text-stone-700' : 'text-zinc-400']">
                TRANSDUCERS
              </div>
            </div>
            <div class="text-center text-xs tracking-widest uppercase">SLOT_EMPTY</div>
            <div class="text-[10px] text-right">Z_LOAD: 8-32 OHM</div>
          </div>

        </div>

        <div class="border-t border-dashed" :class="[theme === 'light' ? 'border-stone-200' : 'border-zinc-800']"></div>

        <div 
          :class="[theme === 'light' ? 'text-stone-400' : 'text-zinc-600']"
          class="p-6 min-h-[140px] flex flex-col justify-between"
        >
          <div>
            <div class="text-[10px] font-bold tracking-widest text-amber-600">[POWER_STAGE]</div>
            <div class="text-xs font-bold mt-1 uppercase" :class="[theme === 'light' ? 'text-stone-700' : 'text-zinc-400']">
              POWER_DISTRIBUTION_UNIT
            </div>
          </div>
          
          <div class="text-center text-xs tracking-widest uppercase">
            POWER_SLOT_EMPTY (ISOLATION_TRANSFORMER / AC_MAINS)
          </div>
          
          <div class="flex justify-between items-center text-[10px]">
            <span>ISOLATION LEVEL: 1000V</span>
            <span>AC INPUT: 110V-220V // 60HZ</span>
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