import { motion } from 'framer-motion';
import { DayInfo } from '../data/types';
import ItineraryItemCard from './ItineraryItemCard';
import RecommendationSection from './RecommendationSection';
import AccommodationInfo from './AccommodationInfo';
import { useUIState } from '../context/UIStateContext';
import { ArrowUpIcon, SakuraIcon } from './common/SvgIcons';
import { formatDisplayDate } from '../utils/dateUtils';

interface DayDetailProps {
    day: DayInfo;
    isToday: boolean;
}

const DayDetail: React.FC<DayDetailProps> = ({ day, isToday }) => {
    // 使用新的 Context 獲取 UI 狀態
    const { expandedItems, toggleExpand } = useUIState();

    return (
        <div className="relative z-[2]">
            {/* 日期標題 */}
            <div className="mb-6">
                <div className="flex items-center">
                    <h2 className="text-2xl font-medium text-pink-800 flex items-center">
                        {day.title}
                        <SakuraIcon size={20} className="ml-2 text-pink-400" />
                    </h2>
                    {isToday && (
                        <span className="ml-3 bg-pink-200 text-pink-800 text-xs px-2 py-1 rounded-full">
                            今日行程
                        </span>
                    )}
                </div>
                <p className="text-pink-600">{formatDisplayDate(day.date)} {day.day}</p>
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
                <ArrowUpIcon size={20} />
            </motion.button>
        </div>
    );
};

export default DayDetail;