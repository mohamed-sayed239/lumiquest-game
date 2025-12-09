import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Timer = ({ timeLeft, isDarkMode }) => {
  const [isLowTime, setIsLowTime] = useState(false);

  useEffect(() => {
    setIsLowTime(timeLeft <= 10);
  }, [timeLeft]);

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (timeLeft / 30) * circumference;

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`relative rounded-2xl p-6 ${
        isDarkMode ? 'bg-gray-900/50' : 'bg-white/90'
      } backdrop-blur-lg border ${
        isDarkMode ? 'border-gray-700' : 'border-blue-200'
      } text-center`}
    >
      <h3 className="font-bold mb-4 flex items-center justify-center gap-2">
        <i className="fas fa-clock"></i>
        الوقت المتبقي
      </h3>
      
      <div className="relative w-32 h-32 mx-auto">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="64"
            cy="64"
            r={radius}
            stroke={isDarkMode ? "#374151" : "#E5E7EB"}
            strokeWidth="8"
            fill="transparent"
          />
          <motion.circle
            cx="64"
            cy="64"
            r={radius}
            stroke={isLowTime ? "#EF4444" : "#06B6D4"}
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1 }}
          />
        </svg>
        
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <motion.div
            key={timeLeft}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className={`text-3xl font-bold ${
              isLowTime ? 'text-red-500' : 'text-cyan-500'
            }`}
          >
            {timeLeft}
          </motion.div>
          <div className="text-sm text-gray-500">ثانية</div>
        </div>
      </div>

      {isLowTime && timeLeft > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 px-3 py-2 bg-red-500/20 rounded-lg"
        >
          <span className="text-red-400 text-sm font-bold">
            ⚡ الوقت ينفد! أسرع
          </span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Timer;