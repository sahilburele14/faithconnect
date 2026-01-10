
import React, { useState } from 'react';
import { User, Post, Reel } from '../types';

interface LeaderProfileViewProps {
  leader: User | undefined;
  isFollowing: boolean;
  onToggleFollow: () => void;
  onMessage: () => void;
  onBack: () => void;
  posts: Post[];
  reels: Reel[];
}

export const LeaderProfileView: React.FC<LeaderProfileViewProps> = ({ leader, isFollowing, onToggleFollow, onMessage, onBack, posts, reels }) => {
  const [tab, setTab] = useState<'posts' | 'reels'>('posts');

  if (!leader) return null;

  return (
    <div className="pb-24 bg-slate-50 min-h-screen">
      <div className="relative h-64">
        <button 
          onClick={onBack} 
          className="absolute top-12 left-6 z-30 w-11 h-11 glass-nav text-slate-800 rounded-full flex items-center justify-center text-2xl shadow-lg border border-white/50"
        >
          ←
        </button>
        <img src={leader.coverPhotoUrl || `https://images.unsplash.com/photo-1519810755548-39cd217da494?w=800&h=400&fit=crop`} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-black/20" />
      </div>

      <div className="px-6 -mt-16 relative z-10">
        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <img src={leader.photoUrl} alt="" className="w-32 h-32 rounded-[2.5rem] border-4 border-white shadow-2xl object-cover mb-4" />
            <div className="absolute bottom-6 right-0 w-8 h-8 bg-amber-400 rounded-full border-2 border-white flex items-center justify-center shadow-lg">
              <span className="text-xs">✨</span>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-1">{leader.name}</h2>
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-indigo-50 text-indigo-600 text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-widest border border-indigo-100">
              {leader.faith} Guide
            </span>
          </div>
        </div>

        <div className="flex gap-3 mb-8">
          <button 
            onClick={onToggleFollow}
            className={`flex-1 py-4 rounded-3xl text-sm font-bold shadow-xl transition-all active:scale-95 ${
              isFollowing 
                ? 'bg-white text-indigo-600 border-2 border-indigo-50' 
                : 'bg-indigo-600 text-white shadow-indigo-100'
            }`}
          >
            {isFollowing ? 'Guided by them' : 'Follow Path'}
          </button>
          <button 
            onClick={onMessage}
            className="w-14 h-14 bg-white text-indigo-600 border-2 border-indigo-50 rounded-3xl flex items-center justify-center text-2xl shadow-sm active:scale-95 transition-all"
          >
            💬
          </button>
        </div>

        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 mb-10">
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Spiritual Bio</h4>
          <p className="text-sm text-slate-600 leading-relaxed serif-font italic font-medium">"{leader.bio || "Growing in grace and wisdom every day. Welcome to our sacred community."}"</p>
        </div>

        <div className="flex gap-8 border-b border-slate-200 mb-8">
          <button 
            onClick={() => setTab('posts')}
            className={`pb-4 text-sm font-bold transition-all relative ${tab === 'posts' ? 'text-indigo-600' : 'text-slate-400'}`}
          >
            Insights ({posts.length})
            {tab === 'posts' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600 rounded-t-full" />}
          </button>
          <button 
            onClick={() => setTab('reels')}
            className={`pb-4 text-sm font-bold transition-all relative ${tab === 'reels' ? 'text-indigo-600' : 'text-slate-400'}`}
          >
            Moments ({reels.length})
            {tab === 'reels' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600 rounded-t-full" />}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {tab === 'posts' ? (
            posts.map(p => (
              <div key={p.id} className="aspect-[4/5] bg-slate-200 rounded-[1.5rem] overflow-hidden relative shadow-sm hover:scale-[1.02] transition-transform">
                <img src={p.mediaUrl} alt="" className="w-full h-full object-cover" />
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white text-[9px] font-black bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-md">
                  ✨ {p.likes}
                </div>
              </div>
            ))
          ) : (
            reels.map(r => (
              <div key={r.id} className="aspect-[9/16] bg-slate-200 rounded-[1.5rem] overflow-hidden relative shadow-sm hover:scale-[1.02] transition-transform">
                <video src={r.videoUrl} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <span className="text-white text-4xl opacity-50">▶️</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
