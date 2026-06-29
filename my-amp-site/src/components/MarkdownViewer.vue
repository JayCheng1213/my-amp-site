<template>
  <div class="lg:col-span-2 bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-900 rounded-2xl p-6 min-h-[400px] relative overflow-hidden flex flex-col justify-between">
    <div class="absolute inset-0 bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:24px_24px] opacity-10 pointer-events-none"></div>

    <div class="relative z-10 flex justify-between items-center bg-zinc-950/80 backdrop-blur-sm border border-zinc-900 rounded-lg p-2.5 text-[10px] font-mono mb-4">
      <span class="text-zinc-500">MARKDOWN_NODE // <span class="text-white font-bold">{{ ampId.toUpperCase() }}</span></span>
      <span class="text-[9px] text-zinc-600">LIVE_DATA</span>
    </div>

    <div class="relative z-10 my-2 flex-grow">
      <div v-if="loading" class="text-xs font-mono text-zinc-600 animate-pulse">// LOADING STREAM...</div>
      <article v-else v-html="content" class="markdown-body font-mono text-xs text-zinc-400 leading-relaxed space-y-4"></article>
    </div>

    <div class="relative z-10 bg-white/[0.01] backdrop-blur-sm border border-zinc-900/60 rounded-xl p-2.5 text-[10px] font-mono text-zinc-500 flex justify-between items-center mt-4">
      <span>PATH // {{ path }}</span>
      <span class="text-zinc-600">SYNC_OK</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  ampId: { type: String, required: true },
  content: { type: String, required: true },
  path: { type: String, required: true },
  loading: { type: Boolean, default: false }
})
</script>

<style scoped>
/* 精密微調 Markdown 注入網頁後的線稿感排版樣式 */
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
:deep(.markdown-body p) { color: #a1a1aa; margin-bottom: 0.75rem; }
:deep(.markdown-body ul) { list-style-type: square; padding-left: 1.25rem; color: #a1a1aa; margin-bottom: 0.75rem; }
:deep(.markdown-body strong) { color: #34d399; font-weight: 600; }
</style>