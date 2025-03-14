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
            d="M50 15c5-5 15-15 20-10 10 5 25 25 20 40S70 80 50 85c-20-5-35-25-40-40S20 10 30 5c5-5 15 5 20 10"
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
        <path d="M12 2C8.69 2 6 4.69 6 8c0 4.5 6 12 6 12s6-7.5 6-12c0-3.31-2.69-6-6-6zm0 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
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
        <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3" />
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
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18" />
        <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
);

// 交通圖示
export const TransportIcon: React.FC<IconProps> = ({ size = 24, className = "", color = "currentColor" }) => (
    <svg
        width={size}
        height={size}
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M15.05 28.695a2.4 2.4 0 1 0 2.4 2.39 2.4 2.4 0 0 0-2.4-2.39Zm18.198 0a2.4 2.4 0 1 0 2.391 2.39 2.4 2.4 0 0 0-2.39-2.39ZM24.141 4.5a30.052 30.052 0 0 1 5.23.438 23.777 23.777 0 0 1 5.917 1.813 5.777 5.777 0 0 1 2.67 1.992 6.447 6.447 0 0 1 .7 2.246l1.527.03c2.48-.207 2.428 5.352-.127 5.223-.034 3.168-.07 4.6.022 5.322v16.814H37.4v2.68c.215 3.256-4.787 3.256-4.572 0v-2.68H15.455v2.68c.215 3.256-4.787 3.256-4.572 0v-2.68h-2.68V21.564l.113-5.342c-2.909.33-3.243-5.455-.127-5.223l1.478-.153a5.618 5.618 0 0 1 .628-2.102 5.777 5.777 0 0 1 2.67-1.992 23.779 23.779 0 0 1 5.917-1.813 30.052 30.052 0 0 1 5.26-.439Zm-10.499 6.824a1.404 1.404 0 0 0-1.345 1.215l.025 9.328a1.404 1.404 0 0 0 1.155 1.583h21.16a1.414 1.414 0 0 0 1.415-1.375 1.22 1.22 0 0 0 0-.189l-.047-9.327a1.405 1.405 0 0 0-1.395-1.215H13.692Z" />
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
        <path d="M12 19V5m-7 7 7-7 7 7" />
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
        <path d="m6 9 6 6 6-6" />
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
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <path d="M9 22V12h6v10" />
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
        <path d="M21 12H3m9-9v18m-9-5 18-8M3 8l18 8M8 3l8 18m0-18L8 21" />
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
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <path d="M22 4 12 14.01l-3-3" />
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
        <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
    </svg>
);