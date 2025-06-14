import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, PenSquare, MessageCircle, User } from 'lucide-react';

interface MobileNavProps {
  className?: string;
}

const MobileNav: React.FC<MobileNavProps> = ({ className = '' }) => {
  const location = useLocation();
  
  const navItems = [
    { to: '/', icon: <Home />, label: 'Home' },
    { to: '/search', icon: <Search />, label: 'Search' },
    { to: '/create', icon: <PenSquare />, label: 'Create' },
    { to: '/messages', icon: <MessageCircle />, label: 'Messages' },
    { to: '/profile', icon: <User />, label: 'Profile' },
  ];

  return (
    <div className={`bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 ${className}`}>
      <div className="grid grid-cols-5">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center justify-center py-3 ${
                isActive 
                  ? 'text-blue-600 dark:text-blue-500' 
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              <div className="w-6 h-6">
                {item.icon}
              </div>
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNav;