// src/components/PWAManager.tsx
import { useState, useEffect } from 'react';
import { usePWAStatus } from '../hooks/usePWAStatus';
import Toast from './common/Toast';
import { SakuraIcon } from './common/SvgIcons';

/**
 * PWA 管理組件 - 使用 usePWAStatus Hook
 * 顯示 PWA 相關通知和提示，不再處理狀態邏輯
 */
const PWAManager: React.FC = () => {
    // 使用 hook 獲取 PWA 狀態
    const {
        isOnline,
        isStandalone,
        canInstall,
        installApp
    } = usePWAStatus();

    // 是否顯示更新通知
    const [showUpdateNotification, setShowUpdateNotification] = useState(false);

    // 是否顯示安裝提示
    const [showInstallPrompt, setShowInstallPrompt] = useState(false);

    // 離線就緒提示
    const [showOfflineReady, setShowOfflineReady] = useState(false);

    // 監聽更新已應用事件
    useEffect(() => {
        const handleUpdateApplied = () => {
            setShowUpdateNotification(true);
            // 5秒後自動隱藏通知
            setTimeout(() => setShowUpdateNotification(false), 5000);
        };

        window.addEventListener('pwa:update-applied', handleUpdateApplied);

        return () => {
            window.removeEventListener('pwa:update-applied', handleUpdateApplied);
        };
    }, []);

    // 離線就緒事件監聽
    useEffect(() => {
        const handleOfflineReady = () => {
            setShowOfflineReady(true);
            // 4秒後自動隱藏
            setTimeout(() => setShowOfflineReady(false), 4000);
        };

        window.addEventListener('pwa:offline-ready', handleOfflineReady);

        return () => {
            window.removeEventListener('pwa:offline-ready', handleOfflineReady);
        };
    }, []);

    // 處理安裝提示顯示邏輯
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

            {/* 更新已應用通知 */}
            <Toast
                show={showUpdateNotification}
                type="success"
                position="top"
                title="行程資訊已更新"
                message="系統已自動更新到最新版本的行程資訊"
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

            {/* 離線狀態提示 - 僅當剛剛離線時顯示 */}
            <Toast
                show={!isOnline && !isStandalone}
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
        </>
    );
};

export default PWAManager;