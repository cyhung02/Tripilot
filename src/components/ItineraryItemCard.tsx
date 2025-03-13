// src/components/ItineraryItemCard.tsx
import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ItineraryItem } from '../data/types';
import ItineraryItemDetails from './ItineraryItemDetails';
import { typeConfig } from '../utils/ItemTypeConfig';

interface ItineraryItemCardProps {
    item: ItineraryItem;
    index: number;
    isExpanded: boolean;
    toggleExpand: () => void;
}

/**
 * 行程項目卡片元件
 * 顯示一個行程項目的摘要和可展開的詳細資訊
 */
const ItineraryItemCard: React.FC<ItineraryItemCardProps> = ({
    item,
    index,
    isExpanded,
    toggleExpand,
}) => {
    // 取得該項目類型的樣式配置
    const config = typeConfig[item.type] || typeConfig['其他'];

    return (
        <div className="mb-3 relative">
            {/* 行程卡片 */}
            <motion.div
                className="ml-2 bg-white rounded-lg shadow-sm overflow-hidden"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
            >
                {/* 卡片標題 */}
                <div
                    className={`p-3 flex justify-between items-center cursor-pointer ${config.background}`}
                    onClick={toggleExpand}
                    aria-expanded={isExpanded}
                    aria-controls={`itinerary-details-${index}`}
                >
                    <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${config.iconClass}`}>
                            {config.icon}
                        </div>
                        <div>
                            <h3 className="font-bold">{item.name}</h3>
                            {item.time && <p className="text-xs text-pink-500 font-medium">{item.time}</p>}
                        </div>
                    </div>
                    <svg
                        className={`w-5 h-5 text-pink-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <path d="M6 9l6 6 6-6"></path>
                    </svg>
                </div>
                
                {/* 可展開的詳細內容 */}
                <AnimatePresence initial={false}>
                    {isExpanded && (
                        <motion.div
                            id={`itinerary-details-${index}`}
                            className="overflow-hidden"
                            style={{ willChange: "height, opacity" }}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                                height: { type: 'spring', stiffness: 200, damping: 30 },
                                opacity: { duration: 0.2 },
                            }}
                        >
                            <div className="p-4 border-t border-pink-100">
                                <ItineraryItemDetails item={item} />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

// 使用 memo 避免不必要的重新渲染
export default memo(ItineraryItemCard);