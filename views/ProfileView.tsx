
import React, { useState } from 'react';
import { User, FaithType, Post, Reel } from '../types';

interface ProfileViewProps {
  user: User;
  onUpdate: (user: User) => void;
  onLogout: () => void;
  posts: Post[];
  reels: Reel[];
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ user, onUpdate, onLogout, posts, reels, toggleDarkMode, isDarkMode }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio || '');
  const [faith, setFaith] = useState(user.faith);
  const [tab, setTab] = useState<'posts' | 'reels'>('posts');

  const handleSave = () => {
    onUpdate({ ...user, name, bio, faith });
    setIsEditing(false);
  };

  return (
    <div className="pb-24 bg-slate-50 dark:bg-slate-900 min-h-screen">
      <div className="relative h-56 bg-slate-200 overflow-hidden">
        <img src={user.coverPhotoUrl || 'https://images.unsplash.com/photo-1519810755548-39cd217da494?w=800&h=400&fit=crop'} alt="" className="w-full h-full object-cover opacity-90" />
        <div className="absolute top-12 right-6 flex gap-3 z-30">
          <button onClick={toggleDarkMode} className="w-11 h-11 bg-white/20 backdrop-blur-xl text-white rounded-2xl flex items-center justify-center text-xl shadow-lg border border-white/30 active:scale-95 transition-all">
            {isDarkMode ? '🌞' : '🌙'}
          </button>
          <button onClick={() => setIsEditing(!isEditing)} className="w-11 h-11 bg-white/20 backdrop-blur-xl text-white rounded-2xl flex items-center justify-center text-xl shadow-lg border border-white/30 active:scale-95 transition-all">
            {isEditing ? '✕' : '⚙️'}
          </button>
          <button onClick={onLogout} className="w-11 h-11 bg-white/20 backdrop-blur-xl text-white rounded-2xl flex items-center justify-center text-xl shadow-lg border border-white/30 active:scale-95 transition-all">
            🚪
          </button>
        </div>
      </div>

      <div className="px-6 -mt-16 relative z-10">
        <img src={user.photoUrl} alt={user.name} className="w-32 h-32 rounded-[2.5rem] border-4 border-white dark:border-slate-800 shadow-2xl object-cover mb-6" />

        {isEditing ? (
          <div className="space-y-6 bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-700 mb-10">
            <h3 className="text-xl font-bold border-b border-slate-50 dark:border-slate-700 pb-4 mb-2">Edit Sacred Profile</h3>
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 px-1">Display Name</label>
              <input value={name} onChange={e => setName(e.target.value)} className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-[1.5rem] focus:outline-none" />
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 px-1">Language Path</label>
              <select className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-[1.5rem] focus:outline-none">
                <option value="en">English (Sacred)</option>
                <option value="es">Español (Sagrado)</option>
              </select>
            </div>
            <button onClick={handleSave} className="w-full py-5 bg-indigo-600 text-white rounded-[1.5rem] font-bold shadow-xl active:scale-[0.98] transition-all">Save Changes</button>
          </div>
        ) : (
          <div className="mb-10">
            <h2 className="text-3xl font-bold leading-tight mb-2">{user.name}</h2>
            <span className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-[10px] px-4 py-1.5 rounded-full font-black uppercase tracking-[0.15em] border border-indigo-100 dark:border-indigo-800/50">
              {user.faith} Seeker
            </span>
            <p className="text-sm text-slate-500 mt-5 leading-relaxed font-medium serif-font italic">"{user.bio || "Walking in light, seeking wisdom."}"</p>
          </div>
        )}

        <div className="flex gap-10 border-b border-slate-200 dark:border-slate-700 mb-8">
          <button onClick={() => setTab('posts')} className={`pb-4 text-sm font-bold transition-all relative ${tab === 'posts' ? 'text-indigo-600' : 'text-slate-400'}`}>Insights ({posts.length})</button>
          <button onClick={() => setTab('reels')} className={`pb-4 text-sm font-bold transition-all relative ${tab === 'reels' ? 'text-indigo-600' : 'text-slate-400'}`}>Moments ({reels.length})</button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {tab === 'posts' ? posts.map(p => (
            <div key={p.id} className="aspect-square bg-slate-100 dark:bg-slate-800 rounded-[1.8rem] overflow-hidden shadow-sm">
              <img src={p.mediaUrl} alt="" className="w-full h-full object-cover" />
            </div>
          )) : reels.map(r => (
            <div key={r.id} className="aspect-[9/16] bg-slate-900 rounded-[1.8rem] overflow-hidden relative">
              <video src={r.videoUrl} className="w-full h-full object-cover opacity-70" />
              <div className="absolute inset-0 flex items-center justify-center text-white text-4xl opacity-50">▶️</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
