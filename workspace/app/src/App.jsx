import { useState, useCallback } from 'react';
import Navigation from './components/Navigation';
import HomePage, { LevelSelectModal } from './pages/HomePage';
import LearnPage from './pages/LearnPage';
import ReviewPage from './pages/ReviewPage';
import GrammarPage from './pages/GrammarPage';
import ProfilePage from './pages/ProfilePage';
import { useUserStore } from './store/useStore';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [learnMode, setLearnMode] = useState('words');
  const [showLevelModal, setShowLevelModal] = useState(false);
  const { user, addPoints, addCompletedWord, setLevel } = useUserStore();

  const handleNavigate = useCallback((page, params = {}) => {
    setCurrentPage(page);
    if (params.mode) {
      setLearnMode(params.mode);
    }
  }, []);

  const handleSelectLevel = useCallback((level) => {
    setLevel(level);
  }, [setLevel]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage 
            user={user} 
            onNavigate={handleNavigate} 
            onSelectLevel={() => setShowLevelModal(true)}
          />
        );
      case 'learn':
        return (
          <LearnPage 
            user={user} 
            mode={learnMode} 
            addPoints={addPoints}
            addCompletedWord={addCompletedWord}
          />
        );
      case 'review':
        return (
          <ReviewPage 
            user={user} 
            addPoints={addPoints}
            addCompletedWord={addCompletedWord}
          />
        );
      case 'grammar':
        return <GrammarPage user={user} />;
      case 'profile':
        return <ProfilePage user={user} onNavigate={handleNavigate} />;
      default:
        return (
          <HomePage 
            user={user} 
            onNavigate={handleNavigate} 
            onSelectLevel={() => setShowLevelModal(true)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {renderPage()}
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
      
      {showLevelModal && (
        <LevelSelectModal 
          onSelect={handleSelectLevel} 
          onClose={() => setShowLevelModal(false)} 
        />
      )}
    </div>
  );
}

export default App;
