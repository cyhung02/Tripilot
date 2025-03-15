// src/App.tsx 修正版
import JournifyApp from './components/JournifyApp';
import { ItineraryProvider } from './context/ItineraryContext';
import PWAManager from './components/PWAManager';
import NetworkStatusTracker from './utils/NetworkStatusTracker';
import ErrorBoundary from './components/ErrorBoundary';
import OfflineFallback from './components/OfflineFallback';
import { lazy, Suspense, useState, useEffect, useCallback } from 'react';
import { useItinerary } from './context/ItineraryContext';

// 懶加載非關鍵組件
const CherryBlossomFall = lazy(() => import('./components/CherryBlossomFall'));

// 檢查行程資料快取是否存在的函數
const checkItineraryCache = async (): Promise<boolean> => {
    try {
        if ('caches' in window) {
            // 只檢查統一的快取名稱
            const cacheName = 'itinerary-data';
            const basePath = import.meta.env.BASE_URL || '/';
            const possibleUrls = [
                `${basePath}data/itinerary.json`,
                '/data/itinerary.json'
            ];

            try {
                const cache = await caches.open(cacheName);
                for (const url of possibleUrls) {
                    const response = await cache.match(url);
                    if (response) {
                        // 驗證快取內容是否有效
                        try {
                            const data = await response.json();
                            if (Array.isArray(data) && data.length > 0) {
                                console.info(`找到有效的行程資料快取: ${cacheName} - ${url}`);
                                return true;
                            }
                        } catch (e) {
                            console.warn('快取中的行程資料無效，將重新獲取');
                            continue;
                        }
                    }
                }
            } catch (e) {
                console.warn(`檢查快取 ${cacheName} 時發生錯誤:`, e);
            }
        }
        return false;
    } catch (e) {
        console.error('檢查快取時發生錯誤:', e);
        return false;
    }
};

// 包裝 App 元件，提供 ItineraryProvider 上下文
function AppWithProvider() {
    return (
        <ItineraryProvider>
            <AppContent />
        </ItineraryProvider>
    );
}

// 主要 App 內容元件，使用 ItineraryContext
function AppContent() {
    const { itineraryData, isLoading } = useItinerary();
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [isLoaded, setIsLoaded] = useState(false);
    const [stableNetworkState, setStableNetworkState] = useState(true);
    const [canReachServer, setCanReachServer] = useState(true);
    const [hasItineraryCache, setHasItineraryCache] = useState(false);
    const [checkingCache, setCheckingCache] = useState(true);

    // 檢查網路連接能否實際訪問資源
    const checkNetworkConnection = useCallback(async () => {
        if (!navigator.onLine) {
            setCanReachServer(false);
            return;
        }

        try {
            // 嘗試請求一個小的資源並檢查響應
            // 使用時間戳避免緩存，加載應用的 favicon 或其他小檔案
            const testUrl = `/sakura-icon.svg?_=${Date.now()}`;
            const response = await fetch(testUrl, {
                method: 'HEAD',
                cache: 'no-store',
                headers: { 'Cache-Control': 'no-cache' }
            });

            if (response.ok) {
                setCanReachServer(true);
            } else {
                setCanReachServer(false);
            }
        } catch (error) {
            console.warn('網路連接檢查失敗:', error);
            setCanReachServer(false);
        }
    }, []);

    // 檢查行程資料快取狀態
    useEffect(() => {
        const checkCache = async () => {
            setCheckingCache(true);
            try {
                const hasCachedData = await checkItineraryCache();
                setHasItineraryCache(hasCachedData);
                console.info(`行程資料快取狀態: ${hasCachedData ? '存在' : '不存在'}`);
            } catch (e) {
                console.error('檢查行程資料快取時發生錯誤:', e);
            } finally {
                setCheckingCache(false);
            }
        };

        checkCache();
    }, []);

    // 監控網路狀態
    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
            checkNetworkConnection();
        };
        const handleOffline = () => {
            setIsOnline(false);
            setCanReachServer(false);
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        // 初始檢查
        checkNetworkConnection();

        // 定期檢查網路狀態
        const intervalId = setInterval(() => {
            checkNetworkConnection();
        }, 30000); // 每30秒檢查一次

        // 頁面載入後標記為已載入
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 1000);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
            clearInterval(intervalId);
            clearTimeout(timer);
        };
    }, [checkNetworkConnection]);

    // 監控網路狀態穩定性
    useEffect(() => {
        // 當網路狀態變化時，不立即切換離線頁面，而是設置一個短暫延遲
        // 這樣可以避免因為短暫的網路不穩定導致UI頻繁切換
        let networkChangeTimer: number | null = null;

        const isReallyOnline = isOnline && canReachServer;

        if (!isReallyOnline && isLoaded) {
            networkChangeTimer = window.setTimeout(() => {
                setStableNetworkState(false);
            }, 2000);
        } else if (isReallyOnline) {
            networkChangeTimer = window.setTimeout(() => {
                setStableNetworkState(true);
            }, 1000);
        }

        return () => {
            if (networkChangeTimer) {
                clearTimeout(networkChangeTimer);
            }
        };
    }, [isOnline, canReachServer, isLoaded]);

    // 向 Service Worker 發送網路狀態信息
    useEffect(() => {
        try {
            if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
                navigator.serviceWorker.controller.postMessage({
                    type: 'NETWORK_STATUS',
                    payload: {
                        isOnline,
                        isReallyOnline: isOnline && canReachServer
                    }
                });
            }
        } catch (error) {
            console.error('無法通知 Service Worker 網路狀態變更:', error);
        }
    }, [isOnline, canReachServer]);

    // 檢查應用是否為 PWA 模式 (安裝到主屏幕)
    const isPwaMode = window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone === true;

    // 改良後的邏輯：
    // 1. 有資料：已載入資料 (itineraryData.length > 0) 或有快取 (hasItineraryCache)
    // 2. 只有在離線 + 沒有資料 + 已完成資料嘗試載入時，才顯示離線頁面
    const hasData = itineraryData.length > 0 || hasItineraryCache;
    const isOfflineWithNoData = !stableNetworkState && !hasData && !isLoading && !checkingCache;
    const isPwaOfflineWithNoData = isPwaMode && !canReachServer && !hasData && !isLoading && !checkingCache;

    // 當網路狀態不穩定且無可用資料，或者是在 PWA 模式下確認離線且無可用資料時，顯示離線頁面
    if ((isOfflineWithNoData && isLoaded) || (isPwaOfflineWithNoData && isLoaded)) {
        return <OfflineFallback />;
    }

    return (
        <ErrorBoundary>
            <div>
                {/* 網路狀態追蹤器 */}
                <NetworkStatusTracker />

                {/* PWA 管理器 */}
                <PWAManager />

                {/* 主應用 */}
                <JournifyApp />

                {/* 裝飾效果 - 只在頁面完全載入後顯示 */}
                {isLoaded && (
                    <Suspense fallback={null}>
                        <CherryBlossomFall />
                    </Suspense>
                )}
            </div>
        </ErrorBoundary>
    );
}

// 導出最外層的 App 元件
function App() {
    return <AppWithProvider />;
}

export default App;