
import { User, UserRole, FaithType, Post, Reel, Message, Notification, PrayerRequest, FaithEvent } from './types';

const INITIAL_LEADERS: User[] = [
  {
    id: 'l1',
    name: 'Pastor John Amen',
    email: 'john@faith.com',
    password: 'password123',
    role: UserRole.LEADER,
    faith: FaithType.CHRISTIANITY,
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
    coverPhotoUrl: 'https://images.unsplash.com/photo-1438032005730-c779502df39b?w=800&h=400&fit=crop',
    bio: 'Senior Pastor at Grace Community. Dedicated to spreading peace and the word of God.'
  },
  {
    id: 'l2',
    name: 'Imam Kareem Hassan',
    email: 'kareem@faith.com',
    password: 'password123',
    role: UserRole.LEADER,
    faith: FaithType.ISLAM,
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    coverPhotoUrl: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=800&h=400&fit=crop',
    bio: 'Community builder and spiritual guide focusing on wisdom and compassion.'
  },
  {
    id: 'l3',
    name: 'Rabbi Leah Cohen',
    email: 'leah@faith.com',
    password: 'password123',
    role: UserRole.LEADER,
    faith: FaithType.JUDAISM,
    photoUrl: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=400&h=400&fit=crop',
    coverPhotoUrl: 'https://images.unsplash.com/photo-1512411427840-77114668b584?w=800&h=400&fit=crop',
    bio: 'Educator and Rabbi specializing in ancient wisdom for modern life. Shalom to all seekers.'
  },
  {
    id: 'l4',
    name: 'Guru Arjun Singh',
    email: 'arjun@faith.com',
    password: 'password123',
    role: UserRole.LEADER,
    faith: FaithType.HINDUISM,
    photoUrl: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=400&h=400&fit=crop',
    coverPhotoUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=400&fit=crop',
    bio: 'Guiding souls toward inner peace and universal oneness through meditation and service.'
  }
];

