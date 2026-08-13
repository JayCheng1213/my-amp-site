<template>
  <div v-if="projects.length > 0">
    <div class="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-1.5">
      <span class="text-emerald-500">◆</span> FEATURED_UNITS // 精選作品
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <button
        v-for="project in projects"
        :key="project.id"
        @click="$emit('select', project.id)"
        class="group text-left border rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 font-mono"
        :class="[theme === 'light'
          ? 'bg-white/60 border-stone-300 hover:border-stone-500 hover:shadow-lg'
          : 'bg-zinc-900/30 border-zinc-800/80 hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.12)]']"
      >
        <div class="w-full h-40 overflow-hidden relative"
             :class="[theme === 'light' ? 'bg-stone-200' : 'bg-zinc-950']">
          <img
            v-if="project.cover"
            :src="variantPath(project.cover, 'thumb')"
            :alt="project.fullName || project.menuName"
            loading="lazy"
            decoding="async"
            @error="onImgError($event, project.cover)"
            class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div v-else class="w-full h-full flex items-center justify-center text-[10px] text-zinc-600">
            // NO_PREVIEW
          </div>

          <span :class="[theme === 'light' ? 'text-stone-800 border-stone-400 bg-stone-100/90' : 'text-emerald-400 border-emerald-500/30 bg-zinc-950/80']"
                class="absolute top-2 left-2 text-[9px] font-bold border px-1.5 py-0.5 rounded-md backdrop-blur-sm">
            {{ project.deviceCode }}
          </span>
        </div>

        <div class="p-3.5 space-y-1.5">
          <div :class="[theme === 'light' ? 'text-stone-900' : 'text-zinc-200']" class="text-xs font-bold leading-snug">
            {{ project.menuName }}
          </div>
          <div class="text-[10px] text-zinc-500 truncate">{{ project.tubes }}</div>
          <div class="flex items-center justify-between pt-0.5">
            <span :class="project.statusColor" class="text-[9px] px-1.5 py-0.5 rounded font-bold tracking-wider">
              {{ project.statusText }}
            </span>
            <span class="text-[10px] text-zinc-600 transition-transform duration-200 group-hover:translate-x-1">▶</span>
          </div>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useTheme } from '../composables/useTheme'
import { variantPath } from '../../site.config.js'
const { theme } = useTheme()

defineProps({
  projects: { type: Array, default: () => [] }
})
defineEmits(['select'])

// 尚未跑過壓縮腳本的舊照片，退回原圖顯示
const onImgError = (e, originalSrc) => {
  if (e.target.dataset.fellBack) return
  e.target.dataset.fellBack = '1'
  e.target.src = originalSrc
}
</script>
