// src/components/PWAManager.tsx
import { useEffect, useState } from 'react';
import { registerSW } from 'virtual:pwa-register';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * PWA 管理組件
 * 處理 Service Worker 註冊、更新提示和安裝提示
 */
const PWAManager: React.FC = () => {
    // Service Worker 相關狀態
    const [needRefresh, setNeedRefresh] = useState(false);
    const [installPrompt, setInstallPrompt] = useState<Event | null>(null);
    const [offlineReady, setOfflineReady] = useState(false);
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    // 註冊 Service Worker 自動更新
    useEffect(() => {
        // Service Worker 更新處理函數
        registerSW({
            onNeedRefresh() {
                setNeedRefresh(true);
            },
            onOfflineReady() {
                setOfflineReady(true);
                // 3秒後自動隱藏離線就緒提示
                setTimeout(() => setOfflineReady(false), 3000);
            },
        });

        // 監聽網路狀態變化
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    // 監聽安裝事件
    useEffect(() => {
        const handleBeforeInstallPrompt = (event: Event) => {
            // 阻止自動顯示安裝提示
            event.preventDefault();
            // 儲存事件以供稍後使用
            setInstallPrompt(event);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    // 處理更新
    const handleUpdate = () => {
        const updateSW = registerSW({});
        updateSW && updateSW();
        setNeedRefresh(false);
    };

    // 處理安裝
    const handleInstall = async () => {
        if (!installPrompt) return;

        // 顯示安裝提示
        (installPrompt as any).prompt();

        // 等待用戶回應
        const { outcome } = await (installPrompt as any).userChoice;
        console.log(`安裝結果: ${outcome}`);

        // 重設安裝提示狀態
        setInstallPrompt(null);
    };

    // 動畫設定
    const variants = {
        initial: { opacity: 0, y: 50 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 50 }
    };

    return (
        <>
            {/* 離線提示 */}
            <AnimatePresence>
                {!isOnline && (
                    <motion.div
                        className="fixed top-16 inset-x-0 mx-auto w-11/12 max-w-sm bg-yellow-100 border border-yellow-300 rounded-lg p-3 z-50 shadow-lg"
                        variants={variants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex items-center">
                            <svg
                                className="w-5 h-5 text-yellow-600 mr-2"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M23 8.5A10.5 10.5 0 1 0 12.5 19"></path>
                                <polyline points="23 19 23 14 18 14"></polyline>
                            </svg>
                            <span className="text-sm text-yellow-800 font-medium">
                                您目前處於離線狀態，但仍可查看行程資訊
                            </span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 更新提示 */}
            <AnimatePresence>
                {needRefresh && (
                    <motion.div
                        className="fixed bottom-4 inset-x-0 mx-auto w-11/12 max-w-sm bg-blue-100 border border-blue-300 rounded-lg p-3 z-50 shadow-lg"
                        variants={variants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <svg
                                    className="w-5 h-5 text-blue-600 mr-2"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                                    <circle cx="12" cy="13" r="4"></circle>
                                </svg>
                                <span className="text-sm text-blue-800 font-medium">
                                    有新版本可用，請更新應用
                                </span>
                            </div>
                            <button
                                onClick={handleUpdate}
                                className="text-xs bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded transition-colors"
                            >
                                更新
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 離線就緒提示 */}
            <AnimatePresence>
                {offlineReady && (
                    <motion.div
                        className="fixed bottom-4 inset-x-0 mx-auto w-11/12 max-w-sm bg-green-100 border border-green-300 rounded-lg p-3 z-50 shadow-lg"
                        variants={variants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex items-center">
                            <svg
                                className="w-5 h-5 text-green-600 mr-2"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                            <span className="text-sm text-green-800 font-medium">
                                應用已可離線使用
                            </span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 安裝提示 */}
            <AnimatePresence>
                {installPrompt && (
                    <motion.div
                        className="fixed bottom-4 inset-x-0 mx-auto w-11/12 max-w-sm bg-pink-100 border border-pink-300 rounded-lg p-3 z-50 shadow-lg"
                        variants={variants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <svg
                                    className="w-5 h-5 text-pink-600 mr-2"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M19 9l-7 7-7-7"></path>
                                </svg>
                                <span className="text-sm text-pink-800 font-medium">
                                    安裝此應用到您的裝置，方便離線查看行程
                                </span>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => setInstallPrompt(null)}
                                    className="text-xs text-pink-800 hover:text-pink-900 py-1 px-2 rounded transition-colors"
                                >
                                    稍後
                                </button>
                                <button
                                    onClick={handleInstall}
                                    className="text-xs bg-pink-500 hover:bg-pink-600 text-white py-1 px-3 rounded transition-colors"
                                >
                                    安裝
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default PWAManager;