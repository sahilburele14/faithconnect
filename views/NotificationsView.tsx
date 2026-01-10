
import React from 'react';
import { Notification } from '../types';

interface NotificationsViewProps {
  notifications: Notification[];
  onBack: () => void;
}

export const NotificationsView: React.FC<NotificationsViewProps> = ({ notifications, onBack }) => {
  return (
    <div className="pt-6 pb-20 px-5">
      <header className="flex items-center mb-8">
        <button onClick={onBack} className="mr-4 text-2xl">←</button>
        <h2 className="text-2xl font-bold text-slate-800">Activity</h2>
      </header>

      <div className="space-y-4">
        {notifications.length > 0 ? (
          notifications.map(n => (
            <div key={n.id} className="flex gap-4 items-start p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
              <div className={`p-3 rounded-xl ${
                n.type === 'follow' ? 'bg-blue-50 text-blue-600' :
                n.type === 'message' ? 'bg-green-50 text-green-600' :
                'bg-amber-50 text-amber-600'
              }`}>
                {n.type === 'follow' ? '👤' : n.type === 'message' ? '💬' : '✨'}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-0.5">
                  <h4 className="font-bold text-sm text-slate-800">{n.title}</h4>
                  <span className="text-[10px] text-slate-400 font-medium">Just now</span>
                </div>
                <p className="text-xs text-slate-500 leading-snug">{n.message}</p>
              </div>
              {!n.read && <div className="w-2 h-2 bg-blue-600 rounded-full self-center" />}
            </div>
          ))
        ) : (
          <div className="text-center py-20 opacity-30">
            <span className="text-5xl block mb-4">🔔</span>
            <p className="text-slate-500 italic">No activity yet. Your journey is beginning.</p>
          </div>
        )}
      </div>
    </div>
  );
};
