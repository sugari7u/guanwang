import { Home, BookOpen, RotateCcw, BookText, User, Trophy, Users } from 'lucide-react';

const navItems = [
  { id: 'home', label: '首页', icon: Home },
  { id: 'learn', label: '学习', icon: BookOpen },
  { id: 'review', label: '复习', icon: RotateCcw },
  { id: 'grammar', label: '语法', icon: BookText },
  { id: 'profile', label: '我的', icon: User },
];

export default function Navigation({ currentPage, onNavigate }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-100 px-2 py-2 shadow-lg z-50">
      <div className="max-w-md mx-auto flex justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center py-2 px-4 rounded-xl transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-br from-purple-400 to-pink-400 text-white scale-105'
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              <Icon size={22} className="mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export function Header({ title, showBack = false, onBack }) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-4 shadow-lg z-50">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {showBack && (
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        <h1 className="text-lg font-bold">{title}</h1>
        <div className="w-10" />
      </div>
    </header>
  );
}
