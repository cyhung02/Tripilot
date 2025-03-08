import React, { useState } from 'react';

interface ActivityCardProps {
    title: string;
    details: string[];
    themeColor: string;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({ title, details, themeColor }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className={`${themeColor} rounded-lg overflow-hidden transition-all duration-300`}>
            <div
                className="p-4 flex justify-between items-center cursor-pointer"
                onClick={() => details.length > 0 && setIsExpanded(!isExpanded)}
            >
                <h4 className="text-lg font-medium">{title}</h4>
                {details.length > 0 && (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                )}
            </div>

            {isExpanded && details.length > 0 && (
                <div className="bg-white bg-opacity-50 p-4 border-t border-gray-200">
                    <ul className="list-disc pl-5 space-y-1">
                        {details.map((detail, index) => (
                            <li key={index}>{detail}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};