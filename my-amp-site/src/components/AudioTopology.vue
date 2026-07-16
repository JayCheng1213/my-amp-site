<template>
  <div class="p-6 font-mono selection:bg-rose-500/30">
    
    <div 
      :class="[theme === 'light' ? 'bg-white border-stone-200 shadow-lg' : 'bg-zinc-900 border-zinc-800 shadow-inner']"
      class="border rounded-2xl p-6 transition-colors duration-300"
    >
      <div class="flex items-center justify-between mb-8 pb-4 border-b border-dashed" :class="[theme === 'light' ? 'border-stone-200' : 'border-zinc-800']">
        <div>
          <h2 :class="[theme === 'light' ? 'text-stone-950' : 'text-white']" class="text-xl font-extrabold tracking-tighter uppercase">SYSTEM_AUDIO_拓撲構成圖</h2>
          <p class="text-[11px] text-zinc-500 mt-0.5">ACTIVE SIGNAL PATH // INTERACTIVE FLOW</p>
        </div>
        
        <div class="flex items-center space-x-2 text-xs">
          <span class="text-zinc-500">BIAS_STATE:</span>
          <span class="relative flex h-2.5 w-2.5">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span class="text-emerald-500 font-bold">OK</span>
        </div>
      </div>

      <svg width="100%" height="auto" viewBox="0 0 900 620" fill="none" xmlns="http://www.w3.org/2000/svg" class="audio-svg">
        
        <style scoped>
          /* 昭和感石英暖白底圖格 (致敬 Stereo Sound 雜誌) */
          .grid-bg { fill: url(#topo_grid); }
          
          /* 設備卡片基本樣式 */
          .device-card { transition: all 0.3s ease; cursor: pointer; }
          .device-card:hover { filter: drop-shadow(0 4px 12px rgba(244,63,94, 0.2)); transform: translateY(-2px); }
          .device-card.active { stroke-width: 2.5px; }

          /* ------------------------------------------- */
          /* ⚡ CSS 電流動畫魔術 (Keyframes) */
          /* ------------------------------------------- */
          
          /* 動畫 A: 「高頻數位脈衝」 (PC -> DAC) - 亮綠色閃爍方波 */
          @keyframes signal-digital-green {
            0% { stroke-dashoffset: 0; stroke: #10B981; filter: drop-shadow(0 0 1px #10B981); }
            50% { stroke: #064E3B; }
            100% { stroke-dashoffset: -120; stroke: #10B981; }
          }
          .trace-digital {
            stroke-dasharray: 6 12;
            animation: signal-digital-green 1.2s linear infinite;
            visibility: hidden; /* 預設斷路 */
          }
          
          /* 動畫 B: 「琥珀色類比正弦波」 (CD/DAC -> 功放) - 平滑流動 */
          @keyframes signal-analog-amber {
            0% { stroke-dashoffset: 0; stroke: #D97706; filter: drop-shadow(0 0 2px #F59E0B); }
            100% { stroke-dashoffset: -120; stroke: #F59E0B; }
          }
          .trace-analog {
            stroke-dasharray: 20 40;
            animation: signal-analog-amber 2.5s linear infinite;
            visibility: hidden; /* 預設斷路 */
          }

          /* 動畫 C: 「溫暖微幅類比波」 (LP -> Phono) - 紅色細微震盪 */
          @keyframes signal-lp-red {
            0% { stroke-dashoffset: 0; stroke: #E11D48; opacity: 0.8; }
            50% { opacity: 0.5; }
            100% { stroke-dashoffset: -120; stroke: #F43F5E; }
          }
          .trace-lp {
            stroke-dasharray: 5 15;
            animation: signal-lp-red 3.5s linear infinite;
            visibility: hidden; /* 預設斷路 */
          }

          /* 當軌道被 Vue 選取時 (Active)，導通電流動畫 */
          .active-route { visibility: visible !important; }

          /* =========================================== */
          /* 🔥 真空管燈絲「點火」熱度動態 (Glow) */
          /* =========================================== */
          @keyframes tube-glow {
            0%, 100% { fill: #B45309; filter: blur(2px) drop-shadow(0 0 1px #F97316); }
            50% { fill: #EA580C; filter: blur(3px) drop-shadow(0 0 6px #F97316); opacity: 1; }
          }
          .tube-filament {
            fill: #78350F; /* 未點火狀態 */
            transition: fill 1s ease;
          }
          .tube-active .tube-filament {
            animation: tube-glow 3s ease-in-out infinite;
          }
        </style>

        <defs>
          <pattern id="topo_grid" width="25" height="25" patternUnits="userSpaceOnUse">
            <path d="M 25 0 L 0 0 0 25" fill="none" stroke="#E7E5E4" stroke-width="1"/>
          </pattern>
          
          <filter id="tube_warm_glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <rect width="100%" height="100%" class="grid-bg" />

        <g id="signal_traces_layer">
          <path id="path_pc_dac" d="M 160 110 Q 380 110, 440 310" stroke="#D6D3D1" stroke-width="3" stroke-linecap="round" fill="none" />
          <path d="M 160 110 Q 380 110, 440 310" stroke-width="3" stroke-linecap="round" fill="none"
                class="trace-digital" :class="{ 'active-route': selectedInput === 'PC' }" />

          <path id="path_cd_dac" d="M 160 210 Q 380 210, 440 310" stroke="#D6D3D1" stroke-width="3" stroke-linecap="round" fill="none" />
          <path d="M 160 210 Q 380 210, 440 310" stroke-width="3" stroke-linecap="round" fill="none"
                class="trace-analog" :class="{ 'active-route': selectedInput === 'CD' }" />

          <path id="path_lp_phono" d="M 160 310 L 250 310" stroke="#D6D3D1" stroke-width="3" stroke-linecap="round" fill="none" />
          <path d="M 160 310 L 250 310" stroke-width="3" stroke-linecap="round" fill="none"
                class="trace-lp" :class="{ 'active-route': selectedInput === 'LP' }" />
          
          <path id="path_phono_amps" d="M 330 310 Q 400 310, 430 450 L 580 450" stroke="#D6D3D1" stroke-width="3" stroke-linecap="round" fill="none" />
          <path d="M 330 310 Q 400 310, 430 450 L 580 450" stroke-width="3" stroke-linecap="round" fill="none"
                class="trace-analog" :class="{ 'active-route': selectedInput === 'LP' }" />

          <path id="path_dac_2a3" d="M 500 310 Q 560 310, 580 370" stroke="#D6D3D1" stroke-width="3" stroke-linecap="round" fill="none" />
          <path d="M 500 310 Q 560 310, 580 370" stroke-width="3" stroke-linecap="round" fill="none"
                class="trace-analog" :class="{ 'active-route': (selectedInput === 'PC' || selectedInput === 'CD') && selectedOutput === '2A3' }" />

          <path id="path_dac_6ra3" d="M 500 310 Q 560 310, 580 250" stroke="#D6D3D1" stroke-width="3" stroke-linecap="round" fill="none" />
          <path d="M 500 310 Q 560 310, 580 250" stroke-width="3" stroke-linecap="round" fill="none"
                class="trace-analog" :class="{ 'active-route': (selectedInput === 'PC' || selectedInput === 'CD') && selectedOutput === '6R-A3' }" />
        </g>

        <g id="inputs_layer" transform="translate(10, 50)">
          <g :class="{ 'active': selectedInput === 'PC' }" class="device-card" @click="selectInput('PC')" transform="translate(10, 10)">
            <rect width="140" height="80" rx="6" fill="#171717" stroke="#F43F5E" stroke-width="0" />
            <text x="15" y="30" fill="white" font-size="12" font-weight="bold">💻 PC 串流機</text>
            <text x="15" y="50" fill="#888" font-size="9">USB / PCM 192k</text>
            <rect v-if="selectedInput === 'PC'" x="125" y="10" width="8" height="8" rx="4" fill="#F43F5E" />
          </g>
          <g :class="{ 'active': selectedInput === 'CD' }" class="device-card" @click="selectInput('CD')" transform="translate(10, 110)">
            <rect width="140" height="80" rx="6" fill="#2E2A24" stroke="#F43F5E" stroke-width="0" />
            <text x="15" y="30" fill="white" font-size="12" font-weight="bold">💿 MUSICAL CD1</text>
            <text x="15" y="50" fill="#8C857B" font-size="9">COAXIAL / 44.1k</text>
            <rect v-if="selectedInput === 'CD'" x="125" y="10" width="8" height="8" rx="4" fill="#F43F5E" />
          </g>
          <g :class="{ 'active': selectedInput === 'LP' }" class="device-card" @click="selectInput('LP')" transform="translate(10, 210)">
            <rect width="140" height="80" rx="6" fill="#78350F" stroke="#F43F5E" stroke-width="0" />
            <text x="15" y="30" fill="white" font-size="12" font-weight="bold">📻 Pioneer LP</text>
            <text x="15" y="50" fill="#D6D3D1" font-size="9">PHONO OUT / analog</text>
            <rect v-if="selectedInput === 'LP'" x="125" y="10" width="8" height="8" rx="4" fill="#F43F5E" />
          </g>
        </g>

        <g id="processing_layer" transform="translate(250, 270)">
          <g :class="{ 'active': selectedInput === 'LP' }" class="device-card" transform="translate(0, 0)">
            <rect width="90" height="60" rx="4" fill="#1C1917" stroke="#F43F5E" stroke-width="0" />
            <text x="12" y="25" fill="#D6D3D1" font-size="10" font-weight="bold">PHONO唱放</text>
            <text x="12" y="38" fill="#78716C" font-size="8">Gain: 40dB (MC)</text>
          </g>
          <g transform="translate(160, 0)">
            <rect width="100%" height="100%" /> <g class="device-card" :class="{ 'active': (selectedInput === 'PC' || selectedInput === 'CD') }">
              <rect width="90" height="60" rx="4" fill="#1C1917" stroke="#F43F5E" stroke-width="0" />
              <text x="12" y="25" fill="#D6D3D1" font-size="10" font-weight="bold">TOPPING DAC</text>
              <text x="12" y="38" fill="#78716C" font-size="8">DX5 II // PCM/DSD</text>
            </g>
          </g>
        </g>

        <g id="amplifiers_layer" transform="translate(580, 180)">
          
          <g id="amp_6ra3" :class="[ (selectedOutput === '6R-A3') ? 'active tube-active' : '' ]" 
             class="device-card" @click="selectOutput('6R-A3')" transform="translate(10, 10)">
            <rect width="160" height="110" rx="6" fill="#2D2D2D" stroke="#F43F5E" stroke-width="0" />
            <text x="15" y="30" fill="white" font-size="12" font-weight="bold">🎧 單端 6R-A3 耳放</text>
            <text x="15" y="48" fill="#A8A29E" font-size="9">DIY_Amp // CLASS-A</text>
            <g transform="translate(115, 55)">
              <rect x="2" y="15" width="26" height="20" rx="1" fill="#151515" /> <path d="M 0 15 C 0 -5, 30 -5, 30 15 L 30 40 L 0 40 Z" fill="rgba(255,255,255,0.05)" stroke="#78716C" />
              <rect x="11" y="8" width="8" height="22" rx="1" class="tube-filament" />
            </g>
            <rect v-if="selectedOutput === '6R-A3'" x="145" y="10" width="8" height="8" rx="4" fill="#F43F5E" />
          </g>

          <g id="amp_2a3" :class="[ (selectedOutput === '2A3') ? 'active tube-active' : '' ]"
             class="device-card" @click="selectOutput('2A3')" transform="translate(10, 150)">
            <rect width="160" height="110" rx="6" fill="#2D2D2D" stroke="#F43F5E" stroke-width="0" />
            <text x="15" y="30" fill="white" font-size="12" font-weight="bold">🔊 單端 2A3 喇叭功放</text>
            <text x="15" y="48" fill="#A8A29E" font-size="9">Hand-wired // CLASS-A</text>
            <g transform="translate(110, 50)">
              <rect x="2" y="20" width="36" height="20" rx="1" fill="#151515" /> <path d="M 0 20 C 0 -15, 40 -15, 40 20 L 40 45 L 0 45 Z" fill="rgba(255,255,255,0.05)" stroke="#78716C" />
              <path d="M 15 8 L 15 35 M 25 8 L 25 35" stroke-width="2" class="tube-filament" style="stroke: currentFill;"/>
            </g>
            <rect v-if="selectedOutput === '2A3'" x="145" y="10" width="8" height="8" rx="4" fill="#F43F5E" />
          </g>
        </g>
        
        <g id="outputs_layer" transform="translate(800, 200)">
          <g :class="{ 'active': selectedOutput === '6R-A3' }" class="device-card" transform="translate(0, 0)">
            <rect width="70" height="60" rx="4" fill="#111" stroke="#F43F5E" stroke-width="0" />
            <text x="10" y="35" fill="#D6D3D1" font-size="10" font-weight="bold">🎧 Bravery</text>
          </g>
          <g :class="{ 'active': selectedOutput === '2A3' }" class="device-card" transform="translate(0, 150)">
            <rect width="70" height="90" rx="4" fill="#111" stroke="#F43F5E" stroke-width="0" />
            <text x="10" y="50" fill="#D6D3D1" font-size="10" font-weight="bold">🔊 喇叭</text>
          </g>
        </g>
        
        <g transform="translate(30, 580)">
          <text x="0" y="0" fill="#78716C" font-size="11" font-weight="bold">JAY_AUDIO // SYSTEM_constitute_diagram v1.2</text>
          <text x="0" y="15" fill="#888" font-size="9">Designed for NTUT_EE Portfolio // Active Tube Configuration</text>
        </g>
      </svg>
      
      <div class="mt-4 p-2.5 text-center rounded-lg border border-dashed text-xs text-rose-500 bg-rose-500/5 font-bold" :class="[theme === 'light' ? 'border-rose-300' : 'border-rose-900']">
        🕹️ 點擊上方設備卡片 (例如 [Pioneer黑膠] + [2A3喇叭])，即可導通有源霓虹電流與點亮真空管！
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTheme } from '../composables/useTheme' // 確保您已將 useTheme 晶片並聯

// 並聯主題晶片 (Light/Dark 模式適配)
const { theme } = useTheme()

// ===============================================
// 🧠 互動控制邏輯暂存器 (Reactive State)
// ===============================================

// 1. 預設選取 PC 串流機為訊源輸入 (相位01)
const selectedInput = ref('PC')

// 2. 預設選取 2A3 單端喇叭功放為輸出端 (相位03)
const selectedOutput = ref('2A3')

// ===============================================
// 🕹️ 選取函式晶片 (Methods)
// ===============================================

// 訊源輸入端切換
const selectInput = (inputName) => {
  selectedInput.value = inputName
  
  // 網管邏輯: 如果選取黑膠(LP)，強制輸出切換到喇叭(2A3)，因為6R-A3沒唱放
  if (inputName === 'LP') {
    selectedOutput.value = '2A3'
  }
}

// 功放/輸出端切換
const selectOutput = (outputName) => {
  selectedOutput.value = outputName
}
</script>

<style scoped>
/* 設備卡片點擊時亮玫瑰色霓虹燈 (Active State) */
.device-card.active rect[fill]:not([fill="white"]):not([fill="none"]) {
  stroke-width: 3px;
  stroke: #F43F5E;
  filter: drop-shadow(0 0 5px #F43F5E);
  transition: all 0.2s ease;
}

/* 設備卡片文字活性顏色 */
.device-card.active text[fill="white"] {
  fill: #F43F5E !important;
  font-weight: 900;
}
</style>