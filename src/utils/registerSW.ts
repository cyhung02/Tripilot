// src/utils/registerSW.ts
import { registerSW } from 'virtual:pwa-register';

/**
 * 註冊 Service Worker 並添加離線頁面安裝功能
 */
export function registerServiceWorker() {
    // 註冊 Service Worker
    const updateSW = registerSW({
        onNeedRefresh() {
            // 新版本可用時
            console.info('有新版本可用');

            // 可以在此實現提示用戶更新的 UI
            const shouldUpdate = confirm('有新內容可用。要更新嗎？');
            if (shouldUpdate) {
                updateSW();
            }
        },
        onOfflineReady() {
            // Service Worker 已準備好處理離線操作
            console.info('應用已準備好離線使用');

            // 緩存離線頁面 - 確保離線頁面可用
            cacheOfflinePage();
        },
        onRegisterError(error) {
            console.error('Service Worker 註冊失敗:', error);
        }
    });

    // 預緩存離線頁面
    async function cacheOfflinePage() {
        if ('caches' in window) {
            try {
                const cache = await caches.open('offline-page');
                // 嘗試緩存離線頁面
                cache.add(new Request('offline.html', { cache: 'reload' }))
                    .then(() => console.info('離線頁面已緩存'))
                    .catch(err => console.error('緩存離線頁面失敗:', err));
            } catch (error) {
                console.error('無法開啟快取:', error);
            }
        }
    }

    // 頁面載入時緩存離線頁面
    window.addEventListener('load', () => {
        if ('serviceWorker' in navigator) {
            cacheOfflinePage().catch(console.error);
        }
    });

    return updateSW;
}