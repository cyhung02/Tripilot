// src/providers/AppProviders.tsx
import { ReactNode } from 'react';
import { DataProvider } from '../context/DataContext';
import { UIStateProvider } from '../context/UIStateContext';
import { FormatterProvider } from '../context/FormatterContext';

interface AppProvidersProps {
    children: ReactNode;
}

/**
 * 應用程序的主要 Provider 組合
 * 負責包裝所有必要的 Context Provider
 */
const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
    return (
        <DataProvider>
            <UIStateProvider>
                <FormatterProvider>
                    {children}
                </FormatterProvider>
            </UIStateProvider>
        </DataProvider>
    );
};

export default AppProviders;