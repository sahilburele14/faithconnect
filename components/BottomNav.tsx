
import React from 'react';
import { UserRole } from '../types';

interface BottomNavProps {
  role: UserRole;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ role, activeTab, onTabChange }) => {
  const worshiperTabs = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'discovery', label: 'Path', icon: '✨' },
    { id: 'reels', label: 'Grace', icon: '🎬' },
    { id: 'chats', label: 'Soul', icon: '💬' },
    { id: 'profile', label: 'Me', icon: '👤' },
  ];

  const leaderTabs = [
    { id: 'dashboard', label: 'Hub', icon: '🏠' },
    { id: 'create', label: 'Speak', icon: '➕' },
    { id: 'discovery', label: 'Path', icon: '✨' },
    { id: 'chats', label: 'Spirit', icon: '💬' },
    { id: 'profile', label: 'Me', icon: '👤' },
  ];

  const tabs = role === UserRole.WORSHIPER ? worshiperTabs : leaderTabs;

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto glass-nav border-t border-slate-100 dark:border-slate-800 flex justify-around items-center px-4 pt-3 pb-8 z-50">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex-1 flex flex-col items-center gap-1 transition-all duration-300 group ${
            activeTab === tab.id ? 'translate-y-[-4px]' : 'opacity-60 grayscale-[0.5]'
          }`}
        >
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xl transition-all ${
            activeTab === tab.id ? 'spiritual-gradient text-white shadow-lg' : 'group-hover:bg-slate-50 dark:group-hover:bg-slate-800'
          }`}>
            {tab.icon}
          </div>
          <span className={`text-[9px] font-black uppercase tracking-[0.15em] transition-all ${
            activeTab === tab.id ? 'text-indigo-600 scale-100' : 'text-slate-400 scale-90'
          }`}>
            {tab.label}
          </span>
        </button>
      ))}
    </nav>
  );
};
