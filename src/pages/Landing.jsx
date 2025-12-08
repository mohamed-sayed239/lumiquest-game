import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/Button';

const Landing = ({ isDarkMode }) => {
  const [stars, setStars] = useState([]);
  
  // توليد النجوم العشوائية
  useEffect(() => {
    const generatedStars = [];
    const starCount = isDarkMode ? 150 : 80;
    
    for (let i = 0; i < starCount; i++) {
      generatedStars.push({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() > 0.8 ? 'large' : Math.random() > 0.5 ? 'medium' : 'small',
        delay: `${Math.random() * 5}s`,
        duration: `${3 + Math.random() * 4}s`
      });
    }
    setStars(generatedStars);
  }, [isDarkMode]);
  
  return (
    <div className="relative min-h-[calc(100vh-80px)] flex flex-col items-center justify-center overflow-hidden">
      {/* النجوم الخلفية */}
      {stars.map(star => (
        <div
          key={star.id}
          className={`star star-${star.size} absolute`}
          style={{
            top: star.top,
            left: star.left,
            animation: `twinkle ${star.duration} infinite ${star.delay}`,
            opacity: isDarkMode ? 0.8 : 0.3
          }}
        />
      ))}
      
      {/* تأثيرات الضوء */}
      <div 
        className="absolute top-1/4 left-1/4 w-64 h-64 light-beam rounded-full"
        style={{ opacity: isDarkMode ? 0.3 : 0.1 }}
      ></div>
      <div 
        className="absolute bottom-1/4 right-1/4 w-96 h-96 light-beam rounded-full"
        style={{ opacity: isDarkMode ? 0.2 : 0.05 }}
      ></div>
      
      {/* المحتوى الرئيسي */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* الشعار */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-6xl md:text-8xl font-extrabold mb-4 tracking-tight">
              <span className={`bg-clip-text text-transparent bg-gradient-to-r ${isDarkMode ? 'from-indigo-400 to-cyan-300' : 'from-indigo-600 to-blue-500'}`}>
                LUMIQUEST
              </span>
            </h1>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className={`text-xl md:text-2xl font-medium ${isDarkMode ? 'text-cyan-100' : 'text-blue-600'}`}
            >
              <div className="flex items-center justify-center space-x-2 space-x-reverse">
                <i className="fas fa-star text-yellow-400"></i>
                <span>ابدأ مغامرتك | Start your adventure</span>
                <i className="fas fa-star text-yellow-400"></i>
              </div>
            </motion.div>
          </motion.div>
          
          {/* الوصف */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className={`text-lg md:text-xl max-w-2xl mx-auto mb-12 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
          >
            انطلق في رحلة تعليمية تفاعلية مليئة بالتحديات والإثارة. اختر فئتك المناسبة وابدأ رحلتك نحو المعرفة والمتعة!
          </motion.p>
          
          {/* زر البدء */}
     <motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.5, delay: 1 }}
  whileHover={{ scale: 1.05 }}
  className="flex justify-center"  // إضافة هذا
>
  <Link to="/category">
    <Button
      variant="primary"
      size="lg"
      className="px-12 py-6 text-xl font-bold glow-effect flex items-center justify-center"  // تصحيح وتحديث
      icon="fa-play"
    >
      ابدأ المغامرة الآن
    </Button>
  </Link>
</motion.div>
          
          {/* العناصر التزيينية */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-16 flex flex-wrap justify-center gap-8"
          >
            {[
              { icon: 'fa-gem', text: 'محتوى تفاعلي', color: 'text-purple-400' },
              { icon: 'fa-trophy', text: 'تحديات مسلية', color: 'text-yellow-400' },
              { icon: 'fa-brain', text: 'تنمية المهارات', color: 'text-green-400' },
              { icon: 'fa-users', text: 'مناسب للجميع', color: 'text-blue-400' },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className={`flex flex-col items-center ${isDarkMode ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-sm rounded-2xl p-6 shadow-lg`}
              >
                <i className={`fas ${item.icon} text-3xl mb-3 ${item.color}`}></i>
                <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
      
      {/* موجة سفلية */}
      <div className="absolute bottom-0 left-0 right-0 h-24 overflow-hidden">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full">
          <path 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
            opacity=".25" 
            className={isDarkMode ? "fill-gray-800" : "fill-gray-100"}
          ></path>
          <path 
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
            opacity=".5" 
            className={isDarkMode ? "fill-gray-800" : "fill-gray-100"}
          ></path>
          <path 
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
            className={isDarkMode ? "fill-gray-900" : "fill-white"}
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Landing;