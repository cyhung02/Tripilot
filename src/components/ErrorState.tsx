// src/components/ErrorState.tsx

interface ErrorStateProps {
    message: string;
}

/**
 * 錯誤狀態元件
 * 顯示錯誤訊息並提供重新載入按鈕
 */
const ErrorState: React.FC<ErrorStateProps> = ({ message }) => {
    return (
        <div className="container mx-auto p-8 text-center">
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6 max-w-lg mx-auto">
                <svg
                    className="w-12 h-12 text-red-500 mx-auto mb-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <h2 className="text-xl font-bold text-red-700 mb-3">載入行程資料時發生錯誤</h2>
                <p className="text-red-600 mb-4">{message}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                    重新載入
                </button>
            </div>
        </div>
    );
};

export default ErrorState;