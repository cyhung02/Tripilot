// src/context/DataContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { DayInfo } from '../data/types';
import { usePWAStatus } from '../hooks/usePWAStatus';
import { validateItineraryData } from '../utils/jsonValidator';
import { formatWeekday } from '../utils/dateUtils';

// 定義 Context 的值類型
interface DataContextType {
    itineraryData: DayInfo[];
    isLoading: boolean;
    error: string | null;
    refreshData: () => Promise<void>;
}

// 創建 Context
const DataContext = createContext<DataContextType | undefined>(undefined);

// 提供一個 Hook 以便於獲取 Context
export const useItineraryData = (): DataContextType => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useItineraryData 必須在 DataProvider 內使用');
    }
    return context;
};

// Context Provider 元件
interface DataProviderProps {
    children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
    // 資料狀態
    const [itineraryData, setItineraryData] = useState<DayInfo[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // 使用 PWA 狀態 hook 獲取網路狀態
    const { isOnline } = usePWAStatus();

    // 載入行程資料的函數
    const loadItineraryData = async (retryCount: number = 0): Promise<void> => {
        try {
            setIsLoading(true);
            setError(null);

            // 使用 import.meta.env.BASE_URL 來處理基本路徑問題
            const basePath = import.meta.env.BASE_URL || '/';
            const url = `${basePath}data/itinerary.json`;

            // 使用 fetch 請求 - Service Worker 會自動處理快取策略
            const response = await fetch(url);

            if (response.ok) {
                const data = await response.json();

                // 在這裡添加數據驗證
                const validationResult = validateItineraryData(data);
                if (!validationResult.isValid) {
                    // 如果驗證失敗，設置錯誤訊息並返回
                    const errorMsg = '行程資料格式錯誤:\n' + validationResult.errors.join('\n');
                    throw new Error(errorMsg);
                }

                // 驗證通過後處理資料，自動計算 day 欄位
                const processedData = data.map((item: any) => {
                    const dayInfo = { ...item };
                    // 為所有項目重新計算 day 欄位，無論原本是否存在
                    dayInfo.day = formatWeekday(dayInfo.date);
                    return dayInfo;
                });

                // 設置處理後的資料
                setItineraryData(processedData);
            } else {
                throw new Error(`無法載入行程資料: ${response.status} ${response.statusText}`);
            }
        } catch (err) {
            console.error('載入行程資料時發生錯誤:', err);

            // 網路錯誤時自動重試 (最多3次)
            if (isOnline && retryCount < 3 && !(err instanceof Error && err.message.includes('行程資料格式錯誤'))) {
                console.log(`嘗試重新載入 (${retryCount + 1}/3)...`);
                setTimeout(() => loadItineraryData(retryCount + 1), 1000 * (retryCount + 1));
                return;
            }

            // 離線狀態下的錯誤處理
            if (!isOnline) {
                setError('您目前處於離線狀態，且沒有已快取的行程資料');
            } else {
                setError(err instanceof Error ? err.message : '載入資料時發生未知錯誤');
            }
        } finally {
            setIsLoading(false);
        }
    };

    // 初始載入資料
    useEffect(() => {
        loadItineraryData();
    }, [isOnline]); // 當網路狀態改變時重新嘗試載入

    // 對外提供手動刷新資料的函數
    const refreshData = async (): Promise<void> => {
        await loadItineraryData();
    };

    // 提供 Context 值
    const value = {
        itineraryData,
        isLoading,
        error,
        refreshData
    };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
};