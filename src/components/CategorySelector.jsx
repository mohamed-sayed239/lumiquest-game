import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CategorySelector = ({ isDarkMode }) => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 'children',
      title: 'الأطفال',
      description: 'تحديات ممتعة ومناسبة للأطفال',
      icon: 'fas fa-child',
      color: 'from-yellow-400 to-amber-500'
    },
    {
      id: 'youth',
      title: 'الشباب',
      description: 'تحديات متوسطة الصعوبة',
      icon: 'fas fa-user-graduate',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'professionals',
      title: 'المحترفين',
      description: 'تحديات صعبة للمحترفين',
      icon: 'fas fa-crown',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const handleSelectCategory = (categoryId) => {
    navigate('/game', { state: { category: categoryId } });
  };

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">اختر مستوى التحدي</h2>
        <p className="text-gray-600 dark:text-gray-300">اختر الفئة التي تناسب مهاراتك</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            className={`rounded-3xl p-8 cursor-pointer ${isDarkMode ? 'bg-gray-900/50' : 'bg-white/80'} backdrop-blur-lg shadow-xl`}
            onClick={() => handleSelectCategory(category.title)}
          >
            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mx-auto mb-6`}>
              <i className={`${category.icon} text-3xl text-white`}></i>
            </div>

            <h3 className="text-2xl font-bold text-center mb-4">{category.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
              {category.description}
            </p>

            <div className="text-center">
              <button className={`px-6 py-3 rounded-full bg-gradient-to-r ${category.color} text-white font-bold`}>
                اختر هذه الفئة
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;