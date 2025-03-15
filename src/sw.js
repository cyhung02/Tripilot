// src/sw.js
import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching'
import { registerRoute, NavigationRoute } from 'workbox-routing'
import { NetworkFirst, StaleWhileRevalidate, CacheFirst } from 'workbox-strategies'
import { ExpirationPlugin } from 'workbox-expiration'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'
import { clientsClaim } from 'workbox-core'

// 使 service worker 立即接管頁面
self.skipWaiting()
clientsClaim()

// 清理舊緩存
cleanupOutdatedCaches()

// 緩存預設資源
const manifest = self.__WB_MANIFEST
precacheAndRoute(manifest)

// 處理導航請求
const navigationHandler = async (params) => {
    try {
        // 嘗試從網絡獲取導航請求
        const networkStrategy = new NetworkFirst({
            cacheName: 'navigations-cache',
            plugins: [
                new ExpirationPlugin({
                    maxEntries: 50,
                    maxAgeSeconds: 24 * 60 * 60 // 1 天
                }),
                new CacheableResponsePlugin({
                    statuses: [0, 200]
                })
            ]
        })

        return await networkStrategy.handle(params)
    } catch (error) {
        console.error('無法從網路獲取頁面，轉向離線頁面', error)

        // 獲取緩存中的離線頁面
        const cache = await caches.open('offline-fallback')
        const cachedResponse = await cache.match('offline.html')

        if (cachedResponse) {
            return cachedResponse
        }

        // 如果沒有緩存的離線頁面，使用預緩存的離線頁面
        const precacheController = new workbox.precaching.PrecacheController()
        const precachedResponse = await precacheController.matchPrecache('offline.html')

        return precachedResponse || Response.error()
    }
}

// 註冊導航路由
const navigationRoute = new NavigationRoute(navigationHandler, {
    // 不匹配 API 請求等
    denylist: [/^\/api\//]
})

registerRoute(navigationRoute)

// 緩存行程數據
registerRoute(
    /\/data\/itinerary\.json$/,
    new NetworkFirst({
        cacheName: 'itinerary-data-cache',
        plugins: [
            new ExpirationPlugin({
                maxEntries: 5,
                maxAgeSeconds: 60 * 60 * 24 // 1 天
            }),
            new CacheableResponsePlugin({
                statuses: [0, 200]
            })
        ],
        networkTimeoutSeconds: 3
    })
)

// 首次安裝 service worker 時：預緩存離線頁面
self.addEventListener('install', (event) => {
    const cacheOfflinePage = async () => {
        const cache = await caches.open('offline-fallback')
        await cache.add(new Request('offline.html', { cache: 'reload' }))
    }

    event.waitUntil(cacheOfflinePage())
})

// 處理推送通知
self.addEventListener('push', (event) => {
    const data = event.data ? event.data.json() : {}

    const options = {
        body: data.body || '有新的行程更新',
        icon: '/pwa-192x192.png',
        badge: '/pwa-64x64.png',
        data
    }

    event.waitUntil(
        self.registration.showNotification(
            data.title || '日本旅遊手冊更新',
            options
        )
    )
})

// 處理通知點擊
self.addEventListener('notificationclick', (event) => {
    event.notification.close()

    const navigateUrl = event.notification.data && event.notification.data.url ? event.notification.data.url : '/'

    event.waitUntil((async () => {
        const allClients = await self.clients.matchAll({
            type: 'window'
        })

        // 嘗試找到已經打開的窗口並導航
        for (const client of allClients) {
            if (client.url === navigateUrl && 'focus' in client) {
                return client.focus()
            }
        }

        // 沒有找到打開的窗口，則創建一個新窗口
        return self.clients.openWindow(navigateUrl)
    })())
})

// 處理同步事件（可用於後台同步）
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-itinerary') {
        event.waitUntil(syncItinerary())
    }
})

// 同步行程數據的函數
async function syncItinerary() {
    try {
        // 獲取最新的行程數據
        const response = await fetch('/data/itinerary.json')
        if (!response.ok) throw new Error('無法同步行程數據')

        // 更新緩存
        const cache = await caches.open('itinerary-data-cache')
        await cache.put('/data/itinerary.json', response.clone())

        // 如果需要，也可以在這裡發送通知
        return true
    } catch (error) {
        console.error('同步行程失敗:', error)
        return false
    }
}

// 周期性同步（需要 web app 先請求權限）
self.addEventListener('periodicsync', (event) => {
    if (event.tag === 'daily-itinerary-update') {
        event.waitUntil(syncItinerary())
    }
})

// 記錄網絡狀態變更
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'NETWORK_STATUS') {
        const isOnline = event.data.payload.isOnline

        // 可以在這裡根據網絡狀態做一些處理
        if (isOnline) {
            // 網絡恢復時嘗試同步數據
            syncItinerary().catch(console.error)
        }
    }
})