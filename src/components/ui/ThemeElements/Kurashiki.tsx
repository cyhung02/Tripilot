import React from 'react';

export const Kurashiki: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* 藍天背景 */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-indigo-100 to-indigo-50 opacity-70"></div>
      
      {/* 倉敷白壁建築 */}
      <div className="absolute bottom-0 w-full opacity-20">
        <svg viewBox="0 0 1000 300" xmlns="http://www.w3.org/2000/svg" className="w-full">
          {/* 水道 */}
          <rect x="0" y="200" width="1000" height="100" fill="#93C5FD" />
          
          {/* 建築群 */}
          <g>
            {/* 左側建築 */}
            <rect x="50" y="100" width="200" height="100" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="2" />
            <polygon points="50,100 150,50 250,100" fill="#4B5563" />
            <rect x="80" y="120" width="40" height="60" fill="#6B7280" />
            <rect x="150" y="120" width="40" height="60" fill="#6B7280" />
            <rect x="50" y="180" width="200" height="5" fill="#6B7280" />
          </g>
          
          <g>
            {/* 中間建築 */}
            <rect x="300" y="80" width="150" height="120" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="2" />
            <polygon points="300,80 375,40 450,80" fill="#4B5563" />
            <rect x="320" y="100" width="30" height="50" fill="#6B7280" />
            <rect x="370" y="100" width="30" height="50" fill="#6B7280" />
            <rect x="400" y="150" width="40" height="50" fill="#6B7280" />
            <rect x="300" y="180" width="150" height="5" fill="#6B7280" />
          </g>
          
          <g>
            {/* 倉庫風建築 */}
            <rect x="500" y="100" width="180" height="100" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="2" />
            <polygon points="500,100 590,60 680,100" fill="#4B5563" />
            <rect x="520" y="120" width="60" height="40" fill="#6B7280" />
            <rect x="600" y="120" width="60" height="40" fill="#6B7280" />
            <rect x="540" y="170" width="20" height="30" fill="#6B7280" />
            <rect x="620" y="170" width="20" height="30" fill="#6B7280" />
            <rect x="500" y="190" width="180" height="5" fill="#6B7280" />
          </g>
          
          <g>
            {/* 右側建築 */}
            <rect x="730" y="90" width="220" height="110" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="2" />
            <polygon points="730,90 840,40 950,90" fill="#4B5563" />
            <rect x="760" y="110" width="40" height="70" fill="#6B7280" />
            <rect x="830" y="110" width="40" height="70" fill="#6B7280" />
            <rect x="900" y="110" width="30" height="70" fill="#6B7280" />
            <rect x="730" y="190" width="220" height="5" fill="#6B7280" />
          </g>
          
          {/* 橋 */}
          <rect x="400" y="200" width="100" height="5" fill="#6B7280" />
          <rect x="410" y="205" width="80" height="10" fill="#6B7280" />
          <rect x="400" y="215" width="100" height="3" fill="#6B7280" />
          
          {/* 小船 */}
          <path d="M250,230 C270,240 290,240 310,230" fill="#9CA3AF" stroke="#6B7280" strokeWidth="2" />
          <rect x="275" y="220" width="10" height="10" fill="#6B7280" />
          
          <path d="M600,240 C620,250 640,250 660,240" fill="#9CA3AF" stroke="#6B7280" strokeWidth="2" />
          <rect x="625" y="230" width="10" height="10" fill="#6B7280" />
        </svg>
      </div>
      
      {/* 漂浮雲朵 */}
      <div className="absolute top-20 left-20 w-32 h-16 bg-white rounded-full opacity-40 animate-float-slow" style={{animationDelay: '0s'}}></div>
      <div className="absolute top-40 right-40 w-48 h-20 bg-white rounded-full opacity-30 animate-float-slow" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-10 right-20 w-24 h-12 bg-white rounded-full opacity-50 animate-float-slow" style={{animationDelay: '4s'}}></div>
      
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
};