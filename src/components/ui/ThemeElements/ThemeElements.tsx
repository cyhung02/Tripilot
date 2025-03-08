import React, { useEffect } from 'react';
import { ThemeElementType } from '../../../types/ThemeElements';
import { useTheme } from '../../../contexts/ThemeContext';

// 引入各種主題元素元件
import { Sakura } from './Sakura';
import { OsakaCastle } from './OsakaCastle';
import { Onsen } from './Onsen';
import { PeaceMemorial } from './PeaceMemorial';
import { ToriiGate } from './ToriiGate';
import { OnomichiCat } from './OnomichiCat';
import { TsuyamaCastle } from './TsuyamaCastle';
import { HimejiCastle } from './HimejiCastle';
import { Kurashiki } from './Kurashiki';
import { OkayamaGarden } from './OkayamaGarden';

interface ThemeElementsProps {
  themeType: ThemeElementType;
}

export const ThemeElements: React.FC<ThemeElementsProps> = ({ themeType }) => {
  const { setThemeElement } = useTheme();
  
  // 當主題類型改變時，更新上下文中的主題元素
  useEffect(() => {
    setThemeElement(themeType);
  }, [themeType, setThemeElement]);
  
  // 根據主題類型渲染對應的元素
  const renderThemeElement = () => {
    switch (themeType) {
      case 'sakura':
        return <Sakura />;
      case 'osaka-castle':
        return <OsakaCastle />;
      case 'onsen':
        return <Onsen />;
      case 'peace-memorial':
        return <PeaceMemorial />;
      case 'torii-gate':
        return <ToriiGate />;
      case 'onomichi-cat':
        return <OnomichiCat />;
      case 'tsuyama-castle':
        return <TsuyamaCastle />;
      case 'himeji-castle':
        return <HimejiCastle />;
      case 'kurashiki':
        return <Kurashiki />;
      case 'okayama-garden':
        return <OkayamaGarden />;
      default:
        return <Sakura />;
    }
  };
  
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {renderThemeElement()}
    </div>
  );
};