import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Button from './Button';

const Header = ({ isDarkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`sticky top-0 z-50 shadow-lg ${isDarkMode ? 'bg-gray-900/95 backdrop-blur-md' : 'bg-white/95 backdrop-blur-md'}`}
    >
      <div className="container mx-auto px-4 md:px-6 py-3 md:py-4">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-2 md:space-x-3 space-x-reverse">
            <div className={`relative font-bold text-xl md:text-2xl lg:text-3xl ${isDarkMode ? 'text-indigo-300' : 'text-indigo-700'}`}>
              <span className="glow-effect">LUMIQUEST</span>
              <div className="absolute -top-1 -left-1 w-2 h-2 md:w-3 md:h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>
            </div>
            <div className={`hidden sm:inline-block text-xs md:text-sm px-2 md:px-3 py-1 md:py-1.5 rounded-full font-medium ${isDarkMode ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white' : 'bg-gradient-to-r from-cyan-100 to-blue-100 text-indigo-700'}`}>
              <i className="fas fa-gamepad ml-1"></i>
              <span className="hidden md:inline"> مغامرة تفاعلية</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6 space-x-reverse">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleDarkMode}
              className={`p-2 md:p-3 rounded-xl md:rounded-2xl ${isDarkMode ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-yellow-300 shadow-lg' : 'bg-gradient-to-r from-gray-100 to-gray-200 text-indigo-700 shadow-md'}`}
              aria-label={isDarkMode ? 'تفعيل الوضع الفاتح' : 'تفعيل الوضع الداكن'}
            >
              {isDarkMode ? (
                <i className="fas fa-sun text-lg md:text-xl"></i>
              ) : (
                <i className="fas fa-moon text-lg md:text-xl"></i>
              )}
            </motion.button>
            
            <Link to="/category">
              <Button 
                variant="primary"
                size="md"
                className="flex items-center text-sm md:text-base"
                icon="fa-play"
              >
                <span className="hidden sm:inline">ابدأ المغامرة</span>
                <span className="sm:hidden">ابدأ</span>
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-3 space-x-reverse">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleDarkMode}
              className={`p-2 rounded-xl ${isDarkMode ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-yellow-300 shadow-lg' : 'bg-gradient-to-r from-gray-100 to-gray-200 text-indigo-700 shadow-md'}`}
              aria-label={isDarkMode ? 'تفعيل الوضع الفاتح' : 'تفعيل الوضع الداكن'}
            >
              {isDarkMode ? (
                <i className="fas fa-sun text-lg"></i>
              ) : (
                <i className="fas fa-moon text-lg"></i>
              )}
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-xl ${isDarkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'}`}
              aria-label="القائمة"
            >
              {isMenuOpen ? (
                <i className="fas fa-times text-xl"></i>
              ) : (
                <i className="fas fa-bars text-xl"></i>
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isMenuOpen ? 1 : 0,
            height: isMenuOpen ? 'auto' : 0
          }}
          transition={{ duration: 0.3 }}
          className={`overflow-hidden md:hidden ${isDarkMode ? 'bg-gray-800/95' : 'bg-white/95'} mt-3 rounded-2xl shadow-xl`}
        >
          {isMenuOpen && (
            <div className="py-4 px-6 space-y-4">
              <Link 
                to="/" 
                className={`block py-3 px-4 rounded-xl text-center font-medium ${isDarkMode ? 'hover:bg-gray-700/50 text-gray-200' : 'hover:bg-gray-100 text-gray-700'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="fas fa-home ml-2"></i>
                الصفحة الرئيسية
              </Link>
              
              <Link 
                to="/category" 
                className={`block py-3 px-4 rounded-xl text-center font-medium ${isDarkMode ? 'hover:bg-gray-700/50 text-gray-200' : 'hover:bg-gray-100 text-gray-700'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="fas fa-th-large ml-2"></i>
                اختر الفئة
              </Link>
              
              <div className="pt-2">
                <Link to="/category" onClick={() => setIsMenuOpen(false)}>
                  <Button
                    variant="primary"
                    size="md"
                    className="w-full flex items-center justify-center text-base py-3"
                    icon="fa-play"
                  >
                    ابدأ الآن
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;