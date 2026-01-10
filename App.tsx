
import React, { useState, useEffect, useMemo } from 'react';
import { User, UserRole, FaithType, Post, Reel, Message, Notification, PrayerRequest, FaithEvent } from './types';
import { getInitialData, saveData, getCurrentUser, setCurrentUserSession } from './store';
import { Landing } from './views/Landing';
import { Auth } from './views/Auth';
import { ProfileSetup } from './views/ProfileSetup';
import { Home } from './views/Home';
import { Discovery } from './views/Discovery';
import { Reels } from './views/Reels';
import { Chats } from './views/Chats';
import { LeaderDashboard } from './views/LeaderDashboard';
import { CreateContent } from './views/CreateContent';
import { NotificationsView } from './views/NotificationsView';
import { LeaderProfileView } from './views/LeaderProfileView';
import { ProfileView } from './views/ProfileView';
import { BottomNav } from './components/BottomNav';
import { GoogleGenAI } from "@google/genai";

type TabType = 'home' | 'discovery' | 'reels' | 'chats' | 'dashboard' | 'create' | 'profile';

export interface LeaderAnalytics {
  totalPosts: number;
  totalFollowers: number;
  avgLikesPerPost: number;
  avgCommentsPerPost: number;
  engagementRate: string;
  totalBlessings: number;
}

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'auth' | 'setup' | 'main' | 'notifications' | 'leader-profile'>('landing');
  const [role, setRole] = useState<UserRole | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [selectedLeaderId, setSelectedLeaderId] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const [db, setDb] = useState(getInitialData());

  useEffect(() => {
    const sessionUser = getCurrentUser();
    if (sessionUser) {
      setCurrentUser(sessionUser);
      setIsDarkMode(sessionUser.settings?.darkMode || false);
      setView('main');
      setActiveTab(sessionUser.role === UserRole.LEADER ? 'dashboard' : 'home');
    }
  }, []);

  useEffect(() => {
    saveData(db);
  }, [db]);

  const fetchLeaderAnalytics = (leaderId: string): LeaderAnalytics => {
    const leaderPosts = db.posts.filter((p: Post) => p.leaderId === leaderId);
    const leaderReels = db.reels.filter((r: Reel) => r.leaderId === leaderId);
    const mockFollowersMap: Record<string, number> = { 'l1': 1240, 'l2': 890, 'l3': 1560, 'l4': 2100 };
    const totalFollowers = mockFollowersMap[leaderId] || 0;
    const totalPosts = leaderPosts.length;
    const totalReels = leaderReels.length;
    const totalContent = totalPosts + totalReels;
    const totalLikes = leaderPosts.reduce((acc: number, p: Post) => acc + p.likes, 0) + leaderReels.reduce((acc: number, r: Reel) => acc + r.likes, 0);
    const totalComments = leaderPosts.reduce((acc: number, p: Post) => acc + p.comments, 0) + leaderReels.reduce((acc: number, r: Reel) => acc + r.comments, 0);
    const avgLikes = totalContent > 0 ? totalLikes / totalContent : 0;
    const avgComments = totalContent > 0 ? totalComments / totalContent : 0;
    const rawRate = totalFollowers > 0 ? ((totalLikes + totalComments) / totalFollowers) * 100 : 0;
    return { totalPosts, totalFollowers, avgLikesPerPost: Math.round(avgLikes), avgCommentsPerPost: Math.round(avgComments), engagementRate: rawRate.toFixed(1) + '%', totalBlessings: totalLikes };
  };

  const triggerNotification = (userId: string, type: Notification['type'], title: string, message: string) => {
    const newNotif: Notification = { id: Math.random().toString(36).substr(2, 9), userId, type, title, message, timestamp: Date.now(), read: false };
    setDb(prev => ({ ...prev, notifications: [newNotif, ...prev.notifications] }));
  };

  const chatAPI = {
    fetchMessages: (userId: string): Message[] => db.messages.filter((m: Message) => m.senderId === userId || m.receiverId === userId),
    sendMessage: (senderId: string, receiverId: string, text: string) => {
      const sender = db.users.find((u: User) => u.id === senderId);
      const receiver = db.users.find((u: User) => u.id === receiverId);
      if (!sender || !receiver) return { success: false, error: "User not found" };
      if (sender.role === UserRole.WORSHIPER && !db.following.includes(receiverId)) return { success: false, error: "Follow this leader to message them." };
      const newMessage: Message = { id: Math.random().toString(36).substr(2, 9), senderId, receiverId, text, timestamp: Date.now() };
      if (sender.role === UserRole.LEADER && receiver.role === UserRole.WORSHIPER) triggerNotification(receiverId, 'message', 'Sacred Message', `${sender.name} replied to you.`);
      setDb(prev => ({ ...prev, messages: [...prev.messages, newMessage] }));
      return { success: true, message: newMessage };
    }
  };

  const handleRoleSelection = (selectedRole: UserRole) => { setRole(selectedRole); setView('auth'); };
  const handleAuthSuccess = (user: User, isNewUser: boolean) => {
    setCurrentUser(user); setCurrentUserSession(user); setIsDarkMode(user.settings?.darkMode || false);
    if (isNewUser) { setDb(prev => ({ ...prev, users: [...prev.users, user] })); setView('setup'); }
    else { setView('main'); setActiveTab(user.role === UserRole.LEADER ? 'dashboard' : 'home'); }
  };

  const toggleDarkMode = () => {
    const newVal = !isDarkMode; setIsDarkMode(newVal);
    if (currentUser) handleUpdateProfile({ ...currentUser, settings: { ...currentUser.settings, darkMode: newVal, language: currentUser.settings?.language || 'en' } });
  };

  const handleSetupComplete = (updatedUser: User) => {
    setCurrentUser(updatedUser); setCurrentUserSession(updatedUser);
    setDb(prev => ({ ...prev, users: prev.users.map((u: User) => u.id === updatedUser.id ? updatedUser : u) }));
    setView('main'); setActiveTab(updatedUser.role === UserRole.LEADER ? 'dashboard' : 'home');
  };

  const handleUpdateProfile = (updatedUser: User) => {
    setCurrentUser(updatedUser); setCurrentUserSession(updatedUser);
    setDb(prev => ({ ...prev, users: prev.users.map((u: User) => u.id === updatedUser.id ? updatedUser : u) }));
  };

  const handleLogout = () => { setCurrentUser(null); setCurrentUserSession(null); setRole(null); setView('landing'); setActiveTab('home'); };

  const toggleFollow = (leaderId: string) => {
    setDb(prev => {
      const isFollowing = prev.following.includes(leaderId);
      if (!isFollowing) triggerNotification(leaderId, 'follow', 'New Seeker', `${currentUser?.name} followed you.`);
      return { ...prev, following: isFollowing ? prev.following.filter((id: string) => id !== leaderId) : [...prev.following, leaderId] };
    });
  };

  const addPost = (post: Partial<Post>) => {
    const newPost: Post = { id: Math.random().toString(36).substr(2, 9), leaderId: currentUser!.id, leaderName: currentUser!.name, leaderPhoto: currentUser!.photoUrl, caption: post.caption || '', mediaUrl: post.mediaUrl || 'https://images.unsplash.com/photo-1517646272486-a2c99afd053b?w=800&h=600&fit=crop', mediaType: post.mediaType || 'image', likes: 0, comments: 0, timestamp: Date.now() };
    setDb(prev => ({ ...prev, posts: [newPost, ...prev.posts] }));
    setActiveTab('dashboard');
  };

  const addReel = (reel: Partial<Reel>) => {
    const newReel: Reel = { id: Math.random().toString(36).substr(2, 9), leaderId: currentUser!.id, leaderName: currentUser!.name, videoUrl: reel.videoUrl || 'https://assets.mixkit.co/videos/preview/mixkit-man-walking-on-a-quiet-country-road-4457-large.mp4', caption: reel.caption || '', likes: 0, comments: 0, timestamp: Date.now() };
    setDb(prev => ({ ...prev, reels: [newReel, ...prev.reels] }));
    setActiveTab('dashboard');
  };

  const handleLikePost = (postId: string) => {
    setDb(prev => {
      const post = prev.posts.find((p: Post) => p.id === postId);
      if (post) { triggerNotification(post.leaderId, 'like', 'Blessed Post', `Someone blessed your insight.`); return { ...prev, posts: prev.posts.map((p: Post) => p.id === postId ? { ...p, likes: p.likes + 1 } : p) }; }
      return prev;
    });
  };

  // --- GEMINI AI INTEGRATION ---
  const addPrayer = async (text: string) => {
    const newPrayer: PrayerRequest = { id: Math.random().toString(36).substr(2, 9), userId: currentUser!.id, userName: currentUser!.name, userPhoto: currentUser!.photoUrl, content: text, prayersCount: 0, timestamp: Date.now(), isAnswered: false };
    setDb(prev => ({ ...prev, prayers: [newPrayer, ...prev.prayers] }));

    // Divine Wisdom AI response
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `A user shared this prayer: "${text}". Provide a short, 2-sentence encouraging spiritual response (as a "FaithConnect Guide") to show they are supported. Keep it universal and warm.`,
      });
      if (response.text) {
        triggerNotification(currentUser!.id, 'event', 'Divine Encouragement', response.text);
      }
    } catch (e) {
      console.error("AI wisdom unavailable", e);
    }
  };

  const handlePrayerAction = (prayerId: string) => setDb(prev => ({ ...prev, prayers: prev.prayers.map((p: PrayerRequest) => p.id === prayerId ? { ...p, prayersCount: p.prayersCount + 1 } : p) }));

  const renderContent = () => {
    if (view === 'landing') return <Landing onSelectRole={handleRoleSelection} />;
    if (view === 'auth') return <Auth role={role!} onAuthSuccess={handleAuthSuccess} db={db} />;
    if (view === 'setup') return <ProfileSetup user={currentUser!} onComplete={handleSetupComplete} />;
    if (view === 'notifications') return <NotificationsView notifications={db.notifications.filter((n: Notification) => n.userId === currentUser?.id)} onBack={() => setView('main')} />;
    if (view === 'leader-profile' && selectedLeaderId) {
      const leader = db.users.find((u: User) => u.id === selectedLeaderId);
      return <LeaderProfileView leader={leader} isFollowing={db.following.includes(selectedLeaderId)} onToggleFollow={() => toggleFollow(selectedLeaderId)} onMessage={() => { setActiveTab('chats'); setView('main'); }} onBack={() => setView('main')} posts={db.posts.filter((p: Post) => p.leaderId === selectedLeaderId)} reels={db.reels.filter((r: Reel) => r.leaderId === selectedLeaderId)} />;
    }
    switch (activeTab) {
      case 'home': return <Home posts={db.posts} followingIds={db.following} leaders={db.users.filter((u: User) => u.role === UserRole.LEADER)} onOpenNotifications={() => setView('notifications')} onLikePost={handleLikePost} />;
      case 'discovery': return <Discovery leaders={db.users.filter((u: User) => u.role === UserRole.LEADER)} events={db.events} prayers={db.prayers} followingIds={db.following} onToggleFollow={toggleFollow} onOpenProfile={(id) => { setSelectedLeaderId(id); setView('leader-profile'); }} onAddPrayer={addPrayer} onPrayerAction={handlePrayerAction} />;
      case 'reels': return <Reels reels={db.reels} />;
      case 'chats': return <Chats messages={chatAPI.fetchMessages(currentUser!.id)} currentUser={currentUser!} db={{ ...db, leaders: db.users.filter((u: User) => u.role === UserRole.LEADER), worshipers: db.users.filter((u: User) => u.role === UserRole.WORSHIPER) }} onSendMessage={(rid, txt) => chatAPI.sendMessage(currentUser!.id, rid, txt)} />;
      case 'dashboard': return <LeaderDashboard leader={currentUser!} posts={db.posts.filter((p: Post) => p.leaderId === currentUser?.id)} analytics={fetchLeaderAnalytics(currentUser!.id)} />;
      case 'create': return <CreateContent onAddPost={addPost} onAddReel={addReel} />;
      case 'profile': return <ProfileView user={currentUser!} onUpdate={handleUpdateProfile} onLogout={handleLogout} posts={db.posts.filter((p: Post) => p.leaderId === currentUser?.id)} reels={db.reels.filter((r: Reel) => r.leaderId === currentUser?.id)} toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />;
      default: return null;
    }
  };

  return (
    <div className={`flex flex-col h-screen max-w-md mx-auto shadow-xl relative overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>
      <main className="flex-1 overflow-y-auto hide-scrollbar pb-20">{renderContent()}</main>
      {view === 'main' && currentUser && <BottomNav role={currentUser.role} activeTab={activeTab} onTabChange={(tab: any) => setActiveTab(tab)} />}
    </div>
  );
};

export default App;
