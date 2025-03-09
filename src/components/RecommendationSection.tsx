import { motion } from 'framer-motion';

interface RecommendationSectionProps {
  title: string;
  items: string[];
  iconType: 'food' | 'shopping' | 'activity';
}

const RecommendationSection: React.FC<RecommendationSectionProps> = ({
  title,
  items,
  iconType
}) => {
  // 選擇圖標和樣式顏色基於類型
  const getIconAndColor = () => {
    switch (iconType) {
      case 'food':
        return {
          icon: (
            <svg className="w-3 h-3 text-rose-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
              <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
              <line x1="6" y1="1" x2="6" y2="4"></line>
              <line x1="10" y1="1" x2="10" y2="4"></line>
              <line x1="14" y1="1" x2="14" y2="4"></line>
            </svg>
          ),
          bgColor: 'bg-rose-100',
          textColor: 'text-rose-500'
        };
      case 'shopping':
        return {
          icon: (
            <svg className="w-3 h-3 text-pink-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
          ),
          bgColor: 'bg-pink-100',
          textColor: 'text-pink-600'
        };
      case 'activity':
      default:
        return {
          icon: (
            <svg className="w-3 h-3 text-purple-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          ),
          bgColor: 'bg-purple-100',
          textColor: 'text-purple-500'
        };
    }
  };

  const { icon, bgColor } = getIconAndColor();

  // 為元素添加動畫
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="mb-6">
      <h3 className="text-xl font-bold mb-3 text-pink-800 flex items-center">
        {title}
        <svg className="w-4 h-4 ml-1 text-pink-400" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 15 C 55 10, 65 0, 70 5 C 80 10, 95 30, 90 45 C 85 60, 70 80, 50 85 C 30 80, 15 60, 10 45 C 5 30, 20 10, 30 5 C 35 0, 45 10, 50 15" 
            fill="currentColor" />
        </svg>
      </h3>
      
      <motion.div 
        className="bg-white rounded-lg shadow-sm p-4 border border-pink-100"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <ul className="space-y-2" aria-label={title}>
          {items.map((item, index) => (
            <motion.li 
              key={index} 
              className="flex items-center"
              variants={itemVariants}
            >
              <div className={`w-6 h-6 rounded-full ${bgColor} flex items-center justify-center mr-3`}>
                {icon}
              </div>
              <div>
                <p className="font-medium text-sm">{item}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default RecommendationSection;