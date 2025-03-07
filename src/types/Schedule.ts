import { ThemeElementType } from './ThemeElements';

export interface ScheduleDay {
  id: string;
  date: string;
  title: string;
  description: string;
  mainActivities: Array<{
    title: string;
    details?: string[];
  }>;
  transportation?: string[];
  foodRecommendations: string[];
  mustBuyItems?: string[];
  accommodation: {
    name: string;
    location?: string;
  };
  themeElement: ThemeElementType;
}