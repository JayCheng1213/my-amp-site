<template>
  <div class="min-h-screen flex flex-col lg:flex-row bg-zinc-950 font-sans antialiased text-zinc-300 selection:bg-emerald-500/30">
    
    <aside class="w-full lg:w-60 bg-zinc-900/30 backdrop-blur-md border-b lg:border-b-0 lg:border-r border-zinc-900/80 p-5 flex flex-col justify-between shrink-0 lg:h-screen lg:sticky lg:top-0">
      <div class="space-y-5">
        <div>
          <div class="flex items-center space-x-2 text-[9px] font-mono text-emerald-500 tracking-widest uppercase mb-1">
            <span class="animate-pulse">●</span> <span>CORE_RWD // ACTIVE</span>
          </div>
          <h1 class="text-lg font-black tracking-wider text-white font-mono">JAY_AUDIO</h1>
          <p class="text-[10px] font-mono text-zinc-500 mt-0.5 uppercase">Research & Logs</p>
        </div>

        <nav class="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible pb-1 lg:pb-0 no-scrollbar">
          <button class="px-3 py-1.5 rounded-lg text-xs font-mono border border-zinc-800 bg-zinc-900 text-white shrink-0 text-left lg:w-full flex items-center space-x-2">
            <span>⚡</span> <span>真空管專案研究</span>
          </button>
        </nav>
      </div>

      <div class="hidden lg:block border-t border-zinc-900/60 pt-4 text-[9px] font-mono text-zinc-600 space-y-0.5">
        <div>HOST // SYNOLOGY_NAS</div>
        <div>RENDER // TAILWIND_V4</div>
      </div>
    </aside>

    <main class="flex-grow max-w-6xl w-full mx-auto px-4 py-6 lg:py-12 space-y-6 overflow-y-auto">
      
      <header class="border-b border-zinc-900/80 pb-4">
        <h1 class="text-lg font-bold tracking-wider text-white font-mono uppercase">PROJECTS LAB DASHBOARD</h1>
      </header>

      <div v-if="isLoading" class="p-12 text-center font-mono text-xs text-zinc-600 border border-dashed border-zinc-900 rounded-2xl">
        // FETCHING CORE BUFFER FROM NAS...
      </div>

      <div v-else class="space-y-6">
        
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          
          <div class="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible no-scrollbar border-b lg:border-b-0 lg:border-r lg:border-zinc-900/60 pb-3 lg:pb-0 lg:pr-4 shrink-0">
            <span class="text-[10px] font-mono text-zinc-600 uppercase tracking-wider pb-1 hidden lg:block border-b border-zinc-900/40 mb-1">
              SELECT_PROJECT:
            </span>
            
            <button
              v-for="amp in ampProjects"
              :key="amp.id"
              @click="switchAmp(amp.id)"
              :class="[
                activeAmpId === amp.id 
                  ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 font-bold shadow-sm shadow-emerald-500/5' 
                  : 'bg-zinc-900/20 border-zinc-900 text-zinc-500 hover:border-zinc-800 hover:text-zinc-300'
              ]"
              class="px-4 py-2 rounded-xl border text-xs font-mono transition-all duration-200 shrink-0 lg:w-full lg:text-left cursor-pointer"
            >
              <span class="hidden lg:inline mr-1 text-zinc-600">▪</span> {{ amp.menuName }}
            </button>
          </div>

          <template v-if="activeAmp">
            
            <div class="bg-zinc-900/40 backdrop-blur-md border border-zinc-900/80 rounded-2xl p-5 space-y-4 lg:col-span-1 animate-fadeIn">
              <div>
                <span class="text-[9px] font-mono text-zinc-500 block tracking-wider">SPECIFICATIONS</span>
                <h2 class="text-base font-bold text-white font-mono mt-0.5">{{ activeAmp.fullName }}</h2>
              </div>

              <div class="border-t border-zinc-900/80 pt-3 space-y-2 font-mono text-xs">
                <div class="flex justify-between"><span class="text-zinc-500">架構類型</span><span class="text-zinc-300">{{ activeAmp.type }}</span></div>
                <div class="flex justify-between"><span class="text-zinc-500">真空管配置</span><span class="text-emerald-400 font-semibold">{{ activeAmp.tubes }}</span></div>
                <div class="flex justify-between"><span class="text-zinc-500">輸出功率</span><span class="text-zinc-300">{{ activeAmp.power }}</span></div>
              </div>

              <div class="p-2.5 bg-zinc-950/60 border border-zinc-900 rounded-xl flex justify-between items-center text-[10px] font-mono">
                <span class="text-zinc-500">進度狀態</span>
                <span :class="activeAmp.statusColor" class="px-2 py-0.5 rounded font-bold text-[9px] uppercase">
                  {{ activeAmp.statusText }}
                </span>
              </div>
            </div>

            <div class="lg:col-span-2 bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-900 rounded-2xl p-6 min-h-[400px] relative overflow-hidden flex flex-col justify-between animate-fadeIn">
              <div class="absolute inset-0 bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:24px_24px] opacity-10 pointer-events-none"></div>

              <div class="relative z-10 flex justify-between items-center bg-zinc-950/80 backdrop-blur-sm border border-zinc-900 rounded-lg p-2.5 text-[10px] font-mono mb-4">
                <span class="text-zinc-500">MARKDOWN_NODE // <span class="text-white font-bold">{{ activeAmp.id.toUpperCase() }}</span></span>
                <span class="text-[9px] text-zinc-600">LIVE_DATA</span>
              </div>

              <div class="relative z-10 my-2 flex-grow">
                <div v-if="isMarkdownLoading" class="text-xs font-mono text-zinc-600 animate-pulse">// LOADING STREAM...</div>
                <article v-else v-html="renderedMarkdown" class="markdown-body font-mono text-xs text-zinc-400 leading-relaxed space-y-4"></article>
              </div>

              <div class="relative z-10 bg-white/[0.01] backdrop-blur-sm border border-zinc-900/60 rounded-xl p-2.5 text-[10px] font-mono text-zinc-500 flex justify-between items-center mt-4">
                <span>PATH // {{ activeAmp.markdownPath }}</span>
                <span class="text-zinc-600">SYNC_OK</span>
              </div>
            </div>

          </template>
        </div>

      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { marked } from 'marked'

