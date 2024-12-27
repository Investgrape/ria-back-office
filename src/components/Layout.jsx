import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import TopBar from './TopBar';

const navigationItems = [
  {
    path: '/dashboard',
    label: 'Dashboard',
    icon: 'dashboard'
  },
  {
    path: '/employees',
    label: 'Employees',
    icon: 'people'
  },
  {
    path: '/audit',
    label: 'Audit',
    icon: 'fact_check'
  },
  {
    path: '/documents',
    label: 'Documents',
    icon: 'description'
  },
  {
    path: '/marketing',
    label: 'Marketing',
    icon: 'campaign'
  },
  {
    path: '/email',
    label: 'Email',
    icon: 'email'
  },
  {
    path: '/agreements',
    label: 'Client Agreements',
    icon: 'handshake'
  }
];

export default function Layout({ children }) {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-sm">
        <div className="flex items-center h-16 px-4 border-b border-gray-200">
          <span className="text-lg font-semibold">RIA Back Office</span>
        </div>
        <nav className="p-4 space-y-1">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                location.pathname === item.path ? 'bg-green-50 text-green-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="material-icons-outlined">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      <div className="flex-1">
        <TopBar />
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}