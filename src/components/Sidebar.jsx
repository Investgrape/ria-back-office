import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FileText, 
  Mail, 
  Users, 
  Briefcase, 
  ClipboardList,
  FileContract
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  
  const navigationItems = [
    { name: 'Documents', path: '/documents', icon: FileText },
    { name: 'Email', path: '/email', icon: Mail },
    { name: 'Employees', path: '/employees', icon: Users },
    { name: 'Marketing', path: '/marketing', icon: Briefcase },
    { name: 'Audit', path: '/audit', icon: ClipboardList },
    { name: 'Client Agreements', path: '/agreements', icon: FileContract }
  ];

  return (
    <div className="w-64 bg-gray-800 min-h-screen text-white p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">RIA Back Office</h1>
      </div>
      <nav>
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700 transition-colors ${
                    isActive ? 'bg-gray-700' : ''
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;