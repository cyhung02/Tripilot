// src/components/ItineraryItemCard.tsx
import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ItineraryItem } from '../data/types';
import ItineraryItemDetails from './ItineraryItemDetails';
import { typeConfig } from '../utils/ItemTypeConfig';
import { ArrowDownIcon } from './common/SvgIcons';

interface ItineraryItemCardProps {
    item: ItineraryItem;
    index: number;
    isExpanded: boolean;
    toggleExpand: () => void;
}

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
                    <ArrowDownIcon
                        className={`text-pink-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                        size={20}
                    />
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

export default memo(ItineraryItemCard);