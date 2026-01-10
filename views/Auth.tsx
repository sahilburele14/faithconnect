
import React, { useState } from 'react';
import { User, UserRole, FaithType } from '../types';

interface AuthProps {
  role: UserRole;
  onAuthSuccess: (user: User, isNewUser: boolean) => void;
  db: { users: User[] };
}

export const Auth: React.FC<AuthProps> = ({ role, onAuthSuccess, db }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      // Mock Login Logic
      const user = db.users.find(u => u.email === email && u.password === password);
      if (user) {
        onAuthSuccess(user, false);
      } else {
        setError('Invalid email or password connection.');
      }
    } else {
      // Mock Signup Logic
      const exists = db.users.find(u => u.email === email);
      if (exists) {
        setError('This email already has a spiritual path registered.');
      } else {
        const newUser: User = {
          id: Math.random().toString(36).substr(2, 9),
          name: name || 'Seeker',
          email,
          password,
          role,
          faith: FaithType.OTHER,
          photoUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
          settings: { darkMode: false, language: 'en' }
        };
        onAuthSuccess(newUser, true);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen px-8 py-16 bg-white dark:bg-slate-900">
      <div className="mb-12">
        <button 
          onClick={() => window.location.reload()} 
          className="mb-8 w-10 h-10 flex items-center justify-center text-slate-400 bg-slate-50 dark:bg-slate-800 rounded-full"
        >
          ←
        </button>
        <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
          {isLogin ? 'Welcome Back' : 'Begin Journey'}
        </h2>
        <p className="text-slate-500 font-medium serif-font italic">
          {isLogin ? 'Continue your spiritual connection.' : `Registering as a ${role.toLowerCase()}.`}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 flex-1">
        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-bold animate-pulse">
            ⚠️ {error}
          </div>
        )}

        {!isLogin && (
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Sacred Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-[1.5rem] focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-700 dark:text-slate-200 transition-all"
              placeholder="Your Name"
            />
          </div>
        )}
        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Email Connection</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-[1.5rem] focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-700 dark:text-slate-200 transition-all"
            placeholder="example@faith.com"
          />
        </div>
        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Secure Word</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-[1.5rem] focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-700 dark:text-slate-200 transition-all"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          className="w-full py-5 bg-indigo-600 text-white rounded-[1.5rem] font-bold mt-4 shadow-xl shadow-indigo-100 active:scale-[0.98] transition-all"
        >
          {isLogin ? 'Step Inside' : 'Create Path'}
        </button>
      </form>

      <div className="mt-8 text-center">
        <button 
          onClick={() => setIsLogin(!isLogin)}
          className="text-indigo-600 font-bold text-sm tracking-tight active:opacity-60 transition-opacity"
        >
          {isLogin ? "New here? Begin Journey" : "Already walking the path? Sign In"}
        </button>
      </div>
    </div>
  );
};
