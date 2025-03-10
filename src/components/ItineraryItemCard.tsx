import { motion, AnimatePresence } from 'framer-motion';
import { ItineraryItem, Train } from '../data/types';

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
    toggleExpand
}) => {
    // 基於項目類型決定卡片背景色
    const getCardBackgroundColor = () => {
        switch (item.type) {
            case '景點': return 'bg-white';
            case '交通': return 'bg-purple-50';
            case '餐廳': return 'bg-rose-50';
            case '其他':
            default: return 'bg-gray-50';
        }
    };

    // 基於項目類型決定圖標背景色和文本色
    const getIconClasses = () => {
        switch (item.type) {
            case '景點': return 'bg-pink-100 text-pink-600';
            case '交通': return 'bg-purple-100 text-purple-500';
            case '餐廳': return 'bg-rose-100 text-rose-600';
            case '其他':
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    // 基於項目類型渲染適當的圖標
    const renderIcon = () => {
        switch (item.type) {
            case '景點':
                return (
                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2c-3.31 0-6 2.69-6 6 0 4.5 6 12 6 12s6-7.5 6-12c0-3.31-2.69-6-6-6zm0 9a3 3 0 100-6 3 3 0 000 6z"></path>
                    </svg>
                );
            case '交通':
                return (
                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                );
            case '餐廳':
                return (
                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                        <line x1="6" y1="1" x2="6" y2="4"></line>
                        <line x1="10" y1="1" x2="10" y2="4"></line>
                        <line x1="14" y1="1" x2="14" y2="4"></line>
                    </svg>
                );
            case '其他':
            default:
                return (
                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="8" y1="6" x2="21" y2="6"></line>
                        <line x1="8" y1="12" x2="21" y2="12"></line>
                        <line x1="8" y1="18" x2="21" y2="18"></line>
                        <line x1="3" y1="6" x2="3.01" y2="6"></line>
                        <line x1="3" y1="12" x2="3.01" y2="12"></line>
                        <line x1="3" y1="18" x2="3.01" y2="18"></line>
                    </svg>
                );
        }
    };

    // 渲染單一列車卡片
    const renderTrainCard = (train: Train, index: number) => {
        return (
            <div key={index} className="bg-white rounded-lg shadow-sm p-3 mb-3 border border-purple-100">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                        列車 {index + 1}
                    </span>
                    {train.isReserved && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center">
                            <svg className="w-3 h-3 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 12l2 2 4-4"></path>
                                <circle cx="12" cy="12" r="10"></circle>
                            </svg>
                            已預訂
                        </span>
                    )}
                </div>

                <div className="flex items-center mb-3">
                    <div className="flex-1">
                        <p className="text-sm font-medium">{train.from}</p>
                        {train.departureTime && <p className="text-xs text-pink-500">{train.departureTime}</p>}
                    </div>

                    <svg className="w-5 h-5 mx-2 text-purple-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>

                    <div className="flex-1 text-right">
                        <p className="text-sm font-medium">{train.to}</p>
                        {train.arrivalTime && <p className="text-xs text-pink-500">{train.arrivalTime}</p>}
                    </div>
                </div>

                {train.trainNumber && (
                    <div className="text-xs flex items-center text-purple-600">
                        <svg className="w-3 h-3 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                            <line x1="12" y1="18" x2="12.01" y2="18"></line>
                        </svg>
                        {train.trainNumber}
                    </div>
                )}
            </div>
        );
    };

    // 根據項目類型渲染詳情內容
    const renderDetails = () => {
        switch (item.type) {
            case '景點':
                return (
                    <>
                        {item.description && <p className="text-sm mb-3 leading-relaxed">{item.description}</p>}

                        {item.tips && (
                            <div className="bg-pink-50 p-3 rounded-lg mb-3 border border-pink-100">
                                <h4 className="text-sm font-bold mb-1 text-pink-800">小提示</h4>
                                <p className="text-xs leading-relaxed">{item.tips}</p>
                            </div>
                        )}

                        {item.location && (
                            <div className="flex items-center text-xs text-pink-500 mt-2">
                                <svg className="w-3 h-3 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 2c-3.31 0-6 2.69-6 6 0 4.5 6 12 6 12s6-7.5 6-12c0-3.31-2.69-6-6-6zm0 9a3 3 0 100-6 3 3 0 000 6z"></path>
                                </svg>
                                <a
                                    href={item.location}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline hover:text-pink-700 transition-colors font-medium"
                                    aria-label={`在 Google Maps 中查看 ${item.name} 的位置`}
                                >
                                    在 Google Maps 中查看位置
                                </a>
                            </div>
                        )}
                    </>
                );

            case '交通':
                return (
                    <div className="space-y-4">
                        {/* 顯示總體交通資訊 */}
                        <div className="flex items-center mb-3">
                            <div className="flex-1">
                                <p className="text-sm font-medium">{item.from}</p>
                                <p className="text-xs text-pink-500">{item.departure_time}</p>
                            </div>

                            <svg className="w-5 h-5 mx-2 text-purple-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7"></path>
                            </svg>

                            <div className="flex-1 text-right">
                                <p className="text-sm font-medium">{item.to}</p>
                                <p className="text-xs text-pink-500">{item.arrival_time}</p>
                            </div>
                        </div>

                        {/* 多列車轉乘提示 */}
                        {item.trains && item.trains.length > 1 && (
                            <div className="bg-purple-50 p-2 rounded-lg mb-3 border border-purple-100">
                                <p className="text-xs text-purple-700 flex items-center">
                                    <svg className="w-3 h-3 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line x1="12" y1="8" x2="12" y2="12"></line>
                                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                    </svg>
                                    此行程需要轉乘 {item.trains.length} 次
                                </p>
                            </div>
                        )}

                        {/* 列車明細 */}
                        {item.trains && item.trains.length > 0 && (
                            <div className="space-y-2">
                                <h4 className="text-sm font-bold text-purple-800">列車資訊</h4>
                                {item.trains.map((train, idx) => renderTrainCard(train, idx))}
                            </div>
                        )}

                        {/* 其他資訊 */}
                        {item.description && (
                            <p className="text-sm mt-3">{item.description}</p>
                        )}
                    </div>
                );

            case '餐廳':
                return (
                    <>
                        {item.description && <p className="text-sm mb-3">{item.description}</p>}

                        {item.recommended_dishes && (
                            <div className="bg-pink-50 p-3 rounded-lg mb-3 border border-pink-100">
                                <h4 className="text-sm font-medium mb-1 text-pink-800">推薦菜色</h4>
                                <p className="text-xs">{item.recommended_dishes}</p>
                            </div>
                        )}

                        {item.location && (
                            <div className="flex items-center text-xs text-pink-500 mt-2">
                                <svg className="w-3 h-3 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 2c-3.31 0-6 2.69-6 6 0 4.5 6 12 6 12s6-7.5 6-12c0-3.31-2.69-6-6-6zm0 9a3 3 0 100-6 3 3 0 000 6z"></path>
                                </svg>
                                <a
                                    href={item.location}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline hover:text-pink-700 transition-colors"
                                    aria-label={`在 Google Maps 中查看 ${item.name} 的位置`}
                                >
                                    在 Google Maps 中查看位置
                                </a>
                            </div>
                        )}
                    </>
                );

            case '其他':
            default:
                return (
                    <>
                        {item.description && <p className="text-sm">{item.description}</p>}
                    </>
                );
        }
    };

    return (
        <div className="mb-3 relative">
            {/* 行程卡片 */}
            <motion.div
                className="ml-2 bg-white rounded-lg shadow-sm overflow-hidden"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
            >
                {/* 卡片頭部 */}
                <div
                    className={`p-3 flex justify-between items-center cursor-pointer ${getCardBackgroundColor()}`}
                    onClick={toggleExpand}
                    aria-expanded={isExpanded}
                    aria-controls={`itinerary-details-${index}`}
                >
                    <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${getIconClasses()}`}>
                            {renderIcon()}
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

                {/* 展開內容 */}
                <AnimatePresence initial={false}>
                    {isExpanded && (
                        <motion.div
                            id={`itinerary-details-${index}`}
                            className="overflow-hidden"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                                height: { type: "spring", stiffness: 200, damping: 30 },
                                opacity: { duration: 0.2 }
                            }}
                        >
                            <div className="p-4 border-t border-pink-100">
                                {renderDetails()}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default ItineraryItemCard;