import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

export const Footer: React.FC = () => {
    const { themeColors } = useTheme();

    return (
        <footer className={`${themeColors.primary} py-4 px-4 text-center text-gray-700 relative z-10 transition-colors duration-500`}>
            <div className="container mx-auto">
                <p className="mb-2">日本關西與中國地方旅遊手冊 © {new Date().getFullYear()}</p>
                <p className="text-sm">祝您旅途愉快！安全健康！</p>
            </div>
        </footer>
    );
};