const INITIAL_POSTS: Post[] = [
  // Pastor John Posts
  {
    id: 'p1', leaderId: 'l1', leaderName: 'Pastor John Amen', leaderPhoto: INITIAL_LEADERS[0].photoUrl,
    caption: 'Gratitude is the memory of the heart. Today, we reflect on the small blessings.',
    mediaUrl: 'https://images.unsplash.com/photo-1517646272486-a2c99afd053b?w=800&h=600&fit=crop',
    mediaType: 'image', likes: 124, comments: 12, timestamp: Date.now() - 3600000
  },
  {
    id: 'p2', leaderId: 'l1', leaderName: 'Pastor John Amen', leaderPhoto: INITIAL_LEADERS[0].photoUrl,
    caption: 'Love your neighbor as yourself. A simple command, a lifetime of work.',
    mediaUrl: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800&h=600&fit=crop',
    mediaType: 'image', likes: 45, comments: 4, timestamp: Date.now() - 86400000
  },
  {
    id: 'p3', leaderId: 'l1', leaderName: 'Pastor John Amen', leaderPhoto: INITIAL_LEADERS[0].photoUrl,
    caption: 'The light shines in the darkness, and the darkness has not overcome it.',
    mediaUrl: 'https://images.unsplash.com/photo-1438032005730-c779502df39b?w=800&h=600&fit=crop',
    mediaType: 'image', likes: 210, comments: 18, timestamp: Date.now() - 172800000
  },
  {
    id: 'p4', leaderId: 'l1', leaderName: 'Pastor John Amen', leaderPhoto: INITIAL_LEADERS[0].photoUrl,
    caption: 'Join our youth choir practice this Wednesday! Singing is twice praying.',
    mediaUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&h=600&fit=crop',
    mediaType: 'image', likes: 88, comments: 7, timestamp: Date.now() - 259200000
  },
  {
    id: 'p5', leaderId: 'l1', leaderName: 'Pastor John Amen', leaderPhoto: INITIAL_LEADERS[0].photoUrl,
    caption: 'Reflecting on the beauty of creation during my morning walk.',
    mediaUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
    mediaType: 'image', likes: 156, comments: 9, timestamp: Date.now() - 345600000
  },
  // Imam Kareem Posts
  {
    id: 'p6', leaderId: 'l2', leaderName: 'Imam Kareem Hassan', leaderPhoto: INITIAL_LEADERS[1].photoUrl,
    caption: 'Seek wisdom in silence, for it is in the quiet moments that our souls speak loudest.',
    mediaUrl: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=800&h=600&fit=crop',
    mediaType: 'image', likes: 89, comments: 5, timestamp: Date.now() - 7200000
  },
  {
    id: 'p7', leaderId: 'l2', leaderName: 'Imam Kareem Hassan', leaderPhoto: INITIAL_LEADERS[1].photoUrl,
    caption: 'Compassion is the hallmark of faith. Let us be kind to all living beings.',
    mediaUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop',
    mediaType: 'image', likes: 112, comments: 15, timestamp: Date.now() - 93600000
  },
  {
    id: 'p8', leaderId: 'l2', leaderName: 'Imam Kareem Hassan', leaderPhoto: INITIAL_LEADERS[1].photoUrl,
    caption: 'Strength comes from discipline and inner peace.',
    mediaUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop',
    mediaType: 'image', likes: 74, comments: 3, timestamp: Date.now() - 180000000
  },
  {
    id: 'p9', leaderId: 'l2', leaderName: 'Imam Kareem Hassan', leaderPhoto: INITIAL_LEADERS[1].photoUrl,
    caption: 'Community is like a building; each part supports the other.',
    mediaUrl: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=800&h=600&fit=crop',
    mediaType: 'image', likes: 205, comments: 21, timestamp: Date.now() - 266400000
  },
  {
    id: 'p10', leaderId: 'l2', leaderName: 'Imam Kareem Hassan', leaderPhoto: INITIAL_LEADERS[1].photoUrl,
    caption: 'The best of people are those that are most useful to others.',
    mediaUrl: 'https://images.unsplash.com/photo-1469571486040-0bd501b66928?w=800&h=600&fit=crop',
    mediaType: 'image', likes: 178, comments: 12, timestamp: Date.now() - 352800000
  },
  // Rabbi Leah Posts
  {
    id: 'p11', leaderId: 'l3', leaderName: 'Rabbi Leah Cohen', leaderPhoto: INITIAL_LEADERS[2].photoUrl,
    caption: 'Shabbat Shalom! May your weekend be filled with rest and renewal.',
    mediaUrl: 'https://images.unsplash.com/photo-1543362906-acfc16c67564?w=800&h=600&fit=crop',
    mediaType: 'image', likes: 134, comments: 14, timestamp: Date.now() - 10800000
  },
  {
    id: 'p12', leaderId: 'l3', leaderName: 'Rabbi Leah Cohen', leaderPhoto: INITIAL_LEADERS[2].photoUrl,
    caption: 'Tzedakah is more than charity; it is justice. We are obligated to give.',
    mediaUrl: 'https://images.unsplash.com/photo-1469571486040-0bd501b66928?w=800&h=600&fit=crop',
    mediaType: 'image', likes: 92, comments: 6, timestamp: Date.now() - 97200000
  },
  {
    id: 'p13', leaderId: 'l3', leaderName: 'Rabbi Leah Cohen', leaderPhoto: INITIAL_LEADERS[2].photoUrl,
    caption: 'The world is sustained by three things: truth, justice, and peace.',
    mediaUrl: 'https://images.unsplash.com/photo-1512411427840-77114668b584?w=800&h=600&fit=crop',
    mediaType: 'image', likes: 156, comments: 19, timestamp: Date.now() - 183600000
  },
  {
    id: 'p14', leaderId: 'l3', leaderName: 'Rabbi Leah Cohen', leaderPhoto: INITIAL_LEADERS[2].photoUrl,
    caption: 'Study is not the main thing, but action is.',
    mediaUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=600&fit=crop',
    mediaType: 'image', likes: 84, comments: 5, timestamp: Date.now() - 270000000
  },
  {
    id: 'p15', leaderId: 'l3', leaderName: 'Rabbi Leah Cohen', leaderPhoto: INITIAL_LEADERS[2].photoUrl,
    caption: 'Every blade of grass has an angel that bends over it and whispers, "Grow, grow."',
    mediaUrl: 'https://images.unsplash.com/photo-1500382017468-9049fee74a62?w=800&h=600&fit=crop',
    mediaType: 'image', likes: 245, comments: 32, timestamp: Date.now() - 356400000
  },
  // Guru Arjun Posts
  {
    id: 'p16', leaderId: 'l4', leaderName: 'Guru Arjun Singh', leaderPhoto: INITIAL_LEADERS[3].photoUrl,
    caption: 'Truth is the highest virtue, but higher still is truthful living.',
    mediaUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=600&fit=crop',
    mediaType: 'image', likes: 167, comments: 22, timestamp: Date.now() - 14400000
  },
  {
    id: 'p17', leaderId: 'l4', leaderName: 'Guru Arjun Singh', leaderPhoto: INITIAL_LEADERS[3].photoUrl,
    caption: 'Service to humanity is service to God. Let us serve without ego.',
    mediaUrl: 'https://images.unsplash.com/photo-1544654803-b69140b285a1?w=800&h=600&fit=crop',
    mediaType: 'image', likes: 143, comments: 11, timestamp: Date.now() - 100800000
  },
  {
    id: 'p18', leaderId: 'l4', leaderName: 'Guru Arjun Singh', leaderPhoto: INITIAL_LEADERS[3].photoUrl,
    caption: 'Find the light within yourself and you will see it in everyone.',
    mediaUrl: 'https://images.unsplash.com/photo-1499209974431-9dac3adaf471?w=800&h=600&fit=crop',
    mediaType: 'image', likes: 198, comments: 25, timestamp: Date.now() - 187200000
  },
  {
    id: 'p19', leaderId: 'l4', leaderName: 'Guru Arjun Singh', leaderPhoto: INITIAL_LEADERS[3].photoUrl,
    caption: 'Meditation is the key to a calm mind and a joyful soul.',
    mediaUrl: 'https://images.unsplash.com/photo-1518241353349-9b5756eeea06?w=800&h=600&fit=crop',
    mediaType: 'image', likes: 132, comments: 8, timestamp: Date.now() - 273600000
  },
  {
    id: 'p20', leaderId: 'l4', leaderName: 'Guru Arjun Singh', leaderPhoto: INITIAL_LEADERS[3].photoUrl,
    caption: 'The greatest victory is victory over one\'s own mind.',
    mediaUrl: 'https://images.unsplash.com/photo-1447433589675-4aaa56a4010a?w=800&h=600&fit=crop',
    mediaType: 'image', likes: 212, comments: 14, timestamp: Date.now() - 360000000
  }
];

