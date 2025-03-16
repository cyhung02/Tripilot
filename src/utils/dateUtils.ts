// src/utils/dateUtils.ts
import { differenceInDays, isWithinInterval, format, parse } from 'date-fns';
import { zhTW } from 'date-fns/locale';

// 定義旅行的起始日期常數
export const TRIP_DATES = {
    START_DATE: new Date(2025, 3 - 1, 28), // 月份是從0開始，3月為2
    END_DATE: new Date(2025, 4 - 1, 6, 23, 59, 59)
};

/**
 * 將日期格式化為顯示格式
 * 將 "3/28" 格式轉換為 "3月28日 (週五)" 格式
 */
export const formatDisplayDate = (dateStr: string): string => {
    try {
        // 將 "3/28" 格式的日期解析為 Date 對象
        const parsedDate = parse(dateStr, 'M/d', new Date(2025, 0, 1));

        // 格式化為 "3月28日 (週五)" 格式
        return format(parsedDate, 'M月d日 (EEE)', { locale: zhTW });
    } catch (error) {
        console.error('日期格式化錯誤:', error);
        return dateStr;
    }
};

/**
 * 檢查日期是否為今天
 * @param dateStr 格式為 "3/28" 的日期字串
 */
export const isToday = (dateStr: string): boolean => {
    try {
        const [month, day] = dateStr.split('/').map(num => parseInt(num, 10));
        if (isNaN(month) || isNaN(day)) {
            throw new Error('無效的日期格式');
        }

        const today = new Date();
        const travelDate = new Date(2025, month - 1, day);

        return travelDate.getDate() === today.getDate() &&
            travelDate.getMonth() === today.getMonth() &&
            travelDate.getFullYear() === today.getFullYear();
    } catch (error) {
        console.error('日期檢查錯誤:', error);
        return false;
    }
};

/**
 * 檢查當前日期是否在旅行期間內，如果是，返回對應的日程索引
 * @returns 日程索引或 null（如果不在旅行期間內）
 */
export const getCurrentTripDayIndex = (currentDate: Date = new Date()): number | null => {
    try {
        // 檢查當前日期是否在旅行期間內
        if (isWithinInterval(currentDate, { start: TRIP_DATES.START_DATE, end: TRIP_DATES.END_DATE })) {
            return differenceInDays(currentDate, TRIP_DATES.START_DATE);
        }
        return null;
    } catch (error) {
        console.error('計算旅行日期索引錯誤:', error);
        return null;
    }
};