import { motion } from 'framer-motion';
import { useGame } from '../contexts/GameContext';
import { useState } from 'react';

const QuestionCard = ({ question, isDarkMode }) => {
  const { submitAnswer } = useGame();
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleAnswerSelect = (answer) => {
    if (showResult) return;
    
    setSelectedAnswer(answer);
    setShowResult(true);
    
    const result = submitAnswer(answer);
    setIsCorrect(result.isCorrect);
    
    // إخفاء النتيجة بعد 2 ثانية
    setTimeout(() => {
      setShowResult(false);
      setSelectedAnswer(null);
    }, 2000);
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'سهل': return 'bg-green-500';
      case 'متوسط': return 'bg-yellow-500';
      case 'صعب': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      className={`rounded-3xl p-8 ${
        isDarkMode ? 'bg-gray-900/60' : 'bg-white/90'
      } backdrop-blur-lg border ${
        isDarkMode ? 'border-gray-700' : 'border-blue-200'
      } shadow-2xl`}
    >
      {/* رأس البطاقة */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className={`px-4 py-2 rounded-full ${getDifficultyColor(question.difficulty)} text-white font-bold`}>
            {question.difficulty}
          </div>
          <div className={`px-4 py-2 rounded-full ${
            isDarkMode ? 'bg-blue-900/50' : 'bg-blue-100'
          }`}>
            <span className="font-bold text-blue-400">{question.points} نقطة</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <i className="fas fa-star text-yellow-400"></i>
          <span className="font-bold">سؤال {question.type === 'multiple-choice' ? 'اختيار متعدد' : 'صح/خطأ'}</span>
        </div>
      </div>

      {/* نص السؤال */}
      <div className="mb-10">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl md:text-3xl font-bold leading-relaxed text-center"
        >
          {question.text}
        </motion.h2>
      </div>

      {/* الخيارات */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const isCorrectOption = option === question.correctAnswer;
          
          let buttonClass = isDarkMode 
            ? 'bg-gray-800 hover:bg-gray-700 border-gray-700'
            : 'bg-gray-100 hover:bg-gray-200 border-gray-200';
          
          if (showResult) {
            if (isCorrectOption) {
              buttonClass = 'bg-green-500/20 border-green-500 text-green-500';
            } else if (isSelected && !isCorrect) {
              buttonClass = 'bg-red-500/20 border-red-500 text-red-500';
            }
          } else if (isSelected) {
            buttonClass = 'bg-blue-500/20 border-blue-500 text-blue-500';
          }

          return (
            <motion.button
              key={index}
              whileHover={{ scale: showResult ? 1 : 1.02 }}
              whileTap={{ scale: showResult ? 1 : 0.98 }}
              onClick={() => handleAnswerSelect(option)}
              disabled={showResult}
              className={`p-6 rounded-xl border-2 text-right transition-all duration-300 ${buttonClass} ${
                showResult ? 'cursor-default' : 'cursor-pointer'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                  }`}>
                    <span className="font-bold">{String.fromCharCode(1632 + index)}</span>
                  </div>
                  <span className="text-lg font-medium">{option}</span>
                </div>
                
                {showResult && isCorrectOption && (
                  <i className="fas fa-check text-green-500 text-xl"></i>
                )}
                {showResult && isSelected && !isCorrect && (
                  <i className="fas fa-times text-red-500 text-xl"></i>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* نتيجة الإجابة */}
      {showResult && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-6 rounded-2xl mb-6 ${
            isCorrect 
              ? (isDarkMode ? 'bg-green-900/30' : 'bg-green-100') 
              : (isDarkMode ? 'bg-red-900/30' : 'bg-red-100')
          } border ${
            isCorrect 
              ? (isDarkMode ? 'border-green-700' : 'border-green-300') 
              : (isDarkMode ? 'border-red-700' : 'border-red-300')
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isCorrect ? (
                <>
                  <i className="fas fa-check-circle text-2xl text-green-500"></i>
                  <div>
                    <h4 className="font-bold text-green-500">إجابة صحيحة! 🎉</h4>
                    <p className="text-sm mt-1">لقد ربحت {question.points} نقطة</p>
                  </div>
                </>
              ) : (
                <>
                  <i className="fas fa-times-circle text-2xl text-red-500"></i>
                  <div>
                    <h4 className="font-bold text-red-500">إجابة خاطئة</h4>
                    <p className="text-sm mt-1">الإجابة الصحيحة: {question.correctAnswer}</p>
                  </div>
                </>
              )}
            </div>
            
            <div className={`px-4 py-2 rounded-lg ${
              isDarkMode 
                ? (isCorrect ? 'bg-green-800/50' : 'bg-red-800/50') 
                : (isCorrect ? 'bg-green-200' : 'bg-red-200')
            }`}>
              <span className={`font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                {isCorrect ? '+' : ''}{isCorrect ? question.points : 0}
              </span>
            </div>
          </div>
        </motion.div>
      )}

      {/* تلميح */}
      <div className={`rounded-xl p-4 ${
        isDarkMode ? 'bg-gray-800/50' : 'bg-blue-50'
      }`}>
        <div className="flex items-center gap-2 mb-2">
          <i className="fas fa-info-circle text-blue-400"></i>
          <span className="font-bold">تلميح:</span>
        </div>
        <p className="text-sm">
          {question.difficulty === 'سهل' 
            ? 'اختر الإجابة الأكثر وضوحاً'
            : question.difficulty === 'متوسط'
            ? 'فكر جيداً قبل الاختيار'
            : 'هذا السؤال يتطلب تركيزاً عالياً'}
        </p>
      </div>
    </motion.div>
  );
};

export default QuestionCard;