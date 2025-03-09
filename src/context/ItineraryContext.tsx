import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { differenceInDays, isWithinInterval } from 'date-fns';
import { itineraryData, TRIP_START_DATE, TRIP_END_DATE } from '../data/itineraryData';
import { DayInfo } from '../data/types';

// 定義 Context 的值類型
interface ItineraryContextType {
    itineraryData: DayInfo[];
    selectedDayIndex: number;
    setSelectedDayIndex: (index: number) => void;
    isToday: (date: string) => boolean;
    today: Date;
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
    const [selectedDayIndex, setSelectedDayIndex] = useState(0);
    const [today] = useState(new Date());

    // 初始化選擇日期 (依據當前日期)
    useEffect(() => {
        const currentDate = new Date();

        // 檢查當前日期是否在旅行期間內
        try {
            if (isWithinInterval(currentDate, { start: TRIP_START_DATE, end: TRIP_END_DATE })) {
                const dayDiff = differenceInDays(currentDate, TRIP_START_DATE);
                setSelectedDayIndex(dayDiff >= 0 && dayDiff < itineraryData.length ? dayDiff : 0);
            }
        } catch (error) {
            console.error('日期計算錯誤:', error);
            // 預設值為第一天
            setSelectedDayIndex(0);
        }
    }, []);

    // 檢查日期是否為今天
    const isToday = (date: string): boolean => {
        try {
            const [month, day] = date.split('/').map(num => parseInt(num, 10));
            if (isNaN(month) || isNaN(day)) throw new Error('無效的日期格式');

            const travelDate = new Date(2025, month - 1, day);
            return travelDate.getDate() === today.getDate() &&
                travelDate.getMonth() === today.getMonth() &&
                travelDate.getFullYear() === today.getFullYear();
        } catch (error) {
            console.error('日期檢查錯誤:', error);
            return false;
        }
    };

    // 提供 Context 值
    const value = {
        itineraryData,
        selectedDayIndex,
        setSelectedDayIndex,
        isToday,
        today
    };

    return (
        <ItineraryContext.Provider value={value}>
            {children}
        </ItineraryContext.Provider>
    );
};