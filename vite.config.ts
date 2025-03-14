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
            includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
            manifest: {
                name: '日本關西中國地方旅遊手冊',
                short_name: '日本旅遊手冊',
                description: '2025年3月28日至4月6日日本關西中國地方旅遊行程',
                theme_color: '#F9A8D4',
                background_color: '#FDF2F8',
                display: 'standalone',
                orientation: 'portrait',
                icons: [
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
                        src: 'pwa-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any maskable'
                    }
                ],
                start_url: '/',
                categories: ['travel', 'lifestyle', 'navigation']
            },
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg,json}'],
                runtimeCaching: [
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
                    {
                        urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'images-cache',
                            expiration: {
                                maxEntries: 60,
                                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 天
                            }
                        }
                    },
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
                    {
                        urlPattern: /\/data\/itinerary\.json$/,
                        handler: 'StaleWhileRevalidate',
                        options: {
                            cacheName: 'itinerary-data',
                            expiration: {
                                maxEntries: 5,
                                maxAgeSeconds: 60 * 60 * 24 // 1 天
                            }
                        }
                    }
                ]
            },
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