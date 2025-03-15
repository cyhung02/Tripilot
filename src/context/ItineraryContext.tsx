// src/context/ItineraryContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { differenceInDays, isWithinInterval, format, parse } from 'date-fns';
import { zhTW } from 'date-fns/locale';
import { DayInfo } from '../data/types';

// 定義旅行的起始日期，方便後續日期計算
const TRIP_START_DATE = new Date(2025, 3 - 1, 28); // 月份是從0開始，3月為2
const TRIP_END_DATE = new Date(2025, 4 - 1, 6, 23, 59, 59);

// 定義 Context 的值類型
interface ItineraryContextType {
    itineraryData: DayInfo[];
    isLoading: boolean;
    error: string | null;
    selectedDayIndex: number;
    setSelectedDayIndex: (index: number) => void;
    isToday: (date: string) => boolean;
    today: Date;
    expandedItems: Record<string, boolean>;
    setExpandedItems: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
    resetExpandedItems: () => void;
    formatDisplayDate: (date: string) => string;
}

// 創建 Context
const ItineraryContext = createContext<ItineraryContextType | undefined>(undefined);

// 提供一個 Hook 以便於獲取 Context
export const useItinerary = (): ItineraryContextType => {
    const context = useContext(ItineraryContext);
    if (context === undefined) {
        throw new Error('useItinerary 必須在 ItineraryProvider 內使用');
    }
    return context;
};

// Context Provider 元件
interface ItineraryProviderProps {
    children: ReactNode;
}

export const ItineraryProvider: React.FC<ItineraryProviderProps> = ({ children }) => {
    // 狀態管理
    const [itineraryData, setItineraryData] = useState<DayInfo[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedDayIndex, setSelectedDayIndex] = useState(0);
    const [today] = useState(new Date());
    const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

    // 簡化的載入行程資料函數 - 完全依賴 Service Worker 的快取策略
    useEffect(() => {
        const loadItineraryData = async () => {
            try {
                setIsLoading(true);
                setError(null);

                // 使用 import.meta.env.BASE_URL 來處理基本路徑問題
                const basePath = import.meta.env.BASE_URL || '/';
                const url = `${basePath}data/itinerary.json`;

                // 使用普通的 fetch 請求 - Service Worker 會自動處理快取策略
                const response = await fetch(url);

                if (response.ok) {
                    const data = await response.json();
                    setItineraryData(data);
                } else {
                    throw new Error(`無法載入行程資料: ${response.status} ${response.statusText}`);
                }
            } catch (err) {
                console.error('載入行程資料時發生錯誤:', err);
                setError(err instanceof Error ? err.message : '載入資料時發生未知錯誤');
            } finally {
                setIsLoading(false);
            }
        };

        loadItineraryData();
    }, []);

    // 重置所有展開的項目
    const resetExpandedItems = useCallback(() => {
        setExpandedItems({});
    }, []);

    // 當日期變更時，重置展開的項目
    const handleDaySelect = useCallback((index: number) => {
        setSelectedDayIndex(index);
        resetExpandedItems();
    }, [resetExpandedItems]);

    // 將日期格式化為顯示格式
    const formatDisplayDate = useCallback((dateStr: string): string => {
        try {
            // 將 "3/28" 格式的日期解析為 Date 對象
            const parsedDate = parse(dateStr, 'M/d', new Date(2025, 0, 1));

            // 格式化為 "3月28日 (週五)" 格式
            return format(parsedDate, 'M月d日 (EEE)', { locale: zhTW });
        } catch (error) {
            console.error('日期格式化錯誤:', error);
            return dateStr;
        }
    }, []);

    // 初始化選擇日期 (依據當前日期)
    useEffect(() => {
        if (itineraryData.length === 0) return;

        try {
            // 檢查當前日期是否在旅行期間內
            if (isWithinInterval(today, { start: TRIP_START_DATE, end: TRIP_END_DATE })) {
                const dayDiff = differenceInDays(today, TRIP_START_DATE);
                // 確保索引在有效範圍內
                const validIndex = Math.max(0, Math.min(dayDiff, itineraryData.length - 1));
                setSelectedDayIndex(validIndex);
            }
        } catch (error) {
            console.error('日期計算錯誤:', error);
            // 在錯誤情況下設定為第一天
            setSelectedDayIndex(0);
        }
    }, [today, itineraryData]);

    // 檢查日期是否為今天
    const isToday = useCallback((date: string): boolean => {
        try {
            const [month, day] = date.split('/').map(num => parseInt(num, 10));
            if (isNaN(month) || isNaN(day)) {
                throw new Error('無效的日期格式');
            }

            const travelDate = new Date(2025, month - 1, day);
            return travelDate.getDate() === today.getDate() &&
                travelDate.getMonth() === today.getMonth() &&
                // 比較年份可以省略，因為我們在使用固定年份的數據
                travelDate.getFullYear() === today.getFullYear();
        } catch (error) {
            console.error('日期檢查錯誤:', error);
            return false;
        }
    }, [today]);

    // 提供 Context 值
    const value = {
        itineraryData,
        isLoading,
        error,
        selectedDayIndex,
        setSelectedDayIndex: handleDaySelect,
        isToday,
        today,
        expandedItems,
        setExpandedItems,
        resetExpandedItems,
        formatDisplayDate
    };

    return (
        <ItineraryContext.Provider value={value}>
            {children}
        </ItineraryContext.Provider>
    );
};