import React, { useState } from 'react';
import { scheduleData } from './data/travelSchedule';

// 標頭元件
const Header = ({ title, subtitle, themeColor }) => {
  return (
    <header className={`${themeColor} shadow-md transition-colors duration-500 py-6 px-4 relative z-10`}>
      <div className="container mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{title}</h1>
        <h2 className="text-xl md:text-2xl text-gray-700">{subtitle}</h2>
        
        {/* 日本風格裝飾元素 */}
        <div className="absolute top-0 left-0 w-24 h-24 opacity-20">
          <svg viewBox="0 0 100 100">
            <path d="M20,20 L80,20 L80,80 L20,80 Z" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M30,30 L70,30 L70,70 L30,70 Z" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M40,40 L60,40 L60,60 L40,60 Z" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
        
        <div className="absolute top-0 right-0 w-24 h-24 opacity-20">
          <svg viewBox="0 0 100 100">
            <path d="M20,20 L80,20 L80,80 L20,80 Z" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M30,30 L70,30 L70,70 L30,70 Z" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M40,40 L60,40 L60,60 L40,60 Z" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </header>
  );
};

// 導航元件
const Navigation = ({ days, selectedDay, onDayChange, themeColor }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="mb-8">
      {/* 手機版下拉選單 */}
      <div className="md:hidden">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`${themeColor.accent} text-white w-full py-3 px-4 rounded-lg flex justify-between items-center mb-2 focus:outline-none`}
        >
          <span>{days.find(day => day.id === selectedDay)?.date} | {days.find(day => day.id === selectedDay)?.title}</span>
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {isOpen && (
          <div className={`${themeColor.secondary} rounded-lg shadow-lg overflow-hidden mb-4 transition-all duration-300 ease-in-out max-h-60 overflow-y-auto`}>
            {days.map(day => (
              <button
                key={day.id}
                onClick={() => {
                  onDayChange(day.id);
                  setIsOpen(false);
                }}
                className={`w-full text-left py-3 px-4 hover:bg-opacity-50 transition ${
                  selectedDay === day.id ? `${themeColor.accent} text-white` : 'hover:bg-gray-100'
                }`}
              >
                {day.date} | {day.title}
              </button>
            ))}
          </div>
        )}
      </div>
      
      {/* 桌面版水平捲動列表 */}
      <div className="hidden md:block">
        <div 
          className="flex overflow-x-auto py-2 scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {days.map(day => (
            <button
              key={day.id}
              onClick={() => onDayChange(day.id)}
              className={`whitespace-nowrap mx-1 py-2 px-4 rounded-full transition-all duration-300 ${
                selectedDay === day.id
                  ? `${themeColor.accent} text-white shadow-md transform scale-105`
                  : `${themeColor.secondary} hover:bg-opacity-70`
              }`}
            >
              {day.date} | {day.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// 活動卡片元件
const ActivityCard = ({ title, details, themeColor }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className={`${themeColor} rounded-lg overflow-hidden transition-all duration-300`}>
      <div 
        className="p-4 flex justify-between items-center cursor-pointer"
        onClick={() => details.length > 0 && setIsExpanded(!isExpanded)}
      >
        <h4 className="text-lg font-medium">{title}</h4>
        {details.length > 0 && (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-5 w-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </div>
      
      {isExpanded && details.length > 0 && (
        <div className="bg-white bg-opacity-50 p-4 border-t border-gray-200">
          <ul className="list-disc pl-5 space-y-1">
            {details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// 美食推薦元件
const FoodRecommendation = ({ recommendations, themeColor }) => {
  return (
    <div>
      <h3 className="text-xl font-bold text-gray-800 mb-4">美食推薦</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendations.map((food, index) => (
          <div key={index} className={`${themeColor} p-4 rounded-lg flex items-center`}>
            <div className="w-10 h-10 mr-3 flex-shrink-0">
              {/* 日本食物圖示 */}
              <svg viewBox="0 0 24 24" fill="none">
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

// 必買物品元件
const MustBuyItems = ({ items, themeColor }) => {
  return (
    <div>
      <h3 className="text-xl font-bold text-gray-800 mb-4">必買推薦</h3>
      
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className={`${themeColor} p-4 rounded-lg flex items-center`}>
            <div className="w-8 h-8 mr-3 flex-shrink-0">
              {/* 購物袋圖示 */}
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M16,7 C16,4.79086 14.2091,3 12,3 C9.79086,3 8,4.79086 8,7" stroke="currentColor" strokeWidth="1.5" />
                <path d="M3.69435,9.35258 C3.83942,7.99797 4.98595,7 6.34949,7 L17.6505,7 C19.014,7 20.1606,7.99797 20.3057,9.35258 L21.6511,20.3526 C21.8227,22.0448 20.5099,23.5346 18.8167,23.5346 L5.18331,23.5346 C3.49012,23.5346 2.17732,22.0448 2.34894,20.3526 L3.69435,9.35258 Z" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
            <span>{item}</span>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-gray-700 italic">
          帶些當地特色紀念品或伴手禮回家，讓旅行的回憶更加豐富！
        </p>
      </div>
    </div>
  );
};

// 主題元素與背景
const ThemeElements = ({ themeType }) => {
  // 櫻花動畫
  const Sakura = () => {
    const petals = [];
    for (let i = 0; i < 15; i++) {
      const size = Math.random() * 10 + 15;
      const left = Math.random() * 100;
      const animationDuration = Math.random() * 10 + 10;
      const delay = Math.random() * 15;
      
      petals.push(
        <div 
          key={i}
          className="absolute opacity-60"
          style={{
            left: `${left}%`,
            top: `-10%`,
            width: `${size}px`,
            height: `${size}px`,
            animation: `fall ${animationDuration}s linear ${delay}s infinite`,
          }}
        >
          <svg viewBox="0 0 40 40">
            <path
              d="M20 1C12 1 8 7 8 13C8 19 12 24 10 28C8 32 1 35 1 35C1 35 10 39 20 39C30 39 39 35 39 35C39 35 32 32 30 28C28 24 32 19 32 13C32 7 28 1 20 1Z"
              fill="#ffb7c5"
              stroke="#ff9eb5"
              strokeWidth="1"
            />
          </svg>
        </div>
      );
    }
    
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {petals}
        <style jsx>{`
          @keyframes fall {
            0% {
              transform: translate(0, -10%) rotate(0deg);
            }
            100% {
              transform: translate(${Math.random() > 0.5 ? '' : '-'}50px, 100vh) rotate(720deg);
            }
          }
        `}</style>
      </div>
    );
  };
  
  // 不同的主題元素
  const renderThemeElement = () => {
    switch (themeType) {
      case 'osaka-castle':
        return (
          <>
            <Sakura />
            <div className="absolute bottom-0 left-0 w-full opacity-10 pointer-events-none">
              <div className="container mx-auto relative h-64">
                <svg viewBox="0 0 800 400" className="absolute bottom-0 left-0 w-full h-full">
                  <rect x="300" y="300" width="200" height="100" fill="#8B4513" />
                  <rect x="320" y="250" width="160" height="50" fill="#8B4513" />
                  <rect x="340" y="200" width="120" height="50" fill="#8B4513" />
                  <rect x="360" y="150" width="80" height="50" fill="#8B4513" />
                  <path d="M360,150 L400,100 L440,150 Z" fill="#333" />
                  <circle cx="400" cy="110" r="10" fill="#FFD700" />
                </svg>
              </div>
            </div>
          </>
        );
      
      case 'onsen':
        return (
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute bottom-0 left-0 w-full h-24 bg-cyan-200 bg-opacity-20"></div>
            <div className="absolute bottom-0 left-10 w-16 h-8 bg-gray-600 rounded-t-full"></div>
            <div className="absolute bottom-0 right-12 w-14 h-7 bg-gray-500 rounded-t-full"></div>
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  left: `${Math.random() * 80 + 10}%`,
                  bottom: '24px',
                  width: `${Math.random() * 30 + 20}px`,
                  height: `${Math.random() * 30 + 20}px`,
                  opacity: Math.random() * 0.5 + 0.3,
                  animation: `riseBubble ${Math.random() * 8 + 4}s ease-in ${Math.random() * 10}s infinite`
                }}
              ></div>
            ))}
            <style jsx>{`
              @keyframes riseBubble {
                0% {
                  transform: translateY(0) scale(1);
                  opacity: 0.5;
                }
                100% {
                  transform: translateY(-100vh) scale(0);
                  opacity: 0;
                }
              }
            `}</style>
          </div>
        );
        
      case 'peace-memorial':
        return (
          <>
            <Sakura />
            <div className="absolute bottom-0 w-full opacity-10 pointer-events-none">
              <div className="container mx-auto relative h-64">
                <svg viewBox="0 0 800 400" className="absolute bottom-0 left-0 w-full h-full">
                  <path d="M300,300 L300,150 A100,100 0 0,1 500,150 L500,300 Z" fill="none" stroke="#555" strokeWidth="3" />
                  <path d="M600,300 L650,180 L700,300 Z" fill="none" stroke="#555" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </>
        );
        
      case 'torii-gate':
        return (
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute bottom-0 left-0 w-full h-48 bg-blue-200 bg-opacity-20"></div>
            <div className="absolute bottom-48 left-1/2 transform -translate-x-1/2 w-64 h-64 opacity-30">
              <svg viewBox="0 0 200 200">
                <rect x="30" y="150" width="140" height="10" fill="#e11d48" />
                <rect x="40" y="70" width="10" height="80" fill="#e11d48" />
                <rect x="150" y="70" width="10" height="80" fill="#e11d48" />
                <rect x="20" y="70" width="160" height="10" fill="#e11d48" />
                <rect x="30" y="60" width="140" height="10" fill="#e11d48" />
                <rect x="35" y="50" width="130" height="10" fill="#e11d48" />
              </svg>
            </div>
          </div>
        );
        
      case 'onomichi-cat':
        return (
          <>
            <Sakura />
            <div className="absolute bottom-20 right-10 w-40 h-40 opacity-40 animate-bounce-slow">
              <svg viewBox="0 0 100 100">
                <ellipse cx="50" cy="60" rx="25" ry="20" fill="#4B5563" />
                <circle cx="50" cy="35" r="15" fill="#4B5563" />
                <path d="M38,25 L35,15 L45,22 Z" fill="#4B5563" />
                <path d="M62,25 L65,15 L55,22 Z" fill="#4B5563" />
                <ellipse cx="43" cy="33" rx="3" ry="4" fill="#FFFFFF" />
                <ellipse cx="57" cy="33" rx="3" ry="4" fill="#FFFFFF" />
                <ellipse cx="43" cy="33" rx="1.5" ry="2" fill="#000000" />
                <ellipse cx="57" cy="33" rx="1.5" ry="2" fill="#000000" />
                <path d="M50,38 L48,42 L52,42 Z" fill="#FCA5A5" />
                <path d="M50,42 L50,45" stroke="#000000" strokeWidth="0.5" fill="none" />
                <path d="M75,60 C85,55 85,45 80,40" stroke="#4B5563" strokeWidth="6" fill="none" />
              </svg>
            </div>
            <style jsx>{`
              @keyframes bounce-slow {
                0%, 100% {
                  transform: translateY(0);
                }
                50% {
                  transform: translateY(-10px);
                }
              }
              .animate-bounce-slow {
                animation: bounce-slow 6s infinite;
              }
            `}</style>
          </>
        );
        
      case 'tsuyama-castle':
        return (
          <>
            <Sakura />
            <div className="absolute bottom-0 w-full opacity-15 pointer-events-none">
              <div className="container mx-auto relative h-80">
                <svg viewBox="0 0 800 400" className="absolute bottom-0 left-0 w-full h-full">
                  <rect x="200" y="250" width="400" height="150" fill="#9CA3AF" />
                  <rect x="325" y="130" width="150" height="100" fill="#D1D5DB" />
                  <polygon points="325,130 400,80 475,130" fill="#4B5563" />
                  <rect x="395" y="80" width="10" height="20" fill="#4B5563" />
                  <circle cx="400" cy="75" r="5" fill="#FCD34D" />
                </svg>
              </div>
            </div>
          </>
        );
        
      case 'himeji-castle':
        return (
          <>
            <Sakura />
            <div className="absolute bottom-0 w-full opacity-15 pointer-events-none">
              <div className="container mx-auto relative h-96">
                <svg viewBox="0 0 800 500" className="absolute bottom-0 left-0 w-full h-full">
                  <rect x="250" y="350" width="300" height="150" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="2" />
                  <rect x="275" y="300" width="250" height="50" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="2" />
                  <rect x="300" y="250" width="200" height="50" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="2" />
                  <rect x="325" y="200" width="150" height="50" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="2" />
                  <rect x="350" y="150" width="100" height="50" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="2" />
                  <rect x="375" y="100" width="50" height="50" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="2" />
                  <path d="M365,90 L400,60 L435,90" fill="#9CA3AF" />
                </svg>
              </div>
            </div>
          </>
        );
        
      case 'kurashiki':
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-indigo-100 to-indigo-50 opacity-70"></div>
            <div className="absolute bottom-0 w-full opacity-20">
              <svg viewBox="0 0 1000 300" className="w-full">
                <rect x="0" y="200" width="1000" height="100" fill="#93C5FD" />
                <rect x="50" y="100" width="200" height="100" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="2" />
                <polygon points="50,100 150,50 250,100" fill="#4B5563" />
                <rect x="300" y="80" width="150" height="120" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="2" />
                <polygon points="300,80 375,40 450,80" fill="#4B5563" />
              </svg>
            </div>
            <div className="absolute top-20 left-20 w-32 h-16 bg-white rounded-full opacity-40 animate-float-slow"></div>
            <div className="absolute top-40 right-40 w-48 h-20 bg-white rounded-full opacity-30 animate-float-slow" style={{animationDelay: '2s'}}></div>
            <style jsx>{`
              @keyframes float-slow {
                0%, 100% {
                  transform: translateY(0) translateX(0);
                }
                50% {
                  transform: translateY(-10px) translateX(10px);
                }
              }
              .animate-float-slow {
                animation: float-slow 15s ease-in-out infinite;
              }
            `}</style>
          </div>
        );
        
      case 'okayama-garden':
        return (
          <>
            <Sakura />
            <div className="absolute bottom-0 w-full opacity-20 pointer-events-none">
              <svg viewBox="0 0 1000 400" className="w-full">
                <path d="M0,300 L1000,300 L1000,400 L0,400 Z" fill="#93C5FD" />
                <ellipse cx="500" cy="320" rx="200" ry="40" fill="#16A34A" />
                <path d="M400,320 Q450,250 500,320" fill="#16A34A" />
                <path d="M500,320 Q550,270 600,320" fill="#16A34A" />
                <path d="M800,180 L800,300 L900,300 L900,180 Z" fill="#1F2937" />
                <path d="M830,120 L850,100 L870,120 Z" fill="#1F2937" />
              </svg>
            </div>
          </>
        );
        
      default: // 'sakura'
        return <Sakura />;
    }
  };
  
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {renderThemeElement()}
    </div>
  );
};

// 每日行程元件
const DailySchedule = ({ day, themeColor }) => {
  const [activeTab, setActiveTab] = useState('schedule');
  
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500">
      {/* 日期說明 */}
      <div className={`${themeColor.primary} p-4 transition-colors duration-500`}>
        <h2 className="text-2xl font-bold text-gray-800">{day.date} | {day.title}</h2>
        <p className="text-gray-700">{day.description}</p>
      </div>
      
      {/* 標籤頁切換 */}
      <div className="flex border-b">
        <button
          className={`flex-1 py-3 font-medium text-center transition-colors ${
            activeTab === 'schedule' 
              ? `${themeColor.accent} text-white` 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
          onClick={() => setActiveTab('schedule')}
        >
          行程安排
        </button>
        <button
          className={`flex-1 py-3 font-medium text-center transition-colors ${
            activeTab === 'food' 
              ? `${themeColor.accent} text-white` 
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
                ? `${themeColor.accent} text-white` 
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
                    themeColor={themeColor.secondary}
                  />
                ))}
              </div>
            </div>
            
            {/* 住宿 */}
            <div className="mt-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">住宿</h3>
              <div className={`${themeColor.secondary} p-4 rounded-lg`}>
                <p className="text-lg font-medium">{day.accommodation.name}</p>
                {day.accommodation.location && (
                  <p className="text-gray-600">{day.accommodation.location}</p>
                )}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'food' && (
          <FoodRecommendation recommendations={day.foodRecommendations} themeColor={themeColor.secondary} />
        )}
        
        {activeTab === 'shopping' && day.mustBuyItems && (
          <MustBuyItems items={day.mustBuyItems} themeColor={themeColor.secondary} />
        )}
      </div>
    </div>
  );
};

