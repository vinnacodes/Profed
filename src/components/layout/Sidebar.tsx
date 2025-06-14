import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Avatar from '../ui/Avatar';
import { 
  Home, 
  Search, 
  MessageCircle, 
  Bell, 
  User, 
  Bookmark, 
  Users, 
  Settings
} from 'lucide-react';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className = '' }) => {
  const { currentUser } = useAuth();

  const sidebarLinks = [
    { to: '/', icon: <Home className="w-5 h-5" />, label: 'Home' },
    { to: '/search', icon: <Search className="w-5 h-5" />, label: 'Search' },
    { to: '/messages', icon: <MessageCircle className="w-5 h-5" />, label: 'Messages' },
    { to: '/notifications', icon: <Bell className="w-5 h-5" />, label: 'Notifications' },
    { to: '/profile', icon: <User className="w-5 h-5" />, label: 'Profile' },
    { to: '/saved', icon: <Bookmark className="w-5 h-5" />, label: 'Saved Posts' },
    { to: '/friends', icon: <Users className="w-5 h-5" />, label: 'Friends' },
    { to: '/settings', icon: <Settings className="w-5 h-5" />, label: 'Settings' }
  ];

  return (
    <aside className={`${className}`}>
      <div className="fixed w-64 py-4 pr-2">
        {currentUser && (
          <Link to="/profile" className="flex items-center px-4 py-2 mb-6">
            <Avatar 
              src={currentUser.profileImage} 
              alt={currentUser.name} 
              size="md" 
            />
            <div className="ml-3">
              <p className="font-medium text-gray-900 dark:text-white">{currentUser.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">@{currentUser.username}</p>
            </div>
          </Link>
        )}
        
        <nav className="mt-2 space-y-1">
          {sidebarLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="group flex items-center px-4 py-3 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <span className="mr-3 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
                {link.icon}
              </span>
              <span className="font-medium group-hover:text-blue-600 dark:group-hover:text-blue-500">
                {link.label}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;