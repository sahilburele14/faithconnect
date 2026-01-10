
import React, { useState } from 'react';
import { User, FaithEvent, PrayerRequest } from '../types';

interface DiscoveryProps {
  leaders: User[];
  events: FaithEvent[];
  prayers: PrayerRequest[];
  followingIds: string[];
  onToggleFollow: (id: string) => void;
  onOpenProfile: (id: string) => void;
  onAddPrayer: (text: string) => void;
  onPrayerAction: (prayerId: string) => void;
}

export const Discovery: React.FC<DiscoveryProps> = ({ leaders, events, prayers, followingIds, onToggleFollow, onOpenProfile, onAddPrayer, onPrayerAction }) => {
  const [tab, setTab] = useState<'guides' | 'prayers' | 'events'>('guides');
  const [prayerText, setPrayerText] = useState('');

  return (
    <div className="pt-8 pb-24 px-6">
      <h2 className="text-3xl font-bold mb-2 tracking-tight">Discovery</h2>
      <p className="text-slate-400 text-sm serif-font italic mb-10">"A community of light, prayer, and gathering."</p>

      <div className="flex p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-10 backdrop-blur-sm">
        <button
          onClick={() => setTab('guides')}
          className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
            tab === 'guides' ? 'bg-white dark:bg-indigo-600 shadow-sm text-indigo-600 dark:text-white' : 'text-slate-500'
          }`}
        >
          Guides
        </button>
        <button
          onClick={() => setTab('prayers')}
          className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
            tab === 'prayers' ? 'bg-white dark:bg-indigo-600 shadow-sm text-indigo-600 dark:text-white' : 'text-slate-500'
          }`}
        >
          Wall
        </button>
        <button
          onClick={() => setTab('events')}
          className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
            tab === 'events' ? 'bg-white dark:bg-indigo-600 shadow-sm text-indigo-600 dark:text-white' : 'text-slate-500'
          }`}
        >
          Events
        </button>
      </div>

      <div className="space-y-6">
        {tab === 'guides' && leaders.map(leader => (
          <div 
            key={leader.id} 
            onClick={() => onOpenProfile(leader.id)}
            className="bg-white dark:bg-slate-800 p-5 rounded-[2.5rem] flex items-center shadow-sm border border-slate-100 dark:border-slate-700 active:scale-[0.98] transition-all"
          >
            <img src={leader.photoUrl} alt="" className="w-16 h-16 rounded-[1.5rem] object-cover mr-4 shadow-md" />
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-slate-900 dark:text-white truncate">{leader.name}</h3>
              <p className="text-[10px] text-amber-500 font-black uppercase tracking-widest mb-1">{leader.faith}</p>
              <p className="text-xs text-slate-400 line-clamp-1 italic">"{leader.bio}"</p>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); onToggleFollow(leader.id); }}
              className={`ml-4 w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                followingIds.includes(leader.id) ? 'bg-slate-100 text-indigo-600' : 'bg-indigo-600 text-white shadow-lg shadow-indigo-100'
              }`}
            >
              <span className="text-lg font-bold">{followingIds.includes(leader.id) ? '✓' : '+'}</span>
            </button>
          </div>
        ))}

        {tab === 'prayers' && (
          <div className="space-y-8">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-700">
              <textarea 
                value={prayerText}
                onChange={(e) => setPrayerText(e.target.value)}
                placeholder="Submit your heart's petition..."
                className="w-full bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl text-sm focus:outline-none mb-4 resize-none h-24"
              />
              <button 
                onClick={() => { if(prayerText) { onAddPrayer(prayerText); setPrayerText(''); } }}
                className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold text-xs uppercase tracking-widest active:scale-95 transition-transform"
              >
                Post to Prayer Wall
              </button>
            </div>
            <div className="space-y-4">
              {prayers.map(p => (
                <div key={p.id} className="bg-white dark:bg-slate-800 p-6 rounded-[2.2rem] shadow-sm border border-slate-100 dark:border-slate-700 transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <img src={p.userPhoto} alt="" className="w-8 h-8 rounded-full" />
                    <p className="text-xs font-bold">{p.userName}</p>
                    <span className="text-[9px] text-slate-400 ml-auto uppercase font-black">2h ago</span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 italic mb-4 leading-relaxed">"{p.content}"</p>
                  <button 
                    onClick={() => onPrayerAction(p.id)}
                    className="flex items-center gap-2 group"
                  >
                    <span className="text-xl group-active:scale-150 transition-transform">🙏</span>
                    <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">{p.prayersCount} People Praying</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'events' && events.map(event => (
          <div key={event.id} className="bg-white dark:bg-slate-800 rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100 dark:border-slate-700">
            <img src={event.bannerUrl} alt="" className="w-full h-40 object-cover" />
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg leading-tight">{event.title}</h3>
                <span className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-[8px] px-2 py-1 rounded-full font-black uppercase tracking-widest">
                  {event.type}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-bold mb-4 uppercase tracking-widest">
                📅 {new Date(event.date).toLocaleDateString()} • {event.location}
              </p>
              <div className="flex items-center justify-between">
                <p className="text-[10px] text-indigo-500 font-bold uppercase tracking-widest">
                  {event.attendeesCount} Joined
                </p>
                <button className="bg-slate-900 dark:bg-white dark:text-slate-900 text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all">
                  RSVP Path
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
