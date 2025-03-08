import React, { createContext, useState, useContext, ReactNode } from 'react';
import { ThemeElementType } from '../types/ThemeElements';

interface ThemeContextType {
  themeElement: ThemeElementType;
  setThemeElement: (theme: ThemeElementType) => void;
  themeColors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
}

const defaultTheme: ThemeContextType = {
  themeElement: 'sakura',
  setThemeElement: () => {},
  themeColors: {
    primary: 'bg-pink-200',
    secondary: 'bg-pink-100',
    accent: 'bg-pink-400',
    background: 'bg-rose-50',
  }
};

const ThemeContext = createContext<ThemeContextType>(defaultTheme);

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: ReactNode;
}

const themeColorMap: Record<ThemeElementType, typeof defaultTheme.themeColors> = {
  'sakura': {
    primary: 'bg-pink-200',
    secondary: 'bg-pink-100',
    accent: 'bg-pink-400',
    background: 'bg-rose-50',
  },
  'osaka-castle': {
    primary: 'bg-amber-200',
    secondary: 'bg-amber-100',
    accent: 'bg-amber-400',
    background: 'bg-amber-50',
  },
  'onsen': {
    primary: 'bg-cyan-200',
    secondary: 'bg-cyan-100',
    accent: 'bg-cyan-400',
    background: 'bg-cyan-50',
  },
  'peace-memorial': {
    primary: 'bg-blue-200',
    secondary: 'bg-blue-100',
    accent: 'bg-blue-400',
    background: 'bg-blue-50',
  },
  'torii-gate': {
    primary: 'bg-red-200',
    secondary: 'bg-red-100',
    accent: 'bg-red-400',
    background: 'bg-red-50',
  },
  'onomichi-cat': {
    primary: 'bg-orange-200',
    secondary: 'bg-orange-100',
    accent: 'bg-orange-400',
    background: 'bg-orange-50',
  },
  'tsuyama-castle': {
    primary: 'bg-emerald-200',
    secondary: 'bg-emerald-100',
    accent: 'bg-emerald-400',
    background: 'bg-emerald-50',
  },
  'himeji-castle': {
    primary: 'bg-purple-200',
    secondary: 'bg-purple-100',
    accent: 'bg-purple-400',
    background: 'bg-purple-50',
  },
  'kurashiki': {
    primary: 'bg-indigo-200',
    secondary: 'bg-indigo-100',
    accent: 'bg-indigo-400',
    background: 'bg-indigo-50',
  },
  'okayama-garden': {
    primary: 'bg-green-200',
    secondary: 'bg-green-100',
    accent: 'bg-green-400',
    background: 'bg-green-50',
  }
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [themeElement, setThemeElement] = useState<ThemeElementType>('sakura');
  const themeColors = themeColorMap[themeElement];

  return (
    <ThemeContext.Provider value={{ themeElement, setThemeElement, themeColors }}>
      {children}
    </ThemeContext.Provider>
  );
};