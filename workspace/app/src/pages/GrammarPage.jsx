import { useState } from 'react';
import { BookText, Volume2, Sparkles, ChevronRight } from 'lucide-react';
import { grammarByLevel, phonetics } from '../data/mockData';
import { Header } from '../components/Navigation';

export default function GrammarPage({ user }) {
  const [activeTab, setActiveTab] = useState('grammar');
  const [selectedGrammar, setSelectedGrammar] = useState(null);

  const grammarItems = grammarByLevel[user.currentLevel] || grammarByLevel[1];

  const handleSpeak = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Header title="语法与音标" />
      <main className="pt-16 pb-24 px-4 max-w-md mx-auto">
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('grammar')}
            className={`flex-1 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'grammar'
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              <BookText size={18} />
              语法
            </span>
          </button>
          <button
            onClick={() => setActiveTab('phonetic')}
            className={`flex-1 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'phonetic'
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              <Volume2 size={18} />
              音标
            </span>
          </button>
        </div>

        {activeTab === 'grammar' && (
          <div className="space-y-4">
            {grammarItems.map((item) => (
              <div
                key={item.id}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all ${
                  selectedGrammar === item.id ? 'ring-2 ring-purple-500' : ''
                }`}
              >
                <button
                  onClick={() => setSelectedGrammar(selectedGrammar === item.id ? null : item.id)}
                  className="w-full p-4 flex items-center justify-between text-left"
                >
                  <div>
                    <h3 className="font-bold text-gray-800 flex items-center gap-2">
                      <Sparkles className="text-purple-500" size={18} />
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                  </div>
                  <ChevronRight 
                    size={20} 
                    className={`text-gray-400 transition-transform ${
                      selectedGrammar === item.id ? 'rotate-90' : ''
                    }`} 
                  />
                </button>
                
                {selectedGrammar === item.id && (
                  <div className="px-4 pb-4">
                    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4">
                      <p className="text-sm text-gray-600 mb-2">例句：</p>
                      <div className="space-y-2">
                        {item.examples.map((example, index) => (
                          <div 
                            key={index} 
                            className="flex items-center gap-2 bg-white rounded-lg px-3 py-2"
                          >
                            <span className="text-gray-400 text-sm">{index + 1}.</span>
                            <span className="font-medium text-gray-800">{example}</span>
                            <button
                              onClick={() => handleSpeak(example)}
                              className="ml-auto p-1 text-blue-500 hover:bg-blue-50 rounded-full"
                            >
                              <Volume2 size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl p-6 text-white">
              <h3 className="font-bold text-lg mb-2">💡 学习小贴士</h3>
              <p className="text-sm opacity-90">
                学习语法时，可以尝试用学到的句型自己造句，这样能更好地理解和记忆哦！
              </p>
            </div>
          </div>
        )}

        {activeTab === 'phonetic' && (
          <div className="space-y-3">
            <div className="bg-white rounded-2xl shadow-lg p-4 mb-4">
              <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                <Volume2 className="text-purple-500" size={18} />
                英语音标表
              </h3>
              <p className="text-sm text-gray-500">点击音标可以听发音</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {phonetics.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow"
                >
                  <button
                    onClick={() => handleSpeak(item.examples[0])}
                    className="flex items-center gap-3"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center">
                      <span className="text-xl font-bold text-purple-600">{item.phonetic}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-1">
                        {item.examples.map((word, index) => (
                          <span
                            key={index}
                            className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-full"
                          >
                            {word}
                          </span>
                        ))}
                      </div>
                    </div>
                    <Volume2 size={18} className="text-gray-400" />
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-white">
              <h3 className="font-bold text-lg mb-2">🎧 发音技巧</h3>
              <p className="text-sm opacity-90">
                学习音标时，可以跟着标准发音反复练习，注意口型和发音位置的变化哦！
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
