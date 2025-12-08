import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Landing from './pages/Landing';
import Category from './pages/Category';
import { useState, useEffect } from 'react';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  useEffect(() => {
    // تحقق من تفضيلات المستخدم للنظام الداكن
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
    
    // استمع لتغييرات تفضيلات النظام
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? 'gradient-night text-white' : 'gradient-day text-gray-800'}`}>
      <Router>
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Landing isDarkMode={isDarkMode} />} />
            <Route path="/category" element={<Category isDarkMode={isDarkMode} />} />
          </Routes>
        </AnimatePresence>
      </Router>
    </div>
  );
}

export default App;