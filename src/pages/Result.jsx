import { motion } from 'framer-motion';
import { useGame } from '../contexts/GameContext';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import { useState, useEffect } from 'react';

const Result = ({ isDarkMode }) => {
  const navigate = useNavigate();
  const { player, gameSession, resetGame } = useGame();
  const [showConfetti, setShowConfetti] = useState(true);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handlePlayAgain = () => {
    resetGame();
    navigate('/category');
  };

  const handleNewGame = () => {
    resetGame();
    navigate('/game');
  };

  if (!gameSession) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">لا توجد نتائج لعرضها</h2>
          <button
            onClick={() => navigate('/category')}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-bold"
          >
            العودة للفئات
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
        />
      )}

      <div 
        className="absolute inset-0"
        style={{
          background: isDarkMode 
            ? 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)'
            : 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%)'
        }}
      />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="max-w-4xl mx-auto"
        >
          {/* العنوان */}
          <div className="text-center mb-12">
            <motion.div
              animate={{ 
                rotate: [0, 10, 0, -10, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                repeatDelay: 1 
              }}
              className="inline-block mb-6 p-6 rounded-3xl bg-gradient-to-r from-yellow-500/20 to-amber-500/20"
            >
              <i className="fas fa-trophy text-6xl text-yellow-400"></i>
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-black mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500">
                تهانينا! لقد أكملت التحدي
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              أداء رائع في فئة <span className="font-bold text-cyan-500">{gameSession.category}</span>
            </p>
          </div>

          {/* الإحصائيات */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`p-8 rounded-3xl text-center ${
                isDarkMode ? 'bg-gray-900/50' : 'bg-white/80'
              } backdrop-blur-lg border ${
                isDarkMode ? 'border-gray-700' : 'border-blue-200'
              }`}
            >
              <div className="text-6xl font-bold text-cyan-500 mb-4">{player.score}</div>
              <div className="text-xl font-bold mb-2">النقاط الكلية</div>
              <div className="text-gray-500">إجمالي نقاطك في هذه الجلسة</div>
            </motion.div>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className={`p-8 rounded-3xl text-center ${
                isDarkMode ? 'bg-gray-900/50' : 'bg-white/80'
              } backdrop-blur-lg border ${
                isDarkMode ? 'border-gray-700' : 'border-blue-200'
              }`}
            >
              <div className="text-6xl font-bold text-green-500 mb-4">{player.level}</div>
              <div className="text-xl font-bold mb-2">المستوى</div>
              <div className="text-gray-500">مستواك الحالي في اللعبة</div>
            </motion.div>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className={`p-8 rounded-3xl text-center ${
                isDarkMode ? 'bg-gray-900/50' : 'bg-white/80'
              } backdrop-blur-lg border ${
                isDarkMode ? 'border-gray-700' : 'border-blue-200'
              }`}
            >
              <div className="text-6xl font-bold text-purple-500 mb-4">
                {gameSession.timeSpent || 0}
              </div>
              <div className="text-xl font-bold mb-2">ثانية</div>
              <div className="text-gray-500">الوقت المستغرق</div>
            </motion.div>
          </div>

          {/* تفاصيل الجلسة */}
          <div className={`rounded-3xl p-8 mb-12 ${
            isDarkMode ? 'bg-gray-900/50' : 'bg-white/80'
          } backdrop-blur-lg border ${
            isDarkMode ? 'border-gray-700' : 'border-blue-200'
          }`}>
            <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
              <i className="fas fa-chart-bar text-cyan-400"></i>
              تحليل أدائك
            </h2>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-bold">سرعة الإجابة</span>
                  <span>{(gameSession.timeSpent / (gameSession.questions?.length || 1)).toFixed(1)} ث/سؤال</span>
                </div>
                <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '75%' }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-bold">الدقة</span>
                  <span>{((player.score / 100) * 100).toFixed(1)}%</span>
                </div>
                <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(player.score / 100) * 100}%` }}
                    transition={{ duration: 1, delay: 1 }}
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className={`p-4 rounded-xl ${
                isDarkMode ? 'bg-blue-900/20' : 'bg-blue-50'
              }`}>
                <div className="text-2xl font-bold text-blue-500">
                  {gameSession.questions?.length || 0}
                </div>
                <div className="text-sm">عدد الأسئلة</div>
              </div>
              
              <div className={`p-4 rounded-xl ${
                isDarkMode ? 'bg-green-900/20' : 'bg-green-50'
              }`}>
                <div className="text-2xl font-bold text-green-500">
                  {gameSession.challenges?.length || 0}
                </div>
                <div className="text-sm">عدد التحديات</div>
              </div>
            </div>
          </div>

          {/* أزرار الإجراءات */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePlayAgain}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-2xl font-bold text-lg flex items-center justify-center"
            >
              <i className="fas fa-redo ml-2"></i>
              لعب مرة أخرى
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/category')}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-bold text-lg flex items-center justify-center"
            >
              <i className="fas fa-layer-group ml-2"></i>
              فئة جديدة
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              className="px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-2xl font-bold text-lg flex items-center justify-center"
            >
              <i className="fas fa-home ml-2"></i>
              الرئيسية
            </motion.button>
          </div>

          {/* مشاركة النتائج */}
          <div className="text-center mt-12">
            <p className="text-gray-500 mb-4">
              شارك نتيجتك مع أصدقائك وتحداهم!
            </p>
            <div className="flex justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="p-4 rounded-full bg-blue-600 text-white"
              >
                <i className="fab fa-twitter text-xl"></i>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="p-4 rounded-full bg-blue-800 text-white"
              >
                <i className="fab fa-facebook-f text-xl"></i>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="p-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white"
              >
                <i className="fab fa-instagram text-xl"></i>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="p-4 rounded-full bg-green-600 text-white"
              >
                <i className="fab fa-whatsapp text-xl"></i>
              </motion.button>
            </div>
          </div>

          {/* نصيحة */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className={`mt-12 p-6 rounded-2xl ${
              isDarkMode ? 'bg-amber-900/20' : 'bg-amber-50'
            } border ${
              isDarkMode ? 'border-amber-700' : 'border-amber-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <i className="fas fa-lightbulb text-2xl text-amber-400"></i>
              <div>
                <h4 className="font-bold text-amber-400">مستواك القادم</h4>
                <p className="mt-1">
                  تحتاج إلى {player.level * 100 - player.score} نقطة إضافية للوصول للمستوى {player.level + 1}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Result;