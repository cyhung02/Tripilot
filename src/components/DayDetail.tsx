import { motion } from 'framer-motion';
import { DayInfo } from '../data/types';
import ItineraryItemCard from './ItineraryItemCard';
import RecommendationSection from './RecommendationSection';
import AccommodationInfo from './AccommodationInfo';
import { useItinerary } from '../context/ItineraryContext';

interface DayDetailProps {
    day: DayInfo;
    isToday: boolean;
}

const DayDetail: React.FC<DayDetailProps> = ({ day, isToday }) => {
    // 使用 Context 中的展開狀態
    const { expandedItems, setExpandedItems } = useItinerary();

    // 切換展開狀態
    const toggleExpand = (id: string) => {
        setExpandedItems(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    return (
        <div>
            {/* 日期標題 */}
            <div className="mb-6">
                <div className="flex items-center">
                    <h2 className="text-2xl font-medium text-pink-800 flex items-center">
                        {day.title}
                        <svg className="w-5 h-5 ml-2 text-pink-400" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M50 15 C 55 10, 65 0, 70 5 C 80 10, 95 30, 90 45 C 85 60, 70 80, 50 85 C 30 80, 15 60, 10 45 C 5 30, 20 10, 30 5 C 35 0, 45 10, 50 15"
                                fill="currentColor" />
                        </svg>
                    </h2>
                    {isToday && (
                        <span className="ml-3 bg-pink-200 text-pink-800 text-xs px-2 py-1 rounded-full">
                            今日行程
                        </span>
                    )}
                </div>
                <p className="text-pink-600">{day.date} {day.day}</p>

                {/* 針對宮島行程顯示潮汐時間 */}
                {day.title === '神秘宮島之旅' && (
                    <div className="mt-3 p-3 bg-pink-100 rounded-lg border border-pink-200">
                        <p className="text-sm flex items-center text-pink-800">
                            <svg className="w-4 h-4 mr-2 text-pink-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 12H3M12 3v18M3 16l18-8M3 8l18 8M8 3l8 18M16 3L8 21"></path>
                            </svg>
                            今日潮汐時間: 請事先查詢，以便安排大鳥居觀賞的最佳時機
                        </p>
                    </div>
                )}
            </div>

            {/* 時間軸 */}
            <div className="relative mb-8 pl-2 border-l-2 border-pink-200">
                {day.itinerary.map((item, index) => (
                    <ItineraryItemCard
                        key={index}
                        item={item}
                        index={index}
                        isExpanded={expandedItems[`itinerary-${index}`] ?? false}
                        toggleExpand={() => toggleExpand(`itinerary-${index}`)}
                    />
                ))}
            </div>

            {/* 美食推薦 */}
            {day.foodRecommendations && day.foodRecommendations.length > 0 && (
                <RecommendationSection
                    title="美食推薦"
                    items={day.foodRecommendations}
                    iconType="food"
                />
            )}

            {/* 購物推薦 */}
            {day.shoppingRecommendations && day.shoppingRecommendations.length > 0 && (
                <RecommendationSection
                    title="購物推薦"
                    items={day.shoppingRecommendations}
                    iconType="shopping"
                />
            )}

            {/* 住宿資訊 */}
            {day.accommodation && (
                <AccommodationInfo
                    accommodation={day.accommodation}
                />
            )}

            {/* 回到頂部按鈕 - 僅在頁面滾動時顯示 */}
            <motion.button
                className="fixed bottom-6 right-6 bg-pink-500 text-white w-10 h-10 rounded-full shadow-md flex items-center justify-center z-30"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="回到頂部"
            >
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 19V5M5 12l7-7 7 7" />
                </svg>
            </motion.button>
        </div>
    );
};

export default DayDetail;