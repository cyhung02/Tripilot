// src/context/FormatterContext.tsx
import { createContext, useContext, ReactNode, useMemo } from 'react';
import { formatDisplayDate } from '../utils/dateUtils';

// 定義 Context 的值類型
interface FormatterContextType {
    formatDisplayDate: (date: string) => string;
    // 未來可以添加更多格式化函數
}

// 創建 Context
const FormatterContext = createContext<FormatterContextType | undefined>(undefined);

// 提供一個 Hook 以便於獲取 Context
export const useFormatter = (): FormatterContextType => {
    const context = useContext(FormatterContext);
    if (context === undefined) {
        throw new Error('useFormatter 必須在 FormatterProvider 內使用');
    }
    return context;
};

// Context Provider 元件
interface FormatterProviderProps {
    children: ReactNode;
}

export const FormatterProvider: React.FC<FormatterProviderProps> = ({ children }) => {
    // 使用 useMemo 緩存 Context 值，避免不必要的重新渲染
    const contextValue = useMemo(() => ({
        formatDisplayDate
        // 在這裡可以添加其他格式化函數
    }), []);

    return (
        <FormatterContext.Provider value={contextValue}>
            {children}
        </FormatterContext.Provider>
    );
};