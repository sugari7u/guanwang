import { useState, useEffect } from 'react';
import { Volume2, Check, X, Star, Trophy, Play, ChevronRight, Home } from 'lucide-react';
import { wordsByLevel, sentencesByLevel } from '../data/mockData';
import { Header } from '../components/Navigation';

export default function LearnPage({ user, mode = 'words', addPoints, addCompletedWord, onBack }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const words = wordsByLevel[user.currentLevel] || [];
  const sentences = sentencesByLevel[user.currentLevel] || [];

  const currentWord = words[currentIndex];
  const currentSentence = sentences[currentIndex];

  const getPageTitle = () => {
    switch(mode) {
      case 'words': return '单词学习';
      case 'listen': return '听力练习';
      case 'speak': return '口语练习';
      case 'write': return '书写练习';
      default: return '学习中心';
    }
  };

  const handleSpeak = (text) => {
    if ('speechSynthesis' in window) {
      setIsPlaying(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      utterance.onend = () => setIsPlaying(false);
      speechSynthesis.speak(utterance);
    }
  };

  const handleWordClick = () => {
    handleSpeak(currentWord?.word);
  };

  const handleNextWord = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setShowAnswer(false);
    } else {
      setCompleted(true);
      addPoints(score * 10);
    }
  };

  const handleListenOption = (option, correct) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(option);
    setIsCorrect(correct);
    
    if (correct) {
      setScore(prev => prev + 1);
      addPoints(10);
      addCompletedWord(currentWord?.id);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 1000);
    }

    setTimeout(() => {
      if (currentIndex < words.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        setCompleted(true);
      }
    }, 1500);
  };

  const generateOptions = (correctAnswer) => {
    const options = [correctAnswer];
    const allWords = [...wordsByLevel[1], ...wordsByLevel[2], ...wordsByLevel[3]];
    const shuffled = allWords.filter(w => w.word !== correctAnswer).sort(() => Math.random() - 0.5);
    
    for (let i = 0; i < 3 && i < shuffled.length; i++) {
      options.push(shuffled[i].word);
    }
    
    return options.sort(() => Math.random() - 0.5);
  };

  const listenOptions = currentWord ? generateOptions(currentWord.word) : [];

  if (completed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-50 to-teal-100 relative overflow-hidden">
        {/* 装饰性背景 */}
        <div className="absolute top-10 left-10 text-5xl opacity-20 animate-float">🎉</div>
        <div className="absolute top-32 right-12 text-4xl opacity-20 animate-float" style={{ animationDelay: '0.5s' }}>⭐</div>
        <div className="absolute bottom-40 left-16 text-5xl opacity-20 animate-float" style={{ animationDelay: '1s' }}>🏆</div>
        <div className="absolute bottom-24 right-8 text-4xl opacity-20 animate-float" style={{ animationDelay: '1.5s' }}>🌟</div>
        
        <Header title="太棒了！" showBack onBack={onBack} />
        <main className="pt-20 pb-28 px-4 max-w-md mx-auto relative z-10">
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 text-center border border-white/50">
            <div className="text-7xl mb-4 animate-bounce">🎉</div>
            <h2 className="text-3xl font-black text-gray-800 mb-2">恭喜完成！</h2>
            <p className="text-gray-500 mb-6 text-lg">你已经完成了这次学习</p>
            
            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-6 mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Trophy size={32} className="text-yellow-500" />
                <span className="text-4xl font-black text-yellow-600">{score}</span>
              </div>
              <p className="text-sm font-bold text-gray-600">本次得分</p>
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
                className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl font-black text-lg shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
              >
                🔄 再学一次
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

  if (mode === 'words') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 relative overflow-hidden">
        {/* 装饰性背景 */}
        <div className="absolute top-20 left-10 text-4xl opacity-20 animate-float">📚</div>
        <div className="absolute top-40 right-14 text-3xl opacity-20 animate-float" style={{ animationDelay: '0.7s' }}>✏️</div>
        
        <Header title={getPageTitle()} subtitle={`${currentIndex + 1} / ${words.length}`} showBack onBack={onBack} />
        <main className="pt-20 pb-28 px-4 max-w-md mx-auto relative z-10">
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-6 mb-4 border border-white/50">
            {/* 进度条 */}
            <div className="mb-6">
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                  style={{ width: `${((currentIndex + 1) / words.length) * 100}%` }}
                />
              </div>
            </div>

            {/* 得分展示 */}
            <div className="flex justify-center gap-1 mb-6">
              {Array.from({ length: Math.min(score + 1, 10) }).map((_, i) => (
                <Star key={i} size={24} className="text-yellow-400 fill-yellow-400" />
              ))}
            </div>

            {/* 单词卡片 */}
            <div 
              onClick={handleWordClick}
              className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 mb-6 cursor-pointer hover:scale-102 transition-all duration-300 border-2 border-blue-100 hover:border-purple-300 shadow-lg hover:shadow-xl"
            >
              <div className="text-center">
                <div className="text-8xl mb-4 animate-pulse">{currentWord?.image}</div>
                <h2 className="text-4xl font-black text-gray-800 mb-2">{currentWord?.word}</h2>
                <p className="text-xl text-gray-500 font-medium">{currentWord?.phonetic}</p>
                <button 
                  onClick={(e) => { e.stopPropagation(); handleSpeak(currentWord?.word); }}
                  className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 mx-auto"
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                  {isPlaying ? '播放中' : '点击发音'}
                </button>
              </div>
            </div>

            {/* 释义按钮 */}
            <button
              onClick={() => setShowAnswer(!showAnswer)}
              className="w-full py-4 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-2xl font-black text-lg hover:from-indigo-200 hover:to-purple-200 transition-all duration-300 shadow-md"
            >
              {showAnswer ? '👀 隐藏释义' : '🎯 查看释义'}
            </button>

            {showAnswer && (
              <div className="mt-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-6 animate-pulse">
                <p className="text-2xl font-black text-green-700 text-center">{currentWord?.meaning}</p>
              </div>
            )}

            {/* 操作按钮 */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  addCompletedWord(currentWord?.id);
                  handleNextWord();
                }}
                className="flex-1 py-4 bg-gradient-to-r from-gray-400 to-gray-500 text-white rounded-2xl font-black shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
              >
                ✅ 标记已学
              </button>
              <button
                onClick={handleNextWord}
                className="flex-1 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-black shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
              >
                {currentIndex < words.length - 1 ? (
                  <>下一个 <ChevronRight size={20} /></>
                ) : (
                  <>完成 🏆</>
                )}
              </button>
            </div>
          </div>

          {/* 提示卡片 */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-4 border border-white/50">
            <div className="flex items-center gap-3">
              <div className="text-3xl">💡</div>
              <div>
                <p className="font-bold text-gray-700">学习小贴士</p>
                <p className="text-sm text-gray-500">点击单词卡片可以听发音哦！</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (mode === 'listen') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-50 to-teal-100 relative overflow-hidden">
        <div className="absolute top-20 right-12 text-4xl opacity-20 animate-float">🎧</div>
        <div className="absolute bottom-32 left-10 text-3xl opacity-20 animate-float" style={{ animationDelay: '0.5s' }}>🎵</div>
        
        <Header title={getPageTitle()} subtitle={`${currentIndex + 1} / ${words.length}`} showBack onBack={onBack} />
        <main className="pt-20 pb-28 px-4 max-w-md mx-auto relative z-10">
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-6 border border-white/50">
            {/* 进度条 */}
            <div className="mb-6">
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-500"
                  style={{ width: `${((currentIndex + 1) / words.length) * 100}%` }}
                />
              </div>
            </div>

            {/* 得分 */}
            <div className="flex justify-center gap-1 mb-6">
              {Array.from({ length: Math.min(score + 1, 10) }).map((_, i) => (
                <Star key={i} size={24} className="text-yellow-400 fill-yellow-400" />
              ))}
            </div>

            {/* 播放卡片 */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 mb-6 text-center border-2 border-green-100 shadow-lg">
              <button
                onClick={() => handleSpeak(currentWord?.word)}
                className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white shadow-xl hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 mx-auto mb-4"
              >
                {isPlaying ? <Pause size={48} /> : <Volume2 size={48} />}
              </button>
              <p className="text-lg font-bold text-gray-600">点击按钮听发音</p>
              <p className="text-sm text-gray-400 mt-1">然后选择正确的单词</p>
            </div>

            {/* 选项 */}
            <div className="space-y-3">
              {listenOptions.map((option, index) => {
                let buttonClass = 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-gray-200';
                if (selectedAnswer === option) {
                  buttonClass = isCorrect 
                    ? 'bg-green-500 text-white border-green-500 shadow-lg scale-105' 
                    : 'bg-red-500 text-white border-red-500';
                }
                
                return (
                  <button
                    key={index}
                    onClick={() => handleListenOption(option, option === currentWord?.word)}
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

            {/* 反馈 */}
            {selectedAnswer !== null && (
              <div className={`mt-6 p-5 rounded-2xl text-center ${isCorrect ? 'bg-green-100 border-2 border-green-300' : 'bg-red-100 border-2 border-red-300'}`}>
                <p className={`text-xl font-black ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                  {isCorrect ? '🎉 太棒了！回答正确！' : `😅 正确答案是: ${currentWord?.word}`}
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100">
      <Header title="学习中心" showBack onBack={onBack} />
      <main className="pt-20 pb-28 px-4 max-w-md mx-auto">
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-6 border border-white/50">
          <h2 className="text-2xl font-black text-gray-800 mb-6 text-center">选择学习方式</h2>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => {}}
              className="bg-gradient-to-br from-blue-500 to-cyan-400 text-white p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <div className="text-4xl mb-2">📚</div>
              <p className="font-black">单词学习</p>
            </button>
            <button
              onClick={() => {}}
              className="bg-gradient-to-br from-green-500 to-emerald-400 text-white p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <div className="text-4xl mb-2">🎧</div>
              <p className="font-black">听力练习</p>
            </button>
            <button
              onClick={() => {}}
              className="bg-gradient-to-br from-orange-500 to-amber-400 text-white p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <div className="text-4xl mb-2">🎤</div>
              <p className="font-black">口语练习</p>
            </button>
            <button
              onClick={() => {}}
              className="bg-gradient-to-br from-pink-500 to-rose-400 text-white p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <div className="text-4xl mb-2">✍️</div>
              <p className="font-black">书写练习</p>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
