import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg', 'sakura-icon.svg'],
            manifest: {
                name: 'Tripilot',
                short_name: 'Tripilot',
                description: '您的智慧旅行助手，幫助您管理行程、查看景點和規劃旅途。',
                theme_color: '#F9A8D4',
                background_color: '#FDF2F8',
                display: 'standalone',
                orientation: 'portrait',
                start_url: '/?source=pwa',
                scope: '/',
                lang: 'zh-TW',
                icons: [
                    {
                        src: 'pwa-64x64.png',
                        sizes: '64x64',
                        type: 'image/png'
                    },
                    {
                        src: 'pwa-192x192.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: 'pwa-512x512.png',
                        sizes: '512x512',
                        type: 'image/png'
                    },
                    {
                        src: 'maskable-icon-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'maskable'
                    }
                ],
                shortcuts: [
                    {
                        name: '今日行程',
                        url: '/?today=true',
                        description: '查看今天的行程安排'
                    }
                ]
            },
            workbox: {
                // 預緩存模式 - 修正 glob 模式以匹配 Vite 的輸出結構
                globPatterns: [
                    // Vite 將 JS、CSS 文件放在 assets 目錄下
                    'assets/**/*.{js,css}',
                    // 靜態資源
                    '**/*.{ico,png,svg,webp}',
                    // 核心 HTML 和數據文件
                    'index.html',
                    'offline.html',
                    'data/**/*.json'
                ],

                // 離線模式處理
                navigateFallback: 'index.html',

                // 離線頁面設定
                offlineGoogleAnalytics: false,

                // 運行時緩存策略
                runtimeCaching: [
                    // 核心資源策略: 先顯示舊的，同時更新 (適用於 API、行程資料)
                    {
                        urlPattern: /\/data\/.*\.json$/,
                        handler: 'StaleWhileRevalidate',
                        options: {
                            cacheName: 'api-cache',
                            expiration: {
                                maxEntries: 20,
                                maxAgeSeconds: 60 * 60 * 24 * 3 // 3 天
                            }
                        }
                    },

                    // 靜態資源策略: 優先使用緩存 (適用於圖片、字體等)
                    {
                        urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|woff2)$/,
                        handler: 'StaleWhileRevalidate',
                        options: {
                            cacheName: 'assets-cache',
                            expiration: {
                                maxEntries: 50,
                                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 天
                            }
                        }
                    },

                    // Google Fonts 策略
                    {
                        urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com/,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'google-fonts',
                            expiration: {
                                maxEntries: 20,
                                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 年
                            }
                        }
                    }
                ]
            }
        })
    ],
    base: '/',
    build: {
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
                pure_funcs: ['console.log']
            }
        },
        rollupOptions: {
            output: {
                manualChunks: {
                    'react-vendor': ['react', 'react-dom'],
                    'date-vendor': ['date-fns'],
                    'animation-vendor': ['framer-motion']
                }
            }
        }
    }
})