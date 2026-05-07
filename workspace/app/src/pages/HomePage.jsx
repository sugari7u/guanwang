import { Star, Flame, BookOpen, Headphones, Mic, PenTool, Gamepad2, Trophy, Users, Rocket, Sparkles, Gift } from 'lucide-react';
import { levels, wordsByLevel } from '../data/mockData';
import { Header } from '../components/Navigation';
import { useState, useEffect } from 'react';

export default function HomePage({ user, onNavigate, onSelectLevel }) {
  const [showConfetti, setShowConfetti] = useState(false);
  const currentWords = wordsByLevel[user.currentLevel] || [];
  const completedCount = user.completedWords.filter(w => 
    currentWords.some(cw => cw.id === w)
  ).length;

  const quickActions = [
    { id: 'words', label: '单词', icon: BookOpen, color: 'from-blue-500 to-cyan-400', count: currentWords.length, emoji: '📚' },
    { id: 'listen', label: '听力', icon: Headphones, color: 'from-green-500 to-emerald-400', count: '10题', emoji: '🎧' },
    { id: 'speak', label: '口语', icon: Mic, color: 'from-orange-500 to-amber-400', count: '5题', emoji: '🎤' },
    { id: 'write', label: '书写', icon: PenTool, color: 'from-pink-500 to-rose-400', count: '8题', emoji: '✍️' },
  ];

  const gameActions = [
    { id: 'game', label: '单词接龙', description: '挑战一下！', icon: Gamepad2, color: 'from-orange-500 to-yellow-400', emoji: '🐉' },
    { id: 'match', label: '拼图游戏', description: '限时挑战', icon: Trophy, color: 'from-purple-500 to-indigo-400', emoji: '🧩' },
  ];

  useEffect(() => {
    if (user.streak >= 7) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [user.streak]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 relative overflow-hidden">
      {/* 装饰性背景元素 */}
      <div className="absolute top-20 left-10 text-6xl opacity-20 animate-bounce">🎈</div>
      <div className="absolute top-40 right-16 text-4xl opacity-20 animate-pulse">⭐</div>
      <div className="absolute bottom-40 left-20 text-5xl opacity-20 animate-bounce" style={{ animationDelay: '1s' }}>🌈</div>
      <div className="absolute bottom-24 right-8 text-4xl opacity-20 animate-pulse" style={{ animationDelay: '0.5s' }}>🦋</div>
      
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-40">
          {['🎉', '🎊', '🎈', '⭐', '🌟', '✨'].map((emoji, i) => (
            <div 
              key={i}
              className="absolute text-3xl animate-fall"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              {emoji}
            </div>
          ))}
        </div>
      )}
      
      <Header title="Super Kids" subtitle="快乐学英语 天天有进步！" />
      
      <main className="pt-20 pb-28 px-4 max-w-md mx-auto relative z-10">
        {/* 欢迎卡片 */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-6 mb-6 border border-white/50">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-4">
              <div className="text-6xl animate-pulse">{user.avatar}</div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">你好，{user.name}！</h2>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <Sparkles size={14} className="text-yellow-500" />
                  Level {user.currentLevel} · 继续加油！
                </p>
              </div>
            </div>
            <button
              onClick={() => onSelectLevel()}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              切换级别
            </button>
          </div>
          
          {/* 统计卡片 */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl p-4 text-center shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-center gap-1 text-yellow-500 mb-1">
                <Star size={18} fill="currentColor" />
                <span className="text-2xl font-black">{user.points}</span>
              </div>
              <p className="text-xs font-bold text-gray-600">积分</p>
            </div>
            <div className="bg-gradient-to-br from-red-100 to-pink-100 rounded-2xl p-4 text-center shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-center gap-1 text-red-500 mb-1">
                <Flame size={18} fill="currentColor" />
                <span className="text-2xl font-black">{user.streak}</span>
              </div>
              <p className="text-xs font-bold text-gray-600">连续天数</p>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-teal-100 rounded-2xl p-4 text-center shadow-md hover:shadow-lg transition-shadow">
              <div className="text-2xl font-black text-green-500 mb-1">
                {completedCount}/{currentWords.length}
              </div>
              <p className="text-xs font-bold text-gray-600">已学单词</p>
            </div>
          </div>
        </div>

        {/* 快速学习 */}
        <div className="mb-6">
          <h3 className="text-xl font-black text-gray-800 mb-4 flex items-center gap-2">
            <Rocket size={24} className="text-purple-600" />
            快速学习
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.id}
                  onClick={() => onNavigate('learn', { mode: action.id })}
                  className={`bg-gradient-to-br ${action.color} text-white rounded-3xl p-5 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-4xl">{action.emoji}</span>
                    <div className="text-center">
                      <p className="font-black text-lg">{action.label}</p>
                      <p className="text-xs opacity-90 font-bold">{action.count}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 趣味游戏 */}
        <div className="mb-6">
          <h3 className="text-xl font-black text-gray-800 mb-4 flex items-center gap-2">
            <Gift size={24} className="text-orange-500" />
            趣味游戏
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {gameActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.id}
                  onClick={() => onNavigate('learn', { mode: action.id })}
                  className={`bg-gradient-to-br ${action.color} text-white rounded-3xl p-5 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-4xl">{action.emoji}</span>
                    <div className="text-center">
                      <p className="font-black text-lg">{action.label}</p>
                      <p className="text-xs opacity-90 font-bold">{action.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 好友动态 */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-6 border border-white/50">
          <h3 className="text-xl font-black text-gray-800 mb-4 flex items-center gap-2">
            <Users size={24} className="text-blue-500" />
            好友动态
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
              <div className="flex items-center gap-4">
                <span className="text-3xl">👧</span>
                <div>
                  <p className="font-bold text-gray-800">小红</p>
                  <p className="text-xs text-gray-500">今天学习了 50 积分！</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-gradient-to-r from-blue-400 to-indigo-400 text-white rounded-full text-xs font-bold shadow-md hover:shadow-lg transition-shadow">
                🌸 送花
              </button>
            </div>
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl border border-pink-100">
              <div className="flex items-center gap-4">
                <span className="text-3xl">👧</span>
                <div>
                  <p className="font-bold text-gray-800">小丽</p>
                  <p className="text-xs text-gray-500">今天学习了 30 积分！</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-gradient-to-r from-pink-400 to-rose-400 text-white rounded-full text-xs font-bold shadow-md hover:shadow-lg transition-shadow">
                🌸 送花
              </button>
            </div>
          </div>
          <button className="w-full mt-4 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-2xl font-bold hover:from-gray-200 hover:to-gray-300 transition-all duration-300">
            查看更多好友 →
          </button>
        </div>
      </main>
    </div>
  );
}

export function LevelSelectModal({ onSelect, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-6 w-full max-w-sm max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">选择教材级别</h2>
        <div className="space-y-3">
          {levels.map((level) => (
            <button
              key={level.id}
              onClick={() => {
                onSelect(level.id);
                onClose();
              }}
              className={`w-full p-4 rounded-2xl border-2 transition-all hover:scale-102 ${level.color} border-white shadow-lg`}
            >
              <div className="flex items-center justify-between text-white">
                <div>
                  <p className="font-bold text-lg">{level.name}</p>
                  <p className="text-sm opacity-80">{level.description}</p>
                </div>
                <span className="text-2xl">📚</span>
              </div>
            </button>
          ))}
        </div>
        <button
          onClick={onClose}
          className="w-full mt-6 py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition-colors"
        >
          取消
        </button>
      </div>
    </div>
  );
}
