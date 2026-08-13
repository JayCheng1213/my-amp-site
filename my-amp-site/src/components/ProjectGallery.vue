<template>
  <div v-if="items && items.length > 0" class="w-full">
    
    <div :class="[theme === 'light' ? 'bg-white/80 border-stone-300/80' : 'bg-zinc-900/30 border-zinc-900/80']"
         class="backdrop-blur-md border rounded-2xl p-4 space-y-4 transition-colors duration-300 font-mono">
      
      <div>
        <span class="text-[10px] font-bold text-zinc-500 block tracking-wider uppercase">VISUAL_SCOPE // 相片展示櫃</span>
      </div>

      <div v-if="loading" class="text-[11px] text-zinc-600 animate-pulse">// BUFFERING IMAGES...</div>

      <div v-else class="space-y-6">
        <div 
          v-for="(img, idx) in items" 
          :key="idx"
          @click="openLightbox(idx)"
          class="group relative flex flex-col items-center border border-transparent rounded-xl p-1 transition-all duration-300 cursor-zoom-in"
        >
          <div class="w-full overflow-hidden rounded-lg border transition-all duration-500 ease-out-expo shadow-sm transform will-change-transform"
               :class="[
                 theme === 'light' 
                   ? 'border-stone-200 group-hover:border-stone-500 group-hover:shadow-md' 
                   : 'border-zinc-800/80 group-hover:border-emerald-500/50 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.15)]',
                 'group-hover:scale-[1.04] group-hover:-translate-y-1'
               ]">
            <img
              :src="variantSrc(img.src, 'thumb')"
              :alt="img.caption"
              loading="lazy"
              decoding="async"
              @error="onImgError($event, img.src)"
              class="w-full object-cover max-h-48 transition-transform duration-700 ease-out group-hover:scale-105 select-none pointer-events-none"
            />
          </div>

          <div class="w-full max-h-0 opacity-0 overflow-hidden transition-all duration-500 ease-out-expo group-hover:max-h-24 group-hover:opacity-100 group-hover:mt-2.5">
            <p :class="[theme === 'light' ? 'text-stone-600 bg-stone-100/80' : 'text-zinc-400 bg-zinc-950/40']"
               class="text-xs leading-relaxed p-2.5 rounded-lg border border-dashed border-zinc-800/40 text-center">
              <span class="text-emerald-500 mr-1">▪</span> {{ img.caption }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <Transition name="lightbox-fade">
        <div v-if="isOpen" 
             class="fixed inset-0 z-[999] bg-zinc-950/95 backdrop-blur-lg flex flex-col items-center justify-center p-4 select-none font-mono text-zinc-300"
             @click.self="closeLightbox">
          
          <button @click="closeLightbox" 
                  class="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:text-white hover:border-zinc-600 transition-all duration-200 cursor-pointer text-lg shadow-md z-10">
            ✕
          </button>

          <div class="absolute top-7 left-6 text-[10px] text-zinc-600 tracking-widest hidden sm:block">
            SCOPE_ZOOM // FRAME_{{ currentIndex + 1 }}_OF_{{ items.length }}
          </div>

          <div class="relative max-w-4xl w-full flex items-center justify-center px-12 group/modal">
            <button @click="prevImg" 
                    class="absolute left-0 w-10 h-10 flex items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/20 text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-all duration-200 cursor-pointer shadow-sm">
              ‹
            </button>

            <Transition name="img-zoom" mode="out-in">
              <div :key="currentIndex" class="relative inline-block">
                <!-- 低解析底圖：點擊當下已在瀏覽器快取中，零等待先撐住畫面 -->
                <img :src="variantSrc(items[currentIndex].src, 'thumb')"
                     :alt="items[currentIndex].caption"
                     @error="onImgError($event, items[currentIndex].src)"
                     class="max-w-full max-h-[70vh] object-contain rounded-xl shadow-2xl border border-zinc-900 transition-[filter] duration-300"
                     :class="largeReady ? '' : 'blur-[2px]'" />
                <!-- 高解析版本：載入完成後淡入覆蓋 -->
                <img :src="variantSrc(items[currentIndex].src, 'large')"
                     :alt="items[currentIndex].caption"
                     @load="largeReady = true"
                     @error="onImgError($event, items[currentIndex].src)"
                     class="absolute inset-0 w-full h-full object-contain rounded-xl border border-zinc-900 transition-opacity duration-300"
                     :class="largeReady ? 'opacity-100' : 'opacity-0'" />
              </div>
            </Transition>

            <button @click="nextImg" 
                    class="absolute right-0 w-10 h-10 flex items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/20 text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-all duration-200 cursor-pointer shadow-sm">
              ›
            </button>
          </div>

          <div class="mt-6 max-w-xl w-full px-4 min-h-16 flex flex-col items-center justify-center gap-2">
            <Transition name="caption-cross" mode="out-in">
              <p :key="currentIndex"
                 class="text-xs sm:text-sm text-center leading-relaxed text-zinc-400 bg-zinc-900/30 px-5 py-3 rounded-xl border border-zinc-900 w-full shadow-lg">
                <span class="text-emerald-500 mr-1.5 animate-pulse">●</span> {{ items[currentIndex].caption }}
              </p>
            </Transition>
            <a :href="items[currentIndex].src" target="_blank" rel="noopener noreferrer" @click.stop
               class="text-[10px] text-zinc-600 hover:text-emerald-400 transition-colors duration-200 tracking-wider">
              ⤓ 檢視原圖<span v-if="originalSize"> ({{ originalSize }})</span>
            </a>
          </div>

        </div>
      </Transition>
    </Teleport>

  </div>
</template>

<script setup>
import { ref, onUnmounted, watch } from 'vue'
import { useTheme } from '../composables/useTheme'
const { theme } = useTheme()

const props = defineProps({
  items: { type: Array, required: true },
  loading: { type: Boolean, default: false }
})

const isOpen = ref(false)
const currentIndex = ref(0)
const largeReady = ref(false)
const originalSize = ref(null)

// 由原圖路徑推導壓縮變體：a/b.jpg → a/_opt/b-thumb.webp
const variantSrc = (src, suffix) => {
  const cut = src.lastIndexOf('/')
  const dir = src.slice(0, cut)
  const base = src.slice(cut + 1).replace(/\.[^.]+$/, '')
  return `${dir}/_opt/${base}-${suffix}.webp`
}

// 尚未跑過壓縮腳本的舊照片，退回原圖顯示
const onImgError = (e, originalSrc) => {
  if (e.target.dataset.fellBack) return
  e.target.dataset.fellBack = '1'
  e.target.src = originalSrc
}

const prefetchLarge = (index) => {
  const item = props.items[index]
  if (item) new Image().src = variantSrc(item.src, 'large')
}

const sizeCache = new Map()
const fetchOriginalSize = async (src) => {
  if (sizeCache.has(src)) { originalSize.value = sizeCache.get(src); return }
  originalSize.value = null
  try {
    const res = await fetch(src, { method: 'HEAD' })
    const bytes = Number(res.headers.get('content-length'))
    const label = bytes ? (bytes >= 1048576 ? (bytes / 1048576).toFixed(1) + 'MB' : Math.round(bytes / 1024) + 'KB') : null
    sizeCache.set(src, label)
    originalSize.value = label
  } catch {
    originalSize.value = null
  }
}

const openLightbox = (index) => {
  currentIndex.value = index
  isOpen.value = true
}
const closeLightbox = () => { isOpen.value = false }

const prevImg = () => {
  if (props.items.length <= 1) return
  currentIndex.value = (currentIndex.value - 1 + props.items.length) % props.items.length
}
const nextImg = () => {
  if (props.items.length <= 1) return
  currentIndex.value = (currentIndex.value + 1) % props.items.length
}

// 切換圖片時重置高解析狀態，並僅預抓前後各一張（不做全量背景下載，避免佔用上傳頻寬）
watch([currentIndex, isOpen], ([idx, open]) => {
  if (!open) return
  largeReady.value = false
  fetchOriginalSize(props.items[idx].src)
  const len = props.items.length
  if (len > 1) {
    prefetchLarge((idx + 1) % len)
    prefetchLarge((idx - 1 + len) % len)
  }
}, { immediate: true })

const handleKeydown = (e) => {
  if (!isOpen.value) return
  if (e.key === 'Escape') closeLightbox()
  if (e.key === 'ArrowLeft') prevImg()
  if (e.key === 'ArrowRight') nextImg()
}

watch(isOpen, (newValue) => {
  if (newValue) {
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeydown)
  } else {
    document.body.style.overflow = ''
    window.removeEventListener('keydown', handleKeydown)
  }
})

onUnmounted(() => {
  document.body.style.overflow = ''
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.ease-out-expo { transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1); }
.lightbox-fade-enter-active, .lightbox-fade-leave-active { transition: opacity 0.25s ease; }
.lightbox-fade-enter-from, .lightbox-fade-leave-to { opacity: 0; }
.img-zoom-enter-active, .img-zoom-leave-active { transition: opacity 0.2s ease, transform 0.25s cubic-bezier(0.16, 1, 0.3, 1); }
.img-zoom-enter-from { opacity: 0; transform: scale(0.97); }
.img-zoom-leave-to { opacity: 0; transform: scale(1.01); }
.caption-cross-enter-active, .caption-cross-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.caption-cross-enter-from { opacity: 0; transform: translateY(3px); }
.caption-cross-leave-to { opacity: 0; transform: translateY(-3px); }
</style>