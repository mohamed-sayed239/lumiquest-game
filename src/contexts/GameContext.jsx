import { createContext, useContext, useState, useEffect } from 'react';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [player, setPlayer] = useState({
    id: 1,
    name: 'اللاعب',
    score: 0,
    level: 1
  });

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [gameSession, setGameSession] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [gameState, setGameState] = useState('category'); // category, playing, result
  const [timeLeft, setTimeLeft] = useState(30);
  const [isGameCompleted, setIsGameCompleted] = useState(false);

  // أسئلة تجريبية لكل فئة
  const sampleQuestions = {
    'الاطفال': [
      {
        id: 1,
        text: "ما هو لون التفاحة؟",
        category: "الأطفال",
        type: "multiple-choice",
        options: ["أحمر", "أزرق", "أخضر", "أصفر"],
        correctAnswer: "أحمر",
        difficulty: "سهل",
        points: 10,
        timeLimit: 30
      },
      {
        id: 2,
        text: "كم عدد أرجل القط؟",
        category: "الأطفال",
        type: "multiple-choice",
        options: ["2", "4", "6", "8"],
        correctAnswer: "4",
        difficulty: "سهل",
        points: 10,
        timeLimit: 25
      }
    ],
    'الشباب': [
      {
        id: 3,
        text: "ما هي عاصمة فرنسا؟",
        category: "الشباب",
        type: "multiple-choice",
        options: ["لندن", "باريس", "روما", "برلين"],
        correctAnswer: "باريس",
        difficulty: "متوسط",
        points: 20,
        timeLimit: 20
      },
      {
        id: 4,
        text: "من هو مؤلف رواية البؤساء؟",
        category: "الشباب",
        type: "multiple-choice",
        options: ["فكتور هوغو", "شكسبير", "ديستويفسكي", "تولستوي"],
        correctAnswer: "فكتور هوغو",
        difficulty: "متوسط",
        points: 20,
        timeLimit: 25
      }
    ],
    'المحترفين': [
      {
        id: 5,
        text: "ما هو العنصر الكيميائي الذي يرمز له بالرمز Au؟",
        category: "المحترفين",
        type: "multiple-choice",
        options: ["فضة", "ذهب", "نحاس", "حديد"],
        correctAnswer: "ذهب",
        difficulty: "صعب",
        points: 30,
        timeLimit: 15
      },
      {
        id: 6,
        text: "في أي عام هبط الإنسان على سطح القمر لأول مرة؟",
        category: "المحترفين",
        type: "multiple-choice",
        options: ["1965", "1969", "1972", "1958"],
        correctAnswer: "1969",
        difficulty: "صعب",
        points: 30,
        timeLimit: 15
      }
    ]
  };

  // تحديات تجريبية
  const sampleChallenges = {
    'الاطفال': [
      {
        id: 1,
        description: "رتب الأحرف لتكوين اسم حيوان",
        type: "rearrange",
        difficulty: "سهل",
        points: 15,
        timeLimit: 45,
        answer: "قطة"
      }
    ],
    'الشباب': [
      {
        id: 2,
        description: "حل اللغز الرياضي: 8 × 7 + 12 ÷ 3",
        type: "math",
        difficulty: "متوسط",
        points: 25,
        timeLimit: 60,
        answer: "60"
      }
    ],
    'المحترفين': [
      {
        id: 3,
        description: "اكتب كود JavaScript لإيجاد أكبر رقم في مصفوفة",
        type: "coding",
        difficulty: "صعب",
        points: 40,
        timeLimit: 90,
        answer: "Math.max(...array)"
      }
    ]
  };

  const startGame = (category) => {
    setSelectedCategory(category);
    setQuestions(sampleQuestions[category] || []);
    setChallenges(sampleChallenges[category] || []);
    setCurrentQuestionIndex(0);
    setTimeLeft(30);
    setIsGameCompleted(false);
    setGameState('playing');

    // إنشاء جلسة لعبة جديدة
    const newSession = {
      id: Date.now(),
      playerId: player.id,
      startTime: new Date(),
      questions: sampleQuestions[category] || [],
      challenges: sampleChallenges[category] || [],
      score: 0,
      timeSpent: 0
    };
    setGameSession(newSession);
  };

  const submitAnswer = (selectedAnswer) => {
    if (!gameSession || currentQuestionIndex >= questions.length) return;

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    let newScore = player.score;
    if (isCorrect) {
      newScore += currentQuestion.points;
      setPlayer(prev => ({ ...prev, score: newScore }));
      
      // تحقق من ترقية المستوى
      if (newScore >= player.level * 100) {
        setPlayer(prev => ({ ...prev, level: prev.level + 1 }));
      }
    }

    // تحديث جلسة اللعبة
    const updatedSession = {
      ...gameSession,
      score: newScore,
      timeSpent: gameSession.timeSpent + (30 - timeLeft)
    };
    setGameSession(updatedSession);

    // الانتقال للسؤال التالي أو إنهاء اللعبة
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setTimeLeft(questions[currentQuestionIndex + 1].timeLimit);
    } else {
      endGame();
    }

    return { isCorrect, correctAnswer: currentQuestion.correctAnswer };
  };

  const submitChallenge = (answer) => {
    const currentChallenge = challenges[0];
    const isCorrect = answer === currentChallenge.answer;
    
    if (isCorrect) {
      const newScore = player.score + currentChallenge.points;
      setPlayer(prev => ({ ...prev, score: newScore }));
    }
    
    endGame();
    return isCorrect;
  };

  const endGame = () => {
    setIsGameCompleted(true);
    setGameState('result');
    
    // حساب الوقت الإجمالي
    const endTime = new Date();
    const timeSpent = Math.floor((endTime - new Date(gameSession.startTime)) / 1000);
    
    const finalSession = {
      ...gameSession,
      endTime,
      timeSpent,
      completed: true
    };
    setGameSession(finalSession);
  };

  const resetGame = () => {
    setPlayer(prev => ({ ...prev, score: 0 }));
    setSelectedCategory(null);
    setGameSession(null);
    setQuestions([]);
    setChallenges([]);
    setCurrentQuestionIndex(0);
    setGameState('category');
    setTimeLeft(30);
    setIsGameCompleted(false);
  };

  // مؤقت العد التنازلي
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      // انتهى الوقت، انتقل للسؤال التالي
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setTimeLeft(questions[currentQuestionIndex + 1].timeLimit);
      } else {
        endGame();
      }
    }
  }, [gameState, timeLeft, currentQuestionIndex, questions.length]);

  return (
    <GameContext.Provider value={{
      player,
      selectedCategory,
      gameSession,
      questions,
      challenges,
      currentQuestionIndex,
      gameState,
      timeLeft,
      isGameCompleted,
      startGame,
      submitAnswer,
      submitChallenge,
      endGame,
      resetGame,
      setGameState
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);