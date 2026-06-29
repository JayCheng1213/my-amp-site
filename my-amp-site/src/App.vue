<template>
  <div class="min-h-screen flex bg-zinc-50 font-sans antialiased text-zinc-800">
    
    <aside class="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-zinc-200 md:sticky md:top-0 md:h-screen md:w-64 md:border-t-0 md:border-r flex md:flex-col justify-between px-6 py-4 backdrop-blur-md md:backdrop-blur-none bg-white/90 md:bg-white">
      
      <div class="hidden md:block my-4">
        <div class="font-mono font-black text-xl tracking-widest text-zinc-950">JAY_LAB.</div>
        <p class="text-[10px] font-mono text-zinc-400 mt-1 tracking-wider uppercase">EE & Audio Research</p>
      </div>

      <nav class="w-full flex md:flex-col justify-around md:justify-start md:space-y-1.5 items-center md:items-stretch h-full md:h-auto">
        <button 
          v-for="nav in navItems" 
          :key="nav.id"
          @click="currentView = nav.id"
          :class="[currentView === nav.id ? 'bg-zinc-900 text-white font-semibold' : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-950']"
          class="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm transition-all font-mono w-full justify-center md:justify-start"
        >
          <span class="text-xs tracking-tighter">{{ nav.icon }}</span>
          <span class="hidden sm:inline md:inline">{{ nav.name }}</span>
        </button>
      </nav>

      <div class="hidden md:block border-t border-zinc-100 pt-4 text-[11px] font-mono text-zinc-400 space-y-1">
        <div>CORE // VUE 3.x</div>
        <div>HOST // DS412+</div>
        <div class="flex items-center space-x-1.5">
          <span class="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
          <span>SSL ENCRYPTED</span>
        </div>
      </div>
    </aside>

    <main class="flex-grow min-h-screen md:max-w-3xl lg:max-w-4xl px-6 py-10 md:py-16 pb-24 md:pb-16 overflow-y-auto">
      
      <div v-if="currentView === 'engineering'" class="space-y-12">
        <header class="border-b border-zinc-200 pb-6">
          <h1 class="text-2xl font-bold tracking-tight text-zinc-950 font-mono">01 / ENGINEERING_LOGS</h1>
          <p class="text-zinc-400 text-xs mt-1 font-mono">真空管電路設計、手工搭棚調音、微控制器自動化環境</p>
        </header>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div v-for="item in engineeringLogs" :key="item.title" class="group border border-zinc-200 rounded-xl bg-white overflow-hidden hover:shadow-sm transition-all duration-300 flex flex-col justify-between">
            <div class="p-5">
              <div class="flex items-center justify-between text-[11px] font-mono text-zinc-400 mb-3">
                <span>{{ item.date }}</span>
                <span class="text-zinc-300">|</span>
                <span>{{ item.tag }}</span>
              </div>
              <h3 class="font-bold text-base text-zinc-900 group-hover:text-emerald-600 transition-colors mb-2">{{ item.title }}</h3>
              <p class="text-zinc-500 text-xs leading-relaxed line-clamp-3">{{ item.desc }}</p>
            </div>
            <div class="px-5 py-3 bg-zinc-50 border-t border-zinc-100 flex justify-between items-center text-xs font-mono text-zinc-400">
              <span>METRICS: {{ item.status }}</span>
              <span class="group-hover:translate-x-1 transition-transform text-zinc-600">→</span>
            </div>
          </div>
        </div>
      </div>

      <div v-if="currentView === 'flavor'" class="space-y-12">
        <header class="border-b border-zinc-200 pb-6">
          <h1 class="text-2xl font-bold tracking-tight text-zinc-950 font-mono">02 / FLAVOR_LAB</h1>
          <p class="text-zinc-400 text-xs mt-1 font-mono">精品咖啡手沖 4:6 比例紀錄、Beanbon 烘豆失重率曲線、精調調酒筆記</p>
        </header>

        <div class="space-y-6">
          <div v-for="coffee in flavorLogs" :key="coffee.name" class="p-5 border border-zinc-200 rounded-xl bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div class="space-y-1">
              <span class="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-700">{{ coffee.roast }}</span>
              <h3 class="font-bold text-base text-zinc-900 pt-1">{{ coffee.name }}</h3>
              <p class="text-zinc-500 text-xs">{{ coffee.notes }}</p>
            </div>
            <div class="flex sm:flex-col justify-between sm:justify-center items-center sm:items-end border-t sm:border-t-0 pt-3 sm:pt-0 border-zinc-100 text-xs font-mono text-zinc-400 gap-1">
              <div>水溫: {{ coffee.temp }}</div>
              <div class="hidden sm:block text-[10px] text-zinc-300">—————</div>
              <div>萃取比: {{ coffee.ratio }}</div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="currentView === 'about'" class="space-y-8 max-w-2xl">
        <header class="border-b border-zinc-200 pb-6">
          <h1 class="text-2xl font-bold tracking-tight text-zinc-950 font-mono">03 / ABOUT_ME</h1>
          <p class="text-zinc-400 text-xs mt-1 font-mono">JAY CHENG // 實驗室主理人簡介</p>
        </header>

        <section class="space-y-4 text-sm leading-relaxed text-zinc-600">
          <p>
            歡迎來到我的個人技術空間。這裡是我在電子工程學系研究之餘，用來安放硬體浪漫的避風港。
          </p>
          <p>
            專注於<strong>整合電路（IC）工程目標</strong>的同時，我熱衷於研究復古與現代的極致交點──真空管單端甲類擴大機。從電路物理模擬到物理搭棚，我追求極致純淨、無哼聲的低阻音訊表現。
          </p>
          <p>
            除了解碼複雜的硬體訊號，我也習慣在烘豆機的溫控曲線、或是手沖濾杯的精密流量中尋找工程師的控制欲。這個網站的所有靜態檔案均託管於我房間的 Synology DS412+ NAS 中。
          </p>
        </section>
      </div>

    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 目前所在的導覽視圖狀態
