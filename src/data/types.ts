// src/data/types.ts

// 行程項目介面
export interface ItineraryItem {
    type: '景點' | '交通' | '餐廳' | '其他';
    name: string;
    time?: string;
    description?: string;
    tips?: string;
    location?: string;
    // 交通相關欄位
    from?: string;
    to?: string;
    departure_time?: string;
    arrival_time?: string;
    train_info?: string;
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