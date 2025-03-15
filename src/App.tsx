// src/App.tsx
import { lazy, Suspense, useState, useEffect } from 'react';
import JournifyApp from './components/JournifyApp';
import { ItineraryProvider } from './context/ItineraryContext';
import PWAManager from './components/PWAManager';
import ErrorBoundary from './components/ErrorBoundary';
import OfflineFallback from './components/OfflineFallback';
import { useItinerary } from './context/ItineraryContext';

// 懶加載非關鍵組件
const CherryBlossomFall = lazy(() => import('./components/CherryBlossomFall'));

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
    const [isLoaded, setIsLoaded] = useState(false);

    // 頁面載入後標記為已載入
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    // 簡化的離線狀態判斷邏輯
    // 只有真正離線且沒有資料時才顯示離線頁面
    const shouldShowOfflinePage = !navigator.onLine && !itineraryData.length && !isLoading && isLoaded;

    // 離線且無資料時顯示離線頁面
    if (shouldShowOfflinePage) {
        return <OfflineFallback />;
    }

    return (
        <ErrorBoundary>
            <div>
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