// src/utils/jsonValidator.ts
/**
 * 行程 JSON 格式驗證工具
 * 負責檢查行程資料是否符合 itineraryJsonSpec.md 規範的格式，提供詳細的錯誤訊息
 */

// 驗證結果介面
export interface ValidationResult {
    isValid: boolean;
    errors: string[];
}

/**
 * 驗證行程資料是否符合預期的格式
 * @param data 要驗證的資料
 * @returns 驗證結果
 */
export function validateItineraryData(data: any): ValidationResult {
    const result: ValidationResult = {
        isValid: true,
        errors: []
    };

    // 檢查資料是否為陣列
    if (!Array.isArray(data)) {
        result.isValid = false;
        result.errors.push('行程資料必須是陣列形式');
        return result;
    }

    // 檢查陣列是否為空
    if (data.length === 0) {
        result.isValid = false;
        result.errors.push('行程資料陣列不可為空');
        return result;
    }

    // 檢查每一天的行程資料
    data.forEach((day, index) => {
        const dayErrors = validateDayInfo(day, index);
        if (dayErrors.length > 0) {
            result.isValid = false;
            result.errors.push(...dayErrors);
        }
    });

    return result;
}

/**
 * 驗證單日行程資料
 * @param day 單日行程資料
 * @param dayIndex 日期索引
 * @returns 錯誤訊息陣列
 */
function validateDayInfo(day: any, dayIndex: number): string[] {
    const errors: string[] = [];
    const dayName = `第 ${dayIndex + 1} 天 (${day.date || '未知日期'})`;

    // 檢查必填欄位
    if (!day.date) {
        errors.push(`${dayName}: 缺少必要欄位 'date'`);
    } else {
        // 嚴格檢查日期格式是否符合 YYYY-MM-DD 格式 (根據 itineraryJsonSpec.md)
        const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateFormatRegex.test(day.date)) {
            errors.push(`${dayName}: 日期格式錯誤，應為 'YYYY-MM-DD'，目前為 '${day.date}'`);
        }
    }

    if (!day.day) {
        errors.push(`${dayName}: 缺少必要欄位 'day'`);
    }

    if (!day.title) {
        errors.push(`${dayName}: 缺少必要欄位 'title'`);
    }

    // 檢查 itinerary 欄位 (必填且必須是陣列)
    if (!Array.isArray(day.itinerary)) {
        errors.push(`${dayName}: 'itinerary' 必須是陣列且為必填欄位`);
    } else {
        // 檢查每個行程項目
        day.itinerary.forEach((item: any, itemIndex: number) => {
            const itemErrors = validateItineraryItem(item, itemIndex, dayName);
            errors.push(...itemErrors);
        });
    }

    // 檢查 foodRecommendations 欄位 (如存在，必須是陣列)
    if (day.foodRecommendations !== undefined && !Array.isArray(day.foodRecommendations)) {
        errors.push(`${dayName}: 'foodRecommendations' 如存在，必須是字串陣列`);
    } else if (Array.isArray(day.foodRecommendations)) {
        // 檢查陣列內容是否為字串
        day.foodRecommendations.forEach((item: any, index: number) => {
            if (typeof item !== 'string') {
                errors.push(`${dayName}: 'foodRecommendations' 中的項目 #${index + 1} 必須是字串`);
            }
        });
    }

    // 檢查 shoppingRecommendations 欄位 (如存在，必須是陣列)
    if (day.shoppingRecommendations !== undefined && !Array.isArray(day.shoppingRecommendations)) {
        errors.push(`${dayName}: 'shoppingRecommendations' 如存在，必須是字串陣列`);
    } else if (Array.isArray(day.shoppingRecommendations)) {
        // 檢查陣列內容是否為字串
        day.shoppingRecommendations.forEach((item: any, index: number) => {
            if (typeof item !== 'string') {
                errors.push(`${dayName}: 'shoppingRecommendations' 中的項目 #${index + 1} 必須是字串`);
            }
        });
    }

    // 檢查 accommodation 欄位 (如存在，必須是物件)
    if (day.accommodation !== null && day.accommodation !== undefined) {
        if (typeof day.accommodation !== 'object' || Array.isArray(day.accommodation)) {
            errors.push(`${dayName}: 'accommodation' 如存在，必須是物件`);
        } else {
            const accommodationErrors = validateAccommodation(day.accommodation, dayName);
            errors.push(...accommodationErrors);
        }
    }

    return errors;
}

/**
 * 驗證行程項目資料
 * @param item 行程項目資料
 * @param itemIndex 項目索引
 * @param dayName 日期名稱 (用於錯誤訊息)
 * @returns 錯誤訊息陣列
 */
