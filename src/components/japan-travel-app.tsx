import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { differenceInDays, isWithinInterval } from 'date-fns';

// 櫻花花瓣組件
const CherryBlossom = ({ style }) => {
  return (
    <motion.div 
      className="absolute opacity-70 pointer-events-none z-0"
      style={style}
      animate={{
        y: [style.top, window.innerHeight + 100],
        x: [style.left, style.left + (Math.random() * 150 - 75)],
        rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
      }}
      transition={{
        duration: 10 + Math.random() * 20,
        ease: "linear",
        repeat: Infinity,
        delay: Math.random() * 5,
      }}
    >
      <svg width={style.size} height={style.size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 15 C 55 10, 65 0, 70 5 C 80 10, 95 30, 90 45 C 85 60, 70 80, 50 85 C 30 80, 15 60, 10 45 C 5 30, 20 10, 30 5 C 35 0, 45 10, 50 15" 
          fill={style.color} />
      </svg>
    </motion.div>
  );
};

// 櫻花花瓣飄落背景組件
const CherryBlossomFall = () => {
  const [petals, setPetals] = useState([]);
  
  useEffect(() => {
    const numberOfPetals = 20; // 花瓣數量
    const colors = ["#FBCFE8", "#F9A8D4", "#F472B6", "#FDF2F8"]; // 多種粉色調
    
    const newPetals = Array.from({ length: numberOfPetals }).map((_, i) => ({
      id: i,
      size: 15 + Math.random() * 30, // 花瓣大小
      top: -100 - Math.random() * 500, // 開始位置在螢幕上方
      left: Math.random() * window.innerWidth, // 隨機水平位置
      color: colors[Math.floor(Math.random() * colors.length)], // 隨機顏色
    }));
    
    setPetals(newPetals);
  }, []);
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {petals.map(petal => (
        <CherryBlossom key={petal.id} style={petal} />
      ))}
    </div>
  );
};

