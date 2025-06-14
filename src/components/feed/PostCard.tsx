import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../ui/Avatar';
import { User, Post, Comment } from '../../types';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal } from 'lucide-react';
import { mockComments } from '../../data/mockData';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [liked, setLiked] = useState(post.isLiked || false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [saved, setSaved] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>(mockComments[post.id] || []);
  const [newComment, setNewComment] = useState('');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  };

  const toggleLike = () => {
    if (liked) {
      setLikesCount(prev => prev - 1);
    } else {
      setLikesCount(prev => prev + 1);
    }
    setLiked(!liked);
  };

  const toggleSaved = () => {
    setSaved(!saved);
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    const comment: Comment = {
      id: `comment-${Date.now()}`,
      content: newComment,
      author: {
        id: '1', // Current user
        name: 'Alex Johnson',
        username: 'alexj',
        profileImage: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        coverImage: '',
        bio: '',
        followers: 0,
        following: 0
      },
      createdAt: new Date().toISOString(),
      likes: 0
    };
    
    setComments([...comments, comment]);
    setNewComment('');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden mb-4 transition-all hover:shadow-md">
      {/* Post Header */}
      <div className="flex items-center justify-between p-4">
        <Link to={`/profile/${post.author.username}`} className="flex items-center">
          <Avatar src={post.author.profileImage} alt={post.author.name} />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">{post.author.name}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">@{post.author.username} • {formatDate(post.createdAt)}</p>
          </div>
        </Link>
        <button className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>
      
      {/* Post Content */}
      <div className="px-4 pb-3">
        <p className="text-gray-800 dark:text-gray-200 whitespace-pre-line">{post.content}</p>
      </div>
      
      {/* Post Image */}
      {post.imageUrl && (
        <div className="w-full">
          <img 
            src={post.imageUrl} 
            alt="Post content" 
            className="w-full object-cover max-h-96" 
          />
        </div>
      )}
      
      {/* Post Stats */}
      <div className="px-4 py-2 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700">
        <div className="flex space-x-4">
          <span>{likesCount} likes</span>
          <button onClick={toggleComments}>
            {post.comments} comments
          </button>
        </div>
      </div>
      
      {/* Post Actions */}
      <div className="flex px-2 py-2 border-t border-gray-100 dark:border-gray-700">
        <button 
          onClick={toggleLike}
          className={`flex items-center justify-center w-1/4 py-2 text-sm font-medium rounded-lg ${
            liked 
              ? 'text-red-500' 
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          <Heart className={`w-5 h-5 mr-1 ${liked ? 'fill-current' : ''}`} />
          Like
        </button>
        <button 
          onClick={toggleComments}
          className="flex items-center justify-center w-1/4 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 rounded-lg"
        >
          <MessageCircle className="w-5 h-5 mr-1" />
          Comment
        </button>
        <button className="flex items-center justify-center w-1/4 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 rounded-lg">
          <Share2 className="w-5 h-5 mr-1" />
          Share
        </button>
        <button 
          onClick={toggleSaved}
          className={`flex items-center justify-center w-1/4 py-2 text-sm font-medium rounded-lg ${
            saved 
              ? 'text-blue-600 dark:text-blue-500' 
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          <Bookmark className={`w-5 h-5 mr-1 ${saved ? 'fill-current' : ''}`} />
          Save
        </button>
      </div>
      
      {/* Comments Section */}
      {showComments && (
        <div className="border-t border-gray-100 dark:border-gray-700 p-4">
          {/* Comment Form */}
          <form onSubmit={handleAddComment} className="mb-4 flex">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="flex-grow rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <button 
              type="submit"
              className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Post
            </button>
          </form>
          
          {/* Comments List */}
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="flex space-x-3">
                <Avatar src={comment.author.profileImage} alt={comment.author.name} size="sm" />
                <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2 relative">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">{comment.author.name}</h4>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{formatDate(comment.createdAt)}</span>
                  </div>
                  <p className="text-sm text-gray-800 dark:text-gray-200 mt-1">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;