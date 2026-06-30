<template>
  <div v-if="items && items.length > 0"
       :class="[theme === 'light' ? 'bg-white/80 border-stone-300/80' : 'bg-zinc-900/30 border-zinc-900/80']"
       class="backdrop-blur-md border rounded-2xl p-4 space-y-4 transition-colors duration-300 font-mono">
    
    <div>
      <span class="text-[10px] font-bold text-zinc-500 block tracking-wider uppercase">VISUAL_SCOPE // 相片展示櫃</span>
    </div>

    <div v-if="loading" class="text-[11px] text-zinc-600 animate-pulse">// BUFFERING IMAGES...</div>

    <div v-else class="space-y-6">
      <div 
        v-for="(img, idx) in items" 
        :key="idx"
        class="group relative flex flex-col items-center border border-transparent rounded-xl p-1 transition-all duration-300"
      >
        <div class="w-full overflow-hidden rounded-lg border transition-all duration-500 ease-out-expo shadow-sm transform will-change-transform"
             :class="[
               theme === 'light' 
                 ? 'border-stone-200 group-hover:border-stone-500 group-hover:shadow-md' 
                 : 'border-zinc-800/80 group-hover:border-emerald-500/50 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.15)]',
               'group-hover:scale-[1.04] group-hover:-translate-y-1'
             ]">
          <img 
            :src="img.src" 
            :alt="img.caption"
            class="w-full object-cover max-h-48 transition-transform duration-700 ease-out group-hover:scale-105 select-none pointer-events-none"
          />
        </div>

        <div class="w-full max-h-0 opacity-0 overflow-hidden transition-all duration-500 ease-out-expo group-hover:max-h-16 group-hover:opacity-100 group-hover:mt-2.5">
          <p :class="[theme === 'light' ? 'text-stone-600 bg-stone-100' : 'text-zinc-400 bg-zinc-950/40']"
             class="text-[11px] leading-relaxed p-2 rounded-lg border border-dashed border-zinc-800/40 text-center">
            <span class="text-emerald-500 mr-1">▪</span> {{ img.caption }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTheme } from '../composables/useTheme'
const { theme } = useTheme()

defineProps({
  items: { type: Array, required: true },
  loading: { type: Boolean, default: false }
})
</script>

<style scoped>
/* 💡 導入精準的工業級阻尼曲線，確保滑出與畫框動作極具高階機械阻尼感 */
.ease-out-expo {
  transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
}
</style>