import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import CreatePostForm from '../components/feed/CreatePostForm';
import PostCard from '../components/feed/PostCard';
import { Post } from '../types';
import { mockPosts } from '../data/mockData';

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching posts
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setPosts(mockPosts);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPosts();
  }, []);

  const handlePostCreated = (newPost: Post) => {
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <CreatePostForm onPostCreated={handlePostCreated} />
        
        {isLoading ? (
          <div className="flex flex-col items-center py-10">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-500 dark:text-gray-400">Loading feed...</p>
          </div>
        ) : (
          <div>
            {posts.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 text-center">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Your feed is empty</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  When you follow people, their posts will show up here.
                </p>
              </div>
            ) : (
              posts.map(post => (
                <PostCard key={post.id} post={post} />
              ))
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default HomePage;