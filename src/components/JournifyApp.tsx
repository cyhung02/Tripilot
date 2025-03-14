// src/components/JournifyApp.tsx
import { useMemo, lazy, Suspense, useState, useEffect } from 'react';
import { useItinerary } from '../context/ItineraryContext';
import DayDetail from './DayDetail';
import ErrorBoundary from './ErrorBoundary';

// 懶加載櫻花元件而不是直接導入
const CherryBlossomFall = lazy(() => import('./CherryBlossomFall'));

// 背景櫻花裝飾元件
const BackgroundDecoration = () => {
    return (
        <>
            <div className="absolute top-0 right-0 w-40 h-40 opacity-20 z-0 pointer-events-none">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50 15 C 55 10, 65 0, 70 5 C 80 10, 95 30, 90 45 C 85 60, 70 80, 50 85 C 30 80, 15 60, 10 45 C 5 30, 20 10, 30 5 C 35 0, 45 10, 50 15"
                        fill="#F9A8D4" />
                </svg>
            </div>

            <div className="absolute bottom-10 left-5 w-24 h-24 z-0 opacity-20 pointer-events-none">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50 15 C 55 10, 65 0, 70 5 C 80 10, 95 30, 90 45 C 85 60, 70 80, 50 85 C 30 80, 15 60, 10 45 C 5 30, 20 10, 30 5 C 35 0, 45 10, 50 15"
                        fill="#F9A8D4" />
                </svg>
            </div>
        </>
    );
};

// 頁面標題元件
const Header = () => {
    return (
        <header className="bg-pink-100 p-4 shadow-sm relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none overflow-hidden">
                <div className="absolute -top-10 -left-10 w-20 h-20 rotate-15">
                    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M50 15 C 55 10, 65 0, 70 5 C 80 10, 95 30, 90 45 C 85 60, 70 80, 50 85 C 30 80, 15 60, 10 45 C 5 30, 20 10, 30 5 C 35 0, 45 10, 50 15"
                            fill="#F472B6" />
                    </svg>
                </div>
                <div className="absolute top-10 right-20 w-16 h-16 rotate-45">
                    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M50 15 C 55 10, 65 0, 70 5 C 80 10, 95 30, 90 45 C 85 60, 70 80, 50 85 C 30 80, 15 60, 10 45 C 5 30, 20 10, 30 5 C 35 0, 45 10, 50 15"
                            fill="#F472B6" />
                    </svg>
                </div>
            </div>
            <div className="container mx-auto relative z-10">
                <h1 className="text-2xl md:text-3xl font-bold text-pink-800">日本關西中國地方美食與文化之旅</h1>
                <p className="text-sm md:text-base text-pink-600 font-medium">2025年3月28日至4月6日</p>
            </div>
        </header>
    );
};

// 日期導航列元件
const DateNavigation = () => {
    const { itineraryData, selectedDayIndex, setSelectedDayIndex, isToday, formatDisplayDate } = useItinerary();
    
    // 使用 useMemo 緩存導航按鈕
    const dateButtons = useMemo(() => {
        return itineraryData.map((day, index) => (
            <button
                key={index}
                onClick={() => setSelectedDayIndex(index)}
                className={`px-3 py-2 mx-1 rounded-full text-sm transition-all font-medium ${
                    selectedDayIndex === index
                        ? 'bg-pink-100 text-pink-800 font-bold shadow-sm'
                        : 'hover:bg-pink-50 text-gray-600'
                } ${
                    isToday(day.date) ? 'ring-1 ring-pink-300' : ''
                }`}
                aria-pressed={selectedDayIndex === index}
                aria-label={`${formatDisplayDate(day.date)} ${day.title}`}
            >
                <div className="flex flex-col items-center">
                    <span>{day.date}</span>
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
        <footer className="bg-pink-100 p-4 mt-8 relative">
            <div className="absolute bottom-0 right-0 w-full h-full opacity-10 pointer-events-none overflow-hidden">
                <div className="absolute bottom-2 right-10 w-16 h-16 rotate-30">
                    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M50 15 C 55 10, 65 0, 70 5 C 80 10, 95 30, 90 45 C 85 60, 70 80, 50 85 C 30 80, 15 60, 10 45 C 5 30, 20 10, 30 5 C 35 0, 45 10, 50 15"
                            fill="#F472B6" />
                    </svg>
                </div>
            </div>
            <div className="container mx-auto text-center text-pink-600 text-sm relative z-10">
                © 2025 日本關西中國地方旅遊手冊
            </div>
        </footer>
    );
};

// 主應用元件
const JournifyApp: React.FC = () => {
    // 使用 Context API 獲取狀態
    const { itineraryData, selectedDayIndex, isToday } = useItinerary();
    
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

    return (
        <div className="min-h-screen bg-pink-50 text-gray-700 font-sans relative overflow-hidden tracking-wide">
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

            {/* 日期導航列 */}
            <DateNavigation />

            {/* 主要內容區 */}
            <main className="container mx-auto p-4 z-[2]">
                <ErrorBoundary>
                    <DayDetail
                        day={itineraryData[selectedDayIndex]}
                        isToday={isToday(itineraryData[selectedDayIndex].date)}
                    />
                </ErrorBoundary>
            </main>

            {/* 頁尾 */}
            <Footer />
        </div>
    );
};

export default JournifyApp;