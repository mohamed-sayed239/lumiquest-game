import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../contexts/GameContext';
import QuestionCard from '../components/QuestionCard';
import ChallengeCard from '../components/ChallengeCard';
import ScoreBoard from '../components/ScoreBoard';
import Timer from '../components/Timer';

const Game = ({ isDarkMode }) => {
  const navigate = useNavigate();
  const { 
    selectedCategory, 
    questions, 
    challenges, 
    currentQuestionIndex, 
    gameState, 
    timeLeft,
    player,
    startGame,
    setGameState
  } = useGame();

  const [showChallenge, setShowChallenge] = useState(false);

  useEffect(() => {
    // إذا لم يكن هناك فئة محددة، ارجع لصفحة الفئات
    if (!selectedCategory && gameState === 'playing') {
      navigate('/category');
    }
  }, [selectedCategory, gameState, navigate]);

  if (!selectedCategory) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen flex items-center justify-center"
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">لم تختر فئة بعد</h2>
          <button
            onClick={() => navigate('/category')}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-bold"
          >
            العودة لاختيار الفئة
          </button>
        </div>
      </motion.div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const currentChallenge = challenges[0];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-8 relative overflow-hidden"
      style={{
        background: isDarkMode 
          ? 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)'
          : 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%)'
      }}
    >
      {/* تأثيرات خلفية ديناميكية */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full opacity-10 ${
              isDarkMode ? 'bg-blue-500' : 'bg-cyan-400'
            }`}
            style={{
              width: `${50 + i * 30}px`,
              height: `${50 + i * 30}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, 20, 0],
              x: [0, 15, 0],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* شريط التقدم */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-cyan-400">
              الفئة: {selectedCategory}
            </span>
            <span className="text-sm">
              السؤال {currentQuestionIndex + 1} من {questions.length}
            </span>
          </div>
          <div className="h-2 bg-gray-700/30 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* لوحة النقاط */}
          <div className="lg:col-span-1">
            <ScoreBoard isDarkMode={isDarkMode} />
            <Timer timeLeft={timeLeft} isDarkMode={isDarkMode} />
            
            {/* إحصائيات اللاعب */}
            <div className={`mt-6 rounded-2xl p-6 ${
              isDarkMode ? 'bg-gray-900/50' : 'bg-white/90'
            } backdrop-blur-lg border ${
              isDarkMode ? 'border-gray-700' : 'border-blue-200'
            }`}>
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <i className="fas fa-user text-cyan-400"></i>
                إحصائيات اللاعب
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>المستوى:</span>
                  <span className="font-bold text-cyan-400">{player.level}</span>
                </div>
                <div className="flex justify-between">
                  <span>النقاط:</span>
                  <span className="font-bold text-green-400">{player.score}</span>
                </div>
                <div className="flex justify-between">
                  <span>الفئة:</span>
                  <span className="font-bold">{selectedCategory}</span>
                </div>
              </div>
            </div>
          </div>

          {/* محتوى اللعبة */}
          <div className="lg:col-span-3">
            {showChallenge ? (
              <ChallengeCard 
                challenge={currentChallenge} 
                isDarkMode={isDarkMode} 
              />
            ) : (
              <QuestionCard 
                question={currentQuestion} 
                isDarkMode={isDarkMode} 
              />
            )}

            {/* أزرار التحكم */}
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (showChallenge && currentChallenge) {
                    // اعرض التحدي
                    setShowChallenge(false);
                  } else if (currentQuestionIndex < questions.length - 1) {
                    // تخطي للسؤال التالي
                    // يمكن إضافة منطق التخطي هنا
                  }
                }}
                className={`px-6 py-3 rounded-xl font-bold ${
                  isDarkMode 
                    ? 'bg-gray-800 hover:bg-gray-700' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <i className="fas fa-forward ml-2"></i>
                تخطي
              </motion.button>

              {challenges.length > 0 && !showChallenge && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowChallenge(true)}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold"
                >
                  <i className="fas fa-bolt ml-2"></i>
                  تجربة التحدي
                </motion.button>
              )}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (confirm('هل تريد إنهاء اللعبة؟')) {
                    navigate('/result');
                  }
                }}
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-bold"
              >
                <i className="fas fa-stop ml-2"></i>
                إنهاء اللعبة
              </motion.button>
            </div>

            {/* تلميحات */}
            <div className={`mt-8 rounded-xl p-4 ${
              isDarkMode ? 'bg-gray-900/30' : 'bg-blue-50/50'
            } border ${isDarkMode ? 'border-gray-700' : 'border-blue-200'}`}>
              <div className="flex items-center gap-2 mb-2">
                <i className="fas fa-lightbulb text-yellow-400"></i>
                <span className="font-bold">نصيحة:</span>
              </div>
              <p className="text-sm">
                {selectedCategory === 'الاطفال' 
                  ? 'خذ وقتك في التفكير، يمكنك استخدام التلميحات'
                  : selectedCategory === 'الشباب'
                  ? 'راجع إجابتك قبل الإرسال، الوقت محدود'
                  : 'هذا المستوى صعب، ركز جيداً في كل سؤال'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Game;