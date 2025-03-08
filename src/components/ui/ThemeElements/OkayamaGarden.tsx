import React from 'react';
import { Sakura } from './Sakura';

export const OkayamaGarden: React.FC = () => {
    return (
        <>
            {/* 櫻花背景 */}
            <Sakura />

            {/* 岡山後樂園元素 */}
            <div className="absolute bottom-0 w-full opacity-20 pointer-events-none">
                <svg viewBox="0 0 1000 400" xmlns="http://www.w3.org/2000/svg" className="w-full">
                    {/* 水面 */}
                    <path d="M0,300 L1000,300 L1000,400 L0,400 Z" fill="#93C5FD" />

                    {/* 島嶼 */}
                    <ellipse cx="500" cy="320" rx="200" ry="40" fill="#16A34A" />

                    {/* 庭園小山 */}
                    <path d="M400,320 Q450,250 500,320" fill="#16A34A" />
                    <path d="M500,320 Q550,270 600,320" fill="#16A34A" />

                    {/* 岡山城輪廓 */}
                    <path d="M800,180 L800,300 L900,300 L900,180 Z" fill="#1F2937" />
                    <path d="M820,150 L880,150 L880,180 L820,180 Z" fill="#1F2937" />
                    <path d="M830,120 L870,120 L870,150 L830,150 Z" fill="#1F2937" />
                    <path d="M830,120 L850,100 L870,120 Z" fill="#1F2937" />

                    {/* 茶室 */}
                    <rect x="450" y="300" width="50" height="30" fill="#92400E" />
                    <path d="M440,300 L460,280 L500,280 L510,300 Z" fill="#78350F" />

                    {/* 松樹 */}
                    <ellipse cx="350" cy="300" rx="30" ry="40" fill="#065F46" />
                    <ellipse cx="650" cy="300" rx="30" ry="40" fill="#065F46" />
                    <ellipse cx="200" cy="280" rx="40" ry="50" fill="#065F46" />

                    {/* 裝飾石頭 */}
                    <ellipse cx="480" cy="310" rx="10" ry="5" fill="#6B7280" />
                    <ellipse cx="520" cy="315" rx="15" ry="7" fill="#6B7280" />
                    <ellipse cx="300" cy="310" rx="12" ry="6" fill="#6B7280" />

                    {/* 小橋 */}
                    <path d="M600,300 Q620,310 640,300" stroke="#92400E" strokeWidth="6" fill="none" />

                    {/* 鯉魚 */}
                    <path d="M420,350 C425,345 430,345 435,350 C440,345 445,345 450,350" fill="#DC2626" />
                    <path d="M450,350 L460,350" stroke="#DC2626" strokeWidth="5" />

                    <path d="M520,360 C525,355 530,355 535,360 C540,355 545,355 550,360" fill="#2563EB" />
                    <path d="M550,360 L560,360" stroke="#2563EB" strokeWidth="5" />

                    <path d="M380,370 C385,365 390,365 395,370 C400,365 405,365 410,370" fill="#FBBF24" />
                    <path d="M410,370 L420,370" stroke="#FBBF24" strokeWidth="5" />
                </svg>
            </div>

            {/* 綠色漸層背景 - 表現日本園林感 */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-green-50 to-transparent opacity-30"></div>

            {/* 白桃元素 - 岡山特色 */}
            <div className="absolute top-40 right-20 w-24 h-24 opacity-20">
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="40" fill="#FBD7E8" />
                    <path d="M50,10 C70,10 90,30 90,50 C90,70 70,90 50,90 C30,90 10,70 10,50 C10,30 30,10 50,10 Z" stroke="#F9A8D4" strokeWidth="1" fill="none" />
                    <path d="M50,20 L50,5 M50,5 L45,15 M50,5 L55,15" stroke="#16A34A" strokeWidth="2" />
                    <path d="M30,30 C40,40 60,40 70,30" stroke="#F9A8D4" strokeWidth="1" fill="none" />
                </svg>
            </div>

            <div className="absolute bottom-40 left-20 w-24 h-24 opacity-20">
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="40" fill="#FBD7E8" />
                    <path d="M50,10 C70,10 90,30 90,50 C90,70 70,90 50,90 C30,90 10,70 10,50 C10,30 30,10 50,10 Z" stroke="#F9A8D4" strokeWidth="1" fill="none" />
                    <path d="M50,20 L50,5 M50,5 L45,15 M50,5 L55,15" stroke="#16A34A" strokeWidth="2" />
                    <path d="M30,30 C40,40 60,40 70,30" stroke="#F9A8D4" strokeWidth="1" fill="none" />
                </svg>
            </div>
        </>
    );
};