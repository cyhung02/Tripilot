// src/components/OfflineFallback.tsx
import { useEffect, useState } from 'react';
import { SakuraIcon } from './common/SvgIcons';

/**
 * 離線備用頁面組件 - 優化版
 * 當用戶離線且訪問未快取的頁面時顯示
 */
const OfflineFallback: React.FC = () => {
    const [lastOnlineTime, setLastOnlineTime] = useState<string>('');
    const [retryCount, setRetryCount] = useState(0);

    // 嘗試獲取最後在線時間
    useEffect(() => {
        try {
            const storedTime = localStorage.getItem('lastOnlineTime');
            if (storedTime) {
                // 格式化時間顯示
                const date = new Date(storedTime);
                const formattedTime = new Intl.DateTimeFormat('zh-TW', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                }).format(date);
                setLastOnlineTime(formattedTime);
            }
        } catch (error) {
            console.error('無法獲取最後在線時間', error);
        }
    }, []);

    // 重試連接
    const handleRetry = () => {
        setRetryCount(prev => prev + 1);
        window.location.reload();
    };

    // 返回首頁
    const handleBackHome = () => {
        window.location.href = '/';
    };

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
                    <h1 className="text-2xl md:text-3xl font-bold text-pink-800">日本關西中國地方旅遊手冊</h1>
                    <p className="text-sm md:text-base text-pink-600 font-medium">2025年3月28日至4月6日</p>
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
                            <p>您目前處於離線狀態，無法載入此頁面。</p>
                            {lastOnlineTime && (
                                <p className="text-sm text-pink-500">
                                    您上次連接網路的時間: {lastOnlineTime}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-center gap-3 mt-8">
                        <button
                            onClick={handleBackHome}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                            返回首頁
                        </button>
                        <button
                            onClick={handleRetry}
                            className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors flex items-center justify-center"
                        >
                            <svg
                                className={`w-4 h-4 mr-1.5 ${retryCount > 0 ? 'animate-spin' : ''}`}
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
                            重新連接
                        </button>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                        <h3 className="text-sm font-medium text-yellow-800 mb-1 flex items-center">
                            <svg className="w-4 h-4 mr-1.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="8" x2="12" y2="12"></line>
                                <line x1="12" y1="16" x2="12.01" y2="16"></line>
                            </svg>
                            小提示
                        </h3>
                        <p className="text-xs text-yellow-700">
                            您可以安裝此應用到您的裝置上，以便在離線狀態下查看已訪問過的頁面。首頁和主要行程頁面已經可以離線瀏覽。
                        </p>
                    </div>
                </div>
            </main>

            {/* 頁尾 */}
            <footer className="bg-pink-100 p-4 mt-auto">
                <div className="container mx-auto text-center text-pink-600 text-sm">
                    © 2025 日本關西中國地方旅遊手冊
                </div>
            </footer>
        </div>
    );
};

export default OfflineFallback;