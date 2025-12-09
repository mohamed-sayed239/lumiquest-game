import { motion } from 'framer-motion';
import { useGame } from '../contexts/GameContext';

const ScoreBoard = ({ isDarkMode }) => {
  const { player } = useGame();

  return (
    <motion.div 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`rounded-2xl p-6 ${
        isDarkMode ? 'bg-gray-900/50' : 'bg-white/90'
      } backdrop-blur-lg border ${
        isDarkMode ? 'border-gray-700' : 'border-blue-200'
      } shadow-xl`}
    >
      <div className="flex flex-col md:flex-row justify-between items-center">
        {/* معلومات اللاعب */}
        <div className="mb-4 md:mb-0">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <i className="fas fa-user-circle text-cyan-400"></i>
            {player.name}
          </h3>
          <p className="text-gray-500 text-sm">تابع تقدمك وحقق أعلى النقاط</p>
        </div>
        
        {/* النقاط والمستوى */}
        <div className="flex items-center space-x-6 space-x-reverse">
          <div className="text-center">
            <motion.div
              key={player.score}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className={`text-3xl font-bold ${
                isDarkMode ? 'text-cyan-300' : 'text-blue-600'
              }`}
            >
              {player.score}
            </motion.div>
            <div className="text-sm text-gray-500">النقاط</div>
          </div>
          
          <div className="h-12 w-1 bg-gray-300/50 rounded"></div>
          
          <div className="text-center">
            <div className="text-3xl font-bold flex items-center justify-center">
              <i className="fas fa-trophy text-yellow-500 mr-2"></i>
              <span>{player.level}</span>
            </div>
            <div className="text-sm text-gray-500">المستوى</div>
          </div>
        </div>
      </div>

      {/* شريط التقدم */}
      <div className="mt-6">
        <div className="flex justify-between text-sm mb-2">
          <span>التقدم للمستوى {player.level + 1}</span>
          <span>{player.score % 100}/100</span>
        </div>
        <div className="h-3 bg-gray-700/30 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-green-500 to-cyan-500"
            initial={{ width: 0 }}
            animate={{ width: `${player.score % 100}%` }}
            transition={{ duration: 1 }}
          />
        </div>
      </div>

      {/* الميداليات */}
      <div className="mt-6 flex items-center justify-center gap-4">
        {player.level >= 3 && (
          <div className="relative">
            <i className="fas fa-medal text-2xl text-yellow-500"></i>
            <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white">3</span>
            </div>
          </div>
        )}
        
        {player.score >= 50 && (
          <div className="relative">
            <i className="fas fa-star text-2xl text-purple-500"></i>
            <div className="absolute -top-2 -right-2 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white">50</span>
            </div>
          </div>
        )}
        
        <div className={`px-3 py-1 rounded-full text-sm ${
          isDarkMode ? 'bg-blue-900/50' : 'bg-blue-100'
        }`}>
          <span className="font-bold text-blue-400">⚡ نشط</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ScoreBoard;