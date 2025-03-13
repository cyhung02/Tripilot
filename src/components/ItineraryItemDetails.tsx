// src/components/ItineraryItemDetails.tsx
import { ItineraryItem } from '../data/types';
import { typeConfig } from '../utils/ItemTypeConfig';
import TransportTimeline from './TransportTimeline';

interface ItineraryItemDetailsProps {
    item: ItineraryItem;
}

/**
 * 根據行程項目類型渲染對應的詳細資訊
 */
const ItineraryItemDetails: React.FC<ItineraryItemDetailsProps> = ({ item }) => {
    // 根據項目類型渲染不同的詳細資訊
    switch (item.type) {
        case '景點':
        case '購物':
            return <BasicDetails item={item} />;
        case '交通':
            return <TransportDetails item={item} />;
        case '餐廳':
            return <RestaurantDetails item={item} />;
        default:
            return (
                <>
                    {item.description && <p className="text-sm">{item.description}</p>}
                </>
            );
    }
};

const BasicDetails: React.FC<ItineraryItemDetailsProps> = ({ item }) => {
    const config = typeConfig[item.type] || typeConfig['其他'];
    return (
        <>
            {item.description && <p className="text-sm mb-3 leading-relaxed">{item.description}</p>}

            {item.tips && (
                <div className={`${config.detailPanel} p-3 rounded-lg mb-3 border`}>
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
};

const TransportDetails: React.FC<ItineraryItemDetailsProps> = ({ item }) => {
    const config = typeConfig[item.type] || typeConfig['其他'];
    // 確保 item.transportation 存在
    if (!item.transportation) {
        return (
            <div className="text-sm text-gray-500">
                無交通資訊
            </div>
        );
    }

    const { from, to, departureTime, arrivalTime, segments } = item.transportation;

    return (
        <div className="space-y-4">
            {/* 行程摘要 */}
            <div className="flex items-center bg-purple-50 p-3 rounded-lg">
                <div className="flex-1">
                    <p className="text-sm font-medium text-purple-700">{from}</p>
                    <p className="text-xs text-purple-500">{departureTime}</p>
                </div>
                <svg className="w-5 h-5 mx-2 text-purple-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
                <div className="flex-1 text-right">
                    <p className="text-sm font-medium text-purple-700">{to}</p>
                    <p className="text-xs text-purple-500">{arrivalTime}</p>
                </div>
            </div>

            {/* 列車時間軸 */}
            {segments && segments.length > 0 && <TransportTimeline segments={segments} />}

            {/* 額外說明 */}
            {item.description && (
                <div className={`mt-3 text-sm ${config.detailPanel} p-3 rounded-lg border`}>
                    <p>{item.description}</p>
                </div>
            )}
        </div>
    );
};

const RestaurantDetails: React.FC<ItineraryItemDetailsProps> = ({ item }) => {
    const config = typeConfig[item.type] || typeConfig['其他'];
    return (
        <>
            {item.description && <p className="text-sm mb-3">{item.description}</p>}

            {item.recommendedDishes && (
                <div className={`${config.detailPanel} p-3 rounded-lg mb-3 border`}>
                    <h4 className="text-sm font-medium mb-1 text-pink-800">推薦菜色</h4>
                    <p className="text-xs">{item.recommendedDishes}</p>
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
};

export default ItineraryItemDetails;