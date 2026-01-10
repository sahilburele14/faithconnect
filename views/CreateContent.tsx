
import React, { useState } from 'react';
import { Post, Reel } from '../types';

interface CreateContentProps {
  onAddPost: (post: Partial<Post>) => void;
  onAddReel: (reel: Partial<Reel>) => void;
}

export const CreateContent: React.FC<CreateContentProps> = ({ onAddPost, onAddReel }) => {
  const [type, setType] = useState<'post' | 'reel'>('post');
  const [caption, setCaption] = useState('');

  const handlePost = () => {
    if (type === 'post') {
      onAddPost({ caption, mediaType: 'image' });
    } else {
      onAddReel({ caption });
    }
    setCaption('');
  };

  return (
    <div className="px-8 pt-12 pb-24 bg-[#F8FAFC] dark:bg-slate-900 min-h-screen">
      <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">Share Your Word</h2>
      <p className="text-slate-400 text-sm serif-font italic mb-10">"Speak light into the community."</p>

      <div className="flex p-1.5 bg-slate-200/50 dark:bg-slate-800 rounded-2xl mb-10 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700">
        <button
          onClick={() => setType('post')}
          className={`flex-1 py-3.5 rounded-[0.9rem] text-xs font-black uppercase tracking-widest transition-all ${
            type === 'post' ? 'bg-white dark:bg-indigo-600 shadow-sm text-indigo-600 dark:text-white' : 'text-slate-500'
          }`}
        >
          Spiritual Post
        </button>
        <button
          onClick={() => setType('reel')}
          className={`flex-1 py-3.5 rounded-[0.9rem] text-xs font-black uppercase tracking-widest transition-all ${
            type === 'reel' ? 'bg-white dark:bg-indigo-600 shadow-sm text-indigo-600 dark:text-white' : 'text-slate-500'
          }`}
        >
          Spiritual Reel
        </button>
      </div>

      <div 
        className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-10 border-2 border-dashed border-slate-200 dark:border-slate-700 text-center mb-10 hover:border-indigo-400 transition-colors cursor-pointer group shadow-sm active:scale-[0.98] transition-all"
        role="button"
        aria-label="Upload media"
      >
        <span className="text-5xl block mb-4 group-hover:scale-110 transition-transform" aria-hidden="true">📸</span>
        <p className="text-slate-600 dark:text-slate-300 font-bold mb-1">Add {type === 'post' ? 'Visual' : 'Sacred Moment'}</p>
        <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Tap to select from library</p>
      </div>

      <div className="space-y-8">
        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">Insight Message</label>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full px-8 py-6 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-[2rem] shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 h-48 text-slate-700 dark:text-slate-200 leading-relaxed serif-font italic text-lg"
            placeholder={type === 'post' ? "What spiritual wisdom would you like to share today?" : "Write an inspirational caption for your short video..."}
          />
        </div>

        <button
          onClick={handlePost}
          className="w-full py-5 bg-indigo-600 text-white rounded-[1.5rem] font-bold shadow-xl shadow-indigo-100 active:scale-[0.98] transition-all"
        >
          Publish to Community
        </button>
      </div>
    </div>
  );
};
