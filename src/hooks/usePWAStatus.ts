// src/hooks/usePWAStatus.ts
import { useState, useEffect, useCallback } from 'react';

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

    // 檢查是否有 Service Worker 更新
    useEffect(() => {
        // 這裡整合 vite-plugin-pwa 提供的 registerSW 功能
        // 實際專案中可能需要使用 virtual:pwa-register

        // 簡化示範
        const checkForUpdates = () => {
            // 假設註冊 SW 並獲取更新回調的功能
            import('virtual:pwa-register').then(({ registerSW }) => {
                const updateSW = registerSW({
                    onNeedRefresh() {
                        setIsUpdateAvailable(true);
                        setUpdateCallback(() => updateSW);
                    },
                    onOfflineReady() {
                        // 離線就緒
                    },
                    onRegistered(registration) {
                        // 檢查更新
                        if (registration) {
                            setInterval(() => {
                                registration.update().catch(console.error);
                            }, 60 * 60 * 1000); // 每小時檢查一次
                        }
                    }
                });
            }).catch(console.error);
        };

        checkForUpdates();
    }, []);

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