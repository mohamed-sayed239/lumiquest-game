import { motion } from 'framer-motion';
import CategoryCard from '../components/CategoryCard';

const Category = ({ isDarkMode }) => {
  const categories = [
    {
      title: "الأطفال",
      description: "مغامرات تعليمية ممتعة ومناسبة للأعمار من 6 إلى 12 سنة، تركز على تنمية التفكير الإبداعي والمهارات الأساسية.",
      accentColor: "#FFD166",
      accentColorLight: "#4ECDC4",
      icon: <i className="fas fa-child"></i>
    },
    {
      title: "الشباب",
      description: "تحديات تفاعلية تنمي مهارات حل المشكلات والتفكير النقدي، مناسبة للمراهقين والشباب حتى 25 سنة.",
      accentColor: "#4F46E5",
      accentColorLight: "#3B82F6",
      icon: <i className="fas fa-bolt"></i>
    },
    {
      title: "المحترفين",
      description: "مسارات متقدمة تتحدى مهاراتك في التحليل والتخطيط، مصممة للمهتمين بالتطوير المهني والمهارات المتقدمة.",
      accentColor: "#0EA5E9",
      accentColorLight: "#0F172A",
      icon: <i className="fas fa-crown"></i>
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          <span className={`bg-clip-text text-transparent bg-gradient-to-r ${isDarkMode ? 'from-cyan-300 to-blue-400' : 'from-indigo-600 to-blue-500'}`}>
            اختر فئتك
          </span>
        </h2>
        <p className={`text-xl max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          اختر الفئة التي تناسبك لتبدأ رحلتك التعليمية التفاعلية. كل فئة مصممة خصيصًا لتلبية احتياجات فئة عمرية معينة.
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {categories.map((category, index) => (
          <CategoryCard
            key={index}
            index={index}
            title={category.title}
            description={category.description}
            accentColor={category.accentColor}
            accentColorLight={category.accentColorLight}
            icon={category.icon}
            isDarkMode={isDarkMode}
          />
        ))}
      </div>
      
      {/* نصائح للمستخدم */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className={`mt-16 p-8 rounded-3xl ${isDarkMode ? 'bg-gray-800/50' : 'bg-indigo-50/70'} backdrop-blur-sm max-w-4xl mx-auto`}
      >
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/4 flex justify-center mb-6 md:mb-0">
            <div className={`p-6 rounded-2xl ${isDarkMode ? 'bg-gradient-to-r from-indigo-900 to-purple-900' : 'bg-gradient-to-r from-indigo-100 to-purple-100'}`}>
              <i className="fas fa-lightbulb text-4xl text-yellow-400"></i>
            </div>
          </div>
          <div className="md:w-3/4 text-center md:text-right">
            <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-indigo-800'}`}>
              نصيحة: كيف تختار الفئة المناسبة؟
            </h3>
            <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              اختر فئة الأطفال إذا كنت تبحث عن محتوى تعليمي مسلٍّ ومبسط. فئة الشباب مناسبة لمن يبحث عن تحدي وتنمية المهارات. أما فئة المحترفين فهي للمهتمين بتطوير مهارات متقدمة وحل مشكلات معقدة.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Category;