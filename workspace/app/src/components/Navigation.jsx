import { Home, BookOpen, RotateCcw, BookText, User, Trophy, Users, ArrowLeft } from 'lucide-react';

const navItems = [
  { id: 'home', label: '首页', icon: Home },
  { id: 'learn', label: '学习', icon: BookOpen },
  { id: 'review', label: '复习', icon: RotateCcw },
  { id: 'grammar', label: '语法', icon: BookText },
  { id: 'profile', label: '我的', icon: User },
];

export default function Navigation({ currentPage, onNavigate }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200/50 px-3 py-3 shadow-xl z-50">
      <div className="max-w-md mx-auto flex justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center py-2 px-5 rounded-2xl transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg scale-110'
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              <Icon size={24} className="mb-1" />
              <span className="text-xs font-bold">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export function Header({ title, showBack = false, onBack, subtitle }) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white px-4 py-4 shadow-2xl z-50">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {showBack ? (
          <button
            onClick={onBack}
            className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-all duration-300 active:scale-95"
          >
            <ArrowLeft size={24} />
          </button>
        ) : (
          <div className="w-10" />
        )}
        <div className="flex-1 text-center">
          <h1 className="text-xl font-bold">{title}</h1>
          {subtitle && <p className="text-xs opacity-80 mt-1">{subtitle}</p>}
        </div>
        <div className="w-10" />
      </div>
    </header>
  );
}
