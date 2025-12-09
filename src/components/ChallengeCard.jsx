import { motion } from 'framer-motion';
import { useGame } from '../contexts/GameContext';
import { useState } from 'react';

const ChallengeCard = ({ challenge, isDarkMode }) => {
  const { submitChallenge } = useGame();
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = () => {
    if (!userAnswer.trim()) return;
    
    const isCorrect = submitChallenge(userAnswer);
    setShowResult(true);
    
    setTimeout(() => {
      setShowResult(false);
    }, 3000);
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      className={`rounded-3xl p-8 ${
        isDarkMode ? 'bg-gray-900/60' : 'bg-white/90'
      } backdrop-blur-lg border-2 ${
        isDarkMode ? 'border-purple-700' : 'border-purple-300'
      } shadow-2xl`}
    >
      {/* رأس التحدي */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold">
            ⚡ تحدي
          </div>
          <div className={`px-4 py-2 rounded-full ${
            isDarkMode ? 'bg-purple-900/50' : 'bg-purple-100'
          }`}>
            <span className="font-bold text-purple-400">{challenge.points} نقطة</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <i className="fas fa-clock text-purple-400"></i>
          <span className="font-bold">{challenge.timeLimit} ثانية</span>
        </div>
      </div>

      {/* وصف التحدي */}
      <div className="mb-10 text-center">
        <motion.div
          initial={{ rotate: -5 }}
          animate={{ rotate: 5 }}
          transition={{ repeat: Infinity, repeatType: "reverse", duration: 2 }}
          className="inline-block mb-6"
        >
          <i className="fas fa-bolt text-4xl text-yellow-400"></i>
        </motion.div>
        
        <h2 className="text-2xl md:text-3xl font-bold leading-relaxed mb-6">
          {challenge.description}
        </h2>
        
        <div className={`inline-block px-6 py-3 rounded-xl ${
          isDarkMode ? 'bg-purple-900/30' : 'bg-purple-50'
        }`}>
          <span className="font-bold text-purple-400">
            {challenge.type === 'rearrange' ? 'إعادة ترتيب' :
             challenge.type === 'math' ? 'رياضيات' :
             challenge.type === 'coding' ? 'برمجة' : 'تحدي'}
          </span>
        </div>
      </div>

      {/* مجال الإجابة */}
      <div className="mb-8">
        <textarea
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="أدخل إجابتك هنا..."
          className={`w-full h-32 p-4 rounded-xl resize-none ${
            isDarkMode 
              ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
              : 'bg-gray-100 border-gray-300 text-gray-800 placeholder-gray-400'
          } border focus:outline-none focus:ring-2 focus:ring-purple-500`}
        />
      </div>

      {/* زر الإرسال */}
      <div className="flex justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          disabled={showResult || !userAnswer.trim()}
          className={`px-8 py-4 rounded-xl font-bold text-lg ${
            showResult || !userAnswer.trim()
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
          } text-white`}
        >
          <i className="fas fa-paper-plane ml-2"></i>
          {showResult ? 'جارٍ التصحيح...' : 'إرسال الإجابة'}
        </motion.button>
      </div>

      {/* تلميحات */}
      <div className={`mt-8 rounded-xl p-4 ${
        isDarkMode ? 'bg-purple-900/20' : 'bg-purple-50'
      }`}>
        <div className="flex items-center gap-2 mb-2">
          <i className="fas fa-lightbulb text-purple-400"></i>
          <span className="font-bold">نصائح للتحدي:</span>
        </div>
        <ul className="list-disc list-inside space-y-2 text-sm">
          <li>اقرأ السؤال بعناية</li>
          <li>تحقق من إجابتك قبل الإرسال</li>
          <li>استخدم كل الوقت المتبقي للتفكير</li>
          <li>التحديات تعطي نقاط إضافية!</li>
        </ul>
      </div>

      {/* نتيجة التحدي */}
      {showResult && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-6 p-6 rounded-2xl ${
            isDarkMode ? 'bg-green-900/30' : 'bg-green-100'
          } border ${
            isDarkMode ? 'border-green-700' : 'border-green-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <i className="fas fa-check-circle text-2xl text-green-500"></i>
              <div>
                <h4 className="font-bold text-green-500">تحدي مكتمل! 🏆</h4>
                <p className="text-sm mt-1">لقد ربحت {challenge.points} نقطة إضافية</p>
              </div>
            </div>
            <div className={`px-4 py-2 rounded-lg ${
              isDarkMode ? 'bg-green-800/50' : 'bg-green-200'
            }`}>
              <span className="font-bold text-green-600">+{challenge.points}</span>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ChallengeCard;