// src/components/ItineraryItemDetails.tsx
import { ItineraryItem } from '../data/types';
import { typeConfig } from '../utils/ItemTypeConfig';
import TransportTimeline from './TransportTimeline';
import { LocationIcon } from './common/SvgIcons';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
                    {item.description && (
                        <div className="text-sm markdown-content">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {item.description}
                            </ReactMarkdown>
                        </div>
                    )}
                </>
            );
    }
};

const BasicDetails: React.FC<ItineraryItemDetailsProps> = ({ item }) => {
    const config = typeConfig[item.type] || typeConfig['其他'];
    return (
        <>
            {item.description && (
                <div className="text-sm mb-3 leading-relaxed markdown-content">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {item.description}
                    </ReactMarkdown>
                </div>
            )}

            {item.tips && (
                <div className={`${config.detailPanel} p-3 rounded-lg mb-3 border`}>
                    <h4 className="text-sm font-bold mb-2 text-pink-800">小提示</h4>
                    <div className="text-xs leading-relaxed markdown-content">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {item.tips}
                        </ReactMarkdown>
                    </div>
                </div>
            )}

            {item.location && (
                <div className="flex items-center text-xs text-pink-500 mt-2">
                    <LocationIcon size={12} className="mr-1" />
                    <a
                        href={item.location}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-pink-700 transition-colors font-medium"
                        aria-label={`在 Google Maps 中查看 ${item.name} 的位置`}
                    >
                        在 Google Maps 中查看位置
                    </a>
                </div >
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

    const { from, to, departureTime, arrivalTime, segments, routingURL } = item.transportation;

    return (
        <div className="space-y-4">
            {/* 額外說明 */}
            {item.description && (
                <div className="text-sm mb-3 leading-relaxed markdown-content">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {item.description}
                    </ReactMarkdown>
                </div>
            )}

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

            {/* 乗換案内URL */}
            {routingURL && (
                <div className="flex items-center text-xs text-purple-500 mt-2">
                    <LocationIcon size={12} className="mr-1" />
                    <a
                        href={routingURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-purple-700 transition-colors font-medium"
                        aria-label={`查看 ${from} 到 ${to} 的位置`}
                    >
                        查看路線詳情
                    </a>
                </div >
            )}

            {/* 小提示 */}
            {item.tips && (
                <div className={`mt-3 ${config.detailPanel} p-3 rounded-lg mb-3 border`}>
                    <h4 className="text-sm font-bold mb-2 text-purple-800">小提示</h4>
                    <div className="text-xs leading-relaxed markdown-content">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {item.tips}
                        </ReactMarkdown>
                    </div>
                </div>
            )}
        </div>
    );
};

const RestaurantDetails: React.FC<ItineraryItemDetailsProps> = ({ item }) => {
    const config = typeConfig[item.type] || typeConfig['其他'];
    return (
        <>
            {item.description && (
                <div className="text-sm mb-3 markdown-content">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {item.description}
                    </ReactMarkdown>
                </div>
            )}

            {item.recommendedDishes && (
                <div className={`${config.detailPanel} p-3 rounded-lg mb-3 border`}>
                    <h4 className="text-sm font-bold mb-2 text-pink-800">推薦菜色</h4>
                    <p className="text-xs">{item.recommendedDishes}</p>
                </div>
            )}

            {item.location && (
                <div className="flex items-center text-xs text-pink-500 mt-2">
                    <LocationIcon size={12} className="mr-1" />
                    <a
                        href={item.location}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-pink-700 transition-colors"
                        aria-label={`在 Google Maps 中查看 ${item.name} 的位置`}
                    >
                        在 Google Maps 中查看位置
                    </a>
                </div >
            )}
        </>
    );
};

export default ItineraryItemDetails;