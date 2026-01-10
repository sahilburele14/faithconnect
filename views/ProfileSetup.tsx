
import React, { useState } from 'react';
import { User, FaithType, UserRole } from '../types';

interface ProfileSetupProps {
  user: User;
  onComplete: (user: User) => void;
}

export const ProfileSetup: React.FC<ProfileSetupProps> = ({ user, onComplete }) => {
  const [faith, setFaith] = useState<FaithType>(FaithType.OTHER);
  const [bio, setBio] = useState('');
  const [photo, setPhoto] = useState(user.photoUrl);

  const faiths = Object.values(FaithType);

  const handleComplete = () => {
    onComplete({
      ...user,
      faith,
      bio,
      photoUrl: photo
    });
  };

  return (
    <div className="px-6 pt-12 pb-10">
      <h2 className="text-2xl font-bold text-slate-800 mb-1">Finish Setting Up</h2>
      <p className="text-slate-500 mb-8">Tell us a bit more about your faith journey.</p>

      <div className="flex flex-col items-center mb-8">
        <div className="relative">
          <img src={photo} alt="Profile" className="w-24 h-24 rounded-full object-cover border-4 border-blue-50 shadow-sm" />
          <button 
            className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full shadow-md"
            onClick={() => setPhoto(`https://picsum.photos/200/200?random=${Math.random()}`)}
          >
            📸
          </button>
        </div>
        <p className="mt-3 text-sm text-slate-400">Tap icon to change photo</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-3">Select your Faith</label>
          <div className="grid grid-cols-2 gap-3">
            {faiths.map(f => (
              <button
                key={f}
                onClick={() => setFaith(f)}
                className={`py-3 px-4 rounded-xl border-2 text-sm font-medium transition-all ${
                  faith === f ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-100 bg-white text-slate-600'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {user.role === UserRole.LEADER && (
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Short Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
              placeholder="e.g., Leading the youth ministry at Saint Mary..."
            />
          </div>
        )}

        <button
          onClick={handleComplete}
          className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-100"
        >
          Complete Profile
        </button>
      </div>
    </div>
  );
};
