import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, UserPlus, Mail } from 'lucide-react';
import Avatar from '../ui/Avatar';
import { Notification } from '../../types';

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onMarkAsRead }) => {
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else if (diffDays < 7) {
      return `${diffDays}d ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const getIcon = () => {
    switch (notification.type) {
      case 'like':
        return <Heart className="w-5 h-5 text-red-500" />;
      case 'comment':
        return <MessageCircle className="w-5 h-5 text-blue-500" />;
      case 'follow':
        return <UserPlus className="w-5 h-5 text-purple-500" />;
      case 'message':
        return <Mail className="w-5 h-5 text-green-500" />;
      default:
        return null;
    }
  };

  const getLinkTarget = () => {
    switch (notification.type) {
      case 'like':
      case 'comment':
        return `/post/${notification.targetId}`;
      case 'follow':
        return `/profile/${notification.actor.username}`;
      case 'message':
        return `/messages/${notification.targetId}`;
      default:
        return '#';
    }
  };

  return (
    <Link
      to={getLinkTarget()}
      className={`block px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
        !notification.isRead ? 'bg-blue-50 dark:bg-blue-900/20' : ''
      }`}
      onClick={() => {
        if (!notification.isRead) {
          onMarkAsRead(notification.id);
        }
      }}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-3">
          <Avatar src={notification.actor.profileImage} alt={notification.actor.name} size="sm" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <p className={`text-sm ${notification.isRead ? 'text-gray-600 dark:text-gray-300' : 'text-gray-900 dark:text-white font-medium'}`}>
              <span className="font-medium">{notification.actor.name}</span> {notification.content}
            </p>
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-2 whitespace-nowrap">
              {formatTime(notification.createdAt)}
            </span>
          </div>
        </div>
        
        <div className="ml-3 flex-shrink-0">
          {getIcon()}
        </div>
      </div>
    </Link>
  );
};

export default NotificationItem;