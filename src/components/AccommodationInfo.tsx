import { motion } from 'framer-motion';

interface AccommodationInfoProps {
    accommodation: string;
    checkInTime?: string;
    checkOutTime?: string;
    address?: string;
}

const AccommodationInfo: React.FC<AccommodationInfoProps> = ({
    accommodation,
    checkInTime = "15:00",
    checkOutTime = "11:00",
    address
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
                <svg className="w-4 h-4 ml-1 text-pink-400" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50 15 C 55 10, 65 0, 70 5 C 80 10, 95 30, 90 45 C 85 60, 70 80, 50 85 C 30 80, 15 60, 10 45 C 5 30, 20 10, 30 5 C 35 0, 45 10, 50 15"
                        fill="currentColor" />
                </svg>
            </h3>

            <motion.div
                className="bg-white rounded-lg shadow-sm p-4 border border-pink-100"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center mr-3 shrink-0">
                        <svg className="w-5 h-5 text-pink-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                    </div>

                    <div>
                        <h4 className="font-medium text-pink-800 text-base">{accommodation}</h4>

                        {address && (
                            <p className="text-sm text-gray-600 mt-1">{address}</p>
                        )}

                        <div className="mt-2 flex flex-wrap gap-2">
                            <div className="bg-pink-50 px-3 py-1 rounded-full flex items-center text-xs text-pink-700">
                                <svg className="w-3 h-3 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12 6 12 12 16 14"></polyline>
                                </svg>
                                入住: {checkInTime}
                            </div>

                            <div className="bg-pink-50 px-3 py-1 rounded-full flex items-center text-xs text-pink-700">
                                <svg className="w-3 h-3 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12 6 12 12 8 14"></polyline>
                                </svg>
                                退房: {checkOutTime}
                            </div>
                        </div>

                        <div className="mt-3 text-xs text-pink-600 flex items-center">
                            <svg className="w-3 h-3 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                            已預訂
                        </div>
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