// 頁尾元件
const Footer = ({ themeColor }) => {
  return (
    <footer className={`${themeColor.primary} py-4 px-4 text-center text-gray-700 relative z-10 transition-colors duration-500`}>
      <div className="container mx-auto">
        <p className="mb-2">日本關西與中國地方旅遊手冊 © {new Date().getFullYear()}</p>
        <p className="text-sm">祝您旅途愉快！安全健康！</p>
      </div>
    </footer>
  );
};

// 主應用元件
const JapanTravelApp = () => {
  const [selectedDay, setSelectedDay] = useState(scheduleData[0].id);
  
  const handleDayChange = (dayId) => {
    setSelectedDay(dayId);
  };
  
  const currentDay = scheduleData.find(day => day.id === selectedDay) || scheduleData[0];
  
  // 根據當前日期定義主題色彩
  const themeColorMap = {
    'sakura': {
      primary: 'bg-pink-200',
      secondary: 'bg-pink-100',
      accent: 'bg-pink-400',
      background: 'bg-rose-50',
    },
    'osaka-castle': {
      primary: 'bg-amber-200',
      secondary: 'bg-amber-100',
      accent: 'bg-amber-400',
      background: 'bg-amber-50',
    },
    'onsen': {
      primary: 'bg-cyan-200',
      secondary: 'bg-cyan-100',
      accent: 'bg-cyan-400',
      background: 'bg-cyan-50',
    },
    'peace-memorial': {
      primary: 'bg-blue-200',
      secondary: 'bg-blue-100',
      accent: 'bg-blue-400',
      background: 'bg-blue-50',
    },
    'torii-gate': {
      primary: 'bg-red-200',
      secondary: 'bg-red-100',
      accent: 'bg-red-400',
      background: 'bg-red-50',
    },
    'onomichi-cat': {
      primary: 'bg-orange-200',
      secondary: 'bg-orange-100',
      accent: 'bg-orange-400',
      background: 'bg-orange-50',
    },
    'tsuyama-castle': {
      primary: 'bg-emerald-200',
      secondary: 'bg-emerald-100',
      accent: 'bg-emerald-400',
      background: 'bg-emerald-50',
    },
    'himeji-castle': {
      primary: 'bg-purple-200',
      secondary: 'bg-purple-100',
      accent: 'bg-purple-400',
      background: 'bg-purple-50',
    },
    'kurashiki': {
      primary: 'bg-indigo-200',
      secondary: 'bg-indigo-100',
      accent: 'bg-indigo-400',
      background: 'bg-indigo-50',
    },
    'okayama-garden': {
      primary: 'bg-green-200',
      secondary: 'bg-green-100',
      accent: 'bg-green-400',
      background: 'bg-green-50',
    }
  };
  
  const themeColors = themeColorMap[currentDay.themeElement];
  
  return (
    <div className={`min-h-screen flex flex-col ${themeColors.background} relative overflow-hidden transition-colors duration-500`}>
      <ThemeElements themeType={currentDay.themeElement} />
      
      <Header 
        title="日本關西與中國地方旅遊手冊" 
        subtitle={`${currentDay.date} | ${currentDay.title}`}
        themeColor={themeColors.primary}
      />
      
      <main className="flex-grow container mx-auto px-4 py-8 relative z-10">
        <Navigation 
          days={scheduleData} 
          selectedDay={selectedDay} 
          onDayChange={handleDayChange} 
          themeColor={themeColors}
        />
        
        <DailySchedule day={currentDay} themeColor={themeColors} />
      </main>
      
      <Footer themeColor={themeColors} />
    </div>
  );
};

export default JapanTravelApp;