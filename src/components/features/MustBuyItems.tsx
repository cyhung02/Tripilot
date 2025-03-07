import React from 'react';

interface MustBuyItemsProps {
  items: string[];
  themeColor: string;
}

export const MustBuyItems: React.FC<MustBuyItemsProps> = ({ items, themeColor }) => {
  return (
    <div>
      <h3 className="text-xl font-bold text-gray-800 mb-4">必買推薦</h3>
      
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className={`${themeColor} p-4 rounded-lg flex items-center`}>
            <div className="w-8 h-8 mr-3 flex-shrink-0">
              {/* 購物袋圖示 */}
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16,7 C16,4.79086 14.2091,3 12,3 C9.79086,3 8,4.79086 8,7" stroke="currentColor" strokeWidth="1.5" />
                <path d="M3.69435,9.35258 C3.83942,7.99797 4.98595,7 6.34949,7 L17.6505,7 C19.014,7 20.1606,7.99797 20.3057,9.35258 L21.6511,20.3526 C21.8227,22.0448 20.5099,23.5346 18.8167,23.5346 L5.18331,23.5346 C3.49012,23.5346 2.17732,22.0448 2.34894,20.3526 L3.69435,9.35258 Z" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
            <span>{item}</span>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-gray-700 italic">
          帶些當地特色紀念品或伴手禮回家，讓旅行的回憶更加豐富！
        </p>
      </div>
    </div>
  );
};