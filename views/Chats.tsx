
import React, { useState } from 'react';
import { Message, User, UserRole } from '../types';

interface ChatsProps {
  messages: Message[];
  currentUser: User;
  db: any;
  onSendMessage: (receiverId: string, text: string) => void;
}

export const Chats: React.FC<ChatsProps> = ({ messages, currentUser, db, onSendMessage }) => {
  const [selectedContact, setSelectedContact] = useState<User | null>(null);
  const [inputText, setInputText] = useState('');

  // FILTERING LOGIC:
  // Worshipers: Only show leaders they follow.
  // Leaders: Show worshipers who have sent them messages or are connected.
  const contacts = currentUser.role === UserRole.WORSHIPER
    ? db.leaders.filter((l: User) => db.following.includes(l.id))
    : db.worshipers.filter((w: User) => 
        messages.some(m => m.senderId === w.id || m.receiverId === w.id)
      );

  const handleSend = () => {
    if (inputText.trim() && selectedContact) {
      onSendMessage(selectedContact.id, inputText);
      setInputText('');
    }
  };

  const activeMessages = messages.filter(m => 
    (m.senderId === currentUser.id && m.receiverId === selectedContact?.id) ||
    (m.senderId === selectedContact?.id && m.receiverId === currentUser.id)
  ).sort((a, b) => a.timestamp - b.timestamp);

  if (selectedContact) {
    return (
      <div className="flex flex-col h-full bg-[#FDFCFB] dark:bg-slate-900">
        <header className="px-6 py-6 bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700 flex items-center sticky top-0 z-30 glass-nav">
          <button 
            onClick={() => setSelectedContact(null)} 
            className="mr-5 w-10 h-10 bg-slate-50 dark:bg-slate-700 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300"
          >
            ←
          </button>
          <img src={selectedContact.photoUrl} alt="" className="w-12 h-12 rounded-2xl object-cover mr-4 shadow-sm" />
          <div className="flex-1">
            <h3 className="font-bold text-slate-900 dark:text-white leading-tight">{selectedContact.name}</h3>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
              <p className="text-[9px] text-indigo-500 font-black uppercase tracking-widest">In Spirit</p>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeMessages.map(m => (
            <div key={m.id} className={`flex ${m.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] px-5 py-3.5 shadow-sm text-sm leading-relaxed ${
                m.senderId === currentUser.id 
                  ? 'bg-indigo-600 text-white rounded-[1.8rem] rounded-tr-none shadow-indigo-100' 
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-[1.8rem] rounded-tl-none border border-slate-100 dark:border-slate-700'
              }`}>
                {m.text}
                <div className={`text-[9px] mt-2 font-bold opacity-60 uppercase tracking-widest ${m.senderId === currentUser.id ? 'text-right' : 'text-left'}`}>
                  {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          {activeMessages.length === 0 && (
            <div className="text-center py-32 opacity-30">
              <span className="text-5xl block mb-6 grayscale">✨</span>
              <p className="font-medium serif-font italic dark:text-slate-400">Begin a dialogue of growth and light.</p>
            </div>
          )}
        </div>

        <div className="p-6 bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700 flex items-center gap-4 pb-10">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Share your thoughts..."
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 px-6 py-4 bg-slate-50 dark:bg-slate-900 rounded-[1.8rem] border border-slate-100 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all dark:text-white"
          />
          <button 
            onClick={handleSend}
            className="w-14 h-14 bg-indigo-600 text-white rounded-[1.5rem] flex items-center justify-center shadow-xl shadow-indigo-100 active:scale-90 transition-transform"
          >
            ➡️
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-8 pb-24 px-6 bg-slate-50 dark:bg-slate-900 min-h-screen">
      <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">Conversations</h2>
      <p className="text-slate-400 text-sm serif-font italic mb-8">"Connect with guides on your journey."</p>
      
      {contacts.length > 0 ? (
        <div className="space-y-4">
          {contacts.map((contact: User) => (
            <button
              key={contact.id}
              onClick={() => setSelectedContact(contact)}
              className="w-full bg-white dark:bg-slate-800 p-5 rounded-[2.2rem] flex items-center shadow-sm border border-slate-100 dark:border-slate-700 active:scale-[0.98] transition-all"
            >
              <div className="relative mr-5 flex-shrink-0">
                <img src={contact.photoUrl} alt="" className="w-16 h-16 rounded-[1.5rem] object-cover shadow-md border border-slate-50 dark:border-slate-600" />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-indigo-500 rounded-full border-2 border-white dark:border-slate-800" />
              </div>
              <div className="flex-1 text-left min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-bold text-slate-900 dark:text-white text-base truncate pr-2">{contact.name}</h3>
                  <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest">Active</span>
                </div>
                <p className="text-xs text-slate-400 font-medium truncate italic leading-snug">
                  {/* Fixed findLast issue for compatibility: cloning and reversing the array to find the last occurrence */}
                  {[...messages].reverse().find(m => m.senderId === contact.id || m.receiverId === contact.id)?.text || "Start a sacred conversation..."}
                </p>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="text-center py-32">
          <div className="w-24 h-24 bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-xl flex items-center justify-center text-4xl mx-auto mb-8 animate-float">💬</div>
          <p className="text-slate-500 dark:text-slate-400 font-bold tracking-tight mb-2">Soulful Silence</p>
          <p className="text-xs text-slate-400 serif-font italic">
            {currentUser.role === UserRole.WORSHIPER 
              ? "Follow a guide to begin your first sacred dialogue." 
              : "Wait for seekers to join your path."}
          </p>
        </div>
      )}
    </div>
  );
};
