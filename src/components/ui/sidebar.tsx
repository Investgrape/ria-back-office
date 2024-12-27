import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
  { href: '/employees', label: 'Employees', icon: 'people' },
  { href: '/audit', label: 'Audit', icon: 'fact_check' },
  { href: '/documents', label: 'Documents', icon: 'description' },
  { href: '/marketing', label: 'Marketing', icon: 'campaign' },
  { href: '/email', label: 'Email', icon: 'email' },
  { href: '/agreements', label: 'Client Agreements', icon: 'description' }
];

export function Sidebar() {
  const location = useLocation();

  return (
    <nav className="space-y-1">
      {navItems.map((item) => {
        const isActive = location.pathname === item.href;
        return (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              'flex items-center px-3 py-2 text-sm font-medium rounded-md',
              isActive
                ? 'bg-emerald-50 text-emerald-600'
                : 'text-gray-600 hover:bg-gray-50'
            )}
          >
            <span className="material-icons-outlined mr-2">{item.icon}</span>
            <span className="truncate">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}