// 每日詳細行程元件
function DayDetail({ day, isToday }) {
  // 控制展開的項目
  const [expandedItems, setExpandedItems] = useState({});
  
  // 切換展開狀態
  const toggleExpand = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  return (
    <div>
      {/* 日期標題 */}
      <div className="mb-6">
        <div className="flex items-center">
          <h2 className="text-2xl font-medium text-pink-800 flex items-center">
            {day.title}
            <svg className="w-5 h-5 ml-2 text-pink-400" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 15 C 55 10, 65 0, 70 5 C 80 10, 95 30, 90 45 C 85 60, 70 80, 50 85 C 30 80, 15 60, 10 45 C 5 30, 20 10, 30 5 C 35 0, 45 10, 50 15" 
                fill="currentColor" />
            </svg>
          </h2>
          {isToday && (
            <span className="ml-3 bg-pink-200 text-pink-800 text-xs px-2 py-1 rounded-full">
              今日行程
            </span>
          )}
        </div>
        <p className="text-pink-600">{day.date} {day.day}</p>
        
        {/* 針對宮島行程顯示潮汐時間 */}
        {day.title === '神秘宮島之旅' && (
          <div className="mt-3 p-3 bg-pink-100 rounded-lg border border-pink-200">
            <p className="text-sm flex items-center text-pink-800">
              <svg className="w-4 h-4 mr-2 text-pink-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12H3M12 3v18M3 16l18-8M3 8l18 8M8 3l8 18M16 3L8 21"></path>
              </svg>
              今日潮汐時間: 請事先查詢，以便安排大鳥居觀賞的最佳時機
            </p>
          </div>
        )}
      </div>
      
      {/* 時間軸 */}
      <div className="relative mb-8 pl-2 border-l-2 border-pink-200">
        {day.itinerary.map((item, index) => (
          <div key={index} className="mb-3 relative">
            {/* 行程卡片 */}
            <motion.div 
              className="ml-2 bg-white rounded-lg shadow-sm overflow-hidden"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* 卡片頭部 */}
              <div 
                className={`p-3 flex justify-between items-center cursor-pointer
                  ${item.type === '景點' ? 'bg-white' : 
                    item.type === '交通' ? 'bg-purple-50' : 
                      item.type === '其他' ? 'bg-gray-50' :
                        'bg-rose-50'}`}
                onClick={() => toggleExpand(`itinerary-${index}`)}
              >
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3
                    ${item.type === '景點' ? 'bg-pink-100 text-pink-600' : 
                      item.type === '交通' ? 'bg-purple-100 text-purple-500' : 
                        item.type === '其他' ? 'bg-gray-100 text-gray-600' :
                          'bg-rose-100 text-rose-600'}`}
                  >
                    {item.type === '景點' && (
                      <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2c-3.31 0-6 2.69-6 6 0 4.5 6 12 6 12s6-7.5 6-12c0-3.31-2.69-6-6-6zm0 9a3 3 0 100-6 3 3 0 000 6z"></path>
                      </svg>
                    )}
                    {item.type === '交通' && (
                      <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 18l6-6-6-6"/>
                      </svg>
                    )}
                    {item.type === '餐廳' && (
                      <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                        <line x1="6" y1="1" x2="6" y2="4"></line>
                        <line x1="10" y1="1" x2="10" y2="4"></line>
                        <line x1="14" y1="1" x2="14" y2="4"></line>
                      </svg>
                    )}
                    {item.type === '其他' && (
                      <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="8" y1="6" x2="21" y2="6"></line>
                        <line x1="8" y1="12" x2="21" y2="12"></line>
                        <line x1="8" y1="18" x2="21" y2="18"></line>
                        <line x1="3" y1="6" x2="3.01" y2="6"></line>
                        <line x1="3" y1="12" x2="3.01" y2="12"></line>
                        <line x1="3" y1="18" x2="3.01" y2="18"></line>
                      </svg>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold">{item.name}</h3>
                    {item.time && <p className="text-xs text-pink-500 font-medium">{item.time}</p>}
                  </div>
                </div>
                
                <svg 
                  className={`w-5 h-5 text-pink-500 transition-transform ${expandedItems[`itinerary-${index}`] ? 'rotate-180' : ''}`} 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </div>
              
              {/* 展開內容 */}
              <AnimatePresence initial={false}>
                {expandedItems[`itinerary-${index}`] && (
                  <motion.div 
                    className="overflow-hidden"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ 
                      height: { type: "spring", stiffness: 200, damping: 30 },
                      opacity: { duration: 0.2 }
                    }}
                  >
                    <div className="p-4 border-t border-pink-100">
                      {/* 景點詳情 */}
                      {item.type === '景點' && (
                        <>
                          {item.description && <p className="text-sm mb-3 leading-relaxed">{item.description}</p>}
                          
                          {item.tips && (
                            <div className="bg-pink-50 p-3 rounded-lg mb-3 border border-pink-100">
                              <h4 className="text-sm font-bold mb-1 text-pink-800">小提示</h4>
                              <p className="text-xs leading-relaxed">{item.tips}</p>
                            </div>
                          )}
                          
                          {item.location && (
                            <div className="flex items-center text-xs text-pink-500 mt-2">
                              <svg className="w-3 h-3 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2c-3.31 0-6 2.69-6 6 0 4.5 6 12 6 12s6-7.5 6-12c0-3.31-2.69-6-6-6zm0 9a3 3 0 100-6 3 3 0 000 6z"></path>
                              </svg>
                              <a 
                                href={item.location} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="underline hover:text-pink-700 transition-colors font-medium"
                              >
                                在 Google Maps 中查看位置
                              </a>
                            </div>
                          )}
                        </>
                      )}
                      
                      {/* 交通詳情 */}
                      {item.type === '交通' && (
                        <>
                          <div className="flex items-center mb-3">
                            <div className="flex-1">
                              <p className="text-sm font-medium">{item.from}</p>
                              <p className="text-xs text-pink-500">{item.departure_time}</p>
                            </div>
                            
                            <svg className="w-5 h-5 mx-2 text-purple-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M5 12h14M12 5l7 7-7 7"></path>
                            </svg>
                            
                            <div className="flex-1 text-right">
                              <p className="text-sm font-medium">{item.to}</p>
                              <p className="text-xs text-pink-500">{item.arrival_time}</p>
                            </div>
                          </div>
                          
                          {item.train_info && (
                            <div className="bg-pink-50 p-3 rounded-lg mb-3 border border-pink-100">
                              <h4 className="text-sm font-medium mb-1 text-pink-800">列車資訊</h4>
                              <p className="text-xs">{item.train_info}</p>
                            </div>
                          )}
                        </>
                      )}
                      
                      {/* 餐廳詳情 */}
                      {item.type === '餐廳' && (
                        <>
                          {item.description && <p className="text-sm mb-3">{item.description}</p>}
                          
                          {item.recommended_dishes && (
                            <div className="bg-pink-50 p-3 rounded-lg mb-3 border border-pink-100">
                              <h4 className="text-sm font-medium mb-1 text-pink-800">推薦菜色</h4>
                              <p className="text-xs">{item.recommended_dishes}</p>
                            </div>
                          )}
                          
                          {item.location && (
                            <div className="flex items-center text-xs text-pink-500 mt-2">
                              <svg className="w-3 h-3 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2c-3.31 0-6 2.69-6 6 0 4.5 6 12 6 12s6-7.5 6-12c0-3.31-2.69-6-6-6zm0 9a3 3 0 100-6 3 3 0 000 6z"></path>
                              </svg>
                              <a 
                                href={item.location} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="underline hover:text-pink-700 transition-colors"
                              >
                                在 Google Maps 中查看位置
                              </a>
                            </div>
                          )}
                        </>
                      )}
                      
                      {/* 其他項目詳情 */}
                      {item.type === '其他' && (
                        <>
                          {item.description && <p className="text-sm">{item.description}</p>}
                        </>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        ))}
      </div>
      
      {/* 美食推薦 */}
      {day.food_recommendations && day.food_recommendations.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-3 text-pink-800 flex items-center">
            美食推薦
            <svg className="w-4 h-4 ml-1 text-pink-400" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 15 C 55 10, 65 0, 70 5 C 80 10, 95 30, 90 45 C 85 60, 70 80, 50 85 C 30 80, 15 60, 10 45 C 5 30, 20 10, 30 5 C 35 0, 45 10, 50 15" 
                fill="currentColor" />
            </svg>
          </h3>
          <div className="bg-white rounded-lg shadow-sm p-4 border border-pink-100">
            <ul className="space-y-2">
              {day.food_recommendations.map((item, index) => (
                <li key={index} className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center mr-3">
                    <svg className="w-3 h-3 text-rose-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                      <line x1="6" y1="1" x2="6" y2="4"></line>
                      <line x1="10" y1="1" x2="10" y2="4"></line>
                      <line x1="14" y1="1" x2="14" y2="4"></line>
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-sm">{item}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      
      {/* 購物推薦 */}
      {day.shopping_recommendations && day.shopping_recommendations.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-3 text-pink-800 flex items-center">
            購物推薦
            <svg className="w-4 h-4 ml-1 text-pink-400" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 15 C 55 10, 65 0, 70 5 C 80 10, 95 30, 90 45 C 85 60, 70 80, 50 85 C 30 80, 15 60, 10 45 C 5 30, 20 10, 30 5 C 35 0, 45 10, 50 15" 
                fill="currentColor" />
            </svg>
          </h3>
          <div className="bg-white rounded-lg shadow-sm p-4 border border-pink-100">
            <ul className="space-y-2">
              {day.shopping_recommendations.map((item, index) => (
                <li key={index} className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center mr-3">
                    <svg className="w-3 h-3 text-pink-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                      <line x1="3" y1="6" x2="21" y2="6"></line>
                      <path d="M16 10a4 4 0 0 1-8 0"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-sm">{item}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      
      {/* 住宿資訊 */}
      {day.accommodation && (
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-3 text-pink-800 flex items-center">
            住宿資訊
            <svg className="w-4 h-4 ml-1 text-pink-400" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 15 C 55 10, 65 0, 70 5 C 80 10, 95 30, 90 45 C 85 60, 70 80, 50 85 C 30 80, 15 60, 10 45 C 5 30, 20 10, 30 5 C 35 0, 45 10, 50 15" 
                fill="currentColor" />
            </svg>
          </h3>
          <div className="bg-white rounded-lg shadow-sm p-4 border border-pink-100">
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-pink-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
              </div>
              <div>
                <p className="font-medium text-pink-800">{day.accommodation}</p>
                <p className="text-sm text-pink-500 mt-1">入住時間: 15:00 | 退房時間: 11:00</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// 主應用元件
export default function TravelApp() {
  // 旅行數據
  const travelData = [
    {
      date: "3/28",
      day: "星期五",
      title: "出發日",
      highlights: [
        { type: "交通", name: "桃園機場 → 大阪關西機場" },
        { type: "其他", name: "機場領車票" }
      ],
      itinerary: [
        {
          type: "交通",
          name: "搭乘航班前往關西機場",
          from: "桃園機場 T1",
          to: "大阪關西機場 T1",
          departure_time: "19:35",
          arrival_time: "23:00",
          train_info: "航班 IT220"
        },
        {
          type: "其他",
          name: "機場領車票",
          time: "23:00-23:30",
          description: "抵達後於機場領取預約的車票"
        }
      ],
      accommodation: "關西機場 ホテル日航関西空港",
      food_recommendations: ["機上餐"],
      shopping_recommendations: []
    },
    {
      date: "3/29",
      day: "星期六",
      title: "大阪探索日",
      highlights: [
        { type: "其他", name: "機場領車票" },
        { type: "景點", name: "大阪城公園 & 天守閣" },
        { type: "景點", name: "黑門市場" },
        { type: "景點", name: "新世界 & 通天閣" },
        { type: "景點", name: "道頓堀 & 心齋橋" }
      ],
      itinerary: [
        {
          type: "其他",
          name: "機場領車票",
          time: "",
          description: "領取預約的車票"
        },
        {
          type: "景點",
          name: "大阪城公園 & 天守閣",
          time: "",
          description: "日本著名歷史景點，可欣賞大阪城天守閣及其周圍美麗的公園。",
          tips: "參觀天守閣需要額外購票，建議提前在官網查詢開放時間。",
          location: "https://goo.gl/maps/YpJK6wNwQDmVnvhZ7"
        },
        {
          type: "景點",
          name: "黑門市場",
          time: "",
          description: "大阪著名的美食街市，提供新鮮海鮮和當地小吃。",
          tips: "建議品嚐章魚燒和新鮮生魚片，用餐高峰期可能需要排隊。",
          location: "https://goo.gl/maps/YCcWvUshGtAxPU4x9"
        },
        {
          type: "景點",
          name: "新世界 & 通天閣",
          time: "",
          description: "充滿昭和時代氛圍的懷舊區域，通天閣是大阪的地標性建築。",
          tips: "可以在附近品嚐大阪著名的串炸料理，推薦參觀比利肯神像。",
          location: "https://goo.gl/maps/8KjS27hgcYmvvzGp9"
        },
        {
          type: "景點",
          name: "道頓堀 & 心齋橋",
          time: "",
          description: "大阪最繁華的購物和美食區域，有著名的固力果跑者廣告牌。",
          tips: "晚上霓虹燈非常壯觀，適合拍照。可以在此品嚐道頓堀名店的大阪燒。",
          location: "https://goo.gl/maps/BDWRDCgMZHr8KMRCA"
        }
      ],
      food_recommendations: ["章魚燒", "炸串", "大阪燒", "和牛壽喜燒"],
      shopping_recommendations: ["大阪限定零食（Pablo起司塔、Calbee薯條）", "藥妝", "美妝用品", "章魚燒造型紀念品"],
      accommodation: "大阪 ホテルオリエンタルエクスプレス大阪心斎橋"
    },
    {
      date: "3/30",
      day: "星期日",
      title: "溫泉放鬆日",
      highlights: [
        { type: "景點", name: "有馬溫泉（金湯、銀湯）" },
        { type: "景點", name: "有馬本街道（湯本坂）逛街散策" }
      ],
      itinerary: [
        {
          type: "景點",
          name: "有馬溫泉（金湯、銀湯）",
          time: "",
          description: "日本最古老的溫泉之一，以含鐵的「金湯」和含碳酸的「銀湯」聞名。",
          tips: "建議先體驗金湯，之後再享受銀湯。溫泉水溫較高，注意身體狀況。",
          location: "https://goo.gl/maps/XUKzNJ2v4kE8xqtR9"
        },
        {
          type: "景點",
          name: "有馬本街道（湯本坂）逛街散策",
          time: "",
          description: "充滿傳統氛圍的溫泉街道，有各種特色商店和小吃。",
          tips: "可購買當地特產炭酸煎餅和金泉饅頭作為伴手禮。",
          location: "https://goo.gl/maps/ckCURdQ7d2qRHMLv5"
        }
      ],
      food_recommendations: ["炭酸煎餅", "神戶牛料理", "溫泉蛋", "金泉饅頭"],
      shopping_recommendations: ["溫泉相關產品", "炭酸煎餅", "金泉饅頭"],
      accommodation: "有馬溫泉 中の坊 瑞苑"
    },
    {
      date: "3/31",
      day: "星期一",
      title: "廣島文化巡禮",
      highlights: [
        { type: "交通", name: "有馬溫泉 → 廣島" },
        { type: "景點", name: "廣島和平紀念公園 & 原爆圓頂" },
        { type: "景點", name: "縮景園" },
        { type: "景點", name: "廣島城" },
        { type: "景點", name: "本通商店街 & 廣島 PARCO" }
      ],
      itinerary: [
        {
          type: "交通",
          name: "前往廣島",
          from: "有馬溫泉",
          to: "廣島",
          departure_time: "10:30",
          arrival_time: "12:30",
          train_info: "ＪＲ新幹線のぞみ13号"
        },
        {
          type: "景點",
          name: "廣島和平紀念公園 & 原爆圓頂",
          time: "13:00-15:00",
          description: "象徵和平的世界文化遺產，原爆圓頂是唯一保留的原子彈爆炸痕跡建築。",
          tips: "參觀和平紀念資料館需要1-2小時，請預留足夠時間。",
          location: "https://goo.gl/maps/Z9YJ5qfqWBrTGdH36"
        },
        {
          type: "景點",
          name: "縮景園",
          time: "15:30-16:30",
          description: "江戶時代的日本傳統庭園，四季景色各異。",
          tips: "園內有茶屋，可以在此休息品茶。",
          location: "https://goo.gl/maps/QcTTfHUbdiFVkdBJ6"
        },
        {
          type: "景點",
          name: "廣島城",
          time: "17:00-18:00",
          description: "廣島地標性的城堡，被稱為「鯉城」，現為歷史博物館。",
          tips: "城內展示有武士盔甲和歷史文物，從頂層可俯瞰廣島市區。",
          location: "https://goo.gl/maps/UX87dJPUH3HoJBsQ8"
        },
        {
          type: "景點",
          name: "本通商店街 & 廣島 PARCO",
          time: "18:30-20:30",
          description: "廣島主要購物區，有多家百貨公司和特色商店。",
          tips: "可在本通商店街尋找廣島特產和伴手禮。",
          location: "https://goo.gl/maps/zSM71S7dYJFVHVnY7"
        }
      ],
      food_recommendations: ["廣島燒", "牡蠣料理", "紅葉饅頭", "廣島沾麵"],
      shopping_recommendations: ["廣島牡蠣醬油", "熊野筆化妝刷（白鳳堂、竹宝堂）"],
      accommodation: "廣島 広島ワシントンホテル"
    },
    {
      date: "4/1",
      day: "星期二",
      title: "神秘宮島之旅",
      highlights: [
        { type: "景點", name: "etto宮島交流館（巨大杓子）" },
        { type: "景點", name: "嚴島神社 & 大鳥居" },
        { type: "景點", name: "宮島表參道商店街" },
        { type: "景點", name: "杓子の家（書法老師現場寫字）" }
      ],
      itinerary: [
        {
          type: "景點",
          name: "etto宮島交流館",
          time: "",
          description: "展示巨大杓子的交流館，可了解宮島木製杓子的歷史。",
          tips: "入場免費，館內有介紹宮島傳統工藝的展示。",
          location: "https://goo.gl/maps/32FHnUZzQTBhGJz56"
        },
        {
          type: "景點",
          name: "嚴島神社 & 大鳥居",
          time: "",
          description: "世界文化遺產，建在海上的神社，大鳥居是日本最著名的景觀之一。",
          tips: "潮汐會影響參觀體驗，退潮時可步行至大鳥居附近。",
          location: "https://goo.gl/maps/s3Jf93MfuK2CXBwW7"
        },
        {
          type: "景點",
          name: "宮島表參道商店街",
          time: "",
          description: "宮島主要購物街，有多家特產店和美食店。",
          tips: "此處可品嚐著名的烤牡蠣和紅葉饅頭。",
          location: "https://goo.gl/maps/nVFppwkqVQPuwzC79"
        },
        {
          type: "景點",
          name: "杓子の家",
          time: "",
          description: "可以觀賞書法老師現場在木杓上寫字的特色店鋪。",
          tips: "可以請書法老師在木杓上寫下自己喜歡的文字作為紀念品。",
          location: "https://goo.gl/maps/Tj1XcLKnqPfnr69d7"
        }
      ],
      food_recommendations: ["烤牡蠣", "紅葉饅頭", "星鰻飯", "紅葉天婦羅"],
      shopping_recommendations: ["宮島木製杓子", "星鰻相關食品", "清酒伴手禮"],
      accommodation: "廣島 広島ワシントンホテル"
    },
    {
      date: "4/2",
      day: "星期三",
      title: "浪漫尾道漫步",
      highlights: [
        { type: "交通", name: "広島 → 尾道" },
        { type: "餐廳", name: "尾道拉麵 尾道ラーメン 壱番館本店" },
        { type: "景點", name: "千光寺纜車 & 千光寺公園" },
        { type: "景點", name: "貓之細道 & 艮神社" },
        { type: "景點", name: "尾道本通商店街" },
        { type: "交通", name: "尾道 → 岡山" }
      ],
      itinerary: [
        {
          type: "交通",
          name: "前往尾道",
          from: "広島",
          to: "尾道",
          departure_time: "09:38",
          arrival_time: "10:45",
          train_info: "ＪＲ新幹線こだま844号 → 三原 → 尾道"
        },
        {
          type: "其他",
          name: "寄放行李",
          time: "10:50-11:10",
          description: "在尾道站附近寄放行李，方便輕裝遊覽"
        },
        {
          type: "餐廳",
          name: "尾道拉麵 壱番館本店",
          time: "11:30-12:30",
          description: "尾道著名的拉麵店，以醬油湯底和背脂拉麵聞名。",
          recommended_dishes: "尾道拉麵、尾道背脂拉麵、叉燒飯",
          location: "https://goo.gl/maps/8eypEvTsj9XQg3Fy5"
        },
        {
          type: "景點",
          name: "千光寺纜車 & 千光寺公園",
          time: "13:00-14:30",
          description: "搭乘纜車前往山頂的千光寺，可俯瞰尾道市區和瀨戶內海美景。",
          tips: "千光寺公園的櫻花和楓葉季節特別美麗，山頂有多個觀景台。",
          location: "https://goo.gl/maps/L7UZsGnqDYUVN7cn6"
        },
        {
          type: "景點",
          name: "貓之細道 & 艮神社",
          time: "15:00-16:30",
          description: "蜿蜒於山坡間的小徑，以眾多流浪貓而聞名，途經古樸的艮神社。",
          tips: "道路較陡，請穿著舒適的鞋子。沿途有許多文藝小店和咖啡館。",
          location: "https://goo.gl/maps/JNgQxwZgHZkTEXLG6"
        },
        {
          type: "景點",
          name: "尾道本通商店街",
          time: "17:00-19:00",
          description: "尾道主要商店街，有各種特色小店和美食。",
          tips: "推薦品嚐尾道特色甜點和文青麵包店。",
          location: "https://goo.gl/maps/qJcxs7JaX5bBTdEH7"
        },
        {
          type: "其他",
          name: "領行李",
          time: "19:30-19:50",
          description: "取回寄放的行李"
        },
        {
          type: "交通",
          name: "前往岡山",
          from: "尾道",
          to: "岡山",
          departure_time: "20:30",
          arrival_time: "21:50",
          train_info: "JR山陽本線"
        }
      ],
      food_recommendations: ["尾道拉麵", "鯛魚料理", "文青麵包"],
      shopping_recommendations: ["尾道文創商品", "手作工藝品"],
      accommodation: "岡山 ホテルアベストグランデ 岡山 なごみの湯"
    },
    {
      date: "4/3",
      day: "星期四",
      title: "津山歷史文化探索",
      highlights: [
        { type: "景點", name: "津山城（鶴山公園）" },
        { type: "景點", name: "吉備津神社" }
      ],
      itinerary: [
        {
          type: "景點",
          name: "津山城（鶴山公園）",
          time: "",
          description: "保存完好的日本城郭遺址，位於鶴山公園內，春季櫻花特別美麗。",
          tips: "登上天守台可俯瞰津山市區全景，公園內有許多歷史建築遺跡。",
          location: "https://goo.gl/maps/JRdLCL5h53bWvUuZ8"
        },
        {
          type: "景點",
          name: "吉備津神社",
          time: "",
          description: "歷史悠久的神社，建築風格獨特，有著名的「鳴釜神事」。",
          tips: "參拜後可獲得「桃太郎」相關的護身符，神社迴廊非常壯觀。",
          location: "https://goo.gl/maps/CStUPZ8yPvLu52zF9"
        }
      ],
      food_recommendations: ["津山ホルモンうどん（內臟烏龍麵）", "津山牛（燒烤、肉乾）", "羊羹"],
      shopping_recommendations: ["津山特產", "吉備津神社護身符"],
      accommodation: "岡山 ホテルアベストグランデ 岡山 なごみの湯"
    },
    {
      date: "4/4",
      day: "星期五",
      title: "姬路城歷史探訪",
      highlights: [
        { type: "景點", name: "姬路城 & 好古園" },
        { type: "景點", name: "書寫山圓教寺" }
      ],
      itinerary: [
        {
          type: "景點",
          name: "姬路城 & 好古園",
          time: "",
          description: "日本最著名的城堡之一，被譽為「白鷺城」，是世界文化遺產。好古園是其附屬的日本庭園。",
          tips: "城內參觀路線是單向的，請跟隨指示行進。週末可能人潮較多，建議提早到訪。",
          location: "https://goo.gl/maps/hNd9tKh2LPTEzxqN8"
        },
        {
          type: "景點",
          name: "書寫山圓教寺",
          time: "",
          description: "歷史悠久的佛教寺院，被稱為「西之比叡山」，建築群依山而建。",
          tips: "參觀需要爬一些石階，請穿著舒適的鞋子。寺內有多個殿堂和寶物。",
          location: "https://goo.gl/maps/2cESNkAQrRKzeDNy9"
        }
      ],
      food_recommendations: ["姬路名物穴子飯", "播州素麵", "夢前味噌料理"],
      shopping_recommendations: ["姬路城紀念品", "播州織布製品"],
      accommodation: "岡山 ホテルアベストグランデ 岡山 なごみの湯"
    },
    {
      date: "4/5",
      day: "星期六",
      title: "倉敷美觀探索",
      highlights: [
        { type: "景點", name: "倉敷美觀" },
        { type: "景點", name: "大原美術館" },
        { type: "景點", name: "阿智神社" }
      ],
      itinerary: [
        {
          type: "景點",
          name: "倉敷美觀",
          time: "",
          description: "保存完好的江戶時代商家街區，白壁建築和柳樹倒映在水面上，非常美麗。",
          tips: "可體驗川船遊覽，從水上欣賞美觀地區的另一番風景。",
          location: "https://goo.gl/maps/2Z1NSDynXJk5NU4W8"
        },
        {
          type: "景點",
          name: "大原美術館",
          time: "",
          description: "日本第一家西洋美術館，收藏有多件世界級藝術品。",
          tips: "美術館分為本館、分館和工藝館，可能需要分別購票。",
          location: "https://goo.gl/maps/UFXC5xhXoGLw1XB78"
        },
        {
          type: "景點",
          name: "阿智神社",
          time: "",
          description: "倉敷地區歷史悠久的神社，以祈求生意興隆和學業有成聞名。",
          tips: "神社內有「良緣之鈴」，據說搖動後可以求得良緣。",
          location: "https://goo.gl/maps/n9zcAB3DKAthSu5J8"
        }
      ],
      food_recommendations: ["倉敷牛排", "桃太郎壽司", "倉敷布丁", "麝香葡萄甜點"],
      shopping_recommendations: ["倉敷帆布包", "倉敷牛仔製品"],
      accommodation: "岡山 ホテルアベストグランデ 岡山 なごみの湯"
    },
    {
      date: "4/6",
      day: "星期日",
      title: "岡山名勝巡禮 & 回程",
      highlights: [
        { type: "景點", name: "岡山城 & 後樂園" },
        { type: "景點", name: "表町商店街" },
        { type: "交通", name: "岡山機場 → 桃園機場" }
      ],
      itinerary: [
        {
          type: "景點",
          name: "岡山城 & 後樂園",
          time: "",
          description: "日本三大名園之一的後樂園，與烏黑的岡山城（又稱烏城）形成鮮明對比。",
          tips: "後樂園的最佳觀賞點是唯心山頂，可同時眺望庭園全景和岡山城。",
          location: "https://goo.gl/maps/66Y7Sc8KDZEEFsHu9"
        },
        {
          type: "景點",
          name: "表町商店街",
          time: "",
          description: "岡山最大的購物區，有超過400家店鋪的商店街。",
          tips: "可在此採購最後的伴手禮，包括岡山特產水果甜點。",
          location: "https://goo.gl/maps/3kX2AfrTHQXEDjzY9"
        },
        {
          type: "交通",
          name: "返回台灣",
          from: "岡山機場",
          to: "桃園機場 T1",
          departure_time: "17:55",
          arrival_time: "20:00",
          train_info: "航班 IT715"
        }
      ],
      food_recommendations: ["岡山壽司", "桃子甜點", "吉備團子", "白桃果凍", "千屋牛"],
      shopping_recommendations: ["岡山白桃果凍", "吉備團子", "岡山葡萄酒"],
      accommodation: ""
    }
  ];
  
  // 儲存行程資料
  const [itineraryData] = useState(travelData);
  // 目前選取的日期索引
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  // 今日日期
  const [today] = useState(new Date());
  
  // 設置初始選取的日期 (根據當前日期)
  useEffect(() => {
    const currentDate = new Date();
    const firstDay = new Date(2025, 3, 28);
    const lastDay = new Date(2025, 4, 6);
    if (isWithinInterval(currentDate, { start: firstDay, end: lastDay })) {
      const dayDiff = differenceInDays(currentDate, firstDay);
      setSelectedDayIndex(dayDiff);
    }
  }, []);
  
  // 處理日期選擇
  const handleDaySelect = (index) => {
    setSelectedDayIndex(index);
  };
  
  // 檢查日期是否為今天
  const isToday = (date) => {
    const travelDate = new Date(2025, parseInt(date.split('/')[0]) - 1, parseInt(date.split('/')[1]));
    return travelDate.getDate() === today.getDate() && 
           travelDate.getMonth() === today.getMonth() && 
           travelDate.getFullYear() === today.getFullYear();
  };
  
  return (
    <div className="min-h-screen bg-pink-50 text-gray-700 font-sans relative overflow-hidden tracking-wide">
      {/* 櫻花花瓣飄落動畫 */}
      <CherryBlossomFall />
      
      {/* 背景櫻花裝飾 */}
      <div className="absolute top-0 right-0 w-40 h-40 opacity-20 pointer-events-none">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 15 C 55 10, 65 0, 70 5 C 80 10, 95 30, 90 45 C 85 60, 70 80, 50 85 C 30 80, 15 60, 10 45 C 5 30, 20 10, 30 5 C 35 0, 45 10, 50 15" 
            fill="#F9A8D4" />
        </svg>
      </div>
      <div className="absolute bottom-10 left-5 w-24 h-24 opacity-20 pointer-events-none">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 15 C 55 10, 65 0, 70 5 C 80 10, 95 30, 90 45 C 85 60, 70 80, 50 85 C 30 80, 15 60, 10 45 C 5 30, 20 10, 30 5 C 35 0, 45 10, 50 15" 
            fill="#F9A8D4" />
        </svg>
      </div>
      
      {/* 頁面標題 */}
      <header className="bg-pink-100 p-4 shadow-sm relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none overflow-hidden">
          <div className="absolute -top-10 -left-10 w-20 h-20 rotate-15">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 15 C 55 10, 65 0, 70 5 C 80 10, 95 30, 90 45 C 85 60, 70 80, 50 85 C 30 80, 15 60, 10 45 C 5 30, 20 10, 30 5 C 35 0, 45 10, 50 15" 
                fill="#F472B6" />
            </svg>
          </div>
          <div className="absolute top-10 right-20 w-16 h-16 rotate-45">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 15 C 55 10, 65 0, 70 5 C 80 10, 95 30, 90 45 C 85 60, 70 80, 50 85 C 30 80, 15 60, 10 45 C 5 30, 20 10, 30 5 C 35 0, 45 10, 50 15" 
                fill="#F472B6" />
            </svg>
          </div>
        </div>
        <div className="container mx-auto relative z-10">
          <h1 className="text-2xl md:text-3xl font-bold text-pink-800">日本關西中國地方美食與文化之旅</h1>
          <p className="text-sm md:text-base text-pink-600 font-medium">2025年3月28日至4月6日</p>
        </div>
      </header>
      
      {/* 日期導航列 */}
      <div className="bg-white border-b border-pink-100 sticky top-0 z-20 shadow-sm">
        <div className="container mx-auto overflow-x-auto">
          <div className="flex whitespace-nowrap py-2 px-4">
            {itineraryData.map((day, index) => (
              <button
                key={index}
                onClick={() => handleDaySelect(index)}
                className={`px-3 py-2 mx-1 rounded-full text-sm transition-all font-medium ${
                  selectedDayIndex === index 
                    ? 'bg-pink-100 text-pink-800 font-bold shadow-sm'
                    : 'hover:bg-pink-50 text-gray-600'
                } ${
                  isToday(day.date) ? 'ring-1 ring-pink-300' : ''
                }`}
              >
                <div className="flex flex-col items-center">
                  <span>{day.date}</span>
                  <span className="text-xs font-medium">{day.day}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* 主要內容區 */}
      <main className="container mx-auto p-4">
        <DayDetail 
          day={itineraryData[selectedDayIndex]} 
          isToday={isToday(itineraryData[selectedDayIndex].date)}
        />
      </main>
      
      {/* 頁尾 */}
      <footer className="bg-pink-100 p-4 mt-8 relative">
        <div className="absolute bottom-0 right-0 w-full h-full opacity-10 pointer-events-none overflow-hidden">
          <div className="absolute bottom-2 right-10 w-16 h-16 rotate-30">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 15 C 55 10, 65 0, 70 5 C 80 10, 95 30, 90 45 C 85 60, 70 80, 50 85 C 30 80, 15 60, 10 45 C 5 30, 20 10, 30 5 C 35 0, 45 10, 50 15" 
                fill="#F472B6" />
            </svg>
          </div>
        </div>
        <div className="container mx-auto text-center text-pink-600 text-sm relative z-10">
          © 2025 日本關西中國地方旅遊手冊
        </div>
      </footer>
    </div>
  );
}