import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { Navigation } from './components/layout/Navigation';
import { DailySchedule } from './components/features/DailySchedule';
import { Footer } from './components/layout/Footer';
import { ThemeProvider } from './contexts/ThemeContext';
import { scheduleData } from './data/travelSchedule';
import { ThemeElements } from './components/ui/ThemeElements/ThemeElements';

const App: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState(scheduleData[0].id);
  
  const handleDayChange = (dayId: string) => {
    setSelectedDay(dayId);
  };
  
  const currentDay = scheduleData.find(day => day.id === selectedDay) || scheduleData[0];

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-rose-50 relative overflow-hidden">
        <ThemeElements themeType={currentDay.themeElement} />
        
        <Header title="日本關西與中國地方旅遊手冊" subtitle={`${currentDay.date} | ${currentDay.title}`} />
        
        <main className="flex-grow container mx-auto px-4 py-8 relative z-10">
          <Navigation 
            days={scheduleData} 
            selectedDay={selectedDay} 
            onDayChange={handleDayChange} 
          />
          
          <DailySchedule day={currentDay} />
        </main>
        
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default App;