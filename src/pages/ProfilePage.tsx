import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ProfileHeader from '../components/profile/ProfileHeader';
import PostCard from '../components/feed/PostCard';
import { User, Post } from '../types';
import { mockUsers, mockPosts } from '../data/mockData';
import { Table as Tabs, List, Users, Bookmark, Settings } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeTab, setActiveTab] = useState('posts');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching user profile
    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be API calls
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // For demo, use the first user if username is not provided
        const foundUser = username 
          ? mockUsers.find(u => u.username === username) 
          : mockUsers[0];
        
        if (foundUser) {
          setUser(foundUser);
          
          // Get posts by this user
          const userPosts = mockPosts.filter(post => post.author.id === foundUser.id);
          setPosts(userPosts);
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProfile();
  }, [username]);

  if (isLoading) {
    return (
      <Layout>
        <div className="flex flex-col items-center py-10">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-500 dark:text-gray-400">Loading profile...</p>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 text-center">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">User not found</h3>
          <p className="text-gray-500 dark:text-gray-400">
            The profile you are looking for doesn't exist or has been removed.
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <ProfileHeader user={user} />
        
        {/* Profile Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm mb-6">
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              className={`flex items-center px-4 py-3 text-sm font-medium ${
                activeTab === 'posts'
                  ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('posts')}
            >
              <Tabs className="w-4 h-4 mr-2" />
              Posts
            </button>
            <button
              className={`flex items-center px-4 py-3 text-sm font-medium ${
                activeTab === 'media'
                  ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('media')}
            >
              <List className="w-4 h-4 mr-2" />
              Media
            </button>
            <button
              className={`flex items-center px-4 py-3 text-sm font-medium ${
                activeTab === 'friends'
                  ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('friends')}
            >
              <Users className="w-4 h-4 mr-2" />
              Friends
            </button>
            <button
              className={`flex items-center px-4 py-3 text-sm font-medium ${
                activeTab === 'saved'
                  ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('saved')}
            >
              <Bookmark className="w-4 h-4 mr-2" />
              Saved
            </button>
          </div>
        </div>
        
        {/* Tab Content */}
        {activeTab === 'posts' && (
          <div>
            {posts.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 text-center">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No posts yet</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  When {user.name} creates posts, they will appear here.
                </p>
              </div>
            ) : (
              posts.map(post => <PostCard key={post.id} post={post} />)
            )}
          </div>
        )}
        
        {(activeTab === 'media' || activeTab === 'friends' || activeTab === 'saved') && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 text-center">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
              Coming Soon
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              This feature is currently under development.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProfilePage;