import { motion } from 'framer-motion';
import Button from './Button';

const CategoryCard = ({ 
  title, 
  description, 
  accentColor, 
  accentColorLight,
  icon, 
  index,
  isDarkMode = false 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.05, 
        y: -10,
        transition: { type: "spring", stiffness: 300 }
      }}
      whileTap={{ scale: 0.98 }}
      className={`relative rounded-3xl overflow-hidden ${isDarkMode ? 'gradient-card-dark' : 'gradient-card-light'} shadow-xl hover:shadow-2xl transition-all duration-500`}
      style={{
        borderTop: `6px solid ${accentColor}`,
        boxShadow: isDarkMode 
          ? `0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px ${accentColor}40`
          : `0 20px 40px rgba(0, 0, 0, 0.1), 0 0 15px ${accentColor}30`
      }}
    >
      {/* تأثير التوهج */}
      <div 
        className="absolute top-0 right-0 w-full h-1"
        style={{ 
          background: `linear-gradient(90deg, ${accentColor}00, ${accentColor}, ${accentColor}00)`,
          filter: 'blur(8px)',
          opacity: 0.7
        }}
      ></div>
      
      <div className="relative p-8">
        {/* الأيقونة */}
        <motion.div 
          className="w-24 h-24 rounded-2xl flex items-center justify-center mb-8 mx-auto"
          style={{ 
            background: isDarkMode 
              ? `linear-gradient(135deg, ${accentColor}20, ${accentColor}40)`
              : `linear-gradient(135deg, ${accentColorLight}30, ${accentColor}20)`
          }}
          whileHover={{ rotate: 5, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <div className="text-4xl" style={{ color: accentColor }}>
            {icon}
          </div>
        </motion.div>
        
        {/* العنوان */}
        <motion.h3 
          className="text-2xl font-bold text-center mb-4"
          style={{ color: isDarkMode ? '#FFFFFF' : '#1F2937' }}
        >
          {title}
        </motion.h3>
        
        {/* الوصف */}
        <motion.p 
          className="text-center mb-10 leading-relaxed"
          style={{ color: isDarkMode ? '#CBD5E1' : '#4B5563' }}
        >
          {description}
        </motion.p>
        
        {/* زر الاختيار */}
        <div className="flex justify-center">
          <Button 
            variant="primary" 
            size="md"
            className="w-full flex items-center justify-center font-bold"
            style={{ 
              background: `linear-gradient(45deg, ${accentColor}, ${accentColorLight})`,
              boxShadow: `0 10px 20px ${accentColor}40`
            }}
          >
            <i className="fas fa-arrow-left ml-2"></i>
            اختر الفئة
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryCard;