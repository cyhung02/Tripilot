// src/components/OfflineFallback.tsx
import { useState, useEffect } from 'react';
import { usePWAStatus } from '../hooks/usePWAStatus';
import { SakuraIcon } from './common/SvgIcons';

/**
 * 離線備用頁面元件 - 使用 usePWAStatus Hook
 * 當用戶離線且沒有快取的行程資料時顯示
 */
const OfflineFallback: React.FC = () => {
    const { isOnline } = usePWAStatus();
    const [isRetrying, setIsRetrying] = useState(false);
    const [lastOnlineTime, setLastOnlineTime] = useState<string | null>(null);

    // 獲取上次在線時間
    useEffect(() => {
        try {
            const storedTime = localStorage.getItem('lastOnlineTime');
            if (storedTime) {
                setLastOnlineTime(storedTime);
            }
        } catch (e) {
            console.error('無法獲取最後在線時間', e);
        }
    }, []);

    // 重試連接
    const handleRetry = () => {
        setIsRetrying(true);
        // 短暫延遲後重新載入頁面
        setTimeout(() => {
            window.location.reload();
        }, 800);
    };

    // 格式化時間顯示
    const formatLastOnlineTime = () => {
        if (!lastOnlineTime) return null;

        try {
            const date = new Date(lastOnlineTime);
            const options: Intl.DateTimeFormatOptions = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            };
            return new Intl.DateTimeFormat('zh-TW', options).format(date);
        } catch (e) {
            console.error('時間格式化錯誤', e);
            return null;
        }
    };

    // 當連線狀態改變時
    useEffect(() => {
        if (isOnline && isRetrying) {
            window.location.reload();
        }
    }, [isOnline, isRetrying]);

    const formattedTime = formatLastOnlineTime();

    return (
        <div className="min-h-screen bg-pink-50 text-gray-700 font-sans flex flex-col">
            {/* 頁面標題 */}
            <header className="bg-pink-100 p-4 shadow-sm relative">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none overflow-hidden">
                    <div className="absolute -top-10 -left-10 w-20 h-20" style={{ transform: 'rotate(15deg)' }}>
                        <SakuraIcon size="100%" color="#F472B6" />
                    </div>
                    <div className="absolute top-10 right-20 w-16 h-16" style={{ transform: 'rotate(45deg)' }}>
                        <SakuraIcon size="100%" color="#F472B6" />
                    </div>
                </div>
                <div className="container mx-auto relative z-10">
                    <h1 className="text-2xl md:text-3xl font-bold text-pink-800">Tripilot</h1>
                    <p className="text-sm md:text-base text-pink-600 font-medium">您的隨行旅遊指南</p>
                </div>
            </header>

            {/* 離線訊息 */}
            <main className="flex-grow flex flex-col items-center justify-center p-4">
                <div className="max-w-md w-full mx-auto bg-white p-6 rounded-lg shadow-md border border-pink-200">
                    <div className="text-center mb-6">
                        <div className="w-20 h-20 mx-auto mb-4 text-pink-400 animate-pulse">
                            <SakuraIcon size="100%" />
                        </div>

                        <h2 className="text-xl font-bold text-pink-800 mb-2">離線狀態</h2>

                        <div className="text-pink-600 space-y-2">
                            <p>您目前處於離線狀態，且尚未載入行程資料。</p>
                            <p className="text-sm">請連線至網路後再試。</p>

                            {formattedTime && (
                                <p className="text-xs text-pink-500 mt-2">
                                    上次連接時間: {formattedTime}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <button
                            onClick={handleRetry}
                            className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors flex items-center justify-center"
                            disabled={isRetrying}
                        >
                            <svg
                                className={`w-4 h-4 mr-1.5 ${isRetrying ? 'animate-spin' : ''}`}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6M21 12a9 9 0 0 1-15 6.7L3 16" />
                            </svg>
                            {isRetrying ? '重新連接中...' : '重新連接'}
                        </button>
                    </div>
                </div>
            </main>

            {/* 頁尾 */}
            <footer className="bg-pink-100 p-4 mt-auto">
                <div className="container mx-auto text-center text-pink-600 text-sm">
                    © 2025 Tripilot
                </div>
            </footer>
        </div>
    );
};

export default OfflineFallback;