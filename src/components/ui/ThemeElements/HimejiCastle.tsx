import React from 'react';
import { Sakura } from './Sakura';

export const HimejiCastle: React.FC = () => {
  return (
    <>
      {/* 櫻花背景 */}
      <Sakura />
      
      {/* 姬路城元素 - 白鷺城 */}
      <div className="absolute bottom-0 w-full opacity-15 pointer-events-none">
        <div className="container mx-auto relative h-96">
          <svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 left-0 w-full h-full">
            {/* 城堡基座 */}
            <rect x="250" y="350" width="300" height="150" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="2" />
            
            {/* 第一層 */}
            <rect x="275" y="300" width="250" height="50" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="2" />
            <rect x="260" y="290" width="280" height="10" fill="#E5E7EB" />
            
            {/* 第二層 */}
            <rect x="300" y="250" width="200" height="50" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="2" />
            <rect x="290" y="240" width="220" height="10" fill="#E5E7EB" />
            
            {/* 第三層 */}
            <rect x="325" y="200" width="150" height="50" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="2" />
            <rect x="315" y="190" width="170" height="10" fill="#E5E7EB" />
            
            {/* 第四層 */}
            <rect x="350" y="150" width="100" height="50" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="2" />
            <rect x="340" y="140" width="120" height="10" fill="#E5E7EB" />
            
            {/* 第五層 */}
            <rect x="375" y="100" width="50" height="50" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="2" />
            <rect x="365" y="90" width="70" height="10" fill="#E5E7EB" />
            
            {/* 屋頂 */}
            <path d="M365,90 L400,60 L435,90" fill="#9CA3AF" />
            
            {/* 天守閣頂部裝飾 */}
            <rect x="395" y="50" width="10" height="10" fill="#9CA3AF" />
            <circle cx="400" cy="45" r="5" fill="#FCD34D" />
            
            {/* 窗戶 */}
            <rect x="300" y="320" width="20" height="20" fill="#D1D5DB" />
            <rect x="350" y="320" width="20" height="20" fill="#D1D5DB" />
            <rect x="400" y="320" width="20" height="20" fill="#D1D5DB" />
            <rect x="450" y="320" width="20" height="20" fill="#D1D5DB" />
            
            <rect x="325" y="270" width="20" height="20" fill="#D1D5DB" />
            <rect x="375" y="270" width="20" height="20" fill="#D1D5DB" />
            <rect x="425" y="270" width="20" height="20" fill="#D1D5DB" />
            
            <rect x="350" y="220" width="20" height="20" fill="#D1D5DB" />
            <rect x="400" y="220" width="20" height="20" fill="#D1D5DB" />
            
            <rect x="375" y="170" width="20" height="20" fill="#D1D5DB" />
            
            <rect x="390" y="120" width="20" height="20" fill="#D1D5DB" />
            
            {/* 圍牆 */}
            <path d="M200,400 L250,400 M550,400 L600,400" stroke="#E5E7EB" strokeWidth="8" />
            <path d="M200,420 L200,450 M600,420 L600,450" stroke="#E5E7EB" strokeWidth="8" />
            
            {/* 櫻花樹點綴 */}
            <circle cx="150" cy="420" r="30" fill="#FBD7E8" />
            <circle cx="650" cy="420" r="30" fill="#FBD7E8" />
          </svg>
        </div>
      </div>
      
      {/* 紫色點綴 - 姬路風格 */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-purple-100 to-transparent opacity-30"></div>
    </>
  );
};