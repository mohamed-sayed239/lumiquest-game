import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/Button';

const Landing = ({ isDarkMode }) => {
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // تأثيرات النجوم ديناميكية
  const starCount = useMemo(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) return isDarkMode ? 20 : 15;
    return isDarkMode ? 40 : 30;
  }, [isDarkMode]);

  const stars = useMemo(() => {
    const generatedStars = [];
    for (let i = 0; i < starCount; i++) {
      generatedStars.push({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() > 0.9 ? 'lg' : Math.random() > 0.6 ? 'md' : 'sm',
        delay: Math.random() * 2,
        speed: 2 + Math.random() * 3
      });
    }
    return generatedStars;
  }, [starCount]);

  // تأثير الماوس التفاعلي
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    setMounted(true);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      setMounted(false);
    };
  }, []);

  // حركات متقدمة للألعاب
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        mass: 0.8
      }
    },
    hover: {
      y: -3,
      scale: 1.03,
      transition: { duration: 0.2 }
    }
  };

  const titleVariants = {
    hidden: { y: -30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15,
        delay: 0.2
      }
    }
  };
const features = [
  { 
    icon: <i className="fas fa-puzzle-piece"></i>, 
    text: 'ألغاز شيقة', 
    color: 'text-purple-400',
    bgColor: isDarkMode ? 'bg-purple-900/20' : 'bg-purple-100/80'
  },
  { 
    icon: <i className="fas fa-layer-group"></i>, 
    text: 'مستويات متدرجة', 
    color: 'text-yellow-400',
    bgColor: isDarkMode ? 'bg-yellow-900/20' : 'bg-yellow-100/80'
  },
  { 
    icon: <i className="fas fa-brain"></i>, 
    text: 'تحديات ذكية', 
    color: 'text-cyan-400',
    bgColor: isDarkMode ? 'bg-cyan-900/20' : 'bg-cyan-100/80'
  },
  { 
    icon: <i className="fas fa-globe"></i>, 
    text: 'تجربة عالمية', 
    color: 'text-emerald-400',
    bgColor: isDarkMode ? 'bg-emerald-900/20' : 'bg-emerald-100/80'
  }
];


  // تأثير parallax للخلفية
  const backgroundStyle = {
    background: isDarkMode 
      ? `linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)`
      : `linear-gradient(135deg, #f8fafc 0%, #e0f2fe 50%, #dbeafe 100%)`,
    transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
  };

  return (
    <div 
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: isDarkMode ? '#0f172a' : '#f8fafc' }}
      role="main"
      aria-label="صفحة البداية للعبة LUMIQUEST"
    >
      {/* SEO */}
      <h1 className="sr-only">LUMIQUEST - لعبة مغامرات تفاعلية بأسلوب ألعاب الفيديو</h1>
      
      {/* خلفية متحركة */}
      <motion.div 
        className="absolute inset-0"
        style={backgroundStyle}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* تأثيرات الجسيمات (أبسط للسرعة) */}
      <div className="fixed inset-0 pointer-events-none">
        {stars.map(star => (
          <motion.div
            key={star.id}
            className={`absolute bg-white rounded-full ${
              star.size === 'lg' ? 'w-1.5 h-1.5' : 
              star.size === 'md' ? 'w-1 h-1' : 'w-0.5 h-0.5'
            }`}
            style={{
              top: star.top,
              left: star.left,
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: star.speed,
              repeat: Infinity,
              delay: star.delay,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* تأثيرات الضوء */}
      <motion.div
        animate={{
          opacity: isDarkMode ? [0.1, 0.2, 0.1] : [0.05, 0.1, 0.05],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className={`absolute top-1/4 left-1/4 w-64 h-64 rounded-full ${
          isDarkMode ? 'bg-indigo-900/30' : 'bg-blue-100/30'
        }`}
        style={{ filter: 'blur(60px)' }}
      />

      {/* المحتوى الرئيسي */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-6xl mx-auto"
        >
          {/* العنوان الرئيسي - بأسلوب ألعاب الفيديو */}
          <motion.div
            variants={titleVariants}
            className="mb-8 sm:mb-12"
          >
            {/* شعار اللعبة */}
            <div className="inline-block mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm border border-cyan-400/30">
              <span className="text-sm font-bold text-cyan-400 tracking-wider"> تجربة ألعاب فريدة</span>
            </div>
            
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-4 sm:mb-6 tracking-tight">
              <span className={`bg-clip-text text-transparent bg-gradient-to-r ${
                isDarkMode 
                  ? 'from-cyan-300 via-blue-400 to-purple-400' 
                  : 'from-blue-600 via-indigo-600 to-purple-600'
              } drop-shadow-2xl`}>
                LUMIQUEST
              </span>
            </h2>
            
            <motion.div
              variants={itemVariants}
              className={`text-xl sm:text-2xl md:text-3xl font-bold mb-6 tracking-wide ${
                isDarkMode ? 'text-cyan-100' : 'text-blue-600'
              }`}
            >
              <div className="inline-flex items-center justify-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm">
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="text-yellow-400 text-2xl"
                >
                  ⭐
                </motion.span>
                <span className="font-black tracking-widest">مغامرة لا تُنسى</span>
                <motion.span
                  animate={{ rotate: -360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="text-yellow-400 text-2xl"
                >
                  ⭐
                </motion.span>
              </div>
            </motion.div>
          </motion.div>
          
          {/* الوصف بأسلوب الألعاب */}
          <motion.div
            variants={itemVariants}
            className="mb-10 sm:mb-14"
          >
            <p className={`text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed ${
              isDarkMode ? 'text-gray-200' : 'text-gray-700'
            } font-medium`}>
              <span className={`font-bold ${isDarkMode ? 'text-cyan-300' : 'text-blue-600'}`}>
                انطلق في رحلة أسطورية
              </span>{' '}
              حيث يلتقي التحدي بالإثارة. كل مستوى يحمل مفاجآت فريدة، وكل تحدي يبني مهارات جديدة.
              عالم <strong className={isDarkMode ? 'text-purple-300' : 'text-purple-600'}>LUMIQUEST</strong> ينتظر مستكشفيه!
            </p>
          </motion.div>
          
          {/* زر البدء - بأسلوب ألعاب الفيديو */}
          <motion.div
            variants={itemVariants}
            whileHover="hover"
            className="mb-16 sm:mb-20 relative"
          >
            <motion.div
              animate={{
                boxShadow: isDarkMode 
                  ? ['0 0 30px rgba(99, 102, 241, 0.5)', '0 0 50px rgba(99, 102, 241, 0.8)', '0 0 30px rgba(99, 102, 241, 0.5)']
                  : ['0 0 20px rgba(79, 70, 229, 0.3)', '0 0 40px rgba(79, 70, 229, 0.6)', '0 0 20px rgba(79, 70, 229, 0.3)']
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block"
            >
              <Link to="/category" aria-label="ابدأ اللعبة">
                <Button
                  variant="primary"
                  size="lg"
                  className="px-12 sm:px-16 py-4 sm:py-5 text-xl sm:text-2xl font-black relative overflow-hidden group game-button"
                  icon="🎮"
                >
                  {/* تأثير خلف الزر */}
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                  <span className="relative z-10 flex items-center gap-3">
                    <motion.span
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="text-2xl"
                    >
                      🎮
                    </motion.span>
                    <span className="tracking-wider">ابدأ الان</span>
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                      className="text-xl"
                    >
                      →
                    </motion.span>
                  </span>
                </Button>
              </Link>
            </motion.div>
            
            <motion.p
              variants={itemVariants}
              className={`mt-4 text-base sm:text-lg ${
                isDarkMode ? 'text-cyan-300' : 'text-blue-500'
              } font-medium`}
            >
              <span className="inline-flex items-center gap-2">
                <span className="text-xl">💫</span>
                اختر مستوى التحدي وانطلق في اللعب
                <span className="text-xl">🚀</span>
              </span>
            </motion.p>
          </motion.div>
          
          {/* المميزات - بأسلوب ألعاب الفيديو */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover="hover"
                custom={index}
                className={`relative rounded-2xl p-5 sm:p-6 backdrop-blur-md border-2 ${
                  isDarkMode 
                    ? 'border-gray-700/50 hover:border-cyan-400/50' 
                    : 'border-gray-300/50 hover:border-blue-400/50'
                } transition-all duration-300 hover:shadow-xl ${feature.bgColor}`}
                style={{
                  transformStyle: 'preserve-3d',
                  perspective: '1000px'
                }}
              >
                {/* تأثير الزوايا */}
                <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-cyan-400 rounded-tl-lg opacity-50"></div>
                <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-cyan-400 rounded-tr-lg opacity-50"></div>
                <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-cyan-400 rounded-bl-lg opacity-50"></div>
                <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-cyan-400 rounded-br-lg opacity-50"></div>

                <div className="relative z-10">
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className={`w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 ${
                      isDarkMode ? 'bg-gray-900/50' : 'bg-white/90'
                    } shadow-lg`}
                  >
                    <span className={`text-3xl ${feature.color}`}>
                      {feature.icon}
                    </span>
                  </motion.div>
                  <p className={`text-base sm:text-lg font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  } mb-2`}>
                    {feature.text}
                  </p>
                  <div className={`h-1 w-12 mx-auto rounded-full ${feature.color.replace('text-', 'bg-')}/30`}></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* قسم كيفية اللعب */}
          <motion.div
            variants={itemVariants}
            className={`mt-16 sm:mt-20 p-6 sm:p-8 rounded-3xl ${
              isDarkMode 
                ? 'bg-gradient-to-br from-gray-900/60 to-gray-800/40' 
                : 'bg-gradient-to-br from-white/80 to-blue-50/80'
            } backdrop-blur-lg border-2 ${
              isDarkMode ? 'border-cyan-500/30' : 'border-blue-300/50'
            } shadow-2xl`}
          >
            <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
              <motion.div
                animate={{ 
                  rotate: [0, 5, 0, -5, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  repeatDelay: 2 
                }}
                className="text-5xl lg:text-6xl"
              >
                🎯
              </motion.div>
              
              <div className="flex-1 text-center lg:text-right">
                <div className="inline-flex items-center gap-3 mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20">
                  <span className="text-cyan-400 text-xl">⚡</span>
                  <h3 className={`text-xl sm:text-2xl font-black ${
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  }`}>
                    كيف تلعب؟
                  </h3>
                  <span className="text-cyan-400 text-xl">⚡</span>
                </div>
                
                <div className={`space-y-3 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <p className="text-lg">
                    <span className={`font-bold ${isDarkMode ? 'text-cyan-300' : 'text-blue-600'}`}>1. </span>
                    اختر مستوى التحدي الذي يناسبك
                  </p>
                  <p className="text-lg">
                    <span className={`font-bold ${isDarkMode ? 'text-purple-300' : 'text-purple-600'}`}>2. </span>
                    حل الألغاز والتحديات بذكاء
                  </p>
                  <p className="text-lg">
                    <span className={`font-bold ${isDarkMode ? 'text-yellow-300' : 'text-yellow-600'}`}>3. </span>
                    تقدم في المستويات وارفع تصنيفك
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
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
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
            fill={isDarkMode ? "#0f172a" : "#f8fafc"}
            opacity="0.8"
          />
        </svg>
      </div>
    </div>
  );
};

export default Landing;