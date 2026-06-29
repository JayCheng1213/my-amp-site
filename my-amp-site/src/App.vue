<template>
  <div class="min-h-screen bg-zinc-950 font-sans antialiased text-zinc-300 flex flex-col justify-between selection:bg-emerald-500/30">
    
    <main class="max-w-4xl w-full mx-auto px-4 py-8 md:py-16 space-y-8">
      
      <header class="border-b border-zinc-900 pb-6">
        <div class="flex items-center space-x-2 text-[10px] font-mono text-emerald-500 tracking-widest uppercase mb-1 animate-pulse">
          <span>●</span> <span>DYNAMIC_MENU_LOADER // READY</span>
        </div>
        <h1 class="text-xl font-black tracking-wider text-white font-mono uppercase">PROJECTS DASHBOARD</h1>
        <p class="text-xs text-zinc-500 font-mono mt-1">透過 Fetch 讀取 NAS 本地 JSON 目錄，實現動態波段切換。</p>
      </header>

      <div v-if="isLoading" class="p-12 text-center font-mono text-xs text-zinc-600 border border-dashed border-zinc-900 rounded-2xl bg-zinc-900/10">
        // FETCHING PROJECTS.JSON FROM NAS CORES...
      </div>

      <div v-else class="space-y-6">
        
        <div class="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar border-b border-zinc-900">
          <span class="text-[10px] font-mono text-zinc-600 uppercase tracking-wider pr-2 hidden sm:inline">SELECT_AMPTYPE:</span>
          
          <button
            v-for="amp in ampProjects"
            :key="amp.id"
            @click="activeAmpId = amp.id"
            :class="[
              activeAmpId === amp.id 
                ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 font-bold shadow-sm shadow-emerald-500/5' 
                : 'bg-zinc-900/30 border-zinc-900 text-zinc-500 hover:border-zinc-800 hover:text-zinc-300'
            ]"
            class="px-4 py-2 rounded-xl border text-xs font-mono transition-all duration-300 shrink-0 cursor-pointer"
          >
            {{ amp.menuName }}
          </button>
        </div>

        <div v-if="activeAmp" class="grid grid-cols-1 md:grid-cols-3 gap-6 items-start animate-fadeIn" :key="activeAmp.id">
          
          <div class="bg-zinc-900/40 backdrop-blur-md border border-zinc-900 rounded-2xl p-5 space-y-4 md:col-span-1">
            <div>
              <span class="text-[10px] font-mono text-zinc-500 block tracking-wider">CURRENT_SELECTION</span>
              <h2 class="text-base font-bold text-white font-mono mt-0.5">{{ activeAmp.fullName }}</h2>
            </div>

            <div class="border-t border-zinc-900 pt-3 space-y-2 font-mono text-xs">
              <div class="flex justify-between">
                <span class="text-zinc-500">電路架構</span>
                <span class="text-zinc-300">{{ activeAmp.type }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-zinc-500">真空管配置</span>
                <span class="text-emerald-400 font-semibold">{{ activeAmp.tubes }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-zinc-500">輸出功率</span>
                <span class="text-zinc-300">{{ activeAmp.power }}</span>
              </div>
            </div>

            <div class="p-2.5 bg-zinc-950 border border-zinc-900 rounded-xl flex justify-between items-center text-[10px] font-mono">
              <span class="text-zinc-500">實驗室進度</span>
              <span :class="activeAmp.statusColor" class="px-2 py-0.5 rounded font-bold text-[9px] uppercase tracking-wider">
                {{ activeAmp.statusText }}
              </span>
            </div>
          </div>

          <div class="md:col-span-2 bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-900 rounded-2xl p-6 min-h-[220px] relative overflow-hidden flex flex-col justify-between">
            <div class="absolute inset-0 bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:24px_24px] opacity-15 pointer-events-none"></div>

            <div class="relative z-10 flex justify-between items-center bg-zinc-950/60 backdrop-blur-sm border border-zinc-900 rounded-lg p-2.5 text-[11px] font-mono">
              <span class="text-zinc-500">SCHEMATIC_NODE: <span class="text-white font-bold">{{ activeAmp.id.toUpperCase() }}</span></span>
              <span class="text-[10px] text-zinc-600">LIVE_DATA</span>
            </div>

            <div class="relative z-10 my-4 text-xs font-mono text-zinc-400 leading-relaxed p-4 bg-zinc-950/40 border border-zinc-900 rounded-xl">
              <p class="text-zinc-500">// 成功載入專案 ID: <span class="text-zinc-300">{{ activeAmp.id }}</span></p>
              <p class="mt-1">目標 Markdown 快取路徑指向：<span class="text-emerald-500">{{ activeAmp.markdownPath }}</span></p>
              <p class="mt-3 text-[11px] text-zinc-500 leading-normal">
                💡 前端「目錄讀取與選擇晶片」運作完美。當你點擊上方不同的標題按鈕，Vue 會自動觸發響應式狀態重置，即時將該專案的屏壓、功率、管型參數倒進左側面板。
              </p>
            </div>

            <div class="relative z-10 text-[10px] font-mono text-zinc-600">
              METRIC_OK // SWITCH_RESPONSE_0ms
            </div>
          </div>

        </div>
      </div>

    </main>

    <footer class="max-w-4xl w-full mx-auto px-4 pb-8 text-center font-mono text-[9px] text-zinc-700 uppercase tracking-widest border-t border-zinc-900/60 pt-4">
      Data-driven architecture // vue v3 composition api
    </footer>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

// 1. 響應式狀態晶片
const ampProjects = ref([])    // 儲存從 NAS 抓下來的完整專案清單
const activeAmpId = ref('')     // 記錄當前被選中的專案 ID (例如 '1626' 或 '5998a')
const isLoading = ref(true)    // 控制 Loading 狀態的開關

// 2. 💡 智慧型波段開關（計算屬性）
// 當 activeAmpId 改變時，這個 computed 會自動去陣列裡抓出該機器的完整資料物件
const activeAmp = computed(() => {
  return ampProjects.value.find(amp => amp.id === activeAmpId.value) || null
})

// 3. 📡 網頁初始化生命週期：向 NAS 索取 projects.json
onMounted(async () => {
  try {
    // 讀取由 Google Drive 透過 Cloud Sync 下載到 NAS 本地的總目錄
    const response = await fetch('/nas-media-project/projects.json')
    const data = await response.json()
    
    ampProjects.value = data
    
    // 如果 JSON 裡有專案，預設選中第一個專案，讓畫面不留白
    if (data.length > 0) {
      activeAmpId.value = data[0].id
    }
  } catch (error) {
    console.error('前端讀取 NAS 專案目錄失敗：', error)
  } finally {
    // 關閉 Loading 遮罩
    isLoading.value = false
  }
})
</script>

<style scoped>
/* 隱藏手機端橫向滾動條，保持線稿視覺極簡 */
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

/* 乾淨優雅的淡入動畫，切換標題時不閃爍 */
.animate-fadeIn {
  animation: fadeIn 0.3s ease-out forwards;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(2px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>