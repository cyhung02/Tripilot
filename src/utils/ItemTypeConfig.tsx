// src/utils/ItemTypeConfig.tsx
import React from 'react';

// 定義類型配置的結構
export interface TypeConfig {
    background: string;
    detailPanel: string;
    iconClass: string;
    icon: React.ReactNode;
}

// 行程項目類型的樣式和圖標配置
export const typeConfig: Record<string, TypeConfig> = {
    '景點': {
        background: 'bg-white',
        detailPanel: 'bg-pink-50 border-pink-200',
        iconClass: 'bg-pink-100 text-pink-600',
        icon: (
            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2c-3.31 0-6 2.69-6 6 0 4.5 6 12 6 12s6-7.5 6-12c0-3.31-2.69-6-6-6zm0 9a3 3 0 100-6 3 3 0 000 6z"></path>
            </svg>
        ),
    },
    '交通': {
        background: 'bg-purple-50',
        detailPanel: 'bg-purple-50 border-purple-200',
        iconClass: 'bg-purple-100 text-purple-500',
        icon: (
            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
            </svg>
        ),
    },
    '餐廳': {
        background: 'bg-yellow-50',
        detailPanel: 'bg-yellow-50 border-yellow-200',
        iconClass: 'bg-yellow-100 text-yellow-600',
        icon: (
            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                <line x1="6" y1="1" x2="6" y2="4"></line>
                <line x1="10" y1="1" x2="10" y2="4"></line>
                <line x1="14" y1="1" x2="14" y2="4"></line>
            </svg>
        ),
    },
    '購物': {
        background: 'bg-blue-50',
        detailPanel: 'bg-blue-50 border-blue-200',
        iconClass: 'bg-blue-100 text-blue-600',
        icon: (
            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
        ),
    },
    '其他': {
        background: 'bg-gray-50',
        detailPanel: 'bg-gray-50 border-gray-200',
        iconClass: 'bg-gray-100 text-gray-600',
        icon: (
            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
            </svg>
        ),
    },
};