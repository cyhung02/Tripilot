// src/hooks/useAppStatus.ts
import { useState, useEffect, useCallback } from 'react';

export type AppStatus = 'ONLINE' | 'OFFLINE_WITH_CACHE' | 'OFFLINE_NO_CACHE' | 'CHECKING';

export function useAppStatus() {
    const [status, setStatus] = useState<AppStatus>('CHECKING');
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    // 檢查網路連接
    const checkNetworkConnection = useCallback(() => {
        setIsOnline(navigator.onLine);
    }, []);

    // 檢查行程資料快取
    const checkItineraryCache = useCallback(async () => {
        if (!('caches' in window)) {
            setStatus(isOnline ? 'ONLINE' : 'OFFLINE_NO_CACHE');
            return;
        }

        try {
            const cacheName = 'itinerary-data';
            const possibleUrls = [
                '/data/itinerary.json',
                `${import.meta.env.BASE_URL || '/'}data/itinerary.json`
            ];

            const cache = await caches.open(cacheName);

            // 嘗試在快取中查找資料
            for (const url of possibleUrls) {
                const response = await cache.match(url);
                if (response) {
                    try {
                        const data = await response.json();
                        if (Array.isArray(data) && data.length > 0) {
                            // 找到有效的快取
                            setStatus(isOnline ? 'ONLINE' : 'OFFLINE_WITH_CACHE');
                            return;
                        }
                    } catch (e) {
                        console.warn('快取資料無效', e);
                    }
                }
            }

            // 沒有找到有效快取
            setStatus(isOnline ? 'ONLINE' : 'OFFLINE_NO_CACHE');
        } catch (e) {
            console.error('檢查快取時發生錯誤', e);
            setStatus(isOnline ? 'ONLINE' : 'OFFLINE_NO_CACHE');
        }
    }, [isOnline]);

    // 監聽網路狀態變化
    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
            checkItineraryCache();
        };

        const handleOffline = () => {
            setIsOnline(false);
            checkItineraryCache();
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        // 初始檢查
        checkNetworkConnection();
        checkItineraryCache();

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, [checkItineraryCache, checkNetworkConnection]);

    return {
        status,
        isOnline,
        isOfflineWithCache: status === 'OFFLINE_WITH_CACHE',
        isOfflineNoCache: status === 'OFFLINE_NO_CACHE',
        isChecking: status === 'CHECKING'
    };
}