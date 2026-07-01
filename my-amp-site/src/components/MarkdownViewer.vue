<template>
  <div :class="[theme === 'light' ? 'from-stone-100 to-stone-50 border-stone-300/80 text-stone-800 light-mode' : 'from-zinc-900 to-zinc-950 border-zinc-900 text-zinc-400']"
       class="lg:col-span-2 bg-gradient-to-br border rounded-2xl p-6 min-h-[450px] relative overflow-hidden flex flex-col justify-between transition-colors duration-300">
    
    <div :class="[theme === 'light' ? 'opacity-5' : 'opacity-10']" 
         class="absolute inset-0 bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

    <div :class="[theme === 'light' ? 'bg-stone-200/80 border-stone-300' : 'bg-zinc-950/80 border-zinc-900']" class="relative z-10 flex justify-between items-center backdrop-blur-sm border rounded-lg p-2.5 text-xs font-mono mb-4">
      <span class="text-zinc-500">MARKDOWN_NODE // <span :class="[theme === 'light' ? 'text-stone-900' : 'text-white']" class="font-bold">{{ ampId.toUpperCase() }}</span></span>
      <span class="text-[9px] text-zinc-600">LIVE_DATA</span>
    </div>

    <div class="relative z-10 my-2 flex-grow overflow-x-auto">
      <div v-if="loading" class="text-xs font-mono text-zinc-600 animate-pulse">// LOADING STREAM...</div>
      <article v-else v-html="content" class="markdown-body font-mono text-xs leading-relaxed space-y-4"></article>
    </div>

    <div :class="[theme === 'light' ? 'bg-stone-200/40 border-stone-300/60' : 'bg-white/[0.01] border-zinc-900/60']" class="relative z-10 backdrop-blur-sm border rounded-xl p-2.5 text-[10px] font-mono text-zinc-500 flex justify-between items-center mt-4">
      <span>PATH // {{ path }}</span>
      <span class="text-zinc-600">SYNC_OK</span>
    </div>
  </div>
</template>

<script setup>
import { useTheme } from '../composables/useTheme'
const { theme } = useTheme()
defineProps({ ampId: String, content: String, path: String, loading: Boolean })
</script>

<style scoped>
/* ========================================================================= */
/* 🌙 暗黑模式專屬 Markdown 基礎配電線路 */
/* ========================================================================= */
:deep(.markdown-body h2) { font-size: 0.9rem; font-weight: 800; color: #ffffff; margin-top: 1.5rem; margin-bottom: 0.75rem; }
:deep(.markdown-body h3) { font-size: 0.8rem; font-weight: 700; color: #e4e4e7; margin-top: 1.25rem; margin-bottom: 0.5rem; display: flex; align-items: center; }

/* 智慧型標籤：沒有手繪真空管符號時，才去 prepend 綠色方塊 ■ */
:deep(.markdown-body h3:not(:has(svg))::before) { 
  content: "■"; 
  color: #10b981; 
  font-size: 0.6rem; 
  margin-right: 0.5rem; 
}

:deep(.markdown-body p) { color: #a1a1aa; margin-bottom: 0.75rem; }
:deep(.markdown-body strong) { color: #34d399; font-weight: 600; }
:deep(.markdown-body hr) { border: 0; border-top: 1px dashed #27272a; margin: 1.5rem 0; }

/* 表格與區塊引用 */
:deep(.markdown-body table) { width: 100%; border-collapse: collapse; margin: 1rem 0; font-size: 11px; background-color: rgba(9, 9, 11, 0.4); border: 1px solid #27272a; }
:deep(.markdown-body th) { background-color: #18181b; color: #ffffff; padding: 6px 10px; border-bottom: 1px solid #27272a; }
:deep(.markdown-body td) { padding: 6px 10px; border-bottom: 1px solid #18181b; color: #d4d4d8; }
:deep(.markdown-body blockquote) { border-left: 3px solid #10b981; background-color: rgba(16, 185, 129, 0.02); padding: 10px 14px; margin: 1.25rem 0; border-radius: 0 8px 8px 0; }
:deep(.markdown-body blockquote p) { margin: 0 !important; }

/* ========================================================================= */
/* 🖼️ 多媒體動態適配（基礎外殼配置） */
/* ========================================================================= */
:deep(.markdown-body img),
:deep(.markdown-body video),
:deep(.markdown-body iframe) {
  max-width: 100%;
  border-radius: 12px;
  margin: 1.5rem 0;
  border: 1px solid #27272a;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
}

/* ========================================================================= */
/* 💡 直式多媒體限流電路：強制鎖定最大高度，防範手機直式影音拉長爆窗 ⚡ */
/* ========================================================================= */
:deep(.markdown-body video),
:deep(.markdown-body img) {
  max-height: 480px !important; /* 閹割最高上限，貼合桌面黃金視覺高度 */
  width: auto !important;       /* 寬度強制隨高度收縮，絕不產生橫向拉伸形變 */
  display: block;
  margin-left: auto;
  margin-right: auto;           /* 工業級完美居中校正 */
  object-fit: contain;
}

/* ========================================================================= */
/* 🌌 真空管 ICON 訊號增益與動態熱發光電路 */
/* ========================================================================= */
:deep(.markdown-body h2 svg),
:deep(.markdown-body h3 svg) {
  width: 1.55rem !important; height: 1.55rem !important;
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), filter 0.4s ease-in-out, color 0.3s ease;
  cursor: pointer;
}
:deep(.markdown-body h2:hover svg),
:deep(.markdown-body h3:hover svg) {
  transform: scale(1.1) translateY(-0.5px); color: #ff9100 !important; 
  filter: drop-shadow(0 0 8px rgba(255, 145, 0, 0.65)) drop-shadow(0 0 2px rgba(239, 68, 68, 0.35));
}

/* ========================================================================= */
/* ☀️ 溫和亮色模式下的專屬 Markdown 調音 */
/* ========================================================================= */
.light-mode :deep(.markdown-body h2) { color: #1c1917; }
.light-mode :deep(.markdown-body h3) { color: #44403c; }
.light-mode :deep(.markdown-body p) { color: #57534e; }
.light-mode :deep(.markdown-body strong) { color: #047857; }
.light-mode :deep(.markdown-body hr) { border-top: 1px dashed #d6d3d1; }
.light-mode :deep(.markdown-body table) { background-color: rgba(255, 255, 255, 0.8); border: 1px solid #d6d3d1; }
.light-mode :deep(.markdown-body th) { background-color: #e7e5e4; color: #1c1917; border-bottom: 1px solid #d6d3d1; }
.light-mode :deep(.markdown-body td) { border-bottom: 1px solid #f5f5f4; color: #44403c; }
.light-mode :deep(.markdown-body blockquote) { border-left: 3px solid #059669; background-color: rgba(5, 150, 105, 0.03); }
.light-mode :deep(.markdown-body blockquote p) { color: #57534e; }
.light-mode :deep(.markdown-body img),
.light-mode :deep(.markdown-body video),
.light-mode :deep(.markdown-body iframe) { border-color: #d6d3d1; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }

.light-mode :deep(.markdown-body h2:hover svg),
.light-mode :deep(.markdown-body h3:hover svg) { color: #ear580c !important; filter: drop-shadow(0 0 6px rgba(234, 88, 12, 0.5)); }
</style>