import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface SidebarNavItem {
  title: string;
  href: string;
  icon: string;
}

interface SidebarNavProps {
  items: SidebarNavItem[];
}

export function SidebarNav({ items }: SidebarNavProps) {
  const location = useLocation();

  return (
    <nav className="grid items-start gap-2">
      {items.map((item) => {
        const isActive = location.pathname === item.href;
        return (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100',
              isActive ? 'bg-gray-100' : 'transparent'
            )}
          >
            <span className="material-icons-outlined">{item.icon}</span>
            <span>{item.title}</span>
          </Link>
        );
      })}
    </nav>
  );
}