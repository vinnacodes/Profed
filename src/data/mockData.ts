import { Post, User, Comment, Message, Conversation, Notification } from '../types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    username: 'alexj',
    profileImage: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    coverImage: 'https://images.pexels.com/photos/1438761/pexels-photo-1438761.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    bio: 'Digital creator and photography enthusiast. Living one day at a time.',
    followers: 1234,
    following: 567,
    isFollowing: false,
  },
  {
    id: '2',
    name: 'Samantha Lee',
    username: 'samlee',
    profileImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    coverImage: 'https://images.pexels.com/photos/1631677/pexels-photo-1631677.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    bio: 'UX Designer | Coffee Addict | Traveler',
    followers: 2345,
    following: 432,
    isFollowing: true,
  },
  {
    id: '3',
    name: 'Marcus Chen',
    username: 'marcusc',
    profileImage: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    coverImage: 'https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    bio: 'Software engineer. Fitness enthusiast. Constantly learning.',
    followers: 876,
    following: 245,
    isFollowing: true,
  },
  {
    id: '4',
    name: 'Priya Patel',
    username: 'priyap',
    profileImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    coverImage: 'https://images.pexels.com/photos/691668/pexels-photo-691668.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    bio: 'Writer | Book lover | Tea enthusiast',
    followers: 1567,
    following: 543,
    isFollowing: false,
  }
];

// Mock Posts
export const mockPosts: Post[] = [
  {
    id: '1',
    content: 'Just finished a 10K run - feeling amazing! Who else is into morning runs? #fitness #running',
    imageUrl: 'https://images.pexels.com/photos/2792157/pexels-photo-2792157.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    author: mockUsers[2],
    likes: 89,
    comments: 12,
    createdAt: '2023-10-15T08:24:00Z',
    isLiked: true,
  },
  {
    id: '2',
    content: 'Working on a new design project. Can\'t wait to share it with everyone!',
    author: mockUsers[1],
    likes: 124,
    comments: 23,
    createdAt: '2023-10-14T15:41:00Z',
    isLiked: false,
  },
  {
    id: '3',
    content: 'Just discovered this amazing coffee shop downtown. The atmosphere is perfect for getting work done. #coffee #workspace',
    imageUrl: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    author: mockUsers[0],
    likes: 56,
    comments: 8,
    createdAt: '2023-10-14T10:34:00Z',
    isLiked: false,
  },
  {
    id: '4',
    content: 'Finally got around to reading "Atomic Habits" by James Clear. Highly recommend! What books have changed your perspective?',
    author: mockUsers[3],
    likes: 213,
    comments: 45,
    createdAt: '2023-10-13T22:15:00Z',
    isLiked: true,
  },
  {
    id: '5',
    content: 'Beautiful sunset at the beach today. Moments like these make life worth living.',
    imageUrl: 'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    author: mockUsers[1],
    likes: 341,
    comments: 28,
    createdAt: '2023-10-12T19:27:00Z',
    isLiked: true,
  }
];

// Mock Comments
export const mockComments: Record<string, Comment[]> = {
  '1': [
    {
      id: 'c1',
      content: 'Amazing! I\'ve been trying to get into morning runs too. Any tips?',
      author: mockUsers[1],
      createdAt: '2023-10-15T09:12:00Z',
      likes: 5,
    },
    {
      id: 'c2',
      content: 'That\'s awesome! Keep up the good work.',
      author: mockUsers[3],
      createdAt: '2023-10-15T10:45:00Z',
      likes: 2,
    }
  ],
  '2': [
    {
      id: 'c3',
      content: 'Can\'t wait to see it!',
      author: mockUsers[0],
      createdAt: '2023-10-14T16:20:00Z',
      likes: 3,
    }
  ]
};

// Mock Messages and Conversations
export const mockConversations: Conversation[] = [
  {
    id: 'conv1',
    participants: [mockUsers[0], mockUsers[1]],
    lastMessage: {
      id: 'm1',
      content: 'Are we still meeting tomorrow for coffee?',
      sender: mockUsers[1],
      createdAt: '2023-10-15T15:30:00Z',
      isRead: false,
    },
    unreadCount: 1,
  },
  {
    id: 'conv2',
    participants: [mockUsers[0], mockUsers[2]],
    lastMessage: {
      id: 'm2',
      content: 'Thanks for the running tips!',
      sender: mockUsers[0],
      createdAt: '2023-10-14T12:45:00Z',
      isRead: true,
    },
    unreadCount: 0,
  },
  {
    id: 'conv3',
    participants: [mockUsers[0], mockUsers[3]],
    lastMessage: {
      id: 'm3',
      content: 'I\'ll send you my book recommendations tomorrow',
      sender: mockUsers[3],
      createdAt: '2023-10-13T20:15:00Z',
      isRead: true,
    },
    unreadCount: 0,
  }
];

export const mockMessages: Record<string, Message[]> = {
  'conv1': [
    {
      id: 'm1-1',
      content: 'Hey! How are you doing?',
      sender: mockUsers[0],
      createdAt: '2023-10-15T14:20:00Z',
      isRead: true,
    },
    {
      id: 'm1-2',
      content: 'Doing great! Just working on a new design project.',
      sender: mockUsers[1],
      createdAt: '2023-10-15T14:25:00Z',
      isRead: true,
    },
    {
      id: 'm1-3',
      content: 'That sounds exciting! Can\'t wait to see it.',
      sender: mockUsers[0],
      createdAt: '2023-10-15T14:30:00Z',
      isRead: true,
    },
    {
      id: 'm1-4',
      content: 'Are we still meeting tomorrow for coffee?',
      sender: mockUsers[1],
      createdAt: '2023-10-15T15:30:00Z',
      isRead: false,
    }
  ]
};

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: 'n1',
    type: 'like',
    actor: mockUsers[1],
    content: 'liked your post',
    isRead: false,
    createdAt: '2023-10-15T16:20:00Z',
    targetId: '3',
  },
  {
    id: 'n2',
    type: 'comment',
    actor: mockUsers[2],
    content: 'commented on your post: "Great thoughts!"',
    isRead: true,
    createdAt: '2023-10-15T14:35:00Z',
    targetId: '3',
  },
  {
    id: 'n3',
    type: 'follow',
    actor: mockUsers[3],
    content: 'started following you',
    isRead: false,
    createdAt: '2023-10-14T18:42:00Z',
  },
  {
    id: 'n4',
    type: 'message',
    actor: mockUsers[1],
    content: 'sent you a message',
    isRead: true,
    createdAt: '2023-10-14T15:30:00Z',
    targetId: 'conv1',
  }
];