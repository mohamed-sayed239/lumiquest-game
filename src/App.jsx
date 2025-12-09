import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Landing from './pages/Landing';
import Category from './pages/Category';
import Game from './pages/Game';
import Result from './pages/Result';
import { GameProvider } from './contexts/GameContext';
import { useState, useEffect } from 'react';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  useEffect(() => {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <GameProvider>
      <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? 'gradient-night text-white' : 'gradient-day text-gray-800'}`}>
        <Router>
          <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Landing isDarkMode={isDarkMode} />} />
              <Route path="/category" element={<Category isDarkMode={isDarkMode} />} />
              <Route path="/game" element={<Game isDarkMode={isDarkMode} />} />
              <Route path="/result" element={<Result isDarkMode={isDarkMode} />} />
            </Routes>
          </AnimatePresence>
        </Router>
      </div>
    </GameProvider>
  );
}

export default App;