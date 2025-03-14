import { defineConfig } from '@vite-pwa/assets-generator/config'

export default defineConfig({
  headLinkOptions: {
    preset: '2023'
  },
  images: ['public/sakura-icon.svg'],
  presets: ['mobileApp', 'favicon'] // 直接引用內建預設
})
