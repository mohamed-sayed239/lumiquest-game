import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import CategoryCard from '../components/CategoryCard';

const Category = ({ isDarkMode }) => {
  const [activeHover, setActiveHover] = useState(null);
  
  const categories = useMemo(() => [
    {
      title: "المبتدئين",
      description: "ابدأ رحلتك بألغاز ممتعة وتحديات بسيطة. مثالي للتعلم والاستمتاع.",
      accentColor: "#FFD166",
      accentColorLight: "#4ECDC4",
      icon: "👶",
      difficulty: "سهل",
      features: ["تلميحات غير محدودة", "وقت إضافي", "مستويات تدريبية"],
      badge: "NEW PLAYER",
      bgColor: isDarkMode ? "rgba(255, 209, 102, 0.05)" : "rgba(255, 209, 102, 0.1)"
    },
    {
      title: "المتوسطين",
      description: "تحديات متوازنة تختبر مهاراتك المنطقية مع مزيج مثالي من الصعوبة والمتعة.",
      accentColor: "#4F46E5",
      accentColorLight: "#3B82F6",
      icon: "⚡",
      difficulty: "متوسط",
      features: ["تلميحات محدودة", "تحديات زمنية", "مستويات إبداعية"],
      badge: "CHALLENGER",
      bgColor: isDarkMode ? "rgba(79, 70, 229, 0.05)" : "rgba(79, 70, 229, 0.1)"
    },
    {
      title: "المحترفين",
      description: "تحديات معقدة تتطلب تفكيرًا استراتيجيًا متقدمًا. للمحترفين الباحثين عن تحدي حقيقي.",
      accentColor: "#0EA5E9",
      accentColorLight: "#0F172A",
      icon: "👑",
      difficulty: "صعب",
      features: ["بدون تلميحات", "تحديات صعبة", "تصنيف عالمي"],
      badge: "PRO GAMER",
      bgColor: isDarkMode ? "rgba(14, 165, 233, 0.05)" : "rgba(14, 165, 233, 0.1)"
    }
  ], [isDarkMode]);

  // حركات مبسطة للأداء
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        mass: 0.5
      }
    }
  };

  // تأثيرات الألعاب
  const getGameEffect = (index) => {
    switch(index) {
      case 0: // مبتدئين
        return "hover:shadow-[0_0_30px_rgba(255,209,102,0.3)]";
      case 1: // متوسطين
        return "hover:shadow-[0_0_30px_rgba(79,70,229,0.3)]";
      case 2: // محترفين
        return "hover:shadow-[0_0_30px_rgba(14,165,233,0.3)]";
      default:
        return "";
    }
  };

  return (
    <div 
      className="min-h-screen py-8 sm:py-12 lg:py-16 relative overflow-hidden"
      style={{
        background: isDarkMode 
          ? 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)'
          : 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 50%, #f8fafc 100%)',
        backgroundSize: '400% 400%',
        animation: 'gradientShift 15s ease infinite'
      }}
    >
      {/* تأثيرات خلفية ديناميكية */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full opacity-10 ${
              isDarkMode ? 'bg-blue-500' : 'bg-cyan-400'
            }`}
            style={{
              width: `${100 + i * 50}px`,
              height: `${100 + i * 50}px`,
              top: `${20 + i * 20}%`,
              left: `${10 + i * 30}%`,
            }}
            animate={{
              y: [0, 30, 0],
              x: [0, 20, 0],
            }}
            transition={{
              duration: 10 + i * 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* العنوان الرئيسي مع تأثيرات الألعاب */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <div className="inline-block mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm">
            <span className="text-sm font-bold text-cyan-400">⭐ اختر مغامرتك ⭐</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 lg:mb-6 tracking-tight">
            <span className={`bg-clip-text text-transparent bg-gradient-to-r ${
              isDarkMode 
                ? 'from-cyan-300 via-blue-400 to-purple-400' 
                : 'from-blue-600 via-indigo-600 to-purple-600'
            }`}>
              اختر مستوى التحدي
            </span>
          </h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={`text-lg sm:text-xl max-w-2xl sm:max-w-3xl mx-auto leading-relaxed ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            كل مستوى مصمم بتجربة لعب فريدة. اختر ما يناسب مهاراتك وانطلق في المغامرة!
          </motion.p>

          {/* مؤشر التقدم */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "60%" }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-1 mt-6 mx-auto rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"
          />
        </motion.div>

        {/* بطاقات المستويات */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 max-w-7xl mx-auto"
        >
          {categories.map((category, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              onHoverStart={() => setActiveHover(index)}
              onHoverEnd={() => setActiveHover(null)}
              className={`relative transform transition-all duration-300 ${getGameEffect(index)}`}
            >
              {/* تأثيرات الألعاب */}
              {activeHover === index && (
                <div 
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${category.accentColor}20, transparent 70%)`,
                    filter: 'blur(20px)',
                    zIndex: -1
                  }}
                />
              )}

              <CategoryCard
                index={index}
                title={category.title}
                description={category.description}
                accentColor={category.accentColor}
                accentColorLight={category.accentColorLight}
                icon={category.icon}
                difficulty={category.difficulty}
                features={category.features}
                badge={category.badge}
                isDarkMode={isDarkMode}
                isActive={activeHover === index}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* قسم النصائح مع تصميم الألعاب */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-14 sm:mt-20 lg:mt-24"
        >
          <div className={`relative rounded-2xl p-6 sm:p-8 overflow-hidden ${
            isDarkMode 
              ? 'bg-gradient-to-br from-gray-900/80 to-gray-800/60' 
              : 'bg-gradient-to-br from-white/90 to-blue-50/90'
          } backdrop-blur-lg border ${
            isDarkMode ? 'border-gray-700/50' : 'border-blue-200/50'
          } shadow-2xl game-border`}>
            
            {/* تأثير corner للألعاب */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-400 rounded-tl-lg"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-cyan-400 rounded-tr-lg"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-cyan-400 rounded-bl-lg"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan-400 rounded-br-lg"></div>

            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
                {/* الأيقونة مع تأثيرات الألعاب */}
                <div className="relative">
                  <motion.div
                    animate={{ 
                      rotate: [0, 5, 0, -5, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      repeatDelay: 2 
                    }}
                    className={`p-5 rounded-xl ${
                      isDarkMode 
                        ? 'bg-gradient-to-br from-amber-900/40 to-yellow-900/40' 
                        : 'bg-gradient-to-br from-amber-100/80 to-yellow-100/80'
                    } border ${
                      isDarkMode ? 'border-amber-600/30' : 'border-amber-300/50'
                    } shadow-lg`}
                  >
                    <span className="text-4xl">💡</span>
                  </motion.div>
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity 
                    }}
                    className="absolute inset-0 rounded-xl bg-amber-400/10 blur-xl"
                  />
                </div>
                
                {/* المحتوى */}
                <div className="flex-1 text-center lg:text-right">
                  <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20">
                    <span className="text-cyan-400">🎮</span>
                    <h3 className={`text-xl sm:text-2xl font-bold ${
                      isDarkMode ? 'text-white' : 'text-gray-800'
                    }`}>
                      نصيحة اللاعبين
                    </h3>
                    <span className="text-cyan-400">🎯</span>
                  </div>
                  
                  <div className={`space-y-3 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-transparent via-white/5 to-transparent">
                      <span className="text-cyan-400 text-lg">🎯</span>
                      <div className="text-right">
                        <span className={`font-bold ${
                          isDarkMode ? 'text-cyan-300' : 'text-blue-600'
                        }`}>المبتدئين:</span>
                        <span className="mr-2">ابدأ هنا لتعلم الأساسيات واستمتع</span>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-transparent via-white/5 to-transparent">
                      <span className="text-indigo-400 text-lg">⚡</span>
                      <div className="text-right">
                        <span className={`font-bold ${
                          isDarkMode ? 'text-indigo-300' : 'text-indigo-600'
                        }`}>المتوسطين:</span>
                        <span className="mr-2">تحدٍ متوازن لتنمية مهاراتك</span>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-transparent via-white/5 to-transparent">
                      <span className="text-purple-400 text-lg">👑</span>
                      <div className="text-right">
                        <span className={`font-bold ${
                          isDarkMode ? 'text-purple-300' : 'text-purple-600'
                        }`}>المحترفين:</span>
                        <span className="mr-2">تحدٍ حقيقي للمهارات المتقدمة</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* بطاقة اللاعب */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className={`inline-flex items-center gap-3 mt-6 px-4 py-3 rounded-xl ${
                      isDarkMode 
                        ? 'bg-gradient-to-r from-gray-800/60 to-gray-900/60' 
                        : 'bg-gradient-to-r from-blue-100/80 to-cyan-100/80'
                    } border ${
                      isDarkMode ? 'border-gray-700/50' : 'border-blue-200/50'
                    } shadow-lg cursor-pointer`}
                  >
                    <span className="text-xl">🏆</span>
                    <div className="text-right">
                      <p className={`text-sm font-bold ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        يمكنك تغيير المستوى لاحقًا
                      </p>
                      <p className={`text-xs ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        ابدأ بأي مستوى وتقدم كما تريد
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* دعوة للعب */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-12 sm:mt-16 text-center"
        >
          <div className="inline-flex flex-col items-center gap-4">
            <motion.div
              animate={{ 
                y: [0, -5, 0],
                rotate: [0, 5, 0, -5, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity 
              }}
              className="text-3xl"
            >
              🎮
            </motion.div>
            
            <p className={`text-lg font-bold ${
              isDarkMode ? 'text-cyan-300' : 'text-blue-600'
            }`}>
              اختر مستواك وانطلق في المغامرة!
            </p>
            
            <motion.div
              animate={{ 
                scale: [0.95, 1, 0.95],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity 
              }}
              className={`px-6 py-3 rounded-full ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20' 
                  : 'bg-gradient-to-r from-blue-100/80 to-cyan-100/80'
              }`}
            >
              <p className={`text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                <span className="ml-2">⬆️</span>
                مرر لأعلى للاختيار
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* موجات تفاعلية */}
      <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden pointer-events-none">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="absolute bottom-0 w-full h-full"
        >
          <path 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
            fill={isDarkMode ? "#1e293b" : "#ffffff"}
            opacity="0.9"
          />
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
            fill={isDarkMode ? "#0f172a" : "#f8fafc"}
            opacity="0.8"
          />
        </svg>
      </div>
    </div>
  );
};

export default Category;