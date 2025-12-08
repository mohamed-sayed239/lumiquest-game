import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/Button';

const Landing = ({ isDarkMode }) => {
  const [stars, setStars] = useState([]);
  const [mounted, setMounted] = useState(false);
  
  // توليد النجوم مع استخدام useMemo للأداء
  const starCount = useMemo(() => (isDarkMode ? 120 : 60), [isDarkMode]);
  
  useEffect(() => {
    setMounted(true);
    
    const generatedStars = [];
    for (let i = 0; i < starCount; i++) {
      generatedStars.push({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() > 0.85 ? 'large' : Math.random() > 0.5 ? 'medium' : 'small',
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 4,
        opacity: isDarkMode ? 0.6 + Math.random() * 0.4 : 0.2 + Math.random() * 0.3
      });
    }
    setStars(generatedStars);
    
    // Cleanup
    return () => setMounted(false);
  }, [isDarkMode, starCount]);
  
  // حركات متقدمة مع تحسينات للأداء
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
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
        damping: 12
      }
    }
  };
  
  const logoVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 15,
        delay: 0.2
      }
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.3 }
    }
  };
  
  const features = [
    { 
      icon: 'fa-puzzle-piece', 
      text: 'ألغاز شيقة', 
      color: 'text-purple-400',
      delay: 0
    },
    { 
      icon: 'fa-trophy', 
      text: 'مستويات متدرجة', 
      color: 'text-yellow-400',
      delay: 0.1
    },
    { 
      icon: 'fa-lightbulb', 
      text: 'تحديات ذكية', 
      color: 'text-cyan-400',
      delay: 0.2
    },
    { 
      icon: 'fa-globe', 
      text: 'تجربة عالمية', 
      color: 'text-emerald-400',
      delay: 0.3
    }
  ];

  return (
    <div 
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      role="main"
      aria-label="صفحة البداية للعبة LUMIQUEST"
    >
      {/* SEO: إضافة العنوان الوصفي */}
      <h1 className="sr-only">LUMIQUEST - لعبة مغامرات تفاعلية بتصميم عصري</h1>
      
      {/* النجوم المتحركة مع تحسين الأداء */}
      <AnimatePresence>
        {mounted && (
          <div className="fixed inset-0 pointer-events-none">
            {stars.map(star => (
              <motion.div
                key={`star-${star.id}`}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [star.opacity * 0.3, star.opacity, star.opacity * 0.3],
                }}
                transition={{
                  duration: star.duration,
                  delay: star.delay,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className={`absolute ${star.size === 'large' ? 'w-1.5 h-1.5' : star.size === 'medium' ? 'w-1 h-1' : 'w-0.5 h-0.5'} bg-white rounded-full`}
                style={{
                  top: star.top,
                  left: star.left,
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
      
      {/* تأثيرات الضوء المتحركة */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isDarkMode ? [0.15, 0.25, 0.15] : [0.05, 0.1, 0.05],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute top-1/4 left-1/4 w-64 h-64 rounded-full ${isDarkMode ? 'bg-indigo-900/30' : 'bg-blue-100/30'}`}
        style={{ filter: 'blur(80px)' }}
      />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isDarkMode ? [0.1, 0.2, 0.1] : [0.03, 0.06, 0.03],
          scale: [1, 1.05, 1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full ${isDarkMode ? 'bg-purple-900/20' : 'bg-cyan-100/20'}`}
        style={{ filter: 'blur(100px)' }}
      />
      
      {/* المحتوى الرئيسي */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-7xl mx-auto"
        >
          {/* العنوان الرئيسي */}
          <motion.div
            variants={logoVariants}
            whileHover="hover"
            className="mb-8 sm:mb-12"
          >
            <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black mb-4 sm:mb-6 tracking-tight leading-tight">
              <span className={`bg-clip-text text-transparent bg-gradient-to-r ${isDarkMode ? 'from-indigo-300 via-cyan-200 to-purple-300' : 'from-indigo-600 via-blue-500 to-purple-600'}`}>
                LUMIQUEST
              </span>
            </h2>
            
            <motion.div
              variants={itemVariants}
              className={`text-lg sm:text-xl md:text-2xl font-semibold ${isDarkMode ? 'text-cyan-100' : 'text-blue-600'} mb-6`}
            >
              <div className="inline-flex items-center justify-center gap-2 sm:gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent">
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="text-yellow-400"
                >
                  <i className="fas fa-star text-sm sm:text-base"></i>
                </motion.span>
                <span className="font-bold">مغامرة تفاعلية لا تُنسى</span>
                <motion.span
                  animate={{ rotate: -360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="text-yellow-400"
                >
                  <i className="fas fa-star text-sm sm:text-base"></i>
                </motion.span>
              </div>
            </motion.div>
          </motion.div>
          
          {/* الوصف */}
          <motion.div
            variants={itemVariants}
            className="mb-10 sm:mb-14"
          >
            <p className={`text-base sm:text-lg md:text-xl lg:text-2xl max-w-2xl sm:max-w-3xl mx-auto leading-relaxed ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              انطلق في رحلة استثنائية حيث يلتقي التحدي بالإثارة. كل مستوى يحمل مفاجآت فريدة، وكل تحدي يبني مهارات جديدة. 
              عالم <strong className={isDarkMode ? 'text-cyan-300' : 'text-blue-600'}>LUMIQUEST</strong> ينتظر مستكشفيه!
            </p>
          </motion.div>
          
          {/* زر البدء مع تأثيرات متقدمة */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="mb-14 sm:mb-20"
          >
            <Link 
              to="/category" 
              className="inline-block"
              aria-label="الانتقال إلى صفحة اختيار المستوى"
            >
              <motion.div
                animate={{
                  boxShadow: isDarkMode 
                    ? ['0 0 30px rgba(99, 102, 241, 0.5)', '0 0 40px rgba(99, 102, 241, 0.8)', '0 0 30px rgba(99, 102, 241, 0.5)']
                    : ['0 0 20px rgba(79, 70, 229, 0.3)', '0 0 30px rgba(79, 70, 229, 0.5)', '0 0 20px rgba(79, 70, 229, 0.3)']
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="rounded-2xl"
              >
                <Button
                  variant="primary"
                  size="lg"
                  className="px-8 sm:px-12 py-4 sm:py-5 text-lg sm:text-xl font-bold relative overflow-hidden group"
                  icon="fa-play"
                >
                  {/* تأثير خلف الزر */}
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.5 }}
                  />
                  <span className="relative z-10 flex items-center gap-2">
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <i className="fas fa-play ml-2"></i>
                    </motion.span>
                    ابدأ المغامرة الآن
                  </span>
                </Button>
              </motion.div>
            </Link>
            
            <motion.p
              variants={itemVariants}
              className={`mt-4 text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
            >
              اختر مستوى التحدي الذي يناسبك وانطلق
            </motion.p>
          </motion.div>
          
          {/* المميزات */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                custom={feature.delay}
                whileHover={{ 
                  y: -8,
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 300 }
                }}
                whileTap={{ scale: 0.95 }}
                className={`relative rounded-2xl p-4 sm:p-6 backdrop-blur-sm ${isDarkMode ? 'bg-gray-800/40 hover:bg-gray-800/60' : 'bg-white/60 hover:bg-white/80'} border ${isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50'} shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                <motion.div
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 ${isDarkMode ? 'bg-gray-900/50' : 'bg-white/80'}`}
                >
                  <i className={`fas ${feature.icon} text-2xl sm:text-3xl ${feature.color}`}></i>
                </motion.div>
                <p className={`font-semibold text-sm sm:text-base ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  {feature.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
          
          {/* دعوة إضافية */}
          <motion.div
            variants={itemVariants}
            className={`mt-12 sm:mt-16 p-4 sm:p-6 rounded-2xl ${isDarkMode ? 'bg-gradient-to-r from-gray-900/40 to-gray-800/40' : 'bg-gradient-to-r from-blue-50/70 to-cyan-50/70'} backdrop-blur-sm border ${isDarkMode ? 'border-gray-700/30' : 'border-blue-200/50'}`}
          >
            <p className={`text-sm sm:text-base md:text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <strong className={isDarkMode ? 'text-cyan-300' : 'text-blue-600'}>ملايين اللاعبين</strong> حول العالم اختاروا LUMIQUEST. 
              انضم إليهم الآن واختبر مهاراتك في عالم من التحديات الذكية!
            </p>
          </motion.div>
        </motion.div>
      </div>
      
      {/* موجة تفاعلية سفلية */}
      <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden pointer-events-none">
        <motion.svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="absolute bottom-0 w-full h-full"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <motion.path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            fill={isDarkMode ? "#1e293b" : "#f1f5f9"}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: [0.5, 0.6, 0.5] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            fill={isDarkMode ? "#0f172a" : "#ffffff"}
            initial={{ opacity: 0.7 }}
            animate={{ opacity: [0.7, 0.8, 0.7] }}
            transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
          />
        </motion.svg>
      </div>
      
      {/* SEO: إضافة بيانات منظمة غير مرئية */}
      <div className="sr-only" itemScope itemType="https://schema.org/VideoGame">
        <h2 itemProp="name">LUMIQUEST</h2>
        <p itemProp="description">لعبة مغامرات تفاعلية بتصميم عصري مع ثلاثة مستويات صعوبة</p>
        <p itemProp="genre">مغامرات، ألغاز، تحديات</p>
        <div itemProp="author" itemScope itemType="https://schema.org/Person">
          <span itemProp="name">فريق تطوير LUMIQUEST</span>
        </div>
      </div>
    </div>
  );
};

export default Landing;