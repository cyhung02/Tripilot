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
                name: '日本關西中國地方旅遊手冊',
                short_name: '日本旅遊手冊',
                description: '2025年3月28日至4月6日日本關西中國地方旅遊行程',
                theme_color: '#F9A8D4',
                background_color: '#FDF2F8',
                display: 'standalone',
                orientation: 'portrait',
                id: '/',
                start_url: '/?source=pwa',
                scope: '/',
                lang: 'zh-TW',
                dir: 'ltr',
                prefer_related_applications: false,
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
                screenshots: [
                    {
                        src: 'screenshot-narrow.png',
                        sizes: '540x720',
                        type: 'image/png',
                        form_factor: 'narrow'
                    },
                    {
                        src: 'screenshot-wide.png',
                        sizes: '720x540',
                        type: 'image/png',
                        form_factor: 'wide'
                    }
                ],
                categories: ['travel', 'lifestyle', 'navigation'],
                shortcuts: [
                    {
                        name: '今日行程',
                        url: '/?today=true',
                        description: '查看今天的行程安排'
                    },
                    {
                        name: '行程總覽',
                        url: '/',
                        description: '查看完整行程'
                    }
                ]
            },
            workbox: {
                // 進階設定，改進離線經驗
                globPatterns: [
                    '**/*.{js,css,html,ico,png,svg,woff2}',
                    'data/itinerary.json'
                ],
                // 調整導航回退條件，避免誤判
                navigateFallbackDenylist: [
                    /^\/api\//,
                    /\.(png|jpg|jpeg|svg|gif|webp|json)$/i,  // 不對資源檔案使用回退
                    /^\/manifest\.webmanifest$/i  // 不對 manifest 使用回退
                ],
                navigateFallback: 'index.html',  // 改用 index.html 作為回退，而非特定的離線頁面
                // 更精細的緩存策略
                runtimeCaching: [
                    // 優先使用緩存的資源（離線優先）
                    {
                        urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'google-fonts-cache',
                            expiration: {
                                maxEntries: 10,
                                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 年
                            },
                            cacheableResponse: {
                                statuses: [0, 200]
                            }
                        }
                    },
                    {
                        urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'gstatic-fonts-cache',
                            expiration: {
                                maxEntries: 10,
                                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 年
                            },
                            cacheableResponse: {
                                statuses: [0, 200]
                            }
                        }
                    },
                    // 圖片資源
                    {
                        urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
                        handler: 'StaleWhileRevalidate',  // 改為 StaleWhileRevalidate，先顯示緩存，後台更新
                        options: {
                            cacheName: 'images-cache',
                            expiration: {
                                maxEntries: 60,
                                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 天
                            }
                        }
                    },
                    // 靜態資源
                    {
                        urlPattern: /\.(?:js|css)$/,
                        handler: 'StaleWhileRevalidate',
                        options: {
                            cacheName: 'static-resources',
                            expiration: {
                                maxEntries: 30,
                                maxAgeSeconds: 60 * 60 * 24 * 7 // 7 天
                            }
                        }
                    },
                    // 行程數據 - 改為緩存優先，但後台更新
                    {
                        urlPattern: /\/data\/itinerary\.json$/,
                        handler: 'StaleWhileRevalidate',  // 改為 StaleWhileRevalidate 策略
                        options: {
                            cacheName: 'itinerary-data',
                            expiration: {
                                maxEntries: 5,
                                maxAgeSeconds: 60 * 60 * 24 // 1 天
                            },
                            cacheableResponse: {
                                statuses: [0, 200]
                            }
                        }
                    },
                    // HTML 請求 - 網路優先但不太嚴格的超時
                    {
                        urlPattern: /\/index\.html$/,
                        handler: 'NetworkFirst',
                        options: {
                            cacheName: 'html-cache',
                            networkTimeoutSeconds: 5, // 增加網絡超時時間
                            expiration: {
                                maxEntries: 10,
                                maxAgeSeconds: 60 * 60 * 24 // 1 天
                            },
                            cacheableResponse: {
                                statuses: [0, 200]
                            }
                        }
                    },
                    // 其餘請求的默認處理
                    {
                        urlPattern: /^https:\/\//,
                        handler: 'NetworkFirst',
                        options: {
                            cacheName: 'others',
                            networkTimeoutSeconds: 5, // 增加超時時間
                            expiration: {
                                maxEntries: 32,
                                maxAgeSeconds: 60 * 60 * 24 // 1 天
                            },
                            cacheableResponse: {
                                statuses: [0, 200]
                            }
                        }
                    }
                ],
                // SW 控制
                skipWaiting: true, // 新 SW 立即接管
                clientsClaim: true // 新 SW 立即控制所有客戶端
            }
        })
    ],
    base: '/',
    build: {
        minify: 'terser', // 使用 terser 進行更強的壓縮
        terserOptions: {
            compress: {
                drop_console: true, // 移除 console.*
                drop_debugger: true, // 移除 debugger
                pure_funcs: ['console.log'] // 將純函數調用視為副作用
            }
        },
        rollupOptions: {
            output: {
                manualChunks: {
                    // 將 React 相關庫單獨打包
                    'react-vendor': ['react', 'react-dom'],
                    // 將日期處理庫單獨打包
                    'date-vendor': ['date-fns'],
                    // 將動畫庫單獨打包
                    'animation-vendor': ['framer-motion']
                }
            }
        }
    }
})