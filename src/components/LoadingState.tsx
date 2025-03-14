// src/components/LoadingState.tsx
import { motion } from 'framer-motion';
import { SakuraIcon } from './common/SvgIcons';

/**
 * 載入中狀態元件
 * 顯示一個旋轉的櫻花圖標和載入中文字
 */
const LoadingState: React.FC = () => {
    return (
        <div className="flex-grow flex flex-col items-center justify-center p-8">
            <div className="text-center">
                <motion.div
                    className="w-20 h-20 mx-auto mb-4"
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                >
                    <SakuraIcon size="100%" color="#F472B6" />
                </motion.div>
                <h2 className="text-xl font-bold text-pink-700 mb-2">正在載入行程資料</h2>
                <p className="text-pink-600">請稍候，我們正在準備您的旅程...</p>
            </div>
        </div>
    );
};

export default LoadingState;