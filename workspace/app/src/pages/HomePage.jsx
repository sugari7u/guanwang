import { Star, Flame, BookOpen, Headphones, Mic, PenTool, Gamepad2, Trophy, Users } from 'lucide-react';
import { levels, wordsByLevel } from '../data/mockData';
import { Header } from '../components/Navigation';

export default function HomePage({ user, onNavigate, onSelectLevel }) {
  const currentWords = wordsByLevel[user.currentLevel] || [];
  const completedCount = user.completedWords.filter(w => 
    currentWords.some(cw => cw.id === w)
  ).length;

  const quickActions = [
    { id: 'words', label: '单词', icon: BookOpen, color: 'from-blue-400 to-cyan-400', count: currentWords.length },
    { id: 'listen', label: '听力', icon: Headphones, color: 'from-green-400 to-emerald-400', count: '10题' },
    { id: 'speak', label: '口语', icon: Mic, color: 'from-orange-400 to-amber-400', count: '5题' },
    { id: 'write', label: '书写', icon: PenTool, color: 'from-red-400 to-pink-400', count: '8题' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Header title="Super Kids" />
      
      <main className="pt-16 pb-24 px-4 max-w-md mx-auto">
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="text-5xl">{user.avatar}</div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
                <p className="text-sm text-gray-500">Level {user.currentLevel}</p>
              </div>
            </div>
            <button
              onClick={() => onSelectLevel()}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
            >
              切换级别
            </button>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl p-4 text-center">
              <div className="flex items-center justify-center gap-1 text-yellow-500 mb-1">
                <Star size={16} fill="currentColor" />
                <span className="text-2xl font-bold">{user.points}</span>
              </div>
              <p className="text-xs text-gray-600">积分</p>
            </div>
            <div className="bg-gradient-to-br from-red-100 to-pink-100 rounded-2xl p-4 text-center">
              <div className="flex items-center justify-center gap-1 text-red-500 mb-1">
                <Flame size={16} fill="currentColor" />
                <span className="text-2xl font-bold">{user.streak}</span>
              </div>
              <p className="text-xs text-gray-600">连续天数</p>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-teal-100 rounded-2xl p-4 text-center">
              <div className="text-2xl font-bold text-green-500 mb-1">
                {completedCount}/{currentWords.length}
              </div>
              <p className="text-xs text-gray-600">已学单词</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
            <BookOpen size={20} className="text-purple-500" />
            快速学习
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.id}
                  onClick={() => onNavigate('learn', { mode: action.id })}
                  className={`bg-gradient-to-br ${action.color} text-white rounded-2xl p-4 shadow-lg hover:scale-105 transition-transform`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={28} />
                    <div className="text-left">
                      <p className="font-bold">{action.label}</p>
                      <p className="text-xs opacity-80">{action.count}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
            <Gamepad2 size={20} className="text-orange-500" />
            趣味游戏
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => onNavigate('learn', { mode: 'game' })}
              className="bg-gradient-to-br from-orange-400 to-yellow-400 text-white rounded-2xl p-4 shadow-lg hover:scale-105 transition-transform"
            >
              <div className="flex items-center gap-3">
                <Gamepad2 size={28} />
                <div className="text-left">
                  <p className="font-bold">单词接龙</p>
                  <p className="text-xs opacity-80">挑战一下！</p>
                </div>
              </div>
            </button>
            <button
              onClick={() => onNavigate('learn', { mode: 'match' })}
              className="bg-gradient-to-br from-purple-400 to-indigo-400 text-white rounded-2xl p-4 shadow-lg hover:scale-105 transition-transform"
            >
              <div className="flex items-center gap-3">
                <Trophy size={28} />
                <div className="text-left">
                  <p className="font-bold">拼图游戏</p>
                  <p className="text-xs opacity-80">限时挑战</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
            <Users size={20} className="text-blue-500" />
            好友动态
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <span className="text-2xl">👧</span>
                <div>
                  <p className="font-medium text-gray-800">小红</p>
                  <p className="text-xs text-gray-500">今天学习了 50 积分</p>
                </div>
              </div>
              <button className="px-3 py-1 bg-blue-100 text-blue-500 rounded-full text-xs font-medium">
                送花
              </button>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <span className="text-2xl">👧</span>
                <div>
                  <p className="font-medium text-gray-800">小丽</p>
                  <p className="text-xs text-gray-500">今天学习了 30 积分</p>
                </div>
              </div>
              <button className="px-3 py-1 bg-blue-100 text-blue-500 rounded-full text-xs font-medium">
                送花
              </button>
            </div>
          </div>
          <button className="w-full mt-4 py-2 text-blue-500 text-sm font-medium hover:bg-blue-50 rounded-xl transition-colors">
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
