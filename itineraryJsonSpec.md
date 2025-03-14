# 多日行程 JSON 檔案製作指南

本文件提供製作標準化行程 JSON 檔案的完整指引，適用於記錄多日旅行計畫、景點活動、交通安排、餐飲住宿等資訊。

## 基本結構

行程 JSON 檔包含一個行程物件陣列，每個物件描述一日的完整行程：

```json
[
  {
    "date": "YYYY-MM-DD",
    "day": "星期X",
    "title": "第一日行程標題",
    "itinerary": [],
    "foodRecommendations": [],
    "shoppingRecommendations": [],
    "accommodation": {}
  },
  {
    "date": "YYYY-MM-DD",
    "day": "星期X",
    "title": "第二日行程標題",
    "itinerary": [],
    "foodRecommendations": [],
    "shoppingRecommendations": [],
    "accommodation": {}
  }
]
```

## 單日行程物件欄位定義

每個日期的行程物件包含以下欄位：

| 欄位名稱 | 類型 | 必填 | 說明 |
|---------|------|------|------|
| date | 字串 | ✓ | 行程日期，格式為 YYYY-MM-DD |
| day | 字串 | ✓ | 星期幾（如：星期日） |
| title | 字串 | ✓ | 當日行程簡短描述 |
| itinerary | ItineraryItem 物件陣列 | ✓ | 當日所有行程項目 |
| foodRecommendations | 字串陣列 |  | 推薦美食清單 |
| shoppingRecommendations | 字串陣列 |  | 推薦購物地點或商品 |
| accommodation | Accommodation 物件 |  | 住宿資訊 |

### 行程項目（ItineraryItem 物件）

每個行程項目為 `itinerary` 陣列中的一個物件，結構如下：

```json
{
  "type": "景點" | "交通" | "餐廳" | "購物" | "其他",
  "name": "項目名稱",
  "time": "HH:MM",
  "description": "詳細說明",
  "tips": "小提示或建議",
  "location": "地點資訊",
  "transportation": {},
  "recommendedDishes": ""
}
```

| 欄位名稱 | 類型 | 必填 | 說明 |
|---------|------|------|------|
| type | 字串 | ✓ | 行程類型：「景點」、「交通」、「餐廳」、「購物」或「其他」 |
| name | 字串 | ✓ | 行程項目名稱 |
| time | 字串 |  | 預計進行時間，格式為 HH:MM |
| description | 字串 |  | 行程詳細描述 |
| tips | 字串 |  | 相關提示或注意事項 |
| location | 字串 |  | 地點資訊或 Google Maps 連結 |
| transportation | Transportation 物件 |  | 若 type 為「交通」，則為交通詳細資訊 |
| recommendedDishes | 字串 |  | 若 type 為「餐廳」，則為推薦菜色 |

### 交通資訊（Transportation 物件）

當行程項目類型為「交通」時，可使用此物件記錄詳細交通資訊：

```json
{
  "from": "出發地",
  "to": "目的地",
  "departureTime": "HH:MM",
  "arrivalTime": "HH:MM",
  "segments": []
}
```

| 欄位名稱 | 類型 | 必填 | 說明 |
|---------|------|------|------|
| from | 字串 |  | 起始地點 |
| to | 字串 |  | 目的地點 |
| departureTime | 字串 |  | 預計出發時間，格式 HH:MM |
| arrivalTime | 字串 |  | 預計抵達時間，格式 HH:MM |
| segments | Segment 物件陣列 |  | 多段交通路線資訊 |

### 交通路段（Segment 物件）

每個交通路段為 `segments` 陣列中的一個物件，適用於需轉乘的交通安排：

```json
{
  "vehicleNumber": "載具編號",
  "from": "出發地",
  "to": "目的地",
  "departureTime": "HH:MM",
  "arrivalTime": "HH:MM",
  "isReserved": true | false
}
```

