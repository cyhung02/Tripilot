import React from 'react';

interface FoodRecommendationProps {
    recommendations: string[];
    themeColor: string;
}

export const FoodRecommendation: React.FC<FoodRecommendationProps> = ({ recommendations, themeColor }) => {
    return (
        <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">美食推薦</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendations.map((food, index) => (
                    <div key={index} className={`${themeColor} p-4 rounded-lg flex items-center`}>
                        <div className="w-10 h-10 mr-3 flex-shrink-0">
                            {/* 日本食物圖示 */}
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12,2 C6.5,2 2,6.5 2,12 C2,17.5 6.5,22 12,22 C17.5,22 22,17.5 22,12 C22,6.5 17.5,2 12,2 Z" stroke="currentColor" strokeWidth="1.5" />
                                <path d="M8,14 C9.1045695,14 10,13.1045695 10,12 C10,10.8954305 9.1045695,10 8,10 C6.8954305,10 6,10.8954305 6,12 C6,13.1045695 6.8954305,14 8,14 Z" fill="currentColor" />
                                <path d="M16,14 C17.1045695,14 18,13.1045695 18,12 C18,10.8954305 17.1045695,10 16,10 C14.8954305,10 14,10.8954305 14,12 C14,13.1045695 14.8954305,14 16,14 Z" fill="currentColor" />
                                <path d="M12,18 C14.2091,18 16,16.2091 16,14 L8,14 C8,16.2091 9.79086,18 12,18 Z" fill="currentColor" />
                            </svg>
                        </div>
                        <span className="text-lg">{food}</span>
                    </div>
                ))}
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700 italic">
                    品嚐當地美食是旅遊體驗的重要部分。這些推薦食物是當地特色，不容錯過！
                </p>
            </div>
        </div>
    );
};