const INITIAL_REELS: Reel[] = [
  // Pastor John Reels
  {
    id: 'r1', leaderId: 'l1', leaderName: 'Pastor John Amen',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-walking-on-a-quiet-country-road-4457-large.mp4',
    caption: 'Walking in faith, even when the path is narrow. 🙏', likes: 450, comments: 23, timestamp: Date.now() - 86400000
  },
  {
    id: 'r2', leaderId: 'l1', leaderName: 'Pastor John Amen',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-church-architecture-details-and-sun-rays-in-interior-41484-large.mp4',
    caption: 'Finding peace in the house of the Lord.', likes: 320, comments: 15, timestamp: Date.now() - 172800000
  },
  // Imam Kareem Reels
  {
    id: 'r3', leaderId: 'l2', leaderName: 'Imam Kareem Hassan',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-reading-the-quran-in-a-mosque-44026-large.mp4',
    caption: 'The beauty of reflection and study.', likes: 512, comments: 42, timestamp: Date.now() - 86400000
  },
  {
    id: 'r4', leaderId: 'l2', leaderName: 'Imam Kareem Hassan',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-muslim-man-praying-in-a-traditional-way-44033-large.mp4',
    caption: 'Moments of sacred connection.', likes: 645, comments: 38, timestamp: Date.now() - 259200000
  },
  // Rabbi Leah Reels
  {
    id: 'r5', leaderId: 'l3', leaderName: 'Rabbi Leah Cohen',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-candle-flame-40030-large.mp4',
    caption: 'Lighting the way for Shabbat. ✨', likes: 289, comments: 12, timestamp: Date.now() - 432000000
  },
  {
    id: 'r6', leaderId: 'l3', leaderName: 'Rabbi Leah Cohen',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-flipping-pages-of-an-old-book-40019-large.mp4',
    caption: 'Ancient words for modern times.', likes: 412, comments: 25, timestamp: Date.now() - 604800000
  },
  // Guru Arjun Reels
  {
    id: 'r7', leaderId: 'l4', leaderName: 'Guru Arjun Singh',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-flowing-water-in-a-natural-forest-stream-41312-large.mp4',
    caption: 'Flow like water, find your peace.', likes: 567, comments: 45, timestamp: Date.now() - 345600000
  },
  {
    id: 'r8', leaderId: 'l4', leaderName: 'Guru Arjun Singh',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-meditating-person-in-a-natural-setting-41313-large.mp4',
    caption: 'Breathe in light, breathe out love.', likes: 789, comments: 56, timestamp: Date.now() - 518400000
  }
];

