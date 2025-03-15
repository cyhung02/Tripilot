// src/utils/registerSW.ts
import { registerSW } from 'virtual:pwa-register';

/**
 * 註冊 Service Worker
 * 簡化版本 - PWAManager 會處理更新提示和離線就緒通知
 */
export function registerServiceWorker() {
    // 在 PWAManager 中處理更詳細的 Service Worker 生命週期事件
    // 這裡只記錄初始註冊結果
    try {
        registerSW({
            immediate: true,
            onRegisterError(error) {
                console.error('Service Worker 註冊失敗:', error);
            }
        });

        // 記錄最後在線時間，用於離線頁面顯示
        window.addEventListener('online', () => {
            try {
                localStorage.setItem('lastOnlineTime', new Date().toISOString());
            } catch (e) {
                // 忽略儲存錯誤
            }
        });

        // 初始設置
        if (navigator.onLine) {
            try {
                localStorage.setItem('lastOnlineTime', new Date().toISOString());
            } catch (e) {
                // 忽略儲存錯誤
            }
        }
    } catch (error) {
        console.error('Service Worker 啟動失敗:', error);
    }
}