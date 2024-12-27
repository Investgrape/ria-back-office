import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, Search, Menu, X, ChevronDown, User } from 'lucide-react';

interface NavigationItem {
  path: string;
  label: string;
  icon: string;
}

const navigationItems: NavigationItem[] = [
  { path: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
  { path: '/documents', label: 'Documents', icon: 'description' },
  { path: '/email', label: 'Email', icon: 'email' },
  { path: '/employees', label: 'Employees', icon: 'people' },
  { path: '/marketing', label: 'Marketing', icon: 'campaign' },
  { path: '/audit', label: 'Audit', icon: 'fact_check' },
  { path: '/agreements', label: 'Client Agreements', icon: 'handshake' }
];

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Get current page title
  const currentPage = navigationItems.find(item => item.path === location.pathname)?.label || 'Dashboard';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <header className="bg-white shadow-sm fixed w-full z-10">
        <div className="flex items-center justify-between h-16 px-4">
          <div className="flex items-center">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <span className="ml-4 text-lg font-semibold">RIA Back Office</span>
          </div>
          
          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                  <User size={20} className="text-emerald-600" />
                </div>
                <ChevronDown size={16} className="text-gray-600" />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1">
                  <a href="#profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</a>
                  <a href="#settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                  <a href="#logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="px-4 py-2 border-t border-gray-100">
          <div className="text-sm text-gray-600">
            <Link to="/dashboard" className="hover:text-emerald-600">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{currentPage}</span>
          </div>
        </div>
      </header>

      <div className="pt-24 flex">
        {/* Sidebar Navigation */}
        <aside className={`fixed left-0 z-10 h-full bg-white shadow-sm transition-all duration-300 ${
          isSidebarOpen ? 'w-64' : 'w-0 -translate-x-full'
        }`}>
          <nav className="p-4 space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'bg-emerald-50 text-emerald-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span className="material-icons-outlined">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? 'ml-64' : 'ml-0'
        }`}>
          <div className="px-6 py-4">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;