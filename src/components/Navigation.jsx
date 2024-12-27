import React from 'react';
import { Link } from 'react-router-dom';
import { navigationItems } from '../navigation/NavigationItems';

export default function Navigation() {
  return (
    <nav className="flex flex-col space-y-1">
      {navigationItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
        >
          <span className="material-icons-outlined mr-3">{item.icon}</span>
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}