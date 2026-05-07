import { useState } from 'react';
import { RotateCcw, Star, Volume2, Check, X, Clock, Home, Trophy } from 'lucide-react';
import { wordsByLevel } from '../data/mockData';
import { Header } from '../components/Navigation';

export default function ReviewPage({ user, addPoints, addCompletedWord, onBack }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [mode, setMode] = useState('word-meaning');

  const words = wordsByLevel[user.currentLevel] || [];
  const reviewWords = words.slice(0, 5);
  const allWords = [...wordsByLevel[1], ...wordsByLevel[2], ...wordsByLevel[3]];
  
  const currentWord = reviewWords[currentIndex];

  const handleAnswer = (answer, correct) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answer);
    setIsCorrect(correct);
    
    if (correct) {
      setScore(prev => prev + 1);
      addPoints(15);
      addCompletedWord(currentWord?.id);
    }

    setTimeout(() => {
      if (currentIndex < reviewWords.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        setCompleted(true);
      }
    }, 1500);
  };

  const generateMeaningOptions = () => {
    const options = [currentWord?.meaning];
    const shuffled = allWords.filter(w => w.meaning !== currentWord?.meaning).sort(() => Math.random() - 0.5);
    
    for (let i = 0; i < 3 && i < shuffled.length; i++) {
      options.push(shuffled[i].meaning);
    }
    
    return options.sort(() => Math.random() - 0.5);
  };

  const meaningOptions = currentWord ? generateMeaningOptions() : [];

  if (completed) {
    const accuracy = Math.round((score / reviewWords.length) * 100);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-100 via-yellow-50 to-orange-100 relative overflow-hidden">
        {/* 装饰性背景 */}
        <div className="absolute top-10 left-12 text-5xl opacity-20 animate-float">📖</div>
        <div className="absolute top-36 right-10 text-4xl opacity-20 animate-float" style={{ animationDelay: '0.5s' }}>⭐</div>
        
        <Header title="复习完成！" showBack onBack={onBack} />
        <main className="pt-20 pb-28 px-4 max-w-md mx-auto relative z-10">
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 text-center border border-white/50">
            <div className="text-7xl mb-4 animate-bounce">
              {accuracy >= 80 ? '🏆' : accuracy >= 60 ? '👍' : '💪'}
            </div>
            <h2 className="text-3xl font-black text-gray-800 mb-2">复习完成！</h2>
            <p className="text-lg text-gray-500 mb-6">
              {accuracy >= 80 ? '太棒了！记忆很牢固！' : accuracy >= 60 ? '不错，继续加油！' : '需要多复习几次哦！'}
            </p>
            
            <div className="bg-gradient-to-r from-amber-100 to-yellow-100 rounded-2xl p-6 mb-6">
              <p className="text-sm font-bold text-gray-600 mb-2">本次正确率</p>
              <div className="flex items-center justify-center gap-2">
                <Trophy size={36} className="text-amber-500" />
                <p className="text-5xl font-black text-amber-600">{accuracy}%</p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  setCurrentIndex(0);
                  setScore(0);
                  setCompleted(false);
                  setSelectedAnswer(null);
                  setIsCorrect(null);
                }}
                className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl font-black text-lg shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
              >
                🔄 再复习一次
              </button>
              <button
                onClick={onBack}
                className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-black text-lg shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Home size={20} /> 返回首页
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-yellow-50 to-orange-100 relative overflow-hidden">
      <div className="absolute top-20 left-8 text-4xl opacity-20 animate-float">📚</div>
      <div className="absolute bottom-32 right-10 text-3xl opacity-20 animate-float" style={{ animationDelay: '0.6s' }}>✨</div>
      
      <Header title="阶段性复习" subtitle={`${currentIndex + 1} / ${reviewWords.length}`} showBack onBack={onBack} />
      <main className="pt-20 pb-28 px-4 max-w-md mx-auto relative z-10">
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-6 mb-4 border border-white/50">
          {/* 进度条 */}
          <div className="mb-6">
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-500"
                style={{ width: `${((currentIndex + 1) / reviewWords.length) * 100}%` }}
              />
            </div>
          </div>

          {/* 得分 */}
          <div className="flex justify-center gap-1 mb-6">
            {Array.from({ length: Math.min(score + 1, 5) }).map((_, i) => (
              <Star key={i} size={28} className="text-yellow-400 fill-yellow-400" />
            ))}
          </div>

          {/* 模式选择 */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => setMode('word-meaning')}
              className={`flex-1 py-3 rounded-2xl font-black text-base transition-all duration-300 ${
                mode === 'word-meaning' 
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              单词→释义
            </button>
            <button
              onClick={() => setMode('meaning-word')}
              className={`flex-1 py-3 rounded-2xl font-black text-base transition-all duration-300 ${
                mode === 'meaning-word' 
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              释义→单词
            </button>
          </div>

          {mode === 'word-meaning' && (
            <>
              <div className="text-center py-8 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl mb-6 border-2 border-amber-100 shadow-lg">
                <div className="text-7xl mb-4 animate-pulse">{currentWord?.image}</div>
                <h2 className="text-4xl font-black text-gray-800">{currentWord?.word}</h2>
                <button
                  onClick={() => {
                    if ('speechSynthesis' in window) {
                      const utterance = new SpeechSynthesisUtterance(currentWord?.word);
                      utterance.lang = 'en-US';
                      utterance.rate = 0.8;
                      speechSynthesis.speak(utterance);
                    }
                  }}
                  className="mt-4 p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 mx-auto"
                >
                  <Volume2 size={24} />
                </button>
              </div>

              <div className="space-y-3">
                {meaningOptions.map((option, index) => {
                  let buttonClass = 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-gray-200';
                  if (selectedAnswer === option) {
                    buttonClass = isCorrect 
                      ? 'bg-green-500 text-white border-green-500 shadow-lg scale-105' 
                      : 'bg-red-500 text-white border-red-500';
                  }
                  
                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option, option === currentWord?.meaning)}
                      disabled={selectedAnswer !== null}
                      className={`w-full py-5 rounded-2xl font-black text-xl transition-all duration-300 ${buttonClass} ${selectedAnswer !== null ? 'cursor-not-allowed' : ''}`}
                    >
                      <div className="flex items-center justify-between px-4">
                        <span>{option}</span>
                        {selectedAnswer === option && (
                          isCorrect ? <Check size={28} /> : <X size={28} />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {mode === 'meaning-word' && (
            <>
              <div className="text-center py-8 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl mb-6 border-2 border-amber-100 shadow-lg">
                <p className="text-2xl font-black text-gray-700">{currentWord?.meaning}</p>
                <p className="text-sm text-gray-400 mt-2">请选择正确的单词</p>
              </div>

              <div className="space-y-3">
                {meaningOptions.map((option, index) => {
                  const word = allWords.find(w => w.meaning === option);
                  let buttonClass = 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-gray-200';
                  if (selectedAnswer === option) {
                    buttonClass = isCorrect 
                      ? 'bg-green-500 text-white border-green-500 shadow-lg scale-105' 
                      : 'bg-red-500 text-white border-red-500';
                  }
                  
                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option, option === currentWord?.meaning)}
                      disabled={selectedAnswer !== null}
                      className={`w-full py-5 rounded-2xl font-black text-xl transition-all duration-300 ${buttonClass} ${selectedAnswer !== null ? 'cursor-not-allowed' : ''}`}
                    >
                      <div className="flex items-center justify-between px-4">
                        <span>{word?.word}</span>
                        {selectedAnswer === option && (
                          isCorrect ? <Check size={28} /> : <X size={28} />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {/* 反馈 */}
          {selectedAnswer !== null && (
            <div className={`mt-6 p-5 rounded-2xl text-center ${isCorrect ? 'bg-green-100 border-2 border-green-300' : 'bg-red-100 border-2 border-red-300'}`}>
              <p className={`text-xl font-black ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                {isCorrect ? '🎉 太棒了！回答正确！' : `😅 正确答案是: ${currentWord?.word}`}
              </p>
            </div>
          )}
        </div>

        {/* 提示卡片 */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-5 border border-white/50">
          <div className="flex items-center gap-4">
            <div className="text-4xl">⏰</div>
            <div className="flex-1">
              <p className="font-black text-gray-800">复习提醒</p>
              <p className="text-sm text-gray-500">根据艾宾浩斯遗忘曲线，建议明天再复习一次</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
