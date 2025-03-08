import React from 'react';
import { Sakura } from './Sakura';

export const OsakaCastle: React.FC = () => {
  return (
    <>
      {/* 加入櫻花背景 */}
      <Sakura />
      
      {/* 大阪城輪廓 */}
      <div className="absolute bottom-0 left-0 w-full opacity-10 pointer-events-none">
        <div className="container mx-auto relative h-64 md:h-80">
          <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 left-0 w-full h-full">
            {/* 城堡基座 */}
            <rect x="300" y="300" width="200" height="100" fill="#8B4513" />
            
            {/* 中層 */}
            <rect x="320" y="250" width="160" height="50" fill="#8B4513" />
            
            {/* 上層 */}
            <rect x="340" y="200" width="120" height="50" fill="#8B4513" />
            
            {/* 頂層 */}
            <rect x="360" y="150" width="80" height="50" fill="#8B4513" />
            
            {/* 屋頂 */}
            <path d="M360,150 L400,100 L440,150 Z" fill="#333" />
            
            {/* 窗戶 */}
            <rect x="320" y="260" width="20" height="30" fill="#555" />
            <rect x="380" y="260" width="20" height="30" fill="#555" />
            <rect x="440" y="260" width="20" height="30" fill="#555" />
            
            <rect x="340" y="210" width="20" height="30" fill="#555" />
            <rect x="400" y="210" width="20" height="30" fill="#555" />
            
            <rect x="380" y="160" width="20" height="30" fill="#555" />
            
            {/* 金色裝飾 */}
            <circle cx="400" cy="110" r="10" fill="#FFD700" />
          </svg>
        </div>
      </div>
    </>
  );
};