// src/components/CherryBlossomFall.tsx
import { useState, useEffect, memo } from 'react';
import { motion } from 'framer-motion';

interface CherryBlossomStyle {
    id: number;
    size: number;
    top: number;
    left: number;
    color: string;
    duration: number;
    delay: number;
    rotateDirection: number;
}

/**
 * 櫻花花瓣元件 - 單個花瓣
 */
const CherryBlossom = memo(({ style }: { style: CherryBlossomStyle }) => {
    return (
        <motion.div
            className="absolute opacity-70 pointer-events-none z-0"
            style={{
                ...style,
                willChange: "transform, opacity"
            }}
            animate={{
                y: [style.top, window.innerHeight + 100],
                x: [style.left, style.left + (Math.random() * 150 - 75)],
                rotate: [0, 360 * style.rotateDirection],
            }}
            transition={{
                duration: style.duration,
                ease: "linear",
                repeat: Infinity,
                delay: style.delay,
            }}
        >
            <svg width={style.size} height={style.size} viewBox="0 0 100 100" fill="none">
                <path d="M 51 18 C 45 15 35 10 30 20 C 25 30 19 45 23 60 C 27 76 35 85 50 95 C 65 85 75 75 77 59 C 78 44 75 30 70 20 C 65 10 55 15 51 18 Z"
                    fill={style.color}
                    stroke={style.color}
                    strokeWidth="1" />
            </svg>
        </motion.div>
    );
});

CherryBlossom.displayName = 'CherryBlossom';

/**
 * 櫻花花瓣飄落動畫元件
 * 效能優化：
 * 1. 只在組件掛載時生成花瓣，不隨渲染更新
 * 2. 使用 memo 減少不必要的重新渲染
 * 3. 為每個花瓣預先計算持續時間和延遲
 */
const CherryBlossomFall = () => {
    // 明確定義 petals 的類型
    const [petals, setPetals] = useState<CherryBlossomStyle[]>([]);

    useEffect(() => {
        const numberOfPetals = 8; // 花瓣數量

        const colors = ["#FBCFE8", "#F9A8D4", "#F472B6", "#FDF2F8"]; // 多種粉色調
        const MAX_PETAL_SIZE = 20; // 最大尺寸限制

        // 預先生成所有花瓣的配置
        const newPetals: CherryBlossomStyle[] = Array.from({ length: numberOfPetals }).map((_, i) => ({
            id: i,
            size: Math.min(15 + Math.random() * 5, MAX_PETAL_SIZE),
            top: -100 - Math.random() * 500, // 開始位置在螢幕上方
            left: Math.random() * window.innerWidth, // 隨機水平位置
            color: colors[Math.floor(Math.random() * colors.length)], // 隨機顏色
            duration: 10 + Math.random() * 20, // 預先計算持續時間
            delay: Math.random() * 5, // 預先計算延遲
            rotateDirection: Math.random() > 0.5 ? 1 : -1, // 旋轉方向
        }));

        setPetals(newPetals);

        // 視窗大小變化時重新計算
        const handleResize = () => {
            setPetals(prevPetals =>
                prevPetals.map(petal => ({
                    ...petal,
                    left: Math.random() * window.innerWidth,
                }))
            );
        };

        // 添加視窗大小變化監聽
        window.addEventListener('resize', handleResize);

        // 清理函數
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []); // 僅在元件掛載時執行一次

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
            {petals.map(petal => (
                <CherryBlossom key={petal.id} style={petal} />
            ))}
        </div>
    );
};

export default memo(CherryBlossomFall);