function validateItineraryItem(item: any, itemIndex: number, dayName: string): string[] {
    const errors: string[] = [];
    const itemName = `${dayName} 行程項目 #${itemIndex + 1} (${item.name || '未命名項目'})`;

    // 檢查必填欄位
    if (!item.type) {
        errors.push(`${itemName}: 缺少必要欄位 'type'`);
    } else if (!['景點', '交通', '餐廳', '購物', '其他'].includes(item.type)) {
        errors.push(`${itemName}: 無效的 'type' 值，必須是 '景點', '交通', '餐廳', '購物' 或 '其他'`);
    }

    if (!item.name) {
        errors.push(`${itemName}: 缺少必要欄位 'name'`);
    }

    // 檢查時間格式 (如存在，必須是 HH:MM 格式)
    if (item.time !== undefined && item.time !== null && item.time !== '') {
        const timeFormatRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
        if (!timeFormatRegex.test(item.time)) {
            errors.push(`${itemName}: 時間格式錯誤，應為 'HH:MM'，目前為 '${item.time}'`);
        }
    }

    // 如果是交通類型，檢查 transportation 欄位
    if (item.type === '交通') {
        if (!item.transportation) {
            errors.push(`${itemName}: 當類型為 '交通' 時，'transportation' 欄位為必填`);
        } else if (typeof item.transportation !== 'object' || Array.isArray(item.transportation)) {
            errors.push(`${itemName}: 'transportation' 必須是物件`);
        } else {
            const transportationErrors = validateTransportation(item.transportation, itemName);
            errors.push(...transportationErrors);
        }
    }

    return errors;
}

/**
 * 驗證交通資料
 * @param transportation 交通資料
 * @param itemName 項目名稱 (用於錯誤訊息)
 * @returns 錯誤訊息陣列
 */
function validateTransportation(transportation: any, itemName: string): string[] {
    const errors: string[] = [];

    // 檢查時間格式 (如存在，必須是 HH:MM 格式)
    if (transportation.departureTime) {
        const timeFormatRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
        if (!timeFormatRegex.test(transportation.departureTime)) {
            errors.push(`${itemName}: 出發時間格式錯誤，應為 'HH:MM'，目前為 '${transportation.departureTime}'`);
        }
    }

    if (transportation.arrivalTime) {
        const timeFormatRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
        if (!timeFormatRegex.test(transportation.arrivalTime)) {
            errors.push(`${itemName}: 抵達時間格式錯誤，應為 'HH:MM'，目前為 '${transportation.arrivalTime}'`);
        }
    }

    // 檢查 segments 欄位
    if (transportation.segments !== undefined) {
        if (!Array.isArray(transportation.segments)) {
            errors.push(`${itemName}: 'transportation.segments' 如存在，必須是陣列`);
        } else {
            // 檢查每個交通路段
            transportation.segments.forEach((segment: any, segmentIndex: number) => {
                const segmentErrors = validateSegment(segment, segmentIndex, itemName);
                errors.push(...segmentErrors);
            });
        }
    }

    return errors;
}

/**
 * 驗證交通路段資料
 * @param segment 交通路段資料
 * @param segmentIndex 路段索引
 * @param itemName 項目名稱 (用於錯誤訊息)
 * @returns 錯誤訊息陣列
 */
function validateSegment(segment: any, segmentIndex: number, itemName: string): string[] {
    const errors: string[] = [];
    const segmentName = `${itemName} 交通路段 #${segmentIndex + 1}`;

    // 檢查必填欄位
    if (!segment.vehicleNumber) {
        errors.push(`${segmentName}: 缺少必要欄位 'vehicleNumber'`);
    }

    if (!segment.from) {
        errors.push(`${segmentName}: 缺少必要欄位 'from'`);
    }

    if (!segment.to) {
        errors.push(`${segmentName}: 缺少必要欄位 'to'`);
    }

    // 檢查時間格式 (如存在，必須是 HH:MM 格式)
    if (segment.departureTime) {
        const timeFormatRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
        if (!timeFormatRegex.test(segment.departureTime)) {
            errors.push(`${segmentName}: 出發時間格式錯誤，應為 'HH:MM'，目前為 '${segment.departureTime}'`);
        }
    }

    if (segment.arrivalTime) {
        const timeFormatRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
        if (!timeFormatRegex.test(segment.arrivalTime)) {
            errors.push(`${segmentName}: 抵達時間格式錯誤，應為 'HH:MM'，目前為 '${segment.arrivalTime}'`);
        }
    }

    // isReserved 應該是布林值
    if (segment.isReserved === undefined) {
        errors.push(`${segmentName}: 缺少必要欄位 'isReserved'`);
    } else if (typeof segment.isReserved !== 'boolean') {
        errors.push(`${segmentName}: 'isReserved' 必須是布林值 (true/false)，目前為 '${segment.isReserved}'`);
    }

    return errors;
}

/**
 * 驗證住宿資料
 * @param accommodation 住宿資料
 * @param dayName 日期名稱 (用於錯誤訊息)
 * @returns 錯誤訊息陣列
 */
function validateAccommodation(accommodation: any, dayName: string): string[] {
    const errors: string[] = [];

    // 檢查必填欄位
    if (!accommodation.city) {
        errors.push(`${dayName} 住宿: 缺少必要欄位 'city'`);
    }

    if (!accommodation.name) {
        errors.push(`${dayName} 住宿: 缺少必要欄位 'name'`);
    }

    if (!accommodation.locationURL) {
        errors.push(`${dayName} 住宿: 缺少必要欄位 'locationURL'`);
    } else if (typeof accommodation.locationURL !== 'string' || !accommodation.locationURL.startsWith('http')) {
        errors.push(`${dayName} 住宿: 'locationURL' 必須是有效的 URL 字串`);
    }

    return errors;
}