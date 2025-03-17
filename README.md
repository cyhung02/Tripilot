# Tripilot - 通用旅行行程應用

Tripilot 是一個基於 PWA（漸進式網頁應用）的旅行行程管理工具，支援從 JSON 檔案導入行程資料，提供優雅的視覺介面和實用的管理功能。應用支援離線瀏覽並可安裝到主畫面，讓旅行規劃更加輕鬆便利。

## 🌸 功能亮點

- **通用行程導入**：支援從 JSON 檔案導入行程資料
- **智能行程顯示**：自動識別當前日期並顯示對應行程
- **多類型行程支援**：涵蓋景點、交通、餐廳、購物等
- **交通時間軸**：清晰展示列車、巴士、航班等轉乘資訊
- **美食與購物推薦**：每日特色推薦
- **離線瀏覽**：完整的 PWA 功能，無網路也能使用
- **美學設計**：精緻視覺風格，搭配櫻花飄落動畫
- **響應式佈局**：適配手機、平板和桌面設備

## 🖼️ 應用預覽

應用採用簡約美學設計，使用柔和低飽和度色彩，結合清晰的線條和空間佈局，打造平靜優雅的視覺體驗。主要特色包括：
- 日曆視圖展示行程日期
- 每日行程時間軸設計
- 交通轉乘可視化時間軸
- 可展開的詳細資訊卡片
- 櫻花飄落動畫效果
- 支援離線模式與一鍵安裝

## 🛠️ 技術棧

- **前端框架**：React 19 + TypeScript
- **建構工具**：Vite 6
- **樣式設計**：Tailwind CSS 4
- **動畫效果**：Framer Motion
- **日期處理**：date-fns
- **PWA 支援**：vite-plugin-pwa
- **離線緩存**：Workbox
- **程式碼規範**：ESLint

## 📦 安裝與啟動

### 前置條件

- Node.js v20 或更高版本
- npm v10 或更高版本

### 安裝步驟

1. 複製專案至本機：
   ```bash
   git clone https://github.com/yourusername/tripilot.git
   cd tripilot
   ```

2. 安裝依賴：
   ```bash
   npm install
   ```

3. 啟動開發伺服器：
   ```bash
   npm run dev
   ```
   瀏覽 `http://localhost:5173`。

4. 建構生產版本：
   ```bash
   npm run build
   ```
   輸出至 `dist` 資料夾，可部署至靜態檔案伺服器。

## 📂 專案結構

```
tripilot/
├── public/               # 靜態資源
│   ├── data/             # 行程資料 JSON
│   ├── sakura-icon.svg   # 應用圖示
│   └── offline.html      # 離線頁面
├── src/
│   ├── components/       # React 元件
│   ├── context/          # React Context
│   ├── data/             # 資料類型定義
│   ├── hooks/            # 自訂 Hooks
│   ├── providers/        # Context Providers
│   ├── utils/            # 工具函數
│   ├── App.tsx           # 主應用元件
│   └── main.tsx          # 應用入口
├── vite.config.ts        # Vite 設定
├── tsconfig.json         # TypeScript 設定
└── ...
```

## 📝 行程資料結構

行程資料儲存在 `public/data/itinerary.json`，格式遵循 `itineraryJsonSpec.md` 規範。

## 🚀 開發指南

### 自訂行程資料

1. 根據 `itineraryJsonSpec.md` 規範建立 JSON 檔案
2. 替換 `public/data/itinerary.json` 或修改資料讀取路徑
3. 重新啟動應用以載入新行程

### 自訂主題

修改 `src/utils/ItemTypeConfig.tsx` 中的色彩設定：

```typescript
export const typeConfig: Record<string, TypeConfig> = {
  '景點': {
    background: 'bg-white',
    detailPanel: 'bg-pink-50 border-pink-200',
    iconClass: 'bg-pink-100 text-pink-600',
    icon: <LocationIcon size={16} />,
  },
  // ...
};
```

### 自訂動畫效果

調整 `src/components/CherryBlossomFall.tsx` 中的櫻花飄落效果：

```typescript
const numberOfPetals = 8; // 花瓣數量
const colors = ["#FBCFE8", "#F9A8D4", "#F472B6", "#FDF2F8"]; // 花瓣色彩
const MAX_PETAL_SIZE = 20; // 最大尺寸限制
```

### PWA 設定

PWA 設定位於 `vite.config.ts` 的 `VitePWA` 外掛，可調整離線緩存策略與應用圖示。

## 📱 部署說明

### 靜態網站部署

1. 建構生產版本：
   ```bash
   npm run build
   ```

2. 將 `dist` 資料夾部署至 Cloudflare Pages、GitHub Pages 等平台。
