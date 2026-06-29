<template>
  <div class="min-h-screen flex flex-col bg-zinc-50 font-sans antialiased text-zinc-800 tracking-wide">
    
    <nav class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200">
      <div class="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
        <div class="font-mono font-bold text-base tracking-widest text-zinc-950">
          TYPO_TEST_v1.0 <span class="text-emerald-600">⚡</span>
        </div>
        <div class="flex items-center space-x-4 text-xs font-mono text-zinc-400">
          <span>Responsive Layout</span>
        </div>
      </div>
    </nav>

    <main class="flex-grow max-w-3xl w-full mx-auto px-6 py-12 space-y-12">
      
      <section class="border-b border-zinc-200 pb-10">
        <span class="text-xs font-mono text-emerald-600 block mb-4"># 01 / Font Hierarchy & Weights</span>
        <div class="space-y-4">
          <h1 class="text-4xl font-extrabold text-zinc-950 tracking-tight">
            H1 標題：真空管 Single-Ended Class A 擴大機設計
          </h1>
          <h2 class="text-2xl font-bold text-zinc-900 tracking-tight">
            H2 標題：E80CC Driver Stage 與 1626 功率管的阻抗匹配特性
          </h2>
          <h3 class="text-xl font-semibold text-zinc-800">
            H3 標題：關於殘留哼聲 (Residual Hum) 的降噪路徑分析
          </h3>
          <h4 class="text-base font-medium text-zinc-700">
            H4 標題：Secondary Output Impedance 量測備忘錄
          </h4>
        </div>
      </section>

      <section class="border-b border-zinc-200 pb-10 space-y-6">
        <span class="text-xs font-mono text-emerald-600 block mb-2"># 02 / Paragraph & Leading (行高測試)</span>
        
        <div>
          <span class="text-xs font-mono text-zinc-400 block mb-2">[ 預設行高 leading-normal ]</span>
          <p class="text-zinc-700 text-sm leading-normal">
            在設計 High-End 真空管音響時，Layout 佈線是決定 Signal-to-Noise Ratio (信噪比) 的關鍵因素。我們常用點對點搭棚 (Point-to-Point Wiring) 來縮短訊號路徑。Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam AC elementum premium. 當中文字元與 English Words 混合排列時，字體的大小比例與基准線對齊顯得格外重要。
          </p>
        </div>

        <div>
          <span class="text-xs font-mono text-zinc-400 block mb-2">[ 舒適行高 leading-relaxed - 推薦用於長文章 ]</span>
          <p class="text-zinc-700 text-sm leading-relaxed">
            這是一個採用 <code>leading-relaxed</code> 的段落。當閱讀長篇的技術日記或 KiCad 電路板設計心得時，微幅增加的行距能大幅降低視覺疲勞。配合 <strong>Beanbon BB100</strong> 烘焙出來的淺焙耶加雪菲，手沖咖啡的 4:6 Method 能夠在繁重的 Embedded System 除錯過程中提供絕佳的專注力。這裡穿插一段英文 Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
      </section>

      <section class="border-b border-zinc-200 pb-10">
        <span class="text-xs font-mono text-emerald-600 block mb-4"># 03 / Monospace Font (數據與代碼測試)</span>
        <div class="bg-zinc-900 rounded-xl p-5 text-zinc-100 font-mono text-xs leading-loose shadow-inner">
          <div class="text-zinc-500">// STM32CubeIDE I2C Configuration Test</div>
          <div><span class="text-emerald-400">void</span> <span class="text-blue-400">MX_I2C1_Init</span>(<span class="text-emerald-400">void</span>) {</div>
          <div class="pl-4">hi2c1.Instance = I2C1;</div>
          <div class="pl-4">hi2c1.Init.ClockSpeed = <span class="text-amber-400">100000</span>; <span class="text-zinc-500">// 100KHz Standard Mode</span></div>
          <div class="pl-4">hi2c1.Init.DutyCycle = I2C_DUTYCYCLE_2;</div>
          <div class="pl-4">printf(<span class="text-amber-300">"MQTT Status: Connected to local broker.\n"</span>);</div>
          <div>}</div>
          <div class="mt-4 text-zinc-500"># Measurement Metrics (1kHz Sine Wave Input)</div>
          <div>THD+N: 0.042% @ 10mW Output (Load: 32 Ohm SeeAudio Bravery)</div>
          <div>Vp-p Max: 2.84V | Vrms: 1.01V</div>
        </div>
      </section>

      <section class="pb-6">
        <span class="text-xs font-mono text-emerald-600 block mb-4"># 04 / Muted Elements & Borders</span>
        <div class="p-4 bg-zinc-100 border-l-2 border-zinc-400 rounded-r-lg text-xs text-zinc-500 leading-relaxed">
          <strong>排版備忘 (Typography Note)：</strong> 本站主要採用系統預設字型家族（Mac 優先調用蘋方 <code>PingFang TC</code>，Windows 調用微軟正黑體 <code>Microsoft JhengHei</code>）。英文部分融入了 Tailwind 內建的現代無襯線體，確保在 iOS / Android 行動裝置上皆能呈現最乾淨的無負擔閱讀視覺。
        </div>
      </section>

    </main>

    <footer class="bg-white border-t border-zinc-200 py-6 text-center text-xs font-mono text-zinc-400">
      SYSTEM_STATUS // 200 OK // STABLE_RENDER
    </footer>

  </div>
</template>

<script setup>
// 純視覺測試，暫無邏輯狀態
</script>