// src/App.tsx
import { lazy, Suspense, useState, useEffect } from 'react';
import JournifyApp from './components/JournifyApp';
import AppProviders from './providers/AppProviders';
import PWAManager from './components/PWAManager';
import ErrorBoundary from './components/ErrorBoundary';
import OfflineFallback from './components/OfflineFallback';
import { usePWAStatus } from './hooks/usePWAStatus';
import { useItineraryData } from './context/DataContext';
import Toast from './components/common/Toast';

// 懶加載非關鍵組件
const CherryBlossomFall = lazy(() => import('./components/CherryBlossomFall'));

// 主要 App 內容元件
function AppContent() {
    const { itineraryData, isLoading } = useItineraryData();
    const { isOnline } = usePWAStatus();
    const [isLoaded, setIsLoaded] = useState(false);
    const [showInitialOfflineToast, setShowInitialOfflineToast] = useState(!isOnline);

    // 頁面載入後標記為已載入
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true);
            // 在頁面完全載入後，如果離線，顯示 3 秒的提示然後自動關閉
            if (!isOnline) {
                setTimeout(() => {
                    setShowInitialOfflineToast(false);
                }, 3000);
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [isOnline]);

    // 監聽網路狀態變化
    useEffect(() => {
        // 當重新連線時，清除初始離線提示
        if (isOnline) {
            setShowInitialOfflineToast(false);
        }
    }, [isOnline]);

    // 簡化的離線狀態判斷邏輯
    // 只有真正離線且沒有資料時才顯示離線頁面
    const shouldShowOfflinePage = !isOnline && !itineraryData.length && !isLoading && isLoaded;

    // 離線且無資料時顯示離線頁面
    if (shouldShowOfflinePage) {
        return <OfflineFallback />;
    }

    return (
        <ErrorBoundary>
            <div>
                {/* 初始離線狀態提示 */}
                <Toast
                    show={showInitialOfflineToast}
                    type="warning"
                    position="top"
                    title="離線模式"
                    message="您目前處於離線狀態，但可以繼續瀏覽已載入的行程內容"
                    icon={
                        <svg
                            className="w-6 h-6 text-amber-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="1" y1="1" x2="23" y2="23"></line>
                            <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"></path>
                            <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"></path>
                            <path d="M10.71 5.05A16 16 0 0 1 22.58 9"></path>
                            <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"></path>
                            <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
                            <line x1="12" y1="20" x2="12.01" y2="20"></line>
                        </svg>
                    }
                />

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
    return (
        <AppProviders>
            <AppContent />
        </AppProviders>
    );
}

export default App;