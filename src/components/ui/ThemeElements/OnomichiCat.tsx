import React from 'react';
import { Sakura } from './Sakura';

export const OnomichiCat: React.FC = () => {
  return (
    <>
      {/* 櫻花背景 */}
      <Sakura />
      
      {/* 尾道山坡風景 */}
      <div className="absolute bottom-0 left-0 w-full opacity-15 pointer-events-none">
        <svg viewBox="0 0 1000 300" xmlns="http://www.w3.org/2000/svg" className="w-full">
          {/* 山坡 */}
          <path d="M0,300 L0,180 C100,150 200,200 300,170 C400,140 500,180 600,150 C700,120 800,160 900,140 L1000,120 L1000,300 Z" fill="#4B5563" />
          
          {/* 房屋 */}
          <rect x="150" y="170" width="40" height="30" fill="#E5E7EB" />
          <path d="M150,170 L170,150 L190,170 Z" fill="#9CA3AF" />
          
          <rect x="250" y="160" width="30" height="25" fill="#E5E7EB" />
          <path d="M250,160 L265,145 L280,160 Z" fill="#9CA3AF" />
          
          <rect x="400" y="140" width="50" height="35" fill="#E5E7EB" />
          <path d="M400,140 L425,120 L450,140 Z" fill="#9CA3AF" />
          
          <rect x="500" y="150" width="45" height="30" fill="#E5E7EB" />
          <path d="M500,150 L522.5,130 L545,150 Z" fill="#9CA3AF" />
          
          <rect x="650" y="130" width="40" height="30" fill="#E5E7EB" />
          <path d="M650,130 L670,110 L690,130 Z" fill="#9CA3AF" />
          
          <rect x="750" y="145" width="35" height="25" fill="#E5E7EB" />
          <path d="M750,145 L767.5,125 L785,145 Z" fill="#9CA3AF" />
        </svg>
      </div>
      
      {/* 貓咪元素 */}
      <div className="absolute bottom-20 right-10 w-40 h-40 opacity-40 animate-bounce-slow">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          {/* 貓身體 */}
          <ellipse cx="50" cy="60" rx="25" ry="20" fill="#4B5563" />
          
          {/* 貓頭 */}
          <circle cx="50" cy="35" r="15" fill="#4B5563" />
          
          {/* 貓耳朵 */}
          <path d="M38,25 L35,15 L45,22 Z" fill="#4B5563" />
          <path d="M62,25 L65,15 L55,22 Z" fill="#4B5563" />
          
          {/* 貓眼睛 */}
          <ellipse cx="43" cy="33" rx="3" ry="4" fill="#FFFFFF" />
          <ellipse cx="57" cy="33" rx="3" ry="4" fill="#FFFFFF" />
          <ellipse cx="43" cy="33" rx="1.5" ry="2" fill="#000000" />
          <ellipse cx="57" cy="33" rx="1.5" ry="2" fill="#000000" />
          
          {/* 貓鼻子和嘴巴 */}
          <path d="M50,38 L48,42 L52,42 Z" fill="#FCA5A5" />
          <path d="M50,42 L50,45" stroke="#000000" strokeWidth="0.5" fill="none" />
          <path d="M48,45 C49,47 51,47 52,45" stroke="#000000" strokeWidth="0.5" fill="none" />
          
          {/* 貓尾巴 */}
          <path d="M75,60 C85,55 85,45 80,40" stroke="#4B5563" strokeWidth="6" fill="none" />
        </svg>
      </div>
      
      {/* 第二隻貓 */}
      <div className="absolute bottom-40 left-20 w-32 h-32 opacity-30">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          {/* 坐著的貓 */}
          <ellipse cx="50" cy="65" rx="20" ry="15" fill="#6B7280" />
          <circle cx="50" cy="40" r="12" fill="#6B7280" />
          <path d="M40,32 L38,22 L45,28 Z" fill="#6B7280" />
          <path d="M60,32 L62,22 L55,28 Z" fill="#6B7280" />
          <path d="M50,65 L50,85" stroke="#6B7280" strokeWidth="30" strokeLinecap="round" />
          <ellipse cx="44" cy="38" rx="2" ry="3" fill="#FFFFFF" />
          <ellipse cx="56" cy="38" rx="2" ry="3" fill="#FFFFFF" />
          <ellipse cx="44" cy="38" rx="1" ry="1.5" fill="#000000" />
          <ellipse cx="56" cy="38" rx="1" ry="1.5" fill="#000000" />
          <path d="M50,42 L48,45 L52,45 Z" fill="#FCA5A5" />
          <path d="M30,65 C20,60 25,50 28,45" stroke="#6B7280" strokeWidth="4" fill="none" />
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
};