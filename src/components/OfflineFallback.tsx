// src/components/OfflineFallback.tsx
import React from 'react';
import { SakuraIcon } from './common/SvgIcons';

/**
 * 離線時的回退頁面組件
 * 當用戶離線且訪問未快取的頁面時顯示
 */
const OfflineFallback: React.FC = () => {
    return (
        <div className="min-h-screen bg-pink-50 text-gray-700 font-sans flex flex-col">
            {/* 頁面標題 */}
            <header className="bg-pink-100 p-4 shadow-sm relative">
                <div className="container mx-auto relative z-10">
                    <h1 className="text-2xl md:text-3xl font-bold text-pink-800">日本關西中國地方旅遊手冊</h1>
                    <p className="text-sm md:text-base text-pink-600 font-medium">2025年3月28日至4月6日</p>
                </div>
            </header>

            {/* 離線訊息 */}
            <main className="flex-grow flex flex-col items-center justify-center p-4">
                <div className="text-center max-w-lg mx-auto bg-white p-6 rounded-lg shadow-sm border border-pink-200">
                    <div className="w-20 h-20 mx-auto mb-4 text-pink-400">
                        <SakuraIcon size="100%" />
                    </div>

                    <h2 className="text-xl font-bold text-pink-800 mb-2">您目前處於離線狀態</h2>

                    <p className="mb-4 text-pink-600">
                        這個頁面尚未在您的裝置上快取。
                        請在網路連線時重新訪問以便離線使用。
                    </p>

                    <div className="flex justify-center">
                        <button
                            onClick={() => window.location.href = '/'}
                            className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
                        >
                            返回首頁
                        </button>
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