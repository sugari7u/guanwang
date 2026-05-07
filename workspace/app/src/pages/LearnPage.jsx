import { useState, useEffect } from 'react';
import { Volume2, Check, X, RotateCcw, Star, Sparkles } from 'lucide-react';
import { wordsByLevel, sentencesByLevel } from '../data/mockData';
import { Header } from '../components/Navigation';

export default function LearnPage({ user, mode = 'words', addPoints, addCompletedWord }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const words = wordsByLevel[user.currentLevel] || [];
  const sentences = sentencesByLevel[user.currentLevel] || [];

  const currentWord = words[currentIndex];
  const currentSentence = sentences[currentIndex];

  useEffect(() => {
    setCurrentIndex(0);
    setScore(0);
    setCompleted(false);
  }, [mode]);

  const handleSpeak = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
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

  const handleListenOption = (option, isCorrectOption) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(option);
    setIsCorrect(isCorrectOption);
    
    if (isCorrectOption) {
      setScore(prev => prev + 1);
      addPoints(10);
      addCompletedWord(currentWord?.id);
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
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <Header title="学习完成" />
        <main className="pt-16 pb-24 px-4 max-w-md mx-auto">
          <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">太棒了！</h2>
            <p className="text-gray-500 mb-6">你完成了本次学习</p>
            
            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-4 mb-6">
              <p className="text-sm text-gray-600">本次得分</p>
              <p className="text-4xl font-bold text-yellow-500">{score} <span className="text-xl">分</span></p>
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
                className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
              >
                再学一次
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (mode === 'words') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <Header title="单词学习" />
        <main className="pt-16 pb-24 px-4 max-w-md mx-auto">
          <div className="bg-white rounded-3xl shadow-lg p-6 mb-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-500">
                {currentIndex + 1} / {words.length}
              </span>
              <div className="flex gap-1">
                {Array.from({ length: score }).map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-400" fill="currentColor" />
                ))}
              </div>
            </div>

            <div 
              className="text-center py-12 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl mb-6 cursor-pointer hover:scale-105 transition-transform"
              onClick={handleWordClick}
            >
              <div className="text-6xl mb-4">{currentWord?.image}</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">{currentWord?.word}</h2>
              <p className="text-gray-500">{currentWord?.phonetic}</p>
            </div>

            <button
              onClick={() => setShowAnswer(!showAnswer)}
              className="w-full py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition-colors mb-4"
            >
              {showAnswer ? '隐藏释义' : '查看释义'}
            </button>

            {showAnswer && (
              <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-4 mb-4">
                <p className="text-lg font-medium text-green-700 text-center">{currentWord?.meaning}</p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setShowAnswer(!showAnswer)}
                className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition-colors"
              >
                标记已学
              </button>
              <button
                onClick={handleNextWord}
                className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
              >
                {currentIndex < words.length - 1 ? '下一个' : '完成'}
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-4">
            <h3 className="text-sm font-medium text-gray-600 mb-3">操作提示</h3>
            <div className="flex items-center gap-3">
              <Volume2 size={20} className="text-blue-500" />
              <p className="text-sm text-gray-500">点击单词卡片可以听发音</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (mode === 'listen') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <Header title="听力练习" />
        <main className="pt-16 pb-24 px-4 max-w-md mx-auto">
          <div className="bg-white rounded-3xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-500">
                {currentIndex + 1} / {words.length}
              </span>
              <div className="flex gap-1">
                {Array.from({ length: score }).map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-400" fill="currentColor" />
                ))}
              </div>
            </div>

            <div className="text-center py-12 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl mb-6">
              <button
                onClick={() => handleSpeak(currentWord?.word)}
                className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform mb-4"
              >
                <Volume2 size={36} />
              </button>
              <p className="text-gray-500">点击按钮听发音</p>
            </div>

            <div className="space-y-3">
              {listenOptions.map((option, index) => {
                let buttonClass = 'bg-gray-100 text-gray-700 hover:bg-gray-200';
                if (selectedAnswer === option) {
                  buttonClass = isCorrect 
                    ? 'bg-green-500 text-white' 
                    : 'bg-red-500 text-white';
                }
                
                return (
                  <button
                    key={index}
                    onClick={() => handleListenOption(option, option === currentWord?.word)}
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

            {selectedAnswer !== null && (
              <div className={`mt-4 p-4 rounded-xl ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
                <p className={`text-center font-medium ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                  {isCorrect ? '🎉 回答正确！' : `😢 正确答案是: ${currentWord?.word}`}
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }

  if (mode === 'speak') {
    const [isRecording, setIsRecording] = useState(false);
    const [rating, setRating] = useState(null);

    const handleRecord = () => {
      if (isRecording) {
        setIsRecording(false);
        const randomRating = Math.floor(Math.random() * 3) + 3;
        setRating(randomRating);
        if (randomRating >= 4) {
          setScore(prev => prev + 1);
          addPoints(15);
        }
      } else {
        setIsRecording(true);
        setRating(null);
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <Header title="口语练习" />
        <main className="pt-16 pb-24 px-4 max-w-md mx-auto">
          <div className="bg-white rounded-3xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-500">
                {currentIndex + 1} / {sentences.length}
              </span>
              <div className="flex gap-1">
                {Array.from({ length: score }).map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-400" fill="currentColor" />
                ))}
              </div>
            </div>

            <div className="text-center py-8 bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl mb-6">
              <div className="text-4xl mb-4">{currentSentence?.image}</div>
              <p className="text-xl font-bold text-gray-800 mb-2">{currentSentence?.sentence}</p>
              <p className="text-gray-500">{currentSentence?.meaning}</p>
            </div>

            <button
              onClick={() => handleSpeak(currentSentence?.sentence)}
              className="w-full py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition-colors mb-4"
            >
              听标准发音
            </button>

            <div className="text-center mb-6">
              <button
                onClick={handleRecord}
                className={`w-24 h-24 rounded-full flex items-center justify-center text-white shadow-lg transition-all ${
                  isRecording 
                    ? 'bg-red-500 animate-pulse' 
                    : 'bg-gradient-to-br from-orange-400 to-amber-500 hover:scale-110'
                }`}
              >
                {isRecording ? (
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                ) : (
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 14c1.66 0 2.99-1.34 2.99-3S13.66 8 12 8 9 9.34 9 11s1.34 3 3 3zm5.6-2c0-3-3.13-5.14-7.6-5.14-4.47 0-7.6 2.13-7.6 5.14 0 3 3.13 5.14 7.6 5.14 4.47 0 7.6-2.13 7.6-5.14zM17 12v5h-3v-5h-4v5H7v-5H4l8-8 8 8h-3z"/>
                  </svg>
                )}
              </button>
              <p className="mt-3 text-gray-500">{isRecording ? '正在录音...' : '点击开始录音'}</p>
            </div>

            {rating !== null && (
              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl p-4 mb-4">
                <p className="text-center text-gray-600 mb-2">发音评分</p>
                <div className="flex justify-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      size={24} 
                      className={i < rating ? 'text-yellow-400' : 'text-gray-300'} 
                      fill={i < rating ? 'currentColor' : 'none'} 
                    />
                  ))}
                </div>
                <p className="text-center text-sm text-gray-500 mt-2">
                  {rating >= 4 ? '🎊 发音很棒！' : rating >= 3 ? '👍 不错，继续加油！' : '💪 多练习几次吧！'}
                </p>
              </div>
            )}

            {(rating !== null || !isRecording) && (
              <button
                onClick={() => {
                  if (currentIndex < sentences.length - 1) {
                    setCurrentIndex(prev => prev + 1);
                    setRating(null);
                  } else {
                    setCompleted(true);
                    addPoints(score * 15);
                  }
                }}
                className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
              >
                {currentIndex < sentences.length - 1 ? '下一个' : '完成'}
              </button>
            )}
          </div>
        </main>
      </div>
    );
  }

  if (mode === 'write') {
    const [inputValue, setInputValue] = useState('');
    const [checked, setChecked] = useState(false);

    const handleCheck = () => {
      const isCorrect = inputValue.toLowerCase().trim() === currentWord?.word.toLowerCase();
      setChecked(true);
      setIsCorrect(isCorrect);
      if (isCorrect) {
        setScore(prev => prev + 1);
        addPoints(10);
        addCompletedWord(currentWord?.id);
      }
    };

    const handleNext = () => {
      if (currentIndex < words.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setInputValue('');
        setChecked(false);
        setIsCorrect(null);
      } else {
        setCompleted(true);
        addPoints(score * 10);
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-rose-50">
        <Header title="书写练习" />
        <main className="pt-16 pb-24 px-4 max-w-md mx-auto">
          <div className="bg-white rounded-3xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-500">
                {currentIndex + 1} / {words.length}
              </span>
              <div className="flex gap-1">
                {Array.from({ length: score }).map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-400" fill="currentColor" />
                ))}
              </div>
            </div>

            <div className="text-center py-8 bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl mb-6">
              <div className="text-6xl mb-4">{currentWord?.image}</div>
              <p className="text-lg text-gray-600">{currentWord?.meaning}</p>
              {!checked && (
                <p className="text-sm text-gray-400 mt-2">根据图片和释义写出单词</p>
              )}
            </div>

            <div className="mb-4">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={checked}
                placeholder="输入单词..."
                className="w-full px-4 py-4 text-xl text-center border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
              />
            </div>

            {!checked ? (
              <button
                onClick={handleCheck}
                disabled={!inputValue.trim()}
                className="w-full py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                检查答案
              </button>
            ) : (
              <>
                <div className={`p-4 rounded-xl mb-4 ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
                  <p className={`text-center font-medium ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                    {isCorrect ? '🎉 正确！' : `😢 正确答案是: ${currentWord?.word}`}
                  </p>
                </div>
                <button
                  onClick={handleNext}
                  className="w-full py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
                >
                  {currentIndex < words.length - 1 ? '下一个' : '完成'}
                </button>
              </>
            )}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Header title="学习中心" />
      <main className="pt-16 pb-24 px-4 max-w-md mx-auto">
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => mode('words')}
              className="bg-gradient-to-br from-blue-400 to-cyan-400 text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform"
            >
              <BookOpen className="w-10 h-10 mx-auto mb-2" />
              <p className="font-bold">单词学习</p>
            </button>
            <button
              onClick={() => mode('listen')}
              className="bg-gradient-to-br from-green-400 to-emerald-400 text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform"
            >
              <Volume2 className="w-10 h-10 mx-auto mb-2" />
              <p className="font-bold">听力练习</p>
            </button>
            <button
              onClick={() => mode('speak')}
              className="bg-gradient-to-br from-orange-400 to-amber-400 text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform"
            >
              <Mic className="w-10 h-10 mx-auto mb-2" />
              <p className="font-bold">口语练习</p>
            </button>
            <button
              onClick={() => mode('write')}
              className="bg-gradient-to-br from-red-400 to-pink-400 text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform"
            >
              <PenTool className="w-10 h-10 mx-auto mb-2" />
              <p className="font-bold">书写练习</p>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
