<template>
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
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>