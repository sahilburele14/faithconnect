
import React, { useState } from 'react';
import { User } from '../types';

interface LeadersProps {
  leaders: User[];
  followingIds: string[];
  onToggleFollow: (id: string) => void;
  onOpenProfile: (id: string) => void;
}

export const Leaders: React.FC<LeadersProps> = ({ leaders, followingIds, onToggleFollow, onOpenProfile }) => {
  const [tab, setTab] = useState<'explore' | 'my'>('explore');

  const list = tab === 'explore' ? leaders : leaders.filter(l => followingIds.includes(l.id));

  return (
    <div className="pt-8 pb-24 px-6 bg-[#F8FAFC] min-h-screen">
      <h2 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">Spiritual Guides</h2>
      <p className="text-slate-400 text-sm serif-font italic mb-10">"Connecting souls across all paths of faith."</p>

      <div className="flex p-1.5 bg-slate-200/50 rounded-2xl mb-10 backdrop-blur-sm border border-slate-200/50">
        <button
          onClick={() => setTab('explore')}
          className={`flex-1 py-3.5 rounded-[0.9rem] text-xs font-black uppercase tracking-widest transition-all ${
            tab === 'explore' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'
          }`}
        >
          Discover
        </button>
        <button
          onClick={() => setTab('my')}
          className={`flex-1 py-3.5 rounded-[0.9rem] text-xs font-black uppercase tracking-widest transition-all ${
            tab === 'my' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'
          }`}
        >
          My Path
        </button>
      </div>

      <div className="space-y-6">
        {list.map(leader => (
          <div 
            key={leader.id} 
            onClick={() => onOpenProfile(leader.id)}
            className="bg-white p-6 rounded-[2.5rem] flex items-center shadow-sm border border-slate-100 active:scale-[0.98] transition-all cursor-pointer group"
          >
            <div className="relative mr-5 flex-shrink-0">
              <img 
                src={leader.photoUrl} 
                alt={leader.name} 
                className="w-20 h-20 rounded-[1.8rem] object-cover shadow-md border-2 border-white group-hover:border-indigo-100 transition-all" 
              />
              <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-amber-400 rounded-full flex items-center justify-center text-[11px] shadow-sm border-2 border-white">
                ✨
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <h3 className="font-bold text-slate-900 text-base truncate pr-2 group-hover:text-indigo-600 transition-colors">{leader.name}</h3>
              </div>
              <div className="inline-flex items-center bg-amber-50 text-amber-700 text-[9px] px-2.5 py-1 rounded-full font-black uppercase tracking-widest border border-amber-100 mb-3">
                {leader.faith}
              </div>
              <p className="text-xs text-slate-400 line-clamp-2 serif-font italic leading-snug">"{leader.bio || 'Sharing peace and purpose.'}"</p>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFollow(leader.id);
              }}
              aria-label={followingIds.includes(leader.id) ? `Unfollow ${leader.name}` : `Follow ${leader.name}`}
              className={`ml-4 w-12 h-12 rounded-[1.2rem] flex items-center justify-center transition-all ${
                followingIds.includes(leader.id)
                  ? 'bg-slate-100 text-indigo-600'
                  : 'bg-indigo-600 text-white shadow-xl shadow-indigo-100 active:bg-indigo-700'
              }`}
            >
              <span className="text-xl font-bold">{followingIds.includes(leader.id) ? '✓' : '+'}</span>
            </button>
          </div>
        ))}
        {list.length === 0 && (
          <div className="text-center py-24">
            <div className="w-24 h-24 bg-white rounded-[2.5rem] shadow-xl flex items-center justify-center text-4xl mx-auto mb-8 grayscale opacity-20">🕊️</div>
            <p className="text-slate-400 font-medium serif-font italic leading-relaxed">No guides found on this path.<br/>Try exploring new spiritual horizons.</p>
          </div>
        )}
      </div>
    </div>
  );
};
