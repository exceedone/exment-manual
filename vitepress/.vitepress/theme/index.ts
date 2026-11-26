// The default theme of VitePress, with the classes the pages of the manual use
// (docs/docs.css of the docsify site, and the grid of its Bootstrap as far as the pages use it).
import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { useRoute } from 'vitepress'
import { nextTick, onMounted, watch } from 'vue'
import mediumZoom from 'medium-zoom'
import './manual.css'

// The screenshots open larger on a click (and close on a click, Esc or scroll).
// Only the images in the text of a page; not one in a link (it keeps its link),
// not one marked data-no-zoom, and not a small one such as an icon.
const ZOOMABLE = '.vp-doc img:not(a img):not([data-no-zoom])'
const MIN_WIDTH = 120

export default {
  extends: DefaultTheme,
  setup() {
    const route = useRoute()
    const zoom = typeof window === 'undefined'
      ? null
      : mediumZoom({ margin: window.innerWidth < 640 ? 8 : 24, background: 'var(--vp-c-bg)' })

    const attach = (img: HTMLImageElement) => {
      if (img.naturalWidth >= MIN_WIDTH) {
        img.classList.add('zoomable')
        zoom?.attach(img)
      }
    }
    const refresh = () => {
      if (!zoom) return
      zoom.close()
      zoom.detach()
      document.querySelectorAll<HTMLImageElement>(ZOOMABLE).forEach((img) => {
        if (img.complete) attach(img)
        else img.addEventListener('load', () => attach(img), { once: true })
      })
    }

    onMounted(refresh)
    watch(() => route.path, () => nextTick(refresh))
  },
} satisfies Theme
