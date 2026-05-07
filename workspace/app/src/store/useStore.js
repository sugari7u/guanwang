import { useState, useEffect } from 'react';

const STORAGE_KEY = 'superkids_user';
const DEFAULT_USER = {
  id: 1,
  name: '小明',
  avatar: '👦',
  currentLevel: 2,
  points: 1250,
  streak: 7,
  completedWords: [],
  completedExercises: [],
  studyTime: 0,
  lastStudyDate: new Date().toISOString(),
};

export function useUserStore() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : DEFAULT_USER;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }, [user]);

  const updateUser = (updates) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  const addPoints = (points) => {
    setUser(prev => ({
      ...prev,
      points: prev.points + points,
      streak: calculateStreak(prev),
    }));
  };

  const addCompletedWord = (wordId) => {
    setUser(prev => {
      if (!prev.completedWords.includes(wordId)) {
        return {
          ...prev,
          completedWords: [...prev.completedWords, wordId],
        };
      }
      return prev;
    });
  };

  const addCompletedExercise = (exerciseId) => {
    setUser(prev => {
      if (!prev.completedExercises.includes(exerciseId)) {
        return {
          ...prev,
          completedExercises: [...prev.completedExercises, exerciseId],
          studyTime: prev.studyTime + 5,
          lastStudyDate: new Date().toISOString(),
        };
      }
      return prev;
    });
  };

  const calculateStreak = (prevUser) => {
    const today = new Date().toDateString();
    const lastDate = new Date(prevUser.lastStudyDate).toDateString();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();

    if (lastDate === today) return prevUser.streak;
    if (lastDate === yesterdayStr) return prevUser.streak + 1;
    return 1;
  };

  const setLevel = (level) => {
    setUser(prev => ({ ...prev, currentLevel: level }));
  };

  return {
    user,
    updateUser,
    addPoints,
    addCompletedWord,
    addCompletedExercise,
    setLevel,
  };
}
