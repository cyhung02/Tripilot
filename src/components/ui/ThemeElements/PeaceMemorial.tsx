import React from 'react';
import { Sakura } from './Sakura';

export const PeaceMemorial: React.FC = () => {
    return (
        <>
            {/* 櫻花背景 */}
            <Sakura />

            {/* 和平紀念公園原爆圓頂 */}
            <div className="absolute bottom-0 w-full opacity-10 pointer-events-none">
                <div className="container mx-auto relative h-64">
                    <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 left-0 w-full h-full">
                        {/* 原爆圓頂 */}
                        <path d="M300,300 L300,150 A100,100 0 0,1 500,150 L500,300 Z" fill="none" stroke="#555" strokeWidth="3" />

                        {/* 窗戶 */}
                        <rect x="330" y="200" width="20" height="30" fill="none" stroke="#555" strokeWidth="2" />
                        <rect x="370" y="200" width="20" height="30" fill="none" stroke="#555" strokeWidth="2" />
                        <rect x="410" y="200" width="20" height="30" fill="none" stroke="#555" strokeWidth="2" />
                        <rect x="450" y="200" width="20" height="30" fill="none" stroke="#555" strokeWidth="2" />

                        {/* 門 */}
                        <rect x="380" y="240" width="40" height="60" fill="none" stroke="#555" strokeWidth="2" />

                        {/* 金字塔形紀念碑 */}
                        <path d="M600,300 L650,180 L700,300 Z" fill="none" stroke="#555" strokeWidth="2" />

                        {/* 象徵和平的鴿子 */}
                        <path d="M150,150 C170,140 200,160 190,170 L210,160 C220,165 215,185 200,180 C190,200 160,190 150,150 Z" fill="#fff" stroke="#555" strokeWidth="1" />
                    </svg>
                </div>
            </div>

            {/* 象徵和平的光芒 */}
            <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-80 h-80 bg-blue-200 bg-opacity-10 rounded-full filter blur-xl animate-pulse"></div>
        </>
    );
};