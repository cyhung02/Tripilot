import React, { useState } from 'react';
import { ScheduleDay } from '../../types/Schedule';
import { useTheme } from '../../contexts/ThemeContext';
import { FoodRecommendation } from './FoodRecommendation';
import { MustBuyItems } from './MustBuyItems';
import { ActivityCard } from '../ui/ActivityCard';

interface DailyScheduleProps {
  day: ScheduleDay;
}

export const DailySchedule: React.FC<DailyScheduleProps> = ({ day }) => {
  const { themeColors } = useTheme();
  const [activeTab, setActiveTab] = useState<'schedule' | 'food' | 'shopping'>('schedule');
  
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500">
      {/* 日期說明 */}
      <div className={`${themeColors.primary} p-4 transition-colors duration-500`}>
        <h2 className="text-2xl font-bold text-gray-800">{day.date} | {day.title}</h2>
        <p className="text-gray-700">{day.description}</p>
      </div>
      
      {/* 標籤頁切換 */}
      <div className="flex border-b">
        <button
          className={`flex-1 py-3 font-medium text-center transition-colors ${
            activeTab === 'schedule' 
              ? `${themeColors.accent} text-white` 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
          onClick={() => setActiveTab('schedule')}
        >
          行程安排
        </button>
        <button
          className={`flex-1 py-3 font-medium text-center transition-colors ${
            activeTab === 'food' 
              ? `${themeColors.accent} text-white` 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
          onClick={() => setActiveTab('food')}
        >
          美食推薦
        </button>
        {day.mustBuyItems && day.mustBuyItems.length > 0 && (
          <button
            className={`flex-1 py-3 font-medium text-center transition-colors ${
              activeTab === 'shopping' 
                ? `${themeColors.accent} text-white` 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('shopping')}
          >
            必買推薦
          </button>
        )}
      </div>
      
      {/* 內容區域 */}
      <div className="p-4">
        {activeTab === 'schedule' && (
          <div className="space-y-4">
            {/* 主要活動 */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">主要活動</h3>
              <div className="space-y-3">
                {day.mainActivities.map((activity, index) => (
                  <ActivityCard 
                    key={index} 
                    title={activity.title} 
                    details={activity.details || []} 
                    themeColor={themeColors.secondary}
                  />
                ))}
              </div>
            </div>
            
            {/* 住宿 */}
            <div className="mt-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">住宿</h3>
              <div className={`${themeColors.secondary} p-4 rounded-lg`}>
                <p className="text-lg font-medium">{day.accommodation.name}</p>
                {day.accommodation.location && (
                  <p className="text-gray-600">{day.accommodation.location}</p>
                )}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'food' && (
          <FoodRecommendation recommendations={day.foodRecommendations} themeColor={themeColors.secondary} />
        )}
        
        {activeTab === 'shopping' && day.mustBuyItems && (
          <MustBuyItems items={day.mustBuyItems} themeColor={themeColors.secondary} />
        )}
      </div>
    </div>
  );
};