| 欄位名稱 | 類型 | 必填 | 說明 |
|---------|------|------|------|
| vehicleNumber | 字串 | ✓ | 交通工具編號（如：高鐵123次、公車20路） |
| from | 字串 | ✓ | 此路段起點 |
| to | 字串 | ✓ | 此路段終點 |
| departureTime | 字串 |  | 預計出發時間 |
| arrivalTime | 字串 |  | 預計抵達時間 |
| isReserved | 布林值 | ✓ | 是否已預訂座位 |

### 住宿資訊（Accommodation 物件）

```json
{
  "city": "飯店所在城市",
  "name": "飯店名稱",
  "locationURL": "Google Maps URL"
}
```

| 欄位名稱 | 類型 | 必填 | 說明 |
|---------|------|------|------|
| city | 字串 | ✓ | 住宿城市 |
| name | 字串 | ✓ | 住宿設施名稱 |
| locationURL | 字串 | ✓ | Google Maps 位置連結 |

## 多日行程範例

以下提供一個包含兩日行程的完整 JSON 檔案範例：

```json
[
  {
    "date": "2025-03-16",
    "day": "星期日",
    "title": "臺北文化之旅：故宮、台北101與美食探索",
    "itinerary": [
      {
        "type": "景點",
        "name": "故宮博物院",
        "time": "09:00",
        "description": "參觀豐富的中國藝術品和文物。",
        "tips": "建議提前在網上預約門票，避開人潮。",
        "location": "台北市士林區至善路二段221號"
      },
      {
        "type": "交通",
        "name": "搭乘台北捷運",
        "time": "12:00",
        "description": "從士林站搭乘捷運前往台北101/世貿站。",
        "transportation": {
          "from": "士林站",
          "to": "台北101/世貿站",
          "departureTime": "12:00",
          "arrivalTime": "12:30",
          "segments": [
            {
              "vehicleNumber": "淡水信義線",
              "from": "士林",
              "to": "台北車站",
              "departureTime": "12:00",
              "arrivalTime": "12:20",
              "isReserved": false
            },
            {
              "vehicleNumber": "板南線",
              "from": "台北車站",
              "to": "台北101/世貿",
              "departureTime": "12:22",
              "arrivalTime": "12:30",
              "isReserved": false
            }
          ]
        }
      },
      {
        "type": "餐廳",
        "name": "鼎泰豐101店",
        "time": "13:00",
        "description": "享用米其林推薦的台灣經典美食。",
        "recommendedDishes": "小籠包、蝦仁炒飯、元盅雞湯",
        "location": "台北市信義區市府路45號台北101購物中心B1樓"
      },
      {
        "type": "購物",
        "name": "台北101觀景台及購物中心",
        "time": "15:00",
        "description": "登上觀景台欣賞台北市全景，並在購物中心自由活動。",
        "tips": "觀景台門票建議提前購買，可透過官方網站取得優惠。",
        "location": "台北市信義區市府路45號"
      },
      {
        "type": "交通",
        "name": "搭乘台灣高鐵",
        "time": "18:00",
        "description": "從台北車站搭乘高鐵前往新竹。",
        "transportation": {
          "from": "台北車站",
          "to": "新竹站",
          "departureTime": "18:00",
          "arrivalTime": "18:30",
          "segments": [
            {
              "vehicleNumber": "高鐵123次",
              "from": "台北",
              "to": "新竹",
              "departureTime": "18:00",
              "arrivalTime": "18:30",
              "isReserved": true
            }
          ]
        }
      },
      {
        "type": "其他",
        "name": "返回飯店",
        "time": "19:00",
        "description": "搭乘計程車返回飯店休息。"
      }
    ],
    "foodRecommendations": [
      "夜市小吃",
      "台灣牛肉麵",
      "芒果冰"
    ],
    "shoppingRecommendations": [
      "台灣茶葉",
      "鳳梨酥伴手禮",
      "台灣設計師品牌"
    ],
    "accommodation": {
      "city": "新竹市",
      "name": "新竹老爺酒店",
      "locationURL": "https://maps.app.goo.gl/example"
    }
  },
  {
    "date": "2025-03-17",
    "day": "星期一",
    "title": "新竹科技與歷史探索日",
    "itinerary": [
      {
        "type": "餐廳",
        "name": "飯店早餐",
        "time": "08:00",
        "description": "在飯店享用自助式早餐。"
      },
      {
        "type": "景點",
        "name": "新竹科學園區探索館",
        "time": "10:00",
        "description": "參觀台灣科技發展重鎮，了解台灣科技產業歷史。",
        "tips": "週一人潮較少，適合悠閒參觀。",
        "location": "新竹市東區新安路2號"
      },
      {
        "type": "餐廳",
        "name": "金山面海芋餐廳",
        "time": "12:30",
        "description": "品嚐新竹在地特色客家料理。",
        "recommendedDishes": "客家小炒、薑絲炒大腸、梅干扣肉",
        "location": "新竹市東區光復路二段101號"
      },
      {
        "type": "景點",
        "name": "新竹州廳",
        "time": "14:30",
        "description": "參觀日治時期的歷史建築，了解新竹的城市發展。",
        "tips": "內有新竹市美術館，可同時欣賞展覽。",
        "location": "新竹市東區中正路3號"
      },
      {
        "type": "購物",
        "name": "新竹市城隍廟商圈",
        "time": "16:00",
        "description": "在城隍廟周邊享受在地小吃和特色商店。",
        "tips": "必嚐牛肉丸和貢丸，新竹名產。",
        "location": "新竹市北區中山路75號"
      },
      {
        "type": "交通",
        "name": "搭乘火車",
        "time": "18:30",
        "description": "從新竹火車站返回台北。",
        "transportation": {
          "from": "新竹火車站",
          "to": "台北火車站",
          "departureTime": "18:30",
          "arrivalTime": "19:45",
          "segments": [
            {
              "vehicleNumber": "自強號123車次",
              "from": "新竹",
              "to": "台北",
              "departureTime": "18:30",
              "arrivalTime": "19:45",
              "isReserved": true
            }
          ]
        }
      }
    ],
    "foodRecommendations": [
      "新竹米粉",
      "客家麻糬",
      "貢丸湯"
    ],
    "shoppingRecommendations": [
      "新竹玻璃工藝品",
      "客家柿餅",
      "新竹貢丸伴手禮"
    ],
    "accommodation": {
      "city": "台北市",
      "name": "台北文華東方酒店",
      "locationURL": "https://maps.app.goo.gl/exampleTaipei"
    }
  }
]
```

