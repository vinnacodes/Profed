import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User } from '../../types';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const [isFollowing, setIsFollowing] = useState(user.isFollowing || false);

  const toggleFollow = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFollowing(!isFollowing);
  };

  return (
    <Link 
      to={`/profile/${user.username}`}
      className="block bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="h-20 bg-gradient-to-r from-blue-400 to-purple-500"></div>
      <div className="p-4">
        <div className="flex justify-between">
          <div className="-mt-12">
            <Avatar
              src={user.profileImage}
              alt={user.name}
              size="lg"
              className="border-4 border-white dark:border-gray-800"
            />
          </div>
          <Button
            size="sm"
            variant={isFollowing ? 'outline' : 'primary'}
            onClick={toggleFollow}
          >
            {isFollowing ? 'Following' : 'Follow'}
          </Button>
        </div>
        
        <div className="mt-2">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">{user.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">@{user.username}</p>
          <p className="mt-1 text-sm text-gray-700 dark:text-gray-300 line-clamp-2">{user.bio}</p>
          
          <div className="flex mt-3 space-x-4 text-sm">
            <div>
              <span className="font-medium text-gray-900 dark:text-white">{user.followers.toLocaleString()}</span>
              <span className="text-gray-500 dark:text-gray-400"> followers</span>
            </div>
            <div>
              <span className="font-medium text-gray-900 dark:text-white">{user.following.toLocaleString()}</span>
              <span className="text-gray-500 dark:text-gray-400"> following</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default UserCard;