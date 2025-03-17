// src/hooks/usePWAStatus.ts
import { useState, useEffect, useCallback } from 'react';
import { registerSW } from 'virtual:pwa-register';

interface UsePWAStatusReturn {
    isOnline: boolean;
    isStandalone: boolean; // 是否已安裝為獨立應用
    isUpdateAvailable: boolean;
    canInstall: boolean;
    updateApp: () => Promise<void>;
    installApp: () => Promise<void>;
}

export function usePWAStatus(): UsePWAStatusReturn {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [isStandalone, setIsStandalone] = useState(false);
    const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);
    const [canInstall, setCanInstall] = useState(false);
    const [updateCallback, setUpdateCallback] = useState<(() => Promise<void>) | null>(null);
    const [installPrompt, setInstallPrompt] = useState<any>(null);

    // 檢查是否以 PWA 模式運行
    useEffect(() => {
        const checkStandalone = () => {
            const isStandalone =
                window.matchMedia('(display-mode: standalone)').matches ||
                (window.navigator as any).standalone ||
                document.referrer.includes('android-app://');

            setIsStandalone(isStandalone);
        };

        checkStandalone();

        // 監聽可能的顯示模式變化
        const mediaQuery = window.matchMedia('(display-mode: standalone)');
        const handleChange = (e: MediaQueryListEvent) => setIsStandalone(e.matches);

        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handleChange);
            return () => mediaQuery.removeEventListener('change', handleChange);
        } else {
            // 舊版瀏覽器支援
            mediaQuery.addListener(handleChange);
            return () => mediaQuery.removeListener(handleChange);
        }
    }, []);

    // 處理網路狀態變化
    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    // 處理安裝提示
    useEffect(() => {
        const handleBeforeInstallPrompt = (event: Event) => {
            event.preventDefault();
            setInstallPrompt(event);
            setCanInstall(true);
        };

        const handleAppInstalled = () => {
            setCanInstall(false);
            setInstallPrompt(null);
            setIsStandalone(true);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        window.addEventListener('appinstalled', handleAppInstalled);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
            window.removeEventListener('appinstalled', handleAppInstalled);
        };
    }, []);

    // 檢查是否有 Service Worker 更新並自動應用
    useEffect(() => {
        try {
            // 註冊 PWA 並處理更新
            const updateSW = registerSW({
                onNeedRefresh() {
                    // 檢測到新版本時自動更新
                    console.log("發現新版本，正在自動更新...");
                    // 仍設置狀態，以便其他組件可能使用
                    setIsUpdateAvailable(true);

                    // 立即執行更新
                    updateSW()
                        .then(() => {
                            console.log("更新已成功應用");
                            setIsUpdateAvailable(false);
                            // 觸發自定義事件通知應用已更新
                            window.dispatchEvent(new CustomEvent('pwa:update-applied'));
                        })
                        .catch((error) => {
                            console.error("自動更新失敗:", error);
                            // 保持更新可用狀態，以便用戶可以手動更新
                            setUpdateCallback(() => updateSW);
                        });
                },
                onOfflineReady() {
                    // 離線就緒
                    window.dispatchEvent(new CustomEvent('pwa:offline-ready'));
                },
                onRegistered(registration) {
                    // 檢查更新
                    if (registration) {
                        // 設置定期檢查 - 每小時檢查一次更新
                        setInterval(() => {
                            console.log("檢查 Service Worker 更新...");
                            registration.update().catch(console.error);
                        }, 60 * 60 * 1000); // 每小時檢查一次
                    }
                },
                onRegisterError(error) {
                    console.error("Service Worker 註冊錯誤:", error);
                }
            });

            // 保存回調以防需要手動更新
            setUpdateCallback(() => updateSW);
        } catch (error) {
            console.error("設置 PWA 更新邏輯時出錯:", error);
        }
    }, []);

    // 手動更新方法 - 雖然現在主要是自動更新，但保留此方法以備用戶需要手動操作
    const updateApp = useCallback(async () => {
        if (updateCallback) {
            try {
                await updateCallback();
                setIsUpdateAvailable(false);
                return Promise.resolve();
            } catch (error) {
                console.error('更新失敗:', error);
                return Promise.reject(error);
            }
        }
        return Promise.resolve();
    }, [updateCallback]);

    // 安裝應用
    const installApp = useCallback(async () => {
        if (installPrompt) {
            try {
                installPrompt.prompt();
                const result = await installPrompt.userChoice;

                if (result.outcome === 'accepted') {
                    setCanInstall(false);
                    return Promise.resolve();
                }
                return Promise.reject(new Error('用戶拒絕安裝'));
            } catch (error) {
                console.error('安裝失敗:', error);
                return Promise.reject(error);
            }
        }
        return Promise.reject(new Error('無法安裝'));
    }, [installPrompt]);

    return {
        isOnline,
        isStandalone,
        isUpdateAvailable,
        canInstall,
        updateApp,
        installApp
    };
}