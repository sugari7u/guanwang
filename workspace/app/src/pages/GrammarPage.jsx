import { useState } from 'react';
import { BookText, Volume2, Sparkles, ChevronRight, BookOpen } from 'lucide-react';
import { grammarByLevel, phonetics } from '../data/mockData';
import { Header } from '../components/Navigation';

export default function GrammarPage({ user, onBack }) {
  const [activeTab, setActiveTab] = useState('grammar');
  const [selectedGrammar, setSelectedGrammar] = useState(null);

  const grammarItems = grammarByLevel[user.currentLevel] || grammarByLevel[1];

  const handleSpeak = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 relative overflow-hidden">
      <div className="absolute top-20 left-10 text-4xl opacity-20 animate-float">📖</div>
      <div className="absolute top-40 right-8 text-3xl opacity-20 animate-float" style={{ animationDelay: '0.5s' }}>📚</div>
      <div className="absolute bottom-32 left-16 text-3xl opacity-20 animate-float" style={{ animationDelay: '1s' }}>✨</div>
      
      <Header title="语法与音标" showBack onBack={onBack} />
      <main className="pt-20 pb-28 px-4 max-w-md mx-auto relative z-10">
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setActiveTab('grammar')}
            className={`flex-1 py-4 rounded-2xl font-black text-base transition-all duration-300 ${
              activeTab === 'grammar'
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-xl scale-105'
                : 'bg-white/80 text-gray-600 hover:bg-white shadow-md'
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              <BookText size={20} />
              语法
            </span>
          </button>
          <button
            onClick={() => setActiveTab('phonetic')}
            className={`flex-1 py-4 rounded-2xl font-black text-base transition-all duration-300 ${
              activeTab === 'phonetic'
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-xl scale-105'
                : 'bg-white/80 text-gray-600 hover:bg-white shadow-md'
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              <Volume2 size={20} />
              音标
            </span>
          </button>
        </div>

        {activeTab === 'grammar' && (
          <div className="space-y-4">
            {grammarItems.map((item) => (
              <div
                key={item.id}
                className={`bg-white/90 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden transition-all duration-300 border border-white/50 ${
                  selectedGrammar === item.id ? 'ring-2 ring-purple-500' : ''
                }`}
              >
                <button
                  onClick={() => setSelectedGrammar(selectedGrammar === item.id ? null : item.id)}
                  className="w-full p-5 flex items-center justify-between text-left"
                >
                  <div className="flex-1">
                    <h3 className="font-black text-gray-800 text-lg flex items-center gap-2">
                      <Sparkles className="text-purple-500" size={20} />
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                  </div>
                  <ChevronRight 
                    size={24} 
                    className={`text-gray-400 transition-transform duration-300 ${
                      selectedGrammar === item.id ? 'rotate-90' : ''
                    }`} 
                  />
                </button>
                
                {selectedGrammar === item.id && (
                  <div className="px-5 pb-5">
                    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-5 border border-purple-100">
                      <p className="text-sm font-black text-gray-600 mb-4 flex items-center gap-2">
                        <BookOpen size={16} />
                        例句：
                      </p>
                      <div className="space-y-3">
                        {item.examples.map((example, index) => (
                          <div 
                            key={index} 
                            className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm border border-purple-50"
                          >
                            <span className="text-gray-400 text-sm font-black">{index + 1}.</span>
                            <span className="font-bold text-gray-800 flex-1">{example}</span>
                            <button
                              onClick={() => handleSpeak(example)}
                              className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-md hover:shadow-lg hover:scale-110 active:scale-95 transition-all duration-300"
                            >
                              <Volume2 size={18} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl p-6 text-white shadow-xl">
              <h3 className="font-black text-xl mb-3 flex items-center gap-2">
                💡 学习小贴士
              </h3>
              <p className="text-sm opacity-90 leading-relaxed">
                学习语法时，可以尝试用学到的句型自己造句，这样能更好地理解和记忆哦！
              </p>
            </div>
          </div>
        )}

        {activeTab === 'phonetic' && (
          <div className="space-y-4">
            <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-5 mb-4 border border-white/50">
              <h3 className="font-black text-gray-800 text-lg mb-2 flex items-center gap-2">
                <Volume2 className="text-purple-500" size={20} />
                英语音标表
              </h3>
              <p className="text-sm text-gray-500">点击音标可以听发音</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {phonetics.map((item) => (
                <div
                  key={item.id}
                  className="bg-white/90 backdrop-blur-md rounded-2xl shadow-md p-5 hover:shadow-xl transition-all duration-300 border border-white/50 hover:scale-105"
                >
                  <button
                    onClick={() => handleSpeak(item.examples[0])}
                    className="flex items-center gap-4 w-full"
                  >
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center shadow-md">
                      <span className="text-2xl font-black text-purple-600">{item.phonetic}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-2">
                        {item.examples.map((word, index) => (
                          <span
                            key={index}
                            className="text-sm font-bold text-gray-700 bg-gray-100 px-3 py-1.5 rounded-full"
                          >
                            {word}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-md hover:shadow-lg hover:scale-110 active:scale-95 transition-all duration-300">
                      <Volume2 size={18} />
                    </div>
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-white shadow-xl">
              <h3 className="font-black text-xl mb-3 flex items-center gap-2">
                🎧 发音技巧
              </h3>
              <p className="text-sm opacity-90 leading-relaxed">
                学习音标时，可以跟着标准发音反复练习，注意口型和发音位置的变化哦！
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
