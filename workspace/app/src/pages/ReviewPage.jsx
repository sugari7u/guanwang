import { useState } from 'react';
import { RotateCcw, Star, Volume2, Check, X, Clock } from 'lucide-react';
import { wordsByLevel } from '../data/mockData';
import { Header } from '../components/Navigation';

export default function ReviewPage({ user, addPoints, addCompletedWord }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [mode, setMode] = useState('word-meaning');

  const words = wordsByLevel[user.currentLevel] || [];
  const reviewWords = words.slice(0, 5);
  
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
    const allWords = [...wordsByLevel[1], ...wordsByLevel[2], ...wordsByLevel[3]];
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
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
        <Header title="复习完成" />
        <main className="pt-16 pb-24 px-4 max-w-md mx-auto">
          <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">
              {accuracy >= 80 ? '🏆' : accuracy >= 60 ? '👍' : '💪'}
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">复习完成！</h2>
            <p className="text-gray-500 mb-6">
              {accuracy >= 80 ? '太棒了！记忆很牢固！' : accuracy >= 60 ? '不错，继续加油！' : '需要多复习几次哦！'}
            </p>
            
            <div className="bg-gradient-to-r from-amber-100 to-yellow-100 rounded-2xl p-4 mb-6">
              <p className="text-sm text-gray-600">本次正确率</p>
              <p className="text-4xl font-bold text-amber-500">{accuracy}%</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setCurrentIndex(0);
                  setScore(0);
                  setCompleted(false);
                  setSelectedAnswer(null);
                  setIsCorrect(null);
                }}
                className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
              >
                再复习一次
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
      <Header title="阶段性复习" />
      <main className="pt-16 pb-24 px-4 max-w-md mx-auto">
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-500">
              {currentIndex + 1} / {reviewWords.length}
            </span>
            <div className="flex gap-1">
              {Array.from({ length: score }).map((_, i) => (
                <Star key={i} size={16} className="text-yellow-400" fill="currentColor" />
              ))}
            </div>
          </div>

          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setMode('word-meaning')}
              className={`flex-1 py-2 rounded-xl font-medium transition-colors ${
                mode === 'word-meaning' 
                  ? 'bg-amber-500 text-white' 
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              单词→释义
            </button>
            <button
              onClick={() => setMode('meaning-word')}
              className={`flex-1 py-2 rounded-xl font-medium transition-colors ${
                mode === 'meaning-word' 
                  ? 'bg-amber-500 text-white' 
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              释义→单词
            </button>
          </div>

          {mode === 'word-meaning' && (
            <>
              <div className="text-center py-8 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl mb-6">
                <div className="text-6xl mb-4">{currentWord?.image}</div>
                <h2 className="text-3xl font-bold text-gray-800">{currentWord?.word}</h2>
                <button
                  onClick={() => {
                    if ('speechSynthesis' in window) {
                      const utterance = new SpeechSynthesisUtterance(currentWord?.word);
                      utterance.lang = 'en-US';
                      speechSynthesis.speak(utterance);
                    }
                  }}
                  className="mt-2 p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
                >
                  <Volume2 size={20} />
                </button>
              </div>

              <div className="space-y-3">
                {meaningOptions.map((option, index) => {
                  let buttonClass = 'bg-gray-100 text-gray-700 hover:bg-gray-200';
                  if (selectedAnswer === option) {
                    buttonClass = isCorrect 
                      ? 'bg-green-500 text-white' 
                      : 'bg-red-500 text-white';
                  }
                  
                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option, option === currentWord?.meaning)}
                      disabled={selectedAnswer !== null}
                      className={`w-full py-4 rounded-xl font-medium transition-all ${buttonClass} ${selectedAnswer !== null ? 'cursor-not-allowed' : ''}`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{option}</span>
                        {selectedAnswer === option && (
                          isCorrect ? <Check size={20} /> : <X size={20} />
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
              <div className="text-center py-8 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl mb-6">
                <p className="text-xl text-gray-600">{currentWord?.meaning}</p>
                <p className="text-sm text-gray-400 mt-2">请选择正确的单词</p>
              </div>

              <div className="space-y-3">
                {meaningOptions.map((option, index) => {
                  const word = allWords.find(w => w.meaning === option);
                  let buttonClass = 'bg-gray-100 text-gray-700 hover:bg-gray-200';
                  if (selectedAnswer === option) {
                    buttonClass = isCorrect 
                      ? 'bg-green-500 text-white' 
                      : 'bg-red-500 text-white';
                  }
                  
                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option, option === currentWord?.meaning)}
                      disabled={selectedAnswer !== null}
                      className={`w-full py-4 rounded-xl font-medium transition-all ${buttonClass} ${selectedAnswer !== null ? 'cursor-not-allowed' : ''}`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{word?.word}</span>
                        {selectedAnswer === option && (
                          isCorrect ? <Check size={20} /> : <X size={20} />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {selectedAnswer !== null && (
            <div className={`mt-4 p-4 rounded-xl ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
              <p className={`text-center font-medium ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                {isCorrect ? '🎉 回答正确！' : `😢 正确答案是: ${currentWord?.word}`}
              </p>
            </div>
          )}
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-4">
          <div className="flex items-center gap-3">
            <Clock className="text-amber-500" size={20} />
            <div>
              <p className="font-medium text-gray-800">复习提醒</p>
              <p className="text-sm text-gray-500">根据艾宾浩斯遗忘曲线，建议明天再复习一次</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
