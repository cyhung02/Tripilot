// src/utils/dateUtils.ts
import { differenceInDays, isWithinInterval, format, parseISO } from 'date-fns';
import { zhTW } from 'date-fns/locale';
import { DayInfo } from '../data/types';

/**
 * 將日期格式化為星期幾
 * 將 "YYYY-MM-DD" 格式轉換為 "星期X" 格式
 */
export const formatWeekday = (dateStr: string): string => {
    try {
        // 使用 parseISO 解析 YYYY-MM-DD 格式的日期字串
        const parsedDate = parseISO(dateStr);

        // 獲取星期數 (0-6，其中 0 表示星期日)
        const weekdayNum = parsedDate.getDay();

        // 星期數到中文星期的映射
        const weekdayMap = [
            '星期日',
            '星期一',
            '星期二',
            '星期三',
            '星期四',
            '星期五',
            '星期六',
        ];

        return weekdayMap[weekdayNum];
    } catch (error) {
        console.error('日期格式化錯誤:', error);
        return '未知';
    }
};

const DEFAULT_DATE = {
    START_DATE: new Date(2025, 1 - 1, 1),
    END_DATE: new Date(2025, 1 - 1, 1, 23, 59, 59)
};

// 將硬編碼的 TRIP_DATES 改為函數，從行程資料中讀取日期範圍
export const getTripDates = (itineraryData: DayInfo[]) => {
    if (!itineraryData || itineraryData.length === 0) {
        // 如果沒有行程資料，返回預設值（僅作為後備）
        return DEFAULT_DATE;
    }

    try {
        // 從行程資料中獲取第一天和最後一天的日期 (格式為 YYYY-MM-DD)
        const firstDay = itineraryData[0].date;
        const lastDay = itineraryData[itineraryData.length - 1].date;

        // 使用 parseISO 解析 YYYY-MM-DD 格式的日期字串
        const startDate = parseISO(firstDay);
        const endDate = parseISO(lastDay);

        // 設定結束日期為當天的最後一刻，以包含整天
        endDate.setHours(23, 59, 59, 999);

        return {
            START_DATE: startDate,
            END_DATE: endDate
        };
    } catch (error) {
        console.error('日期解析錯誤:', error);
        // 發生錯誤時返回預設值
        return DEFAULT_DATE;
    }
};

/**
 * 將日期格式化為顯示格式
 * 將 "YYYY-MM-DD" 格式轉換為 "M月d日 (週五)" 格式
 */
export const formatDisplayDate = (dateStr: string): string => {
    try {
        // 使用 parseISO 解析 YYYY-MM-DD 格式的日期字串
        const parsedDate = parseISO(dateStr);

        // 格式化為 "3月28日 (週五)" 格式
        return format(parsedDate, 'M月d日 (EEE)', { locale: zhTW });
    } catch (error) {
        console.error('日期格式化錯誤:', error);
        return dateStr;
    }
};

/**
 * 檢查日期是否為今天
 * @param dateStr 格式為 "YYYY-MM-DD" 的日期字串
 */
export const isToday = (dateStr: string): boolean => {
    try {
        // 使用 parseISO 解析 YYYY-MM-DD 格式的日期字串
        const travelDate = parseISO(dateStr);
        const today = new Date();

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
 * @param itineraryData 行程資料
 * @param currentDate 當前日期，預設為當天
 * @returns 日程索引或 null（如果不在旅行期間內）
 */
export const getCurrentTripDayIndex = (itineraryData: DayInfo[], currentDate: Date = new Date()): number | null => {
    try {
        const { START_DATE, END_DATE } = getTripDates(itineraryData);

        // 檢查當前日期是否在旅行期間內
        if (isWithinInterval(currentDate, { start: START_DATE, end: END_DATE })) {
            return differenceInDays(currentDate, START_DATE);
        }
        return null;
    } catch (error) {
        console.error('計算旅行日期索引錯誤:', error);
        return null;
    }
};