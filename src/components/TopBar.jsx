import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const TopBar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const notifications = [
    { id: 1, type: 'task', message: 'New compliance task assigned', time: '5m ago' },
    { id: 2, type: 'alert', message: 'Document review needed', time: '10m ago' },
    { id: 3, type: 'update', message: 'Client agreement updated', time: '1h ago' },
    { id: 4, type: 'deadline', message: 'ADV filing due in 30 days', time: '2h ago' }
  ];

  const userMenuItems = [
    { label: 'Profile Settings', icon: 'person_outline' },
    { label: 'Company Settings', icon: 'settings' },
    { label: 'Help Center', icon: 'help_outline' },
    { label: 'Sign Out', icon: 'logout' }
  ];

  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="h-16 flex items-center justify-between px-4">
        {/* Left Section */}
        <div className="flex items-center">
          <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
            <span className="text-white text-lg font-semibold">R</span>
          </div>
          <button className="ml-4 text-gray-400 hover:text-gray-600">
            <span className="material-icons-outlined">arrow_back</span>
          </button>
        </div>

        {/* Center Section - Search */}
        <div className="flex-1 max-w-2xl mx-4 relative">
          {showSearch ? (
            <div className="absolute inset-0 bg-white z-10 rounded-lg shadow-lg">
              <div className="flex items-center h-10 px-3">
                <span className="material-icons-outlined text-gray-400">search</span>
                <input
                  autoFocus
                  type="text"
                  placeholder="Search clients, documents, tasks..."
                  className="w-full px-3 py-2 focus:outline-none"
                  onBlur={() => setShowSearch(false)}
                />
                <button 
                  onClick={() => setShowSearch(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <span className="material-icons-outlined">close</span>
                </button>
              </div>
              <div className="border-t p-2">
                <div className="text-xs text-gray-500 px-2 py-1">QUICK ACTIONS</div>
                <div className="space-y-1">
                  <button className="w-full text-left px-2 py-1 hover:bg-gray-50 rounded text-sm">
                    Create new client
                  </button>
                  <button className="w-full text-left px-2 py-1 hover:bg-gray-50 rounded text-sm">
                    Generate report
                  </button>
                  <button className="w-full text-left px-2 py-1 hover:bg-gray-50 rounded text-sm">
                    Add document
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button 
              onClick={() => setShowSearch(true)}
              className="w-full flex items-center h-10 px-3 bg-gray-50 rounded-lg hover:bg-gray-100 text-gray-500"
            >
              <span className="material-icons-outlined mr-2">search</span>
              <span className="text-sm">Search...</span>
              <span className="ml-auto text-xs text-gray-400">⌘K</span>
            </button>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
            Open Account
          </button>

          {/* Notifications */}
          <div className="relative">
            <button 
              className="relative text-gray-500 hover:text-gray-700"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <span className="material-icons-outlined">notifications</span>
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-blue-500 text-xs text-white flex items-center justify-center">
                4
              </span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-3 border-b">
                  <div className="text-sm font-medium">Notifications</div>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map(notification => (
                    <div key={notification.id} className="p-3 hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-start">
                        <span className="material-icons-outlined text-gray-400 mr-3">
                          {notification.type === 'task' ? 'task' : 
                           notification.type === 'alert' ? 'warning' :
                           notification.type === 'update' ? 'update' : 'event'}
                        </span>
                        <div>
                          <div className="text-sm">{notification.message}</div>
                          <div className="text-xs text-gray-500 mt-1">{notification.time}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-2 border-t">
                  <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <button 
              className="flex items-center space-x-2"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <img 
                src="/api/placeholder/32/32" 
                alt="Profile" 
                className="w-8 h-8 rounded-full"
              />
              <span className="material-icons-outlined text-gray-400">
                expand_more
              </span>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-3 border-b">
                  <div className="font-medium">John Doe</div>
                  <div className="text-sm text-gray-500">john@example.com</div>
                </div>
                <div className="p-2">
                  {userMenuItems.map((item, index) => (
                    <button
                      key={index}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
                    >
                      <span className="material-icons-outlined">{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;