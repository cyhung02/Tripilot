// src/data/types.ts

// 將原本的 Train 改名為 Segment
export interface Segment {
    vehicleNumber: string;    // 載具編號（如列車編號、航班編號、巴士編號等）
    from: string;             // 出發地
    to: string;               // 目的地
    departureTime?: string;   // 出發時間，可為空
    arrivalTime?: string;     // 抵達時間，可為空
    isReserved: boolean;      // 是否已預訂
}

// 新增 Transportation 介面，封裝交通相關資訊
export interface Transportation {
    from?: string;             // 出發地
    to?: string;               // 目的地
    departureTime?: string;    // 出發時間
    arrivalTime?: string;      // 抵達時間
    segments?: Segment[];      // 交通路段
}

// 新增 Accommodation 介面
export interface Accommodation {
    city: string;            // 飯店所在城市
    name: string;            // 飯店名稱
    locationURL: string;     // Google Maps URL of hotel
}

// 行程項目介面
export interface ItineraryItem {
    type: '景點' | '交通' | '餐廳' | '購物' | '其他';
    name: string;
    time?: string;
    description?: string;
    tips?: string;
    location?: string;

    // 移除原有的交通相關欄位，改用 transportation 封裝
    transportation?: Transportation;

    // 餐廳相關欄位 - 也改為駱駝式命名
    recommendedDishes?: string;
}

// 每日資訊介面
export interface DayInfo {
    date: string;  // 行程日期，格式為 "YYYY-MM-DD"
    day: string;   // 星期幾，如 "星期五"，JSON 中不應包含此欄位，將由系統根據 date 自動計算
    title: string; // 當日行程標題
    itinerary: ItineraryItem[];
    foodRecommendations?: string[];
    shoppingRecommendations?: string[];
    accommodation?: Accommodation;
}