const INITIAL_MESSAGES: Message[] = [
  {
    id: 'm1',
    senderId: 'l1',
    receiverId: 'u1',
    text: 'Peace be with you. How can I assist you on this path?',
    timestamp: Date.now() - 172800000
  }
];

const INITIAL_EVENTS: FaithEvent[] = [
  {
    id: 'e1',
    leaderId: 'l1',
    leaderName: 'Pastor John Amen',
    title: 'Sunday Service of Gratitude',
    description: 'Join us for a morning of reflection and community prayer.',
    date: Date.now() + 86400000 * 2,
    location: 'Grace Community Cathedral',
    type: 'sermon',
    attendeesCount: 450,
    bannerUrl: 'https://images.unsplash.com/photo-1438032005730-c779502df39b?w=800&h=400&fit=crop'
  },
  {
    id: 'e2',
    leaderId: 'l2',
    leaderName: 'Imam Kareem Hassan',
    title: 'Community Iftar Gathering',
    description: 'Breaking bread together in the spirit of unity.',
    date: Date.now() + 86400000 * 5,
    location: 'Central Community Center',
    type: 'community',
    attendeesCount: 120,
    bannerUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=400&fit=crop'
  }
];

const INITIAL_PRAYERS: PrayerRequest[] = [
  {
    id: 'pr1',
    userId: 'u1',
    userName: 'Sarah Miller',
    userPhoto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    content: 'Praying for my family\'s health during these challenging times. May peace be with us all.',
    prayersCount: 24,
    timestamp: Date.now() - 10000000,
    isAnswered: false
  },
  {
    id: 'pr2',
    userId: 'u2',
    userName: 'Ahmad Khan',
    userPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    content: 'Seeking strength for a new career path. Grateful for guidance.',
    prayersCount: 15,
    timestamp: Date.now() - 86400000,
    isAnswered: false
  }
];

export const getInitialData = () => {
  const stored = localStorage.getItem('faith_connect_v2_data');
  if (stored) return JSON.parse(stored);
  return {
    users: [...INITIAL_LEADERS],
    posts: INITIAL_POSTS,
    reels: INITIAL_REELS,
    messages: INITIAL_MESSAGES,
    notifications: [],
    following: [],
    prayers: INITIAL_PRAYERS,
    events: INITIAL_EVENTS,
    analytics: {
      totalReach: 0,
      blessingsCount: 0,
      topPosts: []
    }
  };
};

export const saveData = (data: any) => {
  localStorage.setItem('faith_connect_v2_data', JSON.stringify(data));
};

export const getCurrentUser = (): User | null => {
  const user = localStorage.getItem('faith_connect_session');
  return user ? JSON.parse(user) : null;
};

export const setCurrentUserSession = (user: User | null) => {
  if (user) {
    localStorage.setItem('faith_connect_session', JSON.stringify(user));
  } else {
    localStorage.removeItem('faith_connect_session');
  }
};
