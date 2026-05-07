import { useState } from 'react';
import { Star, Flame, Trophy, Users, Settings, HelpCircle, LogOut, BookOpen, Award, Target, Clock } from 'lucide-react';
import { users } from '../data/mockData';
import { Header } from '../components/Navigation';

export default function ProfilePage({ user, onNavigate }) {
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const stats = [
    { label: '总积分', value: user.points, icon: Star, color: 'text-yellow-500', bg: 'bg-yellow-100' },
    { label: '连续天数', value: `${user.streak}天`, icon: Flame, color: 'text-red-500', bg: 'bg-red-100' },
    { label: '学习时长', value: `${user.studyTime}分钟`, icon: Clock, color: 'text-blue-500', bg: 'bg-blue-100' },
    { label: '完成练习', value: user.completedExercises.length, icon: Target, color: 'text-green-500', bg: 'bg-green-100' },
  ];

  const menuItems = [
    { id: 'leaderboard', label: '排行榜', icon: Trophy, color: 'text-amber-500' },
    { id: 'friends', label: '好友列表', icon: Users, color: 'text-blue-500' },
    { id: 'achievements', label: '成就徽章', icon: Award, color: 'text-purple-500' },
    { id: 'settings', label: '设置', icon: Settings, color: 'text-gray-500' },
    { id: 'help', label: '帮助中心', icon: HelpCircle, color: 'text-cyan-500' },
  ];

  const achievements = [
    { id: 1, name: '初学者', description: '完成第一次学习', icon: '🌱', unlocked: true },
    { id: 2, name: '坚持不懈', description: '连续学习7天', icon: '🔥', unlocked: user.streak >= 7 },
    { id: 3, name: '单词达人', description: '累计学习100个单词', icon: '📚', unlocked: false },
    { id: 4, name: '听力高手', description: '听力练习满分', icon: '🎧', unlocked: false },
    { id: 5, name: '口语之星', description: '口语评分达到5星', icon: '🌟', unlocked: false },
    { id: 6, name: '全能学霸', description: '完成所有练习', icon: '👑', unlocked: false },
  ];

  const sortedUsers = [...users].sort((a, b) => b.points - a.points);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Header title="我的" />
      <main className="pt-16 pb-24 px-4 max-w-md mx-auto">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl shadow-lg p-6 text-white mb-6">
          <div className="flex items-center gap-4">
            <div className="text-5xl">{user.avatar}</div>
            <div className="flex-1">
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-sm opacity-80">Level {user.currentLevel}</p>
            </div>
            <button className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium hover:bg-white/30 transition-colors">
              编辑资料
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3 mb-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-2xl shadow-md p-3 text-center">
                <div className={`w-8 h-8 ${stat.bg} rounded-full flex items-center justify-center mx-auto mb-2`}>
                  <Icon size={18} className={stat.color} />
                </div>
                <p className="text-lg font-bold text-gray-800">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-4 mb-6">
          <button
            onClick={() => setShowLeaderboard(!showLeaderboard)}
            className="w-full flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                <Trophy size={20} className="text-amber-500" />
              </div>
              <div className="text-left">
                <p className="font-bold text-gray-800">排行榜</p>
                <p className="text-sm text-gray-500">当前排名: 第 {sortedUsers.findIndex(u => u.id === user.id) + 1} 名</p>
              </div>
            </div>
            <svg className={`w-5 h-5 text-gray-400 transition-transform ${showLeaderboard ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showLeaderboard && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="space-y-3">
                {sortedUsers.slice(0, 5).map((u, index) => (
                  <div
                    key={u.id}
                    className={`flex items-center gap-3 p-3 rounded-xl ${
                      u.id === user.id ? 'bg-purple-50' : 'bg-gray-50'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      index === 0 ? 'bg-yellow-400 text-white' :
                      index === 1 ? 'bg-gray-300 text-white' :
                      index === 2 ? 'bg-orange-400 text-white' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {index + 1}
                    </div>
                    <span className="text-2xl">{u.avatar}</span>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{u.name}</p>
                      <p className="text-xs text-gray-500">Level {u.level}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-amber-500">{u.points}</p>
                      <p className="text-xs text-gray-400">积分</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-4 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <Award size={20} className="text-purple-500" />
            </div>
            <div>
              <p className="font-bold text-gray-800">成就徽章</p>
              <p className="text-sm text-gray-500">已获得 {achievements.filter(a => a.unlocked).length} / {achievements.length}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`text-center p-3 rounded-xl ${
                  achievement.unlocked ? 'bg-gradient-to-br from-purple-50 to-pink-50' : 'bg-gray-100 opacity-50'
                }`}
              >
                <div className="text-3xl mb-1">{achievement.icon}</div>
                <p className="text-xs font-medium text-gray-700">{achievement.name}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
              >
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <Icon size={20} className={item.color} />
                </div>
                <span className="flex-1 text-left font-medium text-gray-800">{item.label}</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            );
          })}
          <button className="w-full flex items-center gap-3 p-4 hover:bg-red-50 transition-colors text-red-500">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <LogOut size={20} className="text-red-500" />
            </div>
            <span className="flex-1 text-left font-medium">退出登录</span>
          </button>
        </div>
      </main>
    </div>
  );
}
