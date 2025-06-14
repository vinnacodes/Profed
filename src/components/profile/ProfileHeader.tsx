import React, { useState } from 'react';
import { Edit, MapPin } from 'lucide-react';
import { User } from '../../types';
import Button from '../ui/Button';
import Avatar from '../ui/Avatar';
import { useAuth } from '../../context/AuthContext';

interface ProfileHeaderProps {
  user: User;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  const { currentUser } = useAuth();
  const [isFollowing, setIsFollowing] = useState(user.isFollowing || false);

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const isCurrentUser = currentUser?.id === user.id;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden mb-6">
      {/* Cover Photo */}
      <div 
        className="relative h-48 bg-gray-300 dark:bg-gray-700 bg-center bg-cover" 
        style={{ backgroundImage: `url(${user.coverImage})` }}
      >
        {isCurrentUser && (
          <button className="absolute bottom-4 right-4 p-2 bg-black bg-opacity-60 rounded-full text-white">
            <Edit className="w-5 h-5" />
          </button>
        )}
      </div>
      
      {/* Profile Info */}
      <div className="px-4 sm:px-6 pb-6 relative">
        {/* Avatar */}
        <div className="flex justify-between">
          <div className="-mt-12 relative">
            <Avatar
              src={user.profileImage}
              alt={user.name}
              size="xl"
              className="border-4 border-white dark:border-gray-800"
            />
            {isCurrentUser && (
              <button className="absolute bottom-1 right-1 p-1 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300 shadow-sm">
                <Edit className="w-4 h-4" />
              </button>
            )}
          </div>
          
          {/* Action Buttons */}
          <div className="mt-4 flex space-x-2">
            {isCurrentUser ? (
              <Button variant="outline">Edit Profile</Button>
            ) : (
              <>
                <Button
                  variant={isFollowing ? 'outline' : 'primary'}
                  onClick={toggleFollow}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </Button>
                <Button variant="outline">Message</Button>
              </>
            )}
          </div>
        </div>
        
        {/* Profile Text */}
        <div className="mt-4">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
          <p className="text-gray-500 dark:text-gray-400">@{user.username}</p>
          
          <p className="mt-2 text-gray-700 dark:text-gray-300">{user.bio}</p>
          
          <div className="flex items-center mt-2 text-gray-500 dark:text-gray-400">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">San Francisco, CA</span>
          </div>
          
          {/* Stats */}
          <div className="flex space-x-6 mt-4">
            <div>
              <span className="font-semibold text-gray-900 dark:text-white">{user.followers.toLocaleString()}</span>
              <span className="text-gray-500 dark:text-gray-400 ml-1">Followers</span>
            </div>
            <div>
              <span className="font-semibold text-gray-900 dark:text-white">{user.following.toLocaleString()}</span>
              <span className="text-gray-500 dark:text-gray-400 ml-1">Following</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;