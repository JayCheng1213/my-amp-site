<template>
  <div class="min-h-screen flex bg-zinc-950 font-sans antialiased text-zinc-300 selection:bg-emerald-500/30">
    
    <!-- 主要內容區（全滿排版，完美突顯線稿科技感） -->
    <main class="flex-grow max-w-4xl w-full mx-auto px-4 py-8 md:py-12 space-y-10">
      
      <!-- 頂部極簡 Header -->
      <header class="flex justify-between items-center border-b border-zinc-800 pb-6">
        <div>
          <div class="flex items-center space-x-2 text-[10px] font-mono text-emerald-500 tracking-widest mb-1 animate-pulse">
            <span>●</span> <span>SYSTEM_READY // WIREFRAME_MODE</span>
          </div>
          <h1 class="text-xl font-bold tracking-wider text-white font-mono uppercase">Interactive Blueprint Console</h1>
        </div>
        <div class="text-xs font-mono text-zinc-500 hidden sm:block">
          DEVICES: RWD_ACTIVE
        </div>
      </header>

      <!-- 核心區塊：網格佈局（手機端垂直堆疊，電腦端並排展示） -->
      <section class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        <!-- 左側/上方：控制面板（毛玻璃效果 Glassmorphism Container） -->
        <div class="bg-zinc-900/40 backdrop-blur-md border border-zinc-800 rounded-2xl p-5 space-y-4 lg:col-span-1">
          <div class="font-mono text-xs text-zinc-400 font-semibold tracking-wider uppercase border-b border-zinc-800 pb-2">
            Layer Controller // 圖層控制
          </div>
          <p class="text-xs text-zinc-500 leading-relaxed">
            透過下方響應式按鈕即時切換硬體搭棚與機殼佈局線稿。點擊按鈕觸發 Vue 3 狀態變更，即時渲染底層數據。
          </p>
          
          <!-- 互動按鈕群（手機端水平橫排滑動，電腦端垂直排列） -->
          <div class="flex sm:grid sm:grid-cols-3 lg:flex lg:flex-col gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
            <button 
              @click="activeLayer = 'chassis'"
              :class="[activeLayer === 'chassis' ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 font-bold shadow-sm shadow-emerald-500/10' : 'bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200']"
              class="flex-shrink-0 px-4 py-3 rounded-xl border text-xs font-mono transition-all duration-300 flex items-center justify-between gap-3 text-left min-w-[140px] sm:min-w-0"
            >
              <span>01 / 管位佈局</span>
              <span class="text-[10px] opacity-60">🔘</span>
            </button>

            <button 
              @click="activeLayer = 'signal'"
              :class="[activeLayer === 'signal' ? 'bg-blue-500/10 border-blue-500 text-blue-400 font-bold shadow-sm shadow-blue-500/10' : 'bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200']"
              class="flex-shrink-0 px-4 py-3 rounded-xl border text-xs font-mono transition-all duration-300 flex items-center justify-between gap-3 text-left min-w-[140px] sm:min-w-0"
            >
              <span>02 / 訊號路徑</span>
              <span class="text-[10px] opacity-60">⚡</span>
            </button>

            <button 
              @click="activeLayer = 'power'"
              :class="[activeLayer === 'power' ? 'bg-amber-500/10 border-amber-500 text-amber-400 font-bold shadow-sm shadow-amber-500/10' : 'bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200']"
              class="flex-shrink-0 px-4 py-3 rounded-xl border text-xs font-mono transition-all duration-300 flex items-center justify-between gap-3 text-left min-w-[140px] sm:min-w-0"
            >
              <span>03 / 電源漣波</span>
              <span class="text-[10px] opacity-60">〰️</span>
            </button>
          </div>
        </div>

        <!-- 右側/下方：硬核線稿展示大面板 (The Blueprint Sandbox) -->
        <div class="lg:col-span-2 bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl p-6 min-h-[380px] relative overflow-hidden flex flex-col justify-between">
          
          <!-- 背景裝飾科技線條網格 -->
          <div class="absolute inset-0 bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 pointer-events-none"></div>

          <!-- 頂部懸浮狀態（標準毛玻璃標籤） -->
          <div class="relative z-10 flex justify-between items-center bg-zinc-900/60 backdrop-blur-md border border-zinc-800/80 rounded-xl p-3 text-xs font-mono">
            <span class="text-zinc-400">CURRENT_LAYER: <span class="text-white font-bold uppercase">{{ activeLayer }}</span></span>
            <span class="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">SCALE 1:1</span>
          </div>

          <!-- 正中央：動態模擬虛擬線稿（隨按鈕切換） -->
          <div class="relative z-10 my-8 flex items-center justify-center min-h-[180px]">
            
            <!-- 圖層 1：管位佈局線稿 (Chassis Layer) -->
            <div v-if="activeLayer === 'chassis'" class="w-full max-w-md grid grid-cols-2 gap-8 text-center animate-fadeIn">
              <div class="border border-dashed border-emerald-500/40 rounded-full aspect-square p-4 flex flex-col items-center justify-center bg-emerald-500/[0.02] relative group">
                <div class="absolute inset-0 border border-emerald-500/10 rounded-full scale-110 animate-pulse"></div>
                <div class="text-xs font-mono text-emerald-400 font-bold">[ V1 ]</div>
                <div class="text-[10px] font-mono text-zinc-500 mt-1">E80CC Driver</div>
              </div>
              <div class="border border-dashed border-emerald-500/40 rounded-full aspect-square p-4 flex flex-col items-center justify-center bg-emerald-500/[0.02] relative">
                <div class="absolute inset-0 border border-emerald-500/10 rounded-full scale-110 animate-pulse"></div>
                <div class="text-xs font-mono text-emerald-400 font-bold">[ V2 ]</div>
                <div class="text-[10px] font-mono text-zinc-500 mt-1">1626 Power</div>
              </div>
            </div>

            <!-- 圖層 2：訊號路徑線稿 (Signal Path Layer) -->
            <div v-if="activeLayer === 'signal'" class="w-full space-y-4 max-w-sm font-mono text-xs animate-fadeIn">
              <div class="flex items-center justify-between border border-blue-500/30 rounded-xl p-3 bg-blue-500/[0.02]">
                <span class="text-blue-400">RCA_INPUT (L/R)</span>
                <span class="text-zinc-600">————————→</span>
                <span class="text-zinc-300 font-bold">100KΩ Vol Pot</span>
              </div>
              <div class="flex items-center justify-between border border-blue-500/30 rounded-xl p-3 bg-blue-500/[0.02]">
                <span class="text-zinc-300 font-bold">Grid Resistor</span>
                <span class="text-zinc-600">————————→</span>
                <span class="text-blue-400">E80CC Grid (Pin 2)</span>
              </div>
            </div>

            <!-- 圖層 3：電源漣波阻隔層 (Power Ripple Layer) -->
            <div v-if="activeLayer === 'power'" class="w-full max-w-md p-4 border border-dashed border-amber-500/30 rounded-xl bg-amber-500/[0.01] font-mono text-xs space-y-3 animate-fadeIn">
              <div class="flex justify-between items-center text-amber-400 font-bold">
                <span>⚡ B+ MAIN REGULATOR</span>
                <span class="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400">ACTIVE</span>
              </div>
              <div class="grid grid-cols-3 gap-2 text-center text-[11px] pt-2">
                <div class="border border-zinc-800 p-2 rounded bg-zinc-900/50">250V IN</div>
                <div class="border border-amber-500/20 p-2 rounded bg-amber-500/[0.03] text-amber-300">MOSFET Filter</div>
                <div class="border border-zinc-800 p-2 rounded bg-zinc-900/50">Ripple &lt; 1μV</div>
              </div>
            </div>

          </div>

          <!-- 底部懸浮說明（底部毛玻璃控制台回饋） -->
          <div class="relative z-10 bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-xl p-3 text-xs font-mono text-zinc-500 flex justify-between items-center">
            <span>STATUS // COMPONENT_OK</span>
            <span class="text-emerald-500 text-[10px] font-bold">READY TO BUILD</span>
          </div>

        </div>
      </section>

      <!-- 頁尾宣告 -->
      <footer class="text-center font-mono text-[10px] text-zinc-600 pt-6 border-t border-zinc-900">
        CONSOLE_RENDER_ENGINE // TAILWIND_CSS_v3 // VUE_3_COMPOSITION_API
      </footer>

    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 掌控當前點擊觸發的動態圖層：'chassis' | 'signal' | 'power'
const activeLayer = ref('chassis')
</script>

<style scoped>
/* 補上一點點純淨的淡入動畫，讓切換圖層時線稿有淡入的高級感 */
.animate-fadeIn {
  animation: fadeIn 0.4s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(2px); }
  to { opacity: 1; transform: translateY(0); }
}

/* 隱藏手機端橫向滾動條，保持視覺極簡 */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>