import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import UserCard from '../components/search/UserCard';
import PostCard from '../components/feed/PostCard';
import { User, Post } from '../types';
import { mockUsers, mockPosts } from '../data/mockData';
import { Search as SearchIcon } from 'lucide-react';

const SearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{
    users: User[];
    posts: Post[];
  }>({ users: [], posts: [] });
  const [activeTab, setActiveTab] = useState<'all' | 'people' | 'posts'>('all');
  const [isSearching, setIsSearching] = useState(false);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
    // Simulate API search delay
    setTimeout(() => {
      const query = searchQuery.toLowerCase();
      
      // Filter users
      const users = mockUsers.filter(user => 
        user.name.toLowerCase().includes(query) || 
        user.username.toLowerCase().includes(query) ||
        user.bio.toLowerCase().includes(query)
      );
      
      // Filter posts
      const posts = mockPosts.filter(post => 
        post.content.toLowerCase().includes(query) ||
        post.author.name.toLowerCase().includes(query) ||
        post.author.username.toLowerCase().includes(query)
      );
      
      setSearchResults({ users, posts });
      setIsSearching(false);
    }, 800);
  };

  const filteredResults = () => {
    if (activeTab === 'people') return { users: searchResults.users, posts: [] };
    if (activeTab === 'posts') return { users: [], posts: searchResults.posts };
    return searchResults;
  };

  const results = filteredResults();
  const hasResults = results.users.length > 0 || results.posts.length > 0;
  const wasSearched = searchQuery.trim() !== '';

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mb-6">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Search for people, posts, or topics..."
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <button
                  type="submit"
                  className="px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                  disabled={!searchQuery.trim() || isSearching}
                >
                  {isSearching ? 'Searching...' : 'Search'}
                </button>
              </div>
            </div>
          </form>
        </div>
        
        {/* Search Results */}
        {wasSearched && (
          <div className="mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
              <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="flex -mb-px">
                  <button
                    className={`px-4 py-3 text-sm font-medium ${
                      activeTab === 'all'
                        ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-500 dark:border-blue-500'
                        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                    onClick={() => setActiveTab('all')}
                  >
                    All Results
                  </button>
                  <button
                    className={`px-4 py-3 text-sm font-medium ${
                      activeTab === 'people'
                        ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-500 dark:border-blue-500'
                        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                    onClick={() => setActiveTab('people')}
                  >
                    People
                  </button>
                  <button
                    className={`px-4 py-3 text-sm font-medium ${
                      activeTab === 'posts'
                        ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-500 dark:border-blue-500'
                        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                    onClick={() => setActiveTab('posts')}
                  >
                    Posts
                  </button>
                </nav>
              </div>
              
              {isSearching ? (
                <div className="flex flex-col items-center py-10">
                  <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="mt-4 text-gray-500 dark:text-gray-400">Searching for "{searchQuery}"...</p>
                </div>
              ) : !hasResults ? (
                <div className="py-10 text-center">
                  <div className="mx-auto w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
                    <SearchIcon className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No results found</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    We couldn't find anything matching "{searchQuery}"
                  </p>
                </div>
              ) : (
                <div className="p-4">
                  {results.users.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">People</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {results.users.map(user => (
                          <UserCard key={user.id} user={user} />
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {results.posts.length > 0 && (
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Posts</h3>
                      <div className="space-y-4">
                        {results.posts.map(post => (
                          <PostCard key={post.id} post={post} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Initial state - search suggestions */}
        {!wasSearched && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Discover</h3>
            
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300 mb-2">Popular searches:</p>
              <div className="flex flex-wrap gap-2">
                {['Technology', 'Travel', 'Photography', 'Design', 'Productivity', 'Health', 'Books'].map(term => (
                  <button
                    key={term}
                    onClick={() => {
                      setSearchQuery(term);
                      handleSearch({ preventDefault: () => {} } as React.FormEvent);
                    }}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-800 dark:text-gray-200 text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
              
              <div className="mt-8">
                <p className="text-gray-600 dark:text-gray-300 mb-2">Suggested people to follow:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  {mockUsers.slice(0, 3).map(user => (
                    <UserCard key={user.id} user={user} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SearchPage;