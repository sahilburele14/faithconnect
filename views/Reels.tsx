
import React from 'react';
import { Reel } from '../types';

interface ReelsProps {
  reels: Reel[];
}

export const Reels: React.FC<ReelsProps> = ({ reels }) => {
  return (
    <div className="reels-container hide-scrollbar bg-black">
      {reels.map(reel => (
        <div key={reel.id} className="reel-item relative flex flex-col justify-end">
          <video
            src={reel.videoUrl}
            className="absolute inset-0 w-full h-full object-cover opacity-90"
            autoPlay
            loop
            muted
            playsInline
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30" />

          <div className="relative p-8 text-white flex justify-between items-end mb-10 pb-20">
            <div className="flex-1 pr-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-[1.2rem] border-2 border-white/40 overflow-hidden shadow-2xl">
                  <img src={`https://picsum.photos/100/100?u=${reel.leaderId}`} alt="" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-base shadow-sm leading-tight">@{reel.leaderName.replace(/\s/g, '').toLowerCase()}</h4>
                  <div className="flex items-center gap-1.5 opacity-80">
                    <div className="w-1 h-1 bg-amber-400 rounded-full" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Divine Word</span>
                  </div>
                </div>
              </div>
              <p className="text-base leading-relaxed drop-shadow-lg font-medium serif-font italic opacity-95">"{reel.caption}"</p>
            </div>

            <div className="flex flex-col items-center gap-8">
              <div className="flex flex-col items-center">
                <button className="w-14 h-14 bg-white/10 backdrop-blur-xl border border-white/10 rounded-full mb-1 flex items-center justify-center group active:scale-90 transition-all">
                  <span className="text-2xl group-active:scale-125">✨</span>
                </button>
                <span className="text-[10px] font-black uppercase tracking-widest shadow-sm">{reel.likes}</span>
              </div>
              <div className="flex flex-col items-center">
                <button className="w-14 h-14 bg-white/10 backdrop-blur-xl border border-white/10 rounded-full mb-1 flex items-center justify-center">
                  <span className="text-2xl">💬</span>
                </button>
                <span className="text-[10px] font-black uppercase tracking-widest shadow-sm">{reel.comments}</span>
              </div>
              <button className="w-14 h-14 bg-white/10 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center">
                <span className="text-2xl">📤</span>
              </button>
            </div>
          </div>
        </div>
      ))}
      {reels.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-white bg-slate-900 px-10 text-center">
          <span className="text-6xl mb-8">🎬</span>
          <p className="text-xl font-bold mb-2">Ethereal Silence</p>
          <p className="text-sm opacity-60 serif-font italic leading-relaxed">No sacred moments have been shared yet. Check back soon for words of grace.</p>
        </div>
      )}
    </div>
  );
};
