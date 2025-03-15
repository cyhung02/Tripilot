// src/App.tsx
import JournifyApp from './components/JournifyApp';
import { ItineraryProvider } from './context/ItineraryContext';
import PWAManager from './components/PWAManager';
import NetworkStatusTracker from './utils/NetworkStatusTracker';
import ErrorBoundary from './components/ErrorBoundary';
import OfflineFallback from './components/OfflineFallback';
import { lazy, Suspense, useState, useEffect } from 'react';

// 懶加載非關鍵組件
const CherryBlossomFall = lazy(() => import('./components/CherryBlossomFall'));

function App() {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [isLoaded, setIsLoaded] = useState(false);
    // 網路狀態穩定計數器，避免網路狀態快速變化導致UI閃爍
    const [stableNetworkState, setStableNetworkState] = useState(true);
    // 追蹤實際的連接狀態
    const [canReachServer, setCanReachServer] = useState(true);

    // 檢查網路連接能否實際訪問資源
    const checkNetworkConnection = async () => {
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
    };

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
    }, []);

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

    // 當網路狀態不穩定且應用已載入，或者是在 PWA 模式下確認離線，顯示離線頁面
    if ((!stableNetworkState && isLoaded) || (isPwaMode && !canReachServer && isLoaded)) {
        return <OfflineFallback />;
    }

    return (
        <ErrorBoundary>
            <ItineraryProvider>
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
            </ItineraryProvider>
        </ErrorBoundary>
    );
}

export default App;