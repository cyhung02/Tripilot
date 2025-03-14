// src/components/AccommodationInfo.tsx
import { motion } from 'framer-motion';
import { Accommodation } from '../data/types';
import { SakuraIcon, HomeIcon, LocationIcon } from './common/SvgIcons';

interface AccommodationInfoProps {
    accommodation: Accommodation;
}

const AccommodationInfo: React.FC<AccommodationInfoProps> = ({
    accommodation
}) => {
    // 動畫設定
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    return (
        <div className="mb-6">
            <h3 className="text-xl font-bold mb-3 text-pink-800 flex items-center">
                住宿資訊
                <SakuraIcon size={16} className="ml-1 text-pink-400" />
            </h3>

            <motion.div
                className="bg-white rounded-lg shadow-sm p-4 border border-pink-100"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center mr-3 shrink-0">
                        <HomeIcon size={20} className="text-pink-600" />
                    </div>

                    <div>
                        <h4 className="font-medium text-pink-800 text-base">{accommodation.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{accommodation.city}</p>

                        {accommodation.locationURL && (
                            <div className="flex items-center text-xs text-pink-500 mt-2">
                                <LocationIcon size={12} className="mr-1" />
                                <a
                                    href={accommodation.locationURL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline hover:text-pink-700 transition-colors font-medium"
                                    aria-label={`在 Google Maps 中查看 ${accommodation.name} 的位置`}
                                >
                                    在 Google Maps 中查看位置
                                </a>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-3 pt-3 border-t border-pink-100">
                    <div className="text-xs text-gray-500 italic">
                        <span className="font-medium text-pink-600">小提示:</span> 請記得攜帶預訂證明和護照辦理入住手續
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default AccommodationInfo;