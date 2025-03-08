import React, { useState, useRef, useEffect } from 'react';
import { ScheduleDay } from '../../types/Schedule';
import { useTheme } from '../../contexts/ThemeContext';

interface NavigationProps {
    days: ScheduleDay[];
    selectedDay: string;
    onDayChange: (dayId: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ days, selectedDay, onDayChange }) => {
    const { themeColors } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // 選擇日期時，捲動到該日期
    useEffect(() => {
        if (scrollRef.current) {
            const selectedElement = scrollRef.current.querySelector(`[data-day-id="${selectedDay}"]`);
            if (selectedElement) {
                selectedElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        }
    }, [selectedDay]);

    return (
        <div className="mb-8">
            {/* 手機版下拉選單 */}
            <div className="md:hidden">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`${themeColors.accent} text-white w-full py-3 px-4 rounded-lg flex justify-between items-center mb-2 focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                >
                    <span>{days.find(day => day.id === selectedDay)?.date} | {days.find(day => day.id === selectedDay)?.title}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {isOpen && (
                    <div className={`${themeColors.secondary} rounded-lg shadow-lg overflow-hidden mb-4 transition-all duration-300 ease-in-out max-h-60 overflow-y-auto`}>
                        {days.map(day => (
                            <button
                                key={day.id}
                                onClick={() => {
                                    onDayChange(day.id);
                                    setIsOpen(false);
                                }}
                                className={`w-full text-left py-3 px-4 hover:bg-opacity-50 transition ${selectedDay === day.id ? `${themeColors.accent} text-white` : 'hover:bg-gray-100'
                                    }`}
                            >
                                {day.date} | {day.title}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* 桌面版水平捲動列表 */}
            <div className="hidden md:block">
                <div
                    ref={scrollRef}
                    className="flex overflow-x-auto py-2 scrollbar-hide scroll-smooth"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {days.map(day => (
                        <button
                            key={day.id}
                            data-day-id={day.id}
                            onClick={() => onDayChange(day.id)}
                            className={`whitespace-nowrap mx-1 py-2 px-4 rounded-full transition-all duration-300 focus:outline-none ${selectedDay === day.id
                                    ? `${themeColors.accent} text-white shadow-md transform scale-105`
                                    : `${themeColors.secondary} hover:bg-opacity-70`
                                }`}
                        >
                            {day.date} | {day.title}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};