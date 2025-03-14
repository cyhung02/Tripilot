// src/utils/ItemTypeConfig.tsx

import {
    LocationIcon,
    TransportIcon,
    FoodIcon,
    ShoppingIcon,
    ListIcon
} from '../components/common/SvgIcons';

// 定義類型配置的結構
export interface TypeConfig {
    background: string;
    detailPanel: string;
    iconClass: string;
    icon: React.ReactNode;
}

// 行程項目類型的樣式和圖標配置
export const typeConfig: Record<string, TypeConfig> = {
    '景點': {
        background: 'bg-white',
        detailPanel: 'bg-pink-50 border-pink-200',
        iconClass: 'bg-pink-100 text-pink-600',
        icon: <LocationIcon size={16} />,
    },
    '交通': {
        background: 'bg-purple-50',
        detailPanel: 'bg-purple-50 border-purple-200',
        iconClass: 'bg-purple-100 text-purple-500',
        icon: <TransportIcon size={16} />,
    },
    '餐廳': {
        background: 'bg-yellow-50',
        detailPanel: 'bg-yellow-50 border-yellow-200',
        iconClass: 'bg-yellow-100 text-yellow-600',
        icon: <FoodIcon size={16} />,
    },
    '購物': {
        background: 'bg-blue-50',
        detailPanel: 'bg-blue-50 border-blue-200',
        iconClass: 'bg-blue-100 text-blue-600',
        icon: <ShoppingIcon size={16} />,
    },
    '其他': {
        background: 'bg-gray-50',
        detailPanel: 'bg-gray-50 border-gray-200',
        iconClass: 'bg-gray-100 text-gray-600',
        icon: <ListIcon size={16} />,
    },
};