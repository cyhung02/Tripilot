import React from 'react';
import { Sakura } from './Sakura';

export const TsuyamaCastle: React.FC = () => {
  return (
    <>
      {/* 櫻花背景 */}
      <Sakura />
      
      {/* 津山城元素 */}
      <div className="absolute bottom-0 w-full opacity-15 pointer-events-none">
        <div className="container mx-auto relative h-80">
          <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 left-0 w-full h-full">
            {/* 城牆基座 */}
            <rect x="200" y="250" width="400" height="150" fill="#9CA3AF" />
            <rect x="250" y="230" width="300" height="20" fill="#9CA3AF" />
            
            {/* 中央天守閣 */}
            <rect x="325" y="130" width="150" height="100" fill="#D1D5DB" />
            <polygon points="325,130 400,80 475,130" fill="#4B5563" />
            
            {/* 屋頂裝飾 */}
            <rect x="395" y="80" width="10" height="20" fill="#4B5563" />
            <circle cx="400" cy="75" r="5" fill="#FCD34D" />
            
            {/* 側塔 */}
            <rect x="250" y="170" width="75" height="60" fill="#D1D5DB" />
            <polygon points="250,170 287.5,140 325,170" fill="#4B5563" />
            
            <rect x="475" y="170" width="75" height="60" fill="#D1D5DB" />
            <polygon points="475,170 512.5,140 550,170" fill="#4B5563" />
            
            {/* 城門 */}
            <rect x="375" y="300" width="50" height="100" fill="#6B7280" />
            <path d="M375,300 Q400,270 425,300" fill="none" stroke="#4B5563" strokeWidth="4" />
            
            {/* 窗戶 */}
            <rect x="350" y="150" width="20" height="30" fill="#4B5563" />
            <rect x="390" y="150" width="20" height="30" fill="#4B5563" />
            <rect x="430" y="150" width="20" height="30" fill="#4B5563" />
            
            <rect x="270" y="180" width="15" height="20" fill="#4B5563" />
            <rect x="300" y="180" width="15" height="20" fill="#4B5563" />
            
            <rect x="485" y="180" width="15" height="20" fill="#4B5563" />
            <rect x="515" y="180" width="15" height="20" fill="#4B5563" />
            
            {/* 櫓 */}
            <rect x="220" y="230" width="30" height="30" fill="#D1D5DB" />
            <polygon points="220,230 235,210 250,230" fill="#4B5563" />
            
            <rect x="550" y="230" width="30" height="30" fill="#D1D5DB" />
            <polygon points="550,230 565,210 580,230" fill="#4B5563" />
          </svg>
        </div>
      </div>
      
      {/* 日式紋樣裝飾 */}
      <div className="absolute top-10 left-10 w-24 h-24 opacity-10">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#4B5563" strokeWidth="2" />
          <circle cx="50" cy="50" r="35" fill="none" stroke="#4B5563" strokeWidth="2" />
          <path d="M50,5 L50,95 M5,50 L95,50 M15,15 L85,85 M15,85 L85,15" stroke="#4B5563" strokeWidth="1" />
        </svg>
      </div>
      
      <div className="absolute top-10 right-10 w-24 h-24 opacity-10">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#4B5563" strokeWidth="2" />
          <circle cx="50" cy="50" r="35" fill="none" stroke="#4B5563" strokeWidth="2" />
          <path d="M50,5 L50,95 M5,50 L95,50 M15,15 L85,85 M15,85 L85,15" stroke="#4B5563" strokeWidth="1" />
        </svg>
      </div>
    </>
  );
};