## 注意事項

1. **陣列結構**：整個 JSON 檔案是一個陣列，每個元素代表一天的行程物件。陣列元素應按時間順序排列。

2. **物件關聯性**：各物件之間具有明確的關聯性：
   - 根陣列包含多個單日行程物件
   - 每個單日行程物件包含 ItineraryItem 物件陣列
   - 交通類型的 ItineraryItem 物件包含 Transportation 物件
   - Transportation 物件可包含 Segment 物件陣列
   - 每個單日行程物件可包含一個 Accommodation 物件

3. **格式要求**：JSON 格式具有嚴格的語法規定，請確保：
   - 所有字串必須使用雙引號 (`"`) 包圍
   - 正確使用逗號區隔屬性和陣列元素
   - 不同類型資料（數字、字串、布林值）使用正確的格式
   - 最外層使用方括號 (`[]`) 包圍整個多日行程陣列

4. **時間與日期格式**：
   - 日期一律使用 YYYY-MM-DD 格式
   - 時間一律使用 24 小時制 HH:MM 格式

5. **選填欄位**：未使用的選填欄位可省略或保留為空值。

6. **檔案大小考量**：
   - 行程天數較多時，檔案可能會變得較大
   - 建議對長期行程考慮適當的分割（例如每週或每月一個檔案）

7. **驗證工具**：建議使用 JSON 驗證工具（如 [JSONLint](https://jsonlint.com/)）檢查檔案格式是否正確。
