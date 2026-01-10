
import React from 'react';
import { User, Post } from '../types';
import { LeaderAnalytics } from '../App';

interface LeaderDashboardProps {
  leader: User;
  posts: Post[];
  analytics: LeaderAnalytics;
}

export const LeaderDashboard: React.FC<LeaderDashboardProps> = ({ leader, posts, analytics }) => {
  return (
    <div className="pb-24 bg-slate-50 dark:bg-slate-900 min-h-screen">
      <div className="spiritual-gradient pt-14 pb-20 px-8 text-white rounded-b-[3.5rem] shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex items-center gap-6 mb-10">
          <img src={leader.photoUrl} alt={leader.name} className="w-24 h-24 rounded-[2rem] border-4 border-white/20 object-cover shadow-2xl" />
          <div>
            <h2 className="text-2xl font-bold tracking-tight">{leader.name}</h2>
            <p className="text-blue-100/80 text-sm font-medium uppercase tracking-widest">{leader.faith} Guide</p>
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-5 text-center">
            <p className="text-xl font-bold mb-1">{analytics.totalFollowers}</p>
            <p className="text-[9px] font-black uppercase tracking-widest opacity-60">Seekers</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-5 text-center">
            <p className="text-xl font-bold mb-1">{analytics.totalPosts}</p>
            <p className="text-[9px] font-black uppercase tracking-widest opacity-60">Insights</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-5 text-center">
            <p className="text-xl font-bold mb-1">{analytics.totalBlessings}</p>
            <p className="text-[9px] font-black uppercase tracking-widest opacity-60">Blessings</p>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-10 relative z-20">
        {/* Detailed Analytics Grid */}
        <div className="grid grid-cols-2 gap-4 mb-10">
           <div className="bg-white dark:bg-slate-800 rounded-[2rem] p-6 shadow-xl border border-slate-50 dark:border-slate-700">
              <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Avg. Likes</h4>
              <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{analytics.avgLikesPerPost}</p>
              <p className="text-[8px] text-slate-400 mt-1 font-medium">Per sacred post</p>
           </div>
           <div className="bg-white dark:bg-slate-800 rounded-[2rem] p-6 shadow-xl border border-slate-50 dark:border-slate-700">
              <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Engagement</h4>
              <p className="text-2xl font-bold text-amber-500">{analytics.engagementRate}</p>
              <p className="text-[8px] text-slate-400 mt-1 font-medium">Soulful connection</p>
           </div>
        </div>

        {/* Reach Chart */}
        <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 shadow-xl mb-10 border border-slate-50 dark:border-slate-700">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            Spiritual Reach <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
          </h3>
          <div className="flex items-end justify-between h-32 gap-3 mb-4">
            {[45, 80, 50, 95, 60, 100, 75].map((h, i) => (
              <div key={i} className="flex-1 bg-indigo-50 dark:bg-slate-700 rounded-t-xl relative group">
                <div style={{ height: `${h}%` }} className="absolute bottom-0 left-0 right-0 bg-indigo-600 rounded-t-xl transition-all duration-1000 group-hover:bg-amber-400" />
              </div>
            ))}
          </div>
          <div className="flex justify-between text-[8px] font-black text-slate-400 uppercase tracking-widest">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 shadow-sm border border-slate-50 dark:border-slate-700 mb-10">
          <h3 className="text-lg font-bold mb-6">Recent Insights</h3>
          <div className="space-y-6">
            {posts.length > 0 ? (
              posts.slice(0, 3).map(post => (
                <div key={post.id} className="flex gap-4 items-start">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-slate-700 flex items-center justify-center text-2xl flex-shrink-0">📝</div>
                  <div className="flex-1 pt-1">
                    <p className="text-sm font-bold line-clamp-1 mb-1">{post.caption}</p>
                    <div className="flex gap-3">
                       <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{post.likes} Blessings</span>
                       <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{post.comments} Shared</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-slate-400 text-sm font-medium italic serif-font">Share your wisdom to begin the path.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
