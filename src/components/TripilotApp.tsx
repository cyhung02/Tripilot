// src/components/JournifyApp.tsx
import { useMemo, lazy, Suspense, useState, useEffect } from 'react';
import { useUIState } from '../context/UIStateContext';
import { useItineraryData } from '../context/DataContext';
import { useFormatter } from '../context/FormatterContext';
import { usePWAStatus } from '../hooks/usePWAStatus';
import DayDetail from './DayDetail';
import ErrorBoundary from './ErrorBoundary';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';
import { SakuraIcon } from './common/SvgIcons';

// 懶加載櫻花元件
const CherryBlossomFall = lazy(() => import('./CherryBlossomFall'));

// 背景櫻花裝飾元件
const BackgroundDecoration = () => {
    return (
        <>
            <div className="absolute top-0 right-0 w-40 h-40 opacity-20 z-0 pointer-events-none">
                <SakuraIcon size="100%" color="#F9A8D4" />
            </div>

            <div className="absolute bottom-10 left-5 w-24 h-24 z-0 opacity-20 pointer-events-none">
                <SakuraIcon size="100%" color="#F9A8D4" />
            </div>
        </>
    );
};

// 頁面標題元件
const Header = () => {
    return (
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
                <h1 className="text-2xl md:text-3xl font-bold text-pink-800">Tripilot</h1>
                <p className="text-sm md:text-base text-pink-600 font-medium">您的隨行旅遊指南</p>
            </div>
        </header>
    );
};

// 日期導航列元件
const DateNavigation = () => {
    // 使用分離後的 Context
    const { itineraryData } = useItineraryData();
    const { selectedDayIndex, setSelectedDayIndex, isToday } = useUIState();
    const { formatDisplayDate } = useFormatter();

    // 使用 useMemo 緩存導航按鈕
    const dateButtons = useMemo(() => {
        return itineraryData.map((day, index) => (
            <button
                key={index}
                onClick={() => setSelectedDayIndex(index)}
                className={`px-3 py-2 mx-1 rounded-full text-sm transition-all font-medium ${selectedDayIndex === index
                    ? 'bg-pink-100 text-pink-800 font-bold shadow-sm'
                    : 'hover:bg-pink-50 text-gray-600'
                    } ${isToday(day.date) ? 'ring-1 ring-pink-300' : ''
                    }`}
                aria-pressed={selectedDayIndex === index}
                aria-label={`${formatDisplayDate(day.date)} ${day.title}`}
            >
                <div className="flex flex-col items-center">
                    <span>{formatDisplayDate(day.date)}</span>
                    <span className="text-xs font-medium">{day.day}</span>
                </div>
            </button>
        ));
    }, [itineraryData, selectedDayIndex, setSelectedDayIndex, isToday, formatDisplayDate]);

    return (
        <div className="bg-white border-b border-pink-100 sticky top-0 z-20 shadow-sm">
            <div className="container mx-auto overflow-x-auto">
                <div className="flex whitespace-nowrap py-2 px-4">
                    {dateButtons}
                </div>
            </div>
        </div>
    );
};

// 頁尾元件
const Footer = () => {
    return (
        <footer className="bg-pink-100 p-4 mt-auto relative">
            <div className="absolute bottom-0 right-0 w-full h-full opacity-10 pointer-events-none overflow-hidden">
                <div className="absolute bottom-2 right-10 w-16 h-16" style={{ transform: 'rotate(30deg)' }}>
                    <SakuraIcon size="100%" color="#F472B6" />
                </div>
            </div>
            <div className="container mx-auto text-center text-pink-600 text-sm relative z-10">
                © 2025 Tripilot
            </div>
        </footer>
    );
};

// 無資料狀態元件
const EmptyState = () => {
    const { isOnline } = usePWAStatus();

    return (
        <div className="container mx-auto p-8 text-center">
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6 max-w-lg mx-auto">
                <svg
                    className="w-12 h-12 text-yellow-500 mx-auto mb-4"
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
                <h2 className="text-xl font-bold text-yellow-700 mb-3">無行程資料</h2>
                <p className="text-yellow-600 mb-4">
                    {isOnline
                        ? "沒有找到任何行程資料。"
                        : "您處於離線狀態，且尚未載入任何行程資料。"}
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                >
                    重新載入
                </button>
            </div>
        </div>
    );
};

// 主應用元件
const JournifyApp: React.FC = () => {
    // 使用分離後的 Context
    const { itineraryData, isLoading, error } = useItineraryData();
    const { selectedDayIndex, isToday } = useUIState();

    // 新增狀態控制何時顯示櫻花效果
    const [showEffects, setShowEffects] = useState(false);

    // 在頁面主要內容載入後延遲顯示效果
    useEffect(() => {
        // 設定一個短暫延遲，讓主要內容先載入
        const timer = setTimeout(() => {
            setShowEffects(true);
        }, 1200); // 延遲1.2秒後載入

        return () => clearTimeout(timer);
    }, []);

    // 渲染不同狀態
    const renderContent = () => {
        // 載入中狀態
        if (isLoading) {
            return <LoadingState />;
        }

        // 錯誤狀態
        if (error) {
            return <ErrorState message={error} />;
        }

        // 無資料狀態
        if (itineraryData.length === 0) {
            return <EmptyState />;
        }

        // 正常顯示行程
        return (
            <main className="container mx-auto p-4 z-[2] flex-grow">
                <ErrorBoundary>
                    <DayDetail
                        day={itineraryData[selectedDayIndex]}
                        isToday={isToday(itineraryData[selectedDayIndex].date)}
                    />
                </ErrorBoundary>
            </main>
        );
    };

    return (
        <div className="min-h-screen bg-pink-50 text-gray-700 font-sans relative overflow-hidden tracking-wide flex flex-col">
            {/* 背景櫻花裝飾 */}
            <BackgroundDecoration />

            {/* 條件式載入櫻花花瓣飄落動畫 */}
            {showEffects && (
                <Suspense fallback={null}>
                    <CherryBlossomFall />
                </Suspense>
            )}

            {/* 頁面標題 */}
            <Header />

            {/* 日期導航列 - 僅在有資料且沒有錯誤時顯示 */}
            {!isLoading && !error && itineraryData.length > 0 && <DateNavigation />}

            {/* 主要內容區 */}
            {renderContent()}

            {/* 頁尾 */}
            <Footer />
        </div>
    );
};

export default JournifyApp;