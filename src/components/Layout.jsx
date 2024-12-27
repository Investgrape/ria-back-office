import React from 'react';
import { useLocation } from 'react-router-dom';

const menuItems = [
  { icon: 'dashboard', label: 'Dashboard', path: '/' },
  { icon: 'group', label: 'Employees', path: '/employees' },
  { icon: 'shield', label: 'Audit', path: '/audit' },
  { icon: 'description', label: 'Documents', path: '/documents' },
  { icon: 'campaign', label: 'Marketing', path: '/marketing' },
  { icon: 'email', label: 'Email', path: '/email' },
  { icon: 'description', label: 'Client Agreements', path: '/agreements' }
];

export default function Layout({ children }) {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm">
        <div className="flex items-center justify-center h-16 border-b">
          <span className="text-xl font-semibold">RIA Back Office</span>
        </div>
        <nav className="mt-6">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <a
                key={item.path}
                href={item.path}
                className={`flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50 ${isActive ? 'bg-green-50 text-green-600' : ''}`}
              >
                <span className="material-icons-outlined mr-3">{item.icon}</span>
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}