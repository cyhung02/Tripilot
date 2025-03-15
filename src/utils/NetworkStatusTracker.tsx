// src/utils/NetworkStatusTracker.tsx
import { useEffect } from 'react';

/**
 * 網路狀態追蹤器組件
 * 用於記錄用戶的網路狀態變化，儲存最後在線時間
 */
const NetworkStatusTracker: React.FC = () => {
    useEffect(() => {
        // 在線狀態變化處理
        const handleOnline = () => {
            console.info('網路連接已恢復');
            try {
                // 記錄最後在線時間
                localStorage.setItem('lastOnlineTime', new Date().toISOString());
                localStorage.setItem('networkStatus', 'online');
            } catch (error) {
                console.error('無法儲存網路狀態信息:', error);
            }
        };

        // 離線狀態變化處理
        const handleOffline = () => {
            console.info('網路連接已中斷');
            try {
                localStorage.setItem('networkStatus', 'offline');
            } catch (error) {
                console.error('無法儲存網路狀態信息:', error);
            }
        };

        // 頁面載入時記錄狀態
        if (navigator.onLine) {
            handleOnline();
        } else {
            handleOffline();
        }

        // 添加事件監聽器
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        // 定期更新在線時間（當用戶使用應用時）
        const intervalId = setInterval(() => {
            if (navigator.onLine) {
                try {
                    localStorage.setItem('lastOnlineTime', new Date().toISOString());
                } catch (error) {
                    console.error('無法更新最後在線時間:', error);
                }
            }
        }, 5 * 60 * 1000); // 每5分鐘更新一次

        // 頁面關閉前記錄最後狀態
        const handleBeforeUnload = () => {
            if (navigator.onLine) {
                try {
                    localStorage.setItem('lastOnlineTime', new Date().toISOString());
                } catch (error) {
                    console.error('無法更新最後在線時間:', error);
                }
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        // 清理函數
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
            window.removeEventListener('beforeunload', handleBeforeUnload);
            clearInterval(intervalId);
        };
    }, []);

    // 此組件不渲染任何內容
    return null;
};

export default NetworkStatusTracker;