// src/components/ErrorBoundary.tsx
import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

/**
 * 錯誤邊界元件
 * 捕獲子元件中的 JavaScript 錯誤，並顯示備用 UI
 */
class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null
    };

    public static getDerivedStateFromError(error: Error): State {
        // 更新 state，在下一次渲染時顯示備用 UI
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('錯誤邊界捕獲到錯誤:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            // 如果提供了自訂的備用 UI，則顯示它
            if (this.props.fallback) {
                return this.props.fallback;
            }

            // 否則顯示預設的錯誤訊息
            return (
                <div className="p-4 bg-pink-50 border border-pink-200 rounded-lg text-center my-4">
                    <svg className="w-10 h-10 text-pink-500 mx-auto mb-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    <h2 className="text-lg font-bold text-pink-700 mb-2">糟糕，發生了一些問題</h2>
                    <p className="text-pink-600 mb-4">應用程式遇到錯誤，請重新整理頁面或稍後再試。</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
                    >
                        重新整理頁面
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;