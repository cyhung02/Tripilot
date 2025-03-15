// src/components/PWAManager.tsx
import { useEffect, useState, useCallback } from 'react';
import { registerSW } from 'virtual:pwa-register';
import { motion, AnimatePresence } from 'framer-motion';
import { SakuraIcon } from './common/SvgIcons';

/**
 * PWA 管理組件 - 優化版本
 * 處理 Service Worker 註冊、更新提示和安裝提示
 */
const PWAManager: React.FC = () => {
    // Service Worker 相關狀態
    const [needRefresh, setNeedRefresh] = useState(false);
    const [installPrompt, setInstallPrompt] = useState<Event | null>(null);
    const [offlineReady, setOfflineReady] = useState(false);
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [updateSW, setUpdateSW] = useState<(() => Promise<void>) | null>(null);

    // 延遲更新提示，避免頁面載入後立即顯示干擾用戶
    const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);

    // 是否顯示安裝提示計數器（用於控制不頻繁顯示安裝提示）
    const [installPromptCounter, setInstallPromptCounter] = useState(0);

    // 註冊 Service Worker 自動更新
    useEffect(() => {
        // Service Worker 更新處理函數
        const swUpdater = registerSW({
            onNeedRefresh() {
                setNeedRefresh(true);
                // 延遲 3 秒顯示更新提示，避免干擾初始加載體驗
                setTimeout(() => setShowUpdatePrompt(true), 3000);
            },
            onOfflineReady() {
                setOfflineReady(true);
                // 4秒後自動隱藏離線就緒提示
                setTimeout(() => setOfflineReady(false), 4000);
            },
            onRegisteredSW(swUrl, registration) {
                // 記錄註冊信息，方便調試
                console.info('SW 已註冊:', swUrl, registration);
            },
            onRegisterError(error) {
                console.error('SW 註冊失敗:', error);
            }
        });

        setUpdateSW(() => swUpdater);

        // 監聽網路狀態變化
        const handleOnline = () => {
            setIsOnline(true);
            // 嘗試檢查更新
            if (registration && registration.waiting) {
                console.info('恢復在線後檢查更新');
                registration.update().catch(console.error);
            }
        };
        const handleOffline = () => setIsOnline(false);

        let registration: ServiceWorkerRegistration | null | undefined = null;

        // 取得當前 SW 註冊
        navigator.serviceWorker?.getRegistration().then(reg => {
            registration = reg || null; // 明確處理 undefined
        }).catch(console.error);

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

            // 增加計數器，用於控制安裝提示顯示頻率
            setInstallPromptCounter(prev => prev + 1);

            // 將事件存入 sessionStorage，以便跨頁面保持提示
            try {
                sessionStorage.setItem('pwaInstallPrompt', 'available');
            } catch (e) {
                console.error('無法存儲安裝狀態到 sessionStorage', e);
            }
        };

        // 檢查 sessionStorage 中是否有之前保存的安裝提示狀態
        try {
            const savedPrompt = sessionStorage.getItem('pwaInstallPrompt');
            if (savedPrompt === 'available' && installPromptCounter === 0) {
                setInstallPromptCounter(1); // 有之前保存的狀態，顯示安裝提示
            }
        } catch (e) {
            console.error('無法讀取 sessionStorage', e);
        }

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        // 安裝完成事件處理
        const handleAppInstalled = () => {
            // 清除安裝提示狀態
            setInstallPrompt(null);
            try {
                sessionStorage.removeItem('pwaInstallPrompt');
            } catch (e) {
                console.error('無法從 sessionStorage 移除安裝狀態', e);
            }

            // 顯示安裝成功提示
            showInstallSuccessToast();
        };

        window.addEventListener('appinstalled', handleAppInstalled);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
            window.removeEventListener('appinstalled', handleAppInstalled);
        };
    }, [installPromptCounter]);

    // 處理更新
    const handleUpdate = useCallback(() => {
        if (updateSW) {
            updateSW().catch(err => {
                console.error('更新 Service Worker 時出錯:', err);
            });
        }
        setNeedRefresh(false);
        setShowUpdatePrompt(false);
    }, [updateSW]);

    // 稍後提醒更新
    const handleUpdateLater = useCallback(() => {
        setShowUpdatePrompt(false);
        // 30分鐘後再次提醒
        setTimeout(() => {
            if (needRefresh) setShowUpdatePrompt(true);
        }, 30 * 60 * 1000);
    }, [needRefresh]);

    // 處理安裝
    const handleInstall = useCallback(async () => {
        if (!installPrompt) return;

        try {
            // 顯示安裝提示
            (installPrompt as any).prompt();

            // 等待用戶回應
            const { outcome } = await (installPrompt as any).userChoice;
            console.info(`安裝結果: ${outcome}`);

            // 重設安裝提示狀態
            if (outcome === 'accepted') {
                setInstallPrompt(null);
                try {
                    sessionStorage.removeItem('pwaInstallPrompt');
                } catch (e) {
                    console.error('無法從 sessionStorage 移除安裝狀態', e);
                }
            }
        } catch (error) {
            console.error('安裝過程中出錯:', error);
        }
    }, [installPrompt]);

    // 關閉安裝提示
    const dismissInstallPrompt = useCallback(() => {
        setInstallPrompt(null);
        // 本次會話中不再顯示安裝提示
        try {
            sessionStorage.setItem('pwaInstallPromptDismissed', 'true');
        } catch (e) {
            console.error('無法存儲安裝提示狀態到 sessionStorage', e);
        }
    }, []);

    // 顯示安裝成功提示
    const showInstallSuccessToast = () => {
        // 這裡可以實現安裝成功後的提示，比如使用 toast 通知
        // 目前只在控制台輸出信息
        console.info('應用安裝成功！');
    };

    // 檢查是否應該顯示安裝提示
    const shouldShowInstallPrompt = installPrompt &&
        (installPromptCounter === 1 || installPromptCounter % 5 === 0) && // 第一次和之後每隔 5 次頁面訪問顯示一次
        !sessionStorage.getItem('pwaInstallPromptDismissed'); // 檢查是否被用戶關閉

    // 動畫設定
    const toastVariants = {
        initial: { opacity: 0, y: 20, scale: 0.95 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: -20, scale: 0.95 }
    };

    // 主要提示容器樣式
    const toastContainerStyle = "fixed inset-x-0 mx-auto w-11/12 max-w-sm p-4 rounded-lg shadow-lg z-50 border";

    return (
        <>
            {/* 離線提示 */}
            <AnimatePresence>
                {!isOnline && (
                    <motion.div
                        className={`${toastContainerStyle} bottom-16 bg-amber-50 border-amber-200`}
                        variants={toastVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex items-center">
                            <div className="mr-3 text-amber-500">
                                <svg
                                    className="w-6 h-6"
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
                            </div>
                            <div>
                                <h3 className="font-medium text-amber-800">您目前處於離線狀態</h3>
                                <p className="text-sm text-amber-700">
                                    行程資訊已存儲在您的裝置上，您仍可繼續使用本應用
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 離線就緒提示 */}
            <AnimatePresence>
                {offlineReady && (
                    <motion.div
                        className={`${toastContainerStyle} top-20 bg-green-50 border-green-200`}
                        variants={toastVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex items-center">
                            <div className="mr-3 text-green-500">
                                <svg
                                    className="w-6 h-6"
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
                            </div>
                            <div>
                                <h3 className="font-medium text-green-800">行程已準備好離線使用</h3>
                                <p className="text-sm text-green-700">
                                    現在您可以在沒有網路連接的情況下也能查看行程資訊
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 更新提示 */}
            <AnimatePresence>
                {needRefresh && showUpdatePrompt && (
                    <motion.div
                        className={`${toastContainerStyle} bottom-4 bg-blue-50 border-blue-200`}
                        variants={toastVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-start mr-2">
                                <div className="mr-3 text-blue-500 mt-1">
                                    <svg
                                        className="w-6 h-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-medium text-blue-800">有可用的更新</h3>
                                    <p className="text-sm text-blue-600">
                                        行程資訊可能已更新，建議立即重新整理
                                    </p>
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={handleUpdateLater}
                                    className="text-xs text-blue-700 hover:text-blue-900 py-1 px-2 rounded transition-colors"
                                >
                                    稍後
                                </button>
                                <button
                                    onClick={handleUpdate}
                                    className="text-xs bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded transition-colors"
                                >
                                    更新
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 安裝提示 - 改進版 */}
            <AnimatePresence>
                {shouldShowInstallPrompt && (
                    <motion.div
                        className={`fixed bottom-4 inset-x-0 mx-auto max-w-sm rounded-lg overflow-hidden shadow-xl z-50 bg-pink-50 border border-pink-200`}
                        variants={toastVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                    >
                        <div className="p-1 bg-gradient-to-r from-pink-200 to-pink-100"></div>
                        <div className="p-4">
                            <div className="flex items-center mb-3">
                                <div className="w-10 h-10 mr-3">
                                    <SakuraIcon size="100%" color="#F472B6" />
                                </div>
                                <h3 className="text-lg font-bold text-pink-800">將應用添加到主屏幕</h3>
                            </div>

                            <p className="text-sm text-pink-700 mb-4">
                                安裝此應用可以快速訪問您的行程，並支援離線使用，提供更好的體驗
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-end gap-2">
                                <button
                                    onClick={dismissInstallPrompt}
                                    className="text-sm text-pink-700 hover:text-pink-900 py-1.5 px-3 rounded transition-colors w-full sm:w-auto"
                                >
                                    不再提醒
                                </button>
                                <button
                                    onClick={handleInstall}
                                    className="text-sm bg-pink-500 hover:bg-pink-600 text-white py-1.5 px-4 rounded-md transition-colors w-full sm:w-auto flex items-center justify-center"
                                >
                                    <svg
                                        className="w-4 h-4 mr-1.5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                        <polyline points="7 10 12 15 17 10" />
                                        <line x1="12" y1="15" x2="12" y2="3" />
                                    </svg>
                                    安裝應用
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