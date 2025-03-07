import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface HeaderProps {
  title: string;
  subtitle: string;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  const { themeColors } = useTheme();
  
  return (
    <header className={`${themeColors.primary} shadow-md transition-colors duration-500 py-6 px-4 relative z-10`}>
      <div className="container mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{title}</h1>
        <h2 className="text-xl md:text-2xl text-gray-700">{subtitle}</h2>
        
        {/* 日本風格裝飾元素 */}
        <div className="absolute top-0 left-0 w-24 h-24 opacity-20">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M20,20 L80,20 L80,80 L20,80 Z" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M30,30 L70,30 L70,70 L30,70 Z" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M40,40 L60,40 L60,60 L40,60 Z" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
        
        <div className="absolute top-0 right-0 w-24 h-24 opacity-20">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M20,20 L80,20 L80,80 L20,80 Z" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M30,30 L70,30 L70,70 L30,70 Z" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M40,40 L60,40 L60,60 L40,60 Z" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </header>
  );
};