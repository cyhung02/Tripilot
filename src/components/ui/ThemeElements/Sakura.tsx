import React, { useEffect, useState } from 'react';

interface SakuraPetal {
  id: number;
  size: number;
  x: number;
  y: number;
  rotation: number;
  animationDuration: number;
  delay: number;
}

export const Sakura: React.FC = () => {
  const [petals, setPetals] = useState<SakuraPetal[]>([]);
  
  useEffect(() => {
    const createPetals = () => {
      const numberOfPetals = 20;
      const newPetals: SakuraPetal[] = [];
      
      for (let i = 0; i < numberOfPetals; i++) {
        newPetals.push({
          id: i,
          size: Math.random() * 10 + 15, // 15-25px
          x: Math.random() * 100, // 0-100%
          y: -10, // Start above the viewport
          rotation: Math.random() * 360, // Random rotation
          animationDuration: Math.random() * 10 + 10, // 10-20s
          delay: Math.random() * 15 // 0-15s delay
        });
      }
      
      setPetals(newPetals);
    };
    
    createPetals();
    
    // 重新生成花瓣的間隔
    const interval = setInterval(() => {
      createPetals();
    }, 20000); // 每20秒重新生成一次
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="sakura-container">
      {petals.map(petal => (
        <div
          key={petal.id}
          className="absolute opacity-60"
          style={{
            left: `${petal.x}%`,
            top: `${petal.y}%`,
            width: `${petal.size}px`,
            height: `${petal.size}px`,
            animation: `fall ${petal.animationDuration}s linear ${petal.delay}s infinite`,
            transform: `rotate(${petal.rotation}deg)`,
          }}
        >
          <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M20 1C12 1 8 7 8 13C8 19 12 24 10 28C8 32 1 35 1 35C1 35 10 39 20 39C30 39 39 35 39 35C39 35 32 32 30 28C28 24 32 19 32 13C32 7 28 1 20 1Z"
              fill="#ffb7c5"
              stroke="#ff9eb5"
              strokeWidth="1"
            />
          </svg>
        </div>
      ))}
      
      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translate(0, -10%) rotate(0deg);
          }
          100% {
            transform: translate(${Math.random() > 0.5 ? '' : '-'}${Math.random() * 100 + 50}px, 100vh) rotate(${Math.random() * 720}deg);
          }
        }
      `}</style>
    </div>
  );
};