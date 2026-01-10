
import React, { useState } from 'react';
import { Post, User } from '../types';

interface HomeProps {
  posts: Post[];
  followingIds: string[];
  leaders: User[];
  onOpenNotifications: () => void;
  onLikePost: (postId: string) => void;
}

export const Home: React.FC<HomeProps> = ({ posts, followingIds, onOpenNotifications, onLikePost }) => {
  const [tab, setTab] = useState<'explore' | 'following'>('explore');

  const filteredPosts = tab === 'explore' 
    ? posts 
    : posts.filter(p => followingIds.includes(p.leaderId));

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <header className="px-6 py-6 flex justify-between items-center sticky top-0 z-30 glass-nav border-b border-slate-100">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Faith<span className="text-indigo-600">Connect</span></h1>
        <button 
          onClick={onOpenNotifications}
          aria-label="View notifications"
          className="w-10 h-10 bg-white shadow-sm border border-slate-100 rounded-full flex items-center justify-center relative active:scale-90 transition-transform"
        >
          <span className="text-xl">🔔</span>
          <span className="absolute top-0 right-0 w-3 h-3 bg-indigo-500 border-2 border-white rounded-full"></span>
        </button>
      </header>

      <div className="pt-6 pb-24 px-6">
        {/* Daily Wisdom Hero - Accessible and Consistently Designed */}
        <div className="mb-10 p-8 spiritual-gradient rounded-[2.5rem] text-white shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Daily Reflection</span>
              <div className="h-[1px] w-4 bg-white/40" />
            </div>
            <p className="text-2xl font-medium serif-font italic leading-relaxed mb-4">
              "Let your light shine before others, so that they may see your good works."
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold opacity-70">Matthew 5:16</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation - Consistent Styling */}
        <div className="flex space-x-8 mb-8 border-b border-slate-200" role="tablist">
          <button
            role="tab"
            aria-selected={tab === 'explore'}
            onClick={() => setTab('explore')}
            className={`pb-4 text-sm font-bold transition-all relative ${
              tab === 'explore' ? 'text-indigo-600' : 'text-slate-400'
            }`}
          >
            Explore
            {tab === 'explore' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600 rounded-t-full" />}
          </button>
          <button
            role="tab"
            aria-selected={tab === 'following'}
            onClick={() => setTab('following')}
            className={`pb-4 text-sm font-bold transition-all relative ${
              tab === 'following' ? 'text-indigo-600' : 'text-slate-400'
            }`}
          >
            Following
            {tab === 'following' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600 rounded-t-full" />}
          </button>
        </div>

        {/* Content Feed - Standardized Cards */}
        <div className="space-y-10">
          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
              <article key={post.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100 group transition-all duration-300">
                <div className="flex items-center p-5">
                  <img src={post.leaderPhoto} alt={post.leaderName} className="w-12 h-12 rounded-2xl object-cover mr-4 shadow-sm" />
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900 text-sm">{post.leaderName}</h3>
                    <p className="text-[10px] text-indigo-500 font-bold uppercase tracking-wider">Spiritual Guide</p>
                  </div>
                </div>
                
                <div className="px-6 pb-4">
                  <p className="text-slate-600 text-sm leading-relaxed serif-font">"{post.caption}"</p>
                </div>

                {post.mediaUrl && (
                  <div className="px-3 pb-2">
                    <img src={post.mediaUrl} alt="Post content" className="w-full aspect-[4/5] object-cover rounded-[2rem]" />
                  </div>
                )}

                <div className="flex items-center justify-between px-6 py-5">
                  <div className="flex items-center gap-6">
                    <button 
                      onClick={() => onLikePost(post.id)}
                      className="flex items-center gap-2 group/btn active:scale-95 transition-transform" 
                      aria-label="Bless this post"
                    >
                      <span className="text-xl group-active/btn:scale-125 transition-transform">✨</span>
                      <span className="text-xs font-bold text-slate-500">{post.likes} Blessings</span>
                    </button>
                    <button className="flex items-center gap-2 active:scale-95 transition-transform" aria-label="Comment on this post">
                      <span className="text-xl">💬</span>
                      <span className="text-xs font-bold text-slate-500">{post.comments}</span>
                    </button>
                  </div>
                  <button className="text-lg text-slate-400 active:scale-90 transition-transform" aria-label="Share post">📤</button>
                </div>
              </article>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <span className="text-5xl mb-4 grayscale opacity-20" aria-hidden="true">📖</span>
              <p className="text-slate-400 font-medium serif-font italic leading-relaxed">
                Quietness is a gateway to peace.<br/>Discover guides to hear their words.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
