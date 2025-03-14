// src/components/common/SvgIcons.tsx

// 定義圖示元件的共通屬性類型
interface IconProps {
    size?: number | string;
    className?: string;
    color?: string;
}

// 櫻花圖示
export const SakuraIcon: React.FC<IconProps> = ({ size = 24, className = "", color = "currentColor" }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <path
            d="M50 15 C 55 10, 65 0, 70 5 C 80 10, 95 30, 90 45 C 85 60, 70 80, 50 85 C 30 80, 15 60, 10 45 C 5 30, 20 10, 30 5 C 35 0, 45 10, 50 15"
            fill={color}
        />
    </svg>
);

// 地點圖示
export const LocationIcon: React.FC<IconProps> = ({ size = 24, className = "", color = "currentColor" }) => (
    <svg
        width={size}
        height={size}
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M12 2c-3.31 0-6 2.69-6 6 0 4.5 6 12 6 12s6-7.5 6-12c0-3.31-2.69-6-6-6zm0 9a3 3 0 100-6 3 3 0 000 6z"></path>
    </svg>
);

// 餐飲圖示
export const FoodIcon: React.FC<IconProps> = ({ size = 24, className = "", color = "currentColor" }) => (
    <svg
        width={size}
        height={size}
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
        <line x1="6" y1="1" x2="6" y2="4"></line>
        <line x1="10" y1="1" x2="10" y2="4"></line>
        <line x1="14" y1="1" x2="14" y2="4"></line>
    </svg>
);

// 購物圖示
export const ShoppingIcon: React.FC<IconProps> = ({ size = 24, className = "", color = "currentColor" }) => (
    <svg
        width={size}
        height={size}
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <path d="M16 10a4 4 0 0 1-8 0"></path>
    </svg>
);

// 交通圖示
export const TransportIcon: React.FC<IconProps> = ({ size = 24, className = "", color = "currentColor" }) => (
    <svg
        width={size}
        height={size}
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M9 18l6-6-6-6" />
    </svg>
);

// 箭頭向上圖示
export const ArrowUpIcon: React.FC<IconProps> = ({ size = 24, className = "", color = "currentColor" }) => (
    <svg
        width={size}
        height={size}
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
);

// 箭頭向下圖示
export const ArrowDownIcon: React.FC<IconProps> = ({ size = 24, className = "", color = "currentColor" }) => (
    <svg
        width={size}
        height={size}
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M6 9l6 6 6-6"></path>
    </svg>
);

// 家/住宿圖示
export const HomeIcon: React.FC<IconProps> = ({ size = 24, className = "", color = "currentColor" }) => (
    <svg
        width={size}
        height={size}
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
);

// 備註/提示圖示
export const TipIcon: React.FC<IconProps> = ({ size = 24, className = "", color = "currentColor" }) => (
    <svg
        width={size}
        height={size}
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M21 12H3M12 3v18M3 16l18-8M3 8l18 8M8 3l8 18M16 3L8 21"></path>
    </svg>
);

// 檢查/確認圖示
export const CheckIcon: React.FC<IconProps> = ({ size = 24, className = "", color = "currentColor" }) => (
    <svg
        width={size}
        height={size}
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
);

// 其他/列表圖示
export const ListIcon: React.FC<IconProps> = ({ size = 24, className = "", color = "currentColor" }) => (
    <svg
        width={size}
        height={size}
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <line x1="8" y1="6" x2="21" y2="6"></line>
        <line x1="8" y1="12" x2="21" y2="12"></line>
        <line x1="8" y1="18" x2="21" y2="18"></line>
        <line x1="3" y1="6" x2="3.01" y2="6"></line>
        <line x1="3" y1="12" x2="3.01" y2="12"></line>
        <line x1="3" y1="18" x2="3.01" y2="18"></line>
    </svg>
);