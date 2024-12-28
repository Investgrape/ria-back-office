import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Shield,
  FileCheck,
  AlertTriangle,
  Calendar,
  Users,
  BarChart,
  ChevronRight,
  BookOpen
} from 'lucide-react';

interface NavItem {
  title: string;
  icon: any;
  href: string;
  items?: { title: string; href: string }[];
}

const navigation: NavItem[] = [
  {
    title: 'Client Agreements',
    icon: FileCheck,
    href: '/agreements',
    items: [
      { title: 'Pending Review', href: '/agreements/pending' },
      { title: 'Completed', href: '/agreements/completed' },
      { title: 'Templates', href: '/agreements/templates' }
    ]
  },
  {
    title: 'Audit',
    icon: Shield,
    href: '/audit',
    items: [
      { title: 'Form ADV', href: '/audit/form-adv' },
      { title: 'Risk Assessment', href: '/audit/risk' },
      { title: 'Compliance Calendar', href: '/audit/calendar' }
    ]
  },
  {
    title: 'Documents',
    icon: BookOpen,
    href: '/documents',
    items: [
      { title: 'Policies', href: '/documents/policies' },
      { title: 'Procedures', href: '/documents/procedures' },
      { title: 'Forms', href: '/documents/forms' }
    ]
  },
  {
    title: 'Risk Management',
    icon: AlertTriangle,
    href: '/risk'
  },
  {
    title: 'Deadlines',
    icon: Calendar,
    href: '/deadlines'
  },
  {
    title: 'Team Access',
    icon: Users,
    href: '/team'
  },
  {
    title: 'Reports',
    icon: BarChart,
    href: '/reports'
  }
];

const Sidebar = () => {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const toggleMenu = (href: string) => {
    setOpenMenus(current =>
      current.includes(href)
        ? current.filter(item => item !== href)
        : [...current, href]
    );
  };

  const isActive = (href: string) => location.pathname.startsWith(href);
  const isMenuOpen = (href: string) => openMenus.includes(href);

  return (
    <div className="flex h-full flex-col gap-y-5 bg-white">
      <div className="flex h-16 shrink-0 items-center px-6 border-b border-gray-200">
        <div className="flex items-center gap-x-3">
          <div className="rounded-lg bg-blue-600 p-2">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <span className="text-lg font-semibold">RIA Compliance</span>
        </div>
      </div>
      <nav className="flex-1 px-4 pb-4">
        <ul role="list" className="flex flex-1 flex-col gap-y-1">
          {navigation.map((item) => (
            <li key={item.href}>
              <div className="space-y-1">
                {item.items ? (
                  <button
                    onClick={() => toggleMenu(item.href)}
                    className={cn(
                      'flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium',
                      isActive(item.href)
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    )}
                  >
                    <div className="flex items-center gap-x-3">
                      <item.icon className="h-5 w-5 shrink-0" />
                      <span>{item.title}</span>
                    </div>
                    <ChevronRight
                      className={cn(
                        'h-4 w-4 shrink-0 transition-transform',
                        isMenuOpen(item.href) && 'rotate-90'
                      )}
                    />
                  </button>
                ) : (
                  <Link
                    to={item.href}
                    className={cn(
                      'flex items-center gap-x-3 rounded-lg px-3 py-2 text-sm font-medium',
                      isActive(item.href)
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    )}
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    <span>{item.title}</span>
                  </Link>
                )}
                {item.items && isMenuOpen(item.href) && (
                  <ul className="mt-1 space-y-1">
                    {item.items.map((subItem) => (
                      <li key={subItem.href}>
                        <Link
                          to={subItem.href}
                          className={cn(
                            'block rounded-lg py-2 pl-11 pr-3 text-sm font-medium',
                            isActive(subItem.href)
                              ? 'bg-blue-50 text-blue-600'
                              : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                          )}
                        >
                          {subItem.title}
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
    </div>
  );
};

export default Sidebar;