const ampProjects = ref([])
const activeAmpId = ref('')
const isLoading = ref(true)
const isMarkdownLoading = ref(false)
const rawMarkdown = ref('')

const activeAmp = computed(() => {
  return ampProjects.value.find(amp => amp.id === activeAmpId.value) || null
})

const renderedMarkdown = computed(() => {
  return marked.parse(rawMarkdown.value)
})

onMounted(async () => {
  try {
    const response = await fetch('/nas-media/projects.json')
    const data = await response.json()
    ampProjects.value = data
    if (data.length > 0) {
      await switchAmp(data[0].id)
    }
  } catch (error) {
    console.error('JSON 讀取失敗：', error)
  } finally {
    isLoading.value = false
  }
})

const switchAmp = async (id) => {
  activeAmpId.value = id
  const target = ampProjects.value.find(amp => amp.id === id)
  if (!target) return

  isMarkdownLoading.value = true
  try {
    const response = await fetch(target.markdownPath)
    if (response.ok) {
      rawMarkdown.value = await response.text()
    } else {
      rawMarkdown.value = `### ⚠️ 讀取失敗\n找不到 \`${target.markdownPath}\``
    }
  } catch (error) {
    rawMarkdown.value = '### ⚠️ 訊號中斷'
  } finally {
    isMarkdownLoading.value = false
  }
}
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

.animate-fadeIn {
  animation: fadeIn 0.25s ease-out forwards;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(2px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Markdown 注入樣式 */
:deep(.markdown-body h3) {
  font-size: 0.8rem;
  font-weight: 700;
  color: #ffffff;
  margin-top: 1.25rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
}
:deep(.markdown-body h3::before) {
  content: "■";
  color: #10b981;
  font-size: 0.6rem;
  margin-right: 0.5rem;
}
:deep(.markdown-body p) {
  color: #a1a1aa;
  margin-bottom: 0.75rem;
}
:deep(.markdown-body ul) {
  list-style-type: square;
  padding-left: 1.25rem;
  color: #a1a1aa;
  margin-bottom: 0.75rem;
}
:deep(.markdown-body strong) {
  color: #34d399;
  font-weight: 600;
}
</style>