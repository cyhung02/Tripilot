// src/components/RecommendationSection.tsx
import { motion } from 'framer-motion';
import { FoodIcon, ShoppingIcon, SakuraIcon } from './common/SvgIcons';

interface RecommendationSectionProps {
    title: string;
    items: string[];
    iconType: 'food' | 'shopping' | 'activity';
}

const RecommendationSection: React.FC<RecommendationSectionProps> = ({
    title,
    items,
    iconType
}) => {
    // 選擇圖標和樣式顏色基於類型
    const getIconAndColor = () => {
        switch (iconType) {
            case 'food':
                return {
                    icon: <FoodIcon size={12} className="text-rose-500" />,
                    bgColor: 'bg-rose-100',
                    textColor: 'text-rose-500'
                };
            case 'shopping':
                return {
                    icon: <ShoppingIcon size={12} className="text-pink-600" />,
                    bgColor: 'bg-pink-100',
                    textColor: 'text-pink-600'
                };
            case 'activity':
            default:
                return {
                    icon: <SakuraIcon size={12} className="text-purple-500" />,
                    bgColor: 'bg-purple-100',
                    textColor: 'text-purple-500'
                };
        }
    };

    const { icon, bgColor } = getIconAndColor();

    // 為元素添加動畫
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4,
                ease: "easeOut"
            }
        }
    };

    return (
        <div className="mb-6">
            <h3 className="text-xl font-bold mb-3 text-pink-800 flex items-center">
                {title}
                <SakuraIcon size={16} className="ml-1 text-pink-400" />
            </h3>

            <motion.div
                className="bg-white rounded-lg shadow-sm p-4 border border-pink-100"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <ul className="space-y-2" aria-label={title}>
                    {items.map((item, index) => (
                        <motion.li
                            key={index}
                            className="flex items-center"
                            variants={itemVariants}
                        >
                            <div className={`w-6 h-6 rounded-full ${bgColor} flex items-center justify-center mr-3`}>
                                {icon}
                            </div>
                            <div>
                                <p className="font-medium text-sm">{item}</p>
                            </div>
                        </motion.li>
                    ))}
                </ul>
            </motion.div>
        </div>
    );
};

export default RecommendationSection;