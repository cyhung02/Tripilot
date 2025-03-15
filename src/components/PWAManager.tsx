// src/components/PWAManager.tsx
import { useState, useEffect } from 'react';
import { usePWAStatus } from '../hooks/usePWAStatus';
import Toast from './common/Toast';
import { SakuraIcon } from './common/SvgIcons';

/**
 * PWA 管理組件 - 使用 usePWAStatus Hook
 * 只負責顯示 PWA 相關通知，不再處理狀態邏輯
 */
const PWAManager: React.FC = () => {
    // 使用 hook 獲取 PWA 狀態
    const {
        isUpdateAvailable,
        canInstall,
        updateApp,
        installApp
    } = usePWAStatus();

    // 是否顯示更新提示
    const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);

    // 是否顯示安裝提示
    const [showInstallPrompt, setShowInstallPrompt] = useState(false);

    // 離線就緒提示
    const [showOfflineReady, setShowOfflineReady] = useState(false);

    // 當有更新時，延遲顯示提示
    useEffect(() => {
        if (isUpdateAvailable) {
            // 延遲顯示更新提示，避免干擾初始體驗
            const timer = setTimeout(() => {
                setShowUpdatePrompt(true);
            }, 3000);

            return () => clearTimeout(timer);
        } else {
            setShowUpdatePrompt(false);
        }
    }, [isUpdateAvailable]);

    // 當可以安裝時，檢查是否應該顯示提示
    useEffect(() => {
        if (canInstall) {
            // 檢查是否已被用戶忽略過
            const isDismissed = sessionStorage.getItem('pwaInstallPromptDismissed') === 'true';

            if (!isDismissed) {
                // 僅在用戶未忽略的情況下顯示
                setShowInstallPrompt(true);
            }
        } else {
            setShowInstallPrompt(false);
        }
    }, [canInstall]);

    // 離線就緒顯示邏輯
    useEffect(() => {
        // 監聽自定義事件，該事件應該在 Service Worker 就緒時觸發
        const handleOfflineReady = () => {
            setShowOfflineReady(true);
            // 4秒後自動隱藏
            setTimeout(() => setShowOfflineReady(false), 4000);
        };

        window.addEventListener('pwa:offlineReady', handleOfflineReady);

        return () => {
            window.removeEventListener('pwa:offlineReady', handleOfflineReady);
        };
    }, []);

    // 處理更新按鈕點擊
    const handleUpdate = async () => {
        try {
            await updateApp();
            setShowUpdatePrompt(false);
        } catch (error) {
            console.error('更新應用失敗:', error);
        }
    };

    // 延遲更新
    const handleUpdateLater = () => {
        setShowUpdatePrompt(false);
        // 30分鐘後再次提醒
        setTimeout(() => {
            if (isUpdateAvailable) setShowUpdatePrompt(true);
        }, 30 * 60 * 1000);
    };

    // 處理安裝按鈕點擊
    const handleInstall = async () => {
        try {
            await installApp();
            setShowInstallPrompt(false);
        } catch (error) {
            console.error('安裝應用失敗:', error);
        }
    };

    // 忽略安裝提示
    const dismissInstallPrompt = () => {
        setShowInstallPrompt(false);
        // 本次會話中不再顯示
        try {
            sessionStorage.setItem('pwaInstallPromptDismissed', 'true');
        } catch (e) {
            console.error('無法存儲安裝提示狀態到 sessionStorage', e);
        }
    };

    return (
        <>
            {/* 離線就緒提示 */}
            <Toast
                show={showOfflineReady}
                type="success"
                position="top"
                title="行程已準備好離線使用"
                message="現在您可以在沒有網路連接的情況下也能查看行程資訊"
                icon={
                    <svg
                        className="w-6 h-6 text-green-500"
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
                }
            />

            {/* 更新提示 */}
            <Toast
                show={isUpdateAvailable && showUpdatePrompt}
                type="info"
                position="bottom"
                title="有可用的更新"
                message="行程資訊可能已更新，建議立即重新整理"
                icon={
                    <svg
                        className="w-6 h-6 text-blue-500"
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
                }
                actionLabel="更新"
                onAction={handleUpdate}
                secondaryActionLabel="稍後"
                onSecondaryAction={handleUpdateLater}
            />

            {/* 安裝提示 */}
            <Toast
                show={showInstallPrompt}
                type="info"
                position="bottom"
                title="將應用添加到主屏幕"
                message="安裝此應用可以快速訪問您的行程，並支援離線使用"
                icon={<SakuraIcon size={24} color="#60A5FA" />}
                actionLabel="安裝應用"
                onAction={handleInstall}
                secondaryActionLabel="不再提醒"
                onSecondaryAction={dismissInstallPrompt}
            />
        </>
    );
};

export default PWAManager;