import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row">
          <Sidebar className="hidden md:block w-64 flex-shrink-0" />
          <main className="flex-1 min-w-0 overflow-hidden">
            <div className="py-2">
              {children}
            </div>
          </main>
        </div>
      </div>
      <MobileNav className="md:hidden fixed bottom-0 left-0 right-0 z-10" />
    </div>
  );
};

export default Layout;