// src/data/types.ts

// 新增列車介面
export interface Train {
    trainNumber: string;      // 列車編號
    from: string;             // 出發地
    to: string;               // 目的地
    departureTime?: string;   // 出發時間，可為空
    arrivalTime?: string;     // 抵達時間，可為空
    isReserved: boolean;      // 是否已預訂
}

// 行程項目介面
export interface ItineraryItem {
    type: '景點' | '交通' | '餐廳' | '其他';
    name: string;
    time?: string;
    description?: string;
    tips?: string;
    location?: string;
    // 交通相關欄位 - 整個交通行程的資訊
    from?: string;
    to?: string;
    departure_time?: string;
    arrival_time?: string;
    // 新增 trains 陣列，用於儲存多筆列車資訊(轉乘段落)
    trains?: Train[];
    // 餐廳相關欄位
    recommended_dishes?: string;
}

// 每日資訊介面
export interface DayInfo {
    date: string;
    day: string;
    title: string;
    highlights: Array<{ type: string, name: string }>;
    itinerary: ItineraryItem[];
    food_recommendations?: string[];
    shopping_recommendations?: string[];
    accommodation?: string;
}