import React, { useEffect, useState } from 'react';

interface SteamBubble {
  id: number;
  size: number;
  x: number;
  opacity: number;
  animationDuration: number;
  delay: number;
}

export const Onsen: React.FC = () => {
  const [bubbles, setBubbles] = useState<SteamBubble[]>([]);
  
  useEffect(() => {
    const createBubbles = () => {
      const numberOfBubbles = 15;
      const newBubbles: SteamBubble[] = [];
      
      for (let i = 0; i < numberOfBubbles; i++) {
        newBubbles.push({
          id: i,
          size: Math.random() * 30 + 20, // 20-50px
          x: Math.random() * 80 + 10, // 10-90%
          opacity: Math.random() * 0.5 + 0.3, // 0.3-0.8
          animationDuration: Math.random() * 8 + 4, // 4-12s
          delay: Math.random() * 10 // 0-10s delay
        });
      }
      
      setBubbles(newBubbles);
    };
    
    createBubbles();
    
    const interval = setInterval(() => {
      createBubbles();
    }, 10000); // 每10秒重新生成一次
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* 溫泉水元素 */}
      <div className="absolute bottom-0 left-0 w-full h-24 md:h-32 bg-cyan-200 bg-opacity-20"></div>
      
      {/* 溫泉石頭 */}
      <div className="absolute bottom-0 left-10 w-16 h-8 bg-gray-600 rounded-t-full"></div>
      <div className="absolute bottom-0 left-24 w-20 h-10 bg-gray-700 rounded-t-full"></div>
      <div className="absolute bottom-0 right-12 w-14 h-7 bg-gray-500 rounded-t-full"></div>
      <div className="absolute bottom-0 right-28 w-18 h-9 bg-gray-800 rounded-t-full"></div>
      
      {/* 溫泉蒸氣 */}
      {bubbles.map(bubble => (
        <div
          key={bubble.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${bubble.x}%`,
            bottom: '24px',
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            opacity: bubble.opacity,
            animation: `riseBubble ${bubble.animationDuration}s ease-in ${bubble.delay}s infinite`
          }}
        ></div>
      ))}
      
      {/* 日式庭園元素 */}
      <div className="absolute bottom-32 left-1/4 w-1/2 h-32 opacity-10">
        <svg viewBox="0 0 400 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M50,80 C100,30 150,80 200,50 C250,30 300,60 350,40" stroke="#333" fill="none" strokeWidth="2" />
          <circle cx="80" cy="60" r="10" fill="#555" /> {/* 石頭 */}
          <circle cx="120" cy="70" r="8" fill="#555" />
          <circle cx="280" cy="50" r="12" fill="#555" />
          <path d="M150,30 L170,80 L130,80 Z" fill="#3f6212" /> {/* 松樹 */}
          <path d="M320,20 L340,80 L300,80 Z" fill="#3f6212" />
        </svg>
      </div>
      
      <style jsx>{`
        @keyframes riseBubble {
          0% {
            transform: translateY(0) scale(1);
            opacity: ${props => props.opacity};
          }
          100% {
            transform: translateY(-100vh) scale(0);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};