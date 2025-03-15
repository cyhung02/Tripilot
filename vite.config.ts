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
                // 預緩存模式 - 確保這些檔案在離線狀態下可用
                globPatterns: [
                    '**/*.{js,css,html,ico,png,svg,woff2}',
                    'data/itinerary.json' // 核心資料：一定要預緩存行程資料
                ],

                // 離線模式處理
                navigateFallback: 'index.html',
                navigateFallbackDenylist: [
                    /^\/api\//,
                    /\.(png|jpg|jpeg|svg|gif|webp|json)$/i,
                    /^\/manifest\.webmanifest$/i
                ],

                // 離線頁面設定
                offlineGoogleAnalytics: false,

                // 運行時緩存策略
                runtimeCaching: [
                    // 網路字體 - 緩存優先策略
                    // 適用於不常變更的資源
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

                    // 圖片資源 - 先顯示舊的，同時更新策略
                    {
                        urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
                        handler: 'StaleWhileRevalidate',
                        options: {
                            cacheName: 'images-cache',
                            expiration: {
                                maxEntries: 60,
                                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 天
                            },
                            cacheableResponse: {
                                statuses: [0, 200]
                            }
                        }
                    },

                    // 靜態資源 - 先顯示舊的，同時更新策略
                    {
                        urlPattern: /\.(?:js|css)$/,
                        handler: 'StaleWhileRevalidate',
                        options: {
                            cacheName: 'static-resources',
                            expiration: {
                                maxEntries: 30,
                                maxAgeSeconds: 60 * 60 * 24 * 7 // 7 天
                            },
                            cacheableResponse: {
                                statuses: [0, 200]
                            }
                        }
                    },

                    // 行程資料 - 核心資料策略
                    // StaleWhileRevalidate: 立即使用快取版本同時更新
                    // 這保證了離線時有資料可用，同時確保在有網路時資料會更新
                    {
                        urlPattern: /\/data\/itinerary\.json$/,
                        handler: 'StaleWhileRevalidate',
                        options: {
                            cacheName: 'itinerary-data', // 統一的快取名稱
                            expiration: {
                                maxEntries: 5,
                                maxAgeSeconds: 60 * 60 * 24 * 7 // 7 天
                            },
                            cacheableResponse: {
                                statuses: [0, 200]
                            }
                        }
                    },

                    // 離線頁面 - 使用快取優先策略
                    {
                        urlPattern: /offline\.html$/,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'offline-page',
                            expiration: {
                                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 天
                            },
                            cacheableResponse: {
                                statuses: [0, 200]
                            }
                        }
                    },

                    // HTML 請求 - 網路優先但有備用
                    {
                        urlPattern: /\/index\.html$/,
                        handler: 'NetworkFirst',
                        options: {
                            cacheName: 'html-cache',
                            networkTimeoutSeconds: 5,
                            expiration: {
                                maxEntries: 10,
                                maxAgeSeconds: 60 * 60 * 24 // 1 天
                            },
                            cacheableResponse: {
                                statuses: [0, 200]
                            }
                        }
                    },

                    // 其他網路請求
                    {
                        urlPattern: /^https:\/\//,
                        handler: 'NetworkFirst',
                        options: {
                            cacheName: 'others',
                            networkTimeoutSeconds: 5,
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

                // Service Worker 控制
                skipWaiting: true,
                clientsClaim: true
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