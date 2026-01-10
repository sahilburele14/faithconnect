
export enum UserRole {
  WORSHIPER = 'WORSHIPER',
  LEADER = 'LEADER'
}

export enum FaithType {
  CHRISTIANITY = 'Christianity',
  ISLAM = 'Islam',
  JUDAISM = 'Judaism',
  HINDUISM = 'Hinduism',
  OTHER = 'Other'
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // For mock authentication
  role: UserRole;
  faith: FaithType;
  photoUrl: string;
  coverPhotoUrl?: string;
  bio?: string;
  settings?: {
    darkMode: boolean;
    language: string;
  };
}

export interface Post {
  id: string;
  leaderId: string;
  leaderName: string;
  leaderPhoto: string;
  caption: string; // Changed from content
  mediaUrl: string;
  mediaType: 'image' | 'video';
  likes: number;
  comments: number;
  timestamp: number; // Changed from createdAt
}

export interface Reel {
  id: string;
  leaderId: string;
  leaderName: string;
  videoUrl: string;
  caption: string;
  likes: number;
  comments: number;
  timestamp: number; // Added field
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: number;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'post' | 'message' | 'like' | 'follow' | 'event';
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
}

export interface PrayerRequest {
  id: string;
  userId: string;
  userName: string;
  userPhoto: string;
  content: string;
  prayersCount: number;
  timestamp: number;
  isAnswered: boolean;
}

export interface FaithEvent {
  id: string;
  leaderId: string;
  leaderName: string;
  title: string;
  description: string;
  date: number;
  location: string;
  type: 'sermon' | 'meditation' | 'community' | 'workshop';
  attendeesCount: number;
  bannerUrl: string;
}
