import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useItinerary } from '../context/ItineraryContext';
import DayDetail from './DayDetail';

interface CherryBlossomStyle {
    id: number;
    size: number;
    top: number;
    left: number;
    color: string;
}

const CherryBlossom: React.FC<{ style: CherryBlossomStyle }> = ({ style }) => {
    return (
        <motion.div
            className="absolute opacity-70 pointer-events-none z-0"
            style={style}
            animate={{
                y: [style.top, window.innerHeight + 100],
                x: [style.left, style.left + (Math.random() * 150 - 75)],
                rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
            }}
            transition={{
                duration: 10 + Math.random() * 20,
                ease: "linear",
                repeat: Infinity,
                delay: Math.random() * 5,
            }}
        >
            <svg width={style.size} height={style.size} viewBox="0 0 100 100" fill="none">
                <path d="M 51 18 C 45 15 35 10 30 20 C 25 30 19 45 23 60 C 27 76 35 85 50 95 C 65 85 75 75 77 59 C 78 44 75 30 70 20 C 65 10 55 15 51 18 Z"
                    fill={style.color}
                    stroke={style.color}
                    strokeWidth="1" />
            </svg>
        </motion.div>
    );
};

const CherryBlossomFall: React.FC = () => {
    // 明確定義 petals 的類型
    const [petals, setPetals] = useState<CherryBlossomStyle[]>([]);

    useEffect(() => {
        // 根據設備性能調整花瓣數量
        const isMobile = window.innerWidth < 768;
        const numberOfPetals = isMobile ? 12 : 25; // 移動裝置減少花瓣數量

        const colors = ["#FBCFE8", "#F9A8D4", "#F472B6", "#FDF2F8"]; // 多種粉色調
        const MAX_PETAL_SIZE = 20; // 最大尺寸限制

        const newPetals: CherryBlossomStyle[] = Array.from({ length: numberOfPetals }).map((_, i) => ({
            id: i,
            size: Math.min(
                15 + Math.random() * 5,
                MAX_PETAL_SIZE
            ),
            top: -100 - Math.random() * 500, // 開始位置在螢幕上方
            left: Math.random() * window.innerWidth, // 隨機水平位置
            color: colors[Math.floor(Math.random() * colors.length)], // 隨機顏色
        }));

        setPetals(newPetals);

        // 清理函數
        return () => {
            setPetals([]);
        };
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
            {petals.map(petal => (
                <CherryBlossom key={petal.id} style={petal} />
            ))}
        </div>
    );
};

// 主應用元件
const TravelApp: React.FC = () => {
    // 使用 Context API 獲取狀態
    const {
        itineraryData,
        selectedDayIndex,
        setSelectedDayIndex,
        isToday
    } = useItinerary();

    return (
        <div className="min-h-screen bg-pink-50 text-gray-700 font-sans relative overflow-hidden tracking-wide">
            {/* 櫻花花瓣飄落動畫 */}
            <CherryBlossomFall />

            {/* 背景櫻花裝飾 */}
            <div className="absolute top-0 right-0 w-40 h-40 opacity-20 pointer-events-none">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50 15 C 55 10, 65 0, 70 5 C 80 10, 95 30, 90 45 C 85 60, 70 80, 50 85 C 30 80, 15 60, 10 45 C 5 30, 20 10, 30 5 C 35 0, 45 10, 50 15"
                        fill="#F9A8D4" />
                </svg>
            </div>

            <div className="absolute bottom-10 left-5 w-24 h-24 opacity-20 pointer-events-none">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50 15 C 55 10, 65 0, 70 5 C 80 10, 95 30, 90 45 C 85 60, 70 80, 50 85 C 30 80, 15 60, 10 45 C 5 30, 20 10, 30 5 C 35 0, 45 10, 50 15"
                        fill="#F9A8D4" />
                </svg>
            </div>

            {/* 頁面標題 */}
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

            {/* 日期導航列 */}
            <div className="bg-white border-b border-pink-100 sticky top-0 z-20 shadow-sm">
                <div className="container mx-auto overflow-x-auto">
                    <div className="flex whitespace-nowrap py-2 px-4">
                        {itineraryData.map((day, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedDayIndex(index)}
                                className={`px-3 py-2 mx-1 rounded-full text-sm transition-all font-medium ${selectedDayIndex === index
                                    ? 'bg-pink-100 text-pink-800 font-bold shadow-sm'
                                    : 'hover:bg-pink-50 text-gray-600'
                                    } ${isToday(day.date) ? 'ring-1 ring-pink-300' : ''
                                    }`}
                                aria-pressed={selectedDayIndex === index}
                                aria-label={`${day.date} ${day.day} ${day.title}`}
                            >
                                <div className="flex flex-col items-center">
                                    <span>{day.date}</span>
                                    <span className="text-xs font-medium">{day.day}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* 主要內容區 */}
            <main className="container mx-auto p-4">
                <DayDetail
                    day={itineraryData[selectedDayIndex]}
                    isToday={isToday(itineraryData[selectedDayIndex].date)}
                />
            </main>

            {/* 頁尾 */}
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
        </div>
    );
};

export default TravelApp;