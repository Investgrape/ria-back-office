import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Shield,
  FileCheck,
  BookOpen,
  AlertTriangle,
  Calendar,
  Users,
  BarChart2,
  ChevronRight,
  Bell
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState([]);
  
  const navigationItems = [
    {
      name: 'Client Agreements',
      path: '/agreements',
      icon: FileCheck,
      subItems: [
        { name: 'Pending Review', path: '/agreements/pending' },
        { name: 'Completed', path: '/agreements/completed' },
        { name: 'Templates', path: '/agreements/templates' }
      ]
    },
    {
      name: 'Audit',
      path: '/audit',
      icon: Shield,
      subItems: [
        { name: 'Form ADV', path: '/audit/form-adv' },
        { name: 'Risk Assessment', path: '/audit/risk' },
        { name: 'Compliance Calendar', path: '/audit/calendar' }
      ]
    },
    {
      name: 'Documents',
      path: '/documents',
      icon: BookOpen,
      subItems: [
        { name: 'Policies', path: '/documents/policies' },
        { name: 'Procedures', path: '/documents/procedures' },
        { name: 'Forms', path: '/documents/forms' }
      ]
    },
    { name: 'Risk Management', path: '/risk', icon: AlertTriangle },
    { name: 'Deadlines', path: '/deadlines', icon: Calendar },
    { name: 'Team Access', path: '/team', icon: Users },
    { name: 'Reports', path: '/reports', icon: BarChart2 }
  ];

  const toggleMenu = (path) => {
    setOpenMenus(current =>
      current.includes(path)
        ? current.filter(p => p !== path)
        : [...current, path]
    );
  };

  const isActive = (path) => location.pathname === path;
  const isMenuOpen = (path) => openMenus.includes(path);

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
        <div className="flex h-16 shrink-0 items-center">
          <div className="flex items-center gap-x-3">
            <div className="rounded-lg bg-blue-600 p-2">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <span className="text-lg font-semibold">RIA Compliance</span>
          </div>
        </div>
        
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-1">
            {navigationItems.map((item) => (
              <li key={item.path}>
                <div className="space-y-1">
                  <button
                    onClick={() => item.subItems && toggleMenu(item.path)}
                    className={`flex w-full items-center justify-between gap-x-3 rounded-lg px-3 py-2 text-sm font-medium ${
                      isActive(item.path)
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <div className="flex items-center gap-x-3">
                      <item.icon className="h-5 w-5 shrink-0" />
                      <span>{item.name}</span>
                    </div>
                    {item.subItems && (
                      <ChevronRight
                        className={`h-4 w-4 shrink-0 transition-transform ${
                          isMenuOpen(item.path) ? 'rotate-90' : ''
                        }`}
                      />
                    )}
                  </button>
                  
                  {item.subItems && isMenuOpen(item.path) && (
                    <ul className="ml-8 space-y-1">
                      {item.subItems.map((subItem) => (
                        <li key={subItem.path}>
                          <Link
                            to={subItem.path}
                            className={`block rounded-lg px-3 py-2 text-sm font-medium ${
                              isActive(subItem.path)
                                ? 'bg-blue-50 text-blue-600'
                                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                          >
                            {subItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </nav>

        {/* Updates Section */}
        <div className="mt-auto">
          <div className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Bell className="w-5 h-5 text-gray-600" />
              <div>
                <span className="block text-sm font-medium">Latest Updates</span>
                <span className="block text-xs text-gray-500">What's new?</span>
              </div>
            </div>
            <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-600 rounded-full">
              New
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;