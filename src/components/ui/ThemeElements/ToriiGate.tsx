import React, { useEffect, useState } from 'react';

interface Wave {
  id: number;
  height: number;
  speed: number;
  offset: number;
}

export const ToriiGate: React.FC = () => {
  const [waves, setWaves] = useState<Wave[]>([]);
  
  useEffect(() => {
    const createWaves = () => {
      const numberOfWaves = 3;
      const newWaves: Wave[] = [];
      
      for (let i = 0; i < numberOfWaves; i++) {
        newWaves.push({
          id: i,
          height: 10 + i * 8, // 漸進的高度
          speed: 20 + i * 10, // 漸進的速度
          offset: i * 33.3 // 錯開波浪
        });
      }
      
      setWaves(newWaves);
    };
    
    createWaves();
  }, []);
  
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* 海水背景 */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-blue-200 bg-opacity-20"></div>
      
      {/* 波浪 */}
      {waves.map(wave => (
        <div
          key={wave.id}
          className="absolute bottom-0 w-full"
          style={{
            height: `${wave.height}px`,
            opacity: 0.7 - wave.id * 0.2,
            transform: `translateY(${wave.id * 5}px)`
          }}
        >
          <svg
            className="w-full h-full"
            preserveAspectRatio="none"
            viewBox="0 0 1440 30"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,0 C240,20 480,30 720,15 C960,0 1200,10 1440,30 L1440,30 L0,30 Z"
              fill="#3B82F6"
              style={{
                animation: `waveAnimation ${wave.speed}s linear infinite`,
                animationDelay: `-${wave.offset}s`
              }}
            ></path>
          </svg>
        </div>
      ))}
      
      {/* 宮島鳥居 */}
      <div className="absolute bottom-48 left-1/2 transform -translate-x-1/2 w-64 h-64 md:w-80 md:h-80 opacity-30">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          {/* 鳥居底部 */}
          <rect x="30" y="150" width="140" height="10" fill="#e11d48" />
          
          {/* 鳥居柱子 */}
          <rect x="40" y="70" width="10" height="80" fill="#e11d48" />
          <rect x="150" y="70" width="10" height="80" fill="#e11d48" />
          
          {/* 鳥居橫樑 */}
          <rect x="20" y="70" width="160" height="10" fill="#e11d48" />
          <rect x="30" y="60" width="140" height="10" fill="#e11d48" />
          <rect x="35" y="50" width="130" height="10" fill="#e11d48" />
          
          {/* 鳥居中間支撐 */}
          <rect x="95" y="70" width="10" height="20" fill="#e11d48" />
        </svg>
      </div>
      
      <style jsx>{`
        @keyframes waveAnimation {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};