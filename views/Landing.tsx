
import React from 'react';
import { UserRole } from '../types';

interface LandingProps {
  onSelectRole: (role: UserRole) => void;
}

export const Landing: React.FC<LandingProps> = ({ onSelectRole }) => {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen px-8 py-16 bg-[#FDFCFB]">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="relative mb-10 animate-float">
          <div className="w-24 h-24 spiritual-gradient rounded-3xl flex items-center justify-center shadow-2xl rotate-3">
            <span className="text-5xl -rotate-3">🕊️</span>
          </div>
          <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
            <span className="text-lg">✨</span>
          </div>
        </div>
        
        <h1 className="text-5xl font-bold text-slate-900 mb-4 tracking-tight">
          Faith<span className="text-indigo-600">Connect</span>
        </h1>
        <p className="text-slate-500 max-w-[280px] mx-auto text-lg leading-relaxed serif-font italic">
          "A sacred space where faith meets community and leadership."
        </p>
      </div>

      <div className="w-full space-y-4 max-w-sm">
        <button
          onClick={() => onSelectRole(UserRole.WORSHIPER)}
          className="w-full py-5 px-6 bg-slate-900 text-white rounded-[2rem] font-bold shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-3"
        >
          <span>Seeker of Faith</span>
          <span className="text-xl">🙏</span>
        </button>
        <button
          onClick={() => onSelectRole(UserRole.LEADER)}
          className="w-full py-5 px-6 bg-white border-2 border-slate-100 text-slate-700 rounded-[2rem] font-bold shadow-sm active:scale-[0.98] transition-all flex items-center justify-center gap-3"
        >
          <span>Spiritual Leader</span>
          <span className="text-xl">📜</span>
        </button>
        
        <div className="pt-8 text-center">
          <p className="text-slate-400 text-xs font-medium uppercase tracking-[0.2em]">
            Harmonizing Technology & Spirit
          </p>
        </div>
      </div>
    </div>
  );
};