const currentView = ref('engineering')

// 導覽列項目資料
const navItems = [
  { id: 'engineering', name: '工程實驗日誌', icon: '⚡' },
  { id: 'flavor', name: '風味觀測研究', icon: '☕' },
  { id: 'about', name: '關於主理人', icon: '◔' }
]

// 【核心區】工程實驗日誌資料陣列（以後有新文章，直接在下面複製一組貼上即可！）
const engineeringLogs = ref([
  {
    date: '2026.05.20',
    tag: 'AUDIO',
    title: 'E80CC 🚀 1626 Darling Amp 零底噪調校',
    desc: '針對低阻高感耳機特別優化的微型單端系統。為了解決直熱管固有的交流哼聲，嘗試導入電子濾波器與單端星型接地佈線。',
    status: 'THD+N 0.042%'
  },
  {
    date: '2026.04.12',
    tag: 'EMBEDDED',
    title: 'ESP32 與 MQTT 在硬體除錯環境的部署',
    desc: '利用輕量化 MQTT 協定將工作站實體儀器的電壓、電流數據即時串流至 local broker，打造全自動化的參數紀錄看板。',
    status: 'RTT < 15ms'
  }
])

// 【核心區】風味日誌資料陣列
const flavorLogs = ref([
  {
    roast: '淺焙 LIGHT ROAST',
    name: '衣索比亞 耶加雪菲 沃卡村 G1',
    notes: 'Beanbon BB100 一爆下豆，總烘焙時間 5分40秒，失重率控制在 12.8%。以 4:6 法前段提高酸質表現，散發明顯的檸檬皮與白色花香調。',
    temp: '92°C',
    ratio: '1:15'
  },
  {
    roast: '中淺焙 MEDIUM LIGHT',
    name: '肯亞 涅里 恰加處理廠 PB',
    notes: '經典的黑醋栗與烏梅風味。厚實度（Body）極佳，適合在夜間進行 STM32 暫存器配置除錯時作為精神支柱。',
    temp: '90°C',
    ratio: '1:15.5'
  }
])
</script>