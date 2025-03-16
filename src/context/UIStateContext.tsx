// src/context/UIStateContext.tsx
import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useItineraryData } from './DataContext';
import { isToday as isTodayFn, getCurrentTripDayIndex } from '../utils/dateUtils';

// 定義 Context 的值類型
interface UIStateContextType {
    selectedDayIndex: number;
    setSelectedDayIndex: (index: number) => void;
    expandedItems: Record<string, boolean>;
    toggleExpand: (id: string) => void;
    resetExpandedItems: () => void;
    isToday: (date: string) => boolean;
    today: Date;
}

// 創建 Context
const UIStateContext = createContext<UIStateContextType | undefined>(undefined);

// 提供一個 Hook 以便於獲取 Context
export const useUIState = (): UIStateContextType => {
    const context = useContext(UIStateContext);
    if (context === undefined) {
        throw new Error('useUIState 必須在 UIStateProvider 內使用');
    }
    return context;
};

// Context Provider 元件
interface UIStateProviderProps {
    children: ReactNode;
}

export const UIStateProvider: React.FC<UIStateProviderProps> = ({ children }) => {
    // 從 DataContext 獲取行程資料
    const { itineraryData } = useItineraryData();

    // UI 狀態
    const [selectedDayIndex, setSelectedDayIndex] = useState(0);
    const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
    const [today] = useState(new Date());

    // 選擇日期並重置展開項目
    const handleDaySelect = useCallback((index: number) => {
        setSelectedDayIndex(index);
        setExpandedItems({}); // 切換日期時重置所有展開項
    }, []);

    // 切換項目展開狀態
    const toggleExpand = useCallback((id: string) => {
        setExpandedItems(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    }, []);

    // 重置所有展開的項目
    const resetExpandedItems = useCallback(() => {
        setExpandedItems({});
    }, []);

    // 檢查日期是否為今天
    const isToday = useCallback((date: string): boolean => {
        return isTodayFn(date);
    }, []);

    // 初始化選擇日期 (依據當前日期)
    useEffect(() => {
        if (itineraryData.length === 0) return;

        try {
            // 檢查當前日期是否在旅行期間內
            const tripDayIndex = getCurrentTripDayIndex();
            if (tripDayIndex !== null) {
                // 確保索引在有效範圍內
                const validIndex = Math.max(0, Math.min(tripDayIndex, itineraryData.length - 1));
                setSelectedDayIndex(validIndex);
            }
        } catch (error) {
            console.error('日期計算錯誤:', error);
            // 在錯誤情況下設定為第一天
            setSelectedDayIndex(0);
        }
    }, [itineraryData]);

    // 提供 Context 值
    const value = {
        selectedDayIndex,
        setSelectedDayIndex: handleDaySelect,
        expandedItems,
        toggleExpand,
        resetExpandedItems,
        isToday,
        today
    };

    return (
        <UIStateContext.Provider value={value}>
            {children}
        </UIStateContext.Provider>
    );
};