import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const navItems = [
  { href: '/', label: 'Dashboard', icon: 'ChartBarIcon' },
  { href: '/employees', label: 'Employees', icon: 'UsersIcon' },
  { href: '/audit', label: 'Audit', icon: 'ShieldCheckIcon' },
  { href: '/documents', label: 'Documents', icon: 'DocumentTextIcon' },
  { href: '/marketing', label: 'Marketing', icon: 'SpeakerphoneIcon' },
  { href: '/email', label: 'Email', icon: 'MailIcon' },
  { href: '/agreements', label: 'Client Agreements', icon: 'DocumentDuplicateIcon' }
];

export function Sidebar() {
  const router = useRouter();

  return (
    <nav className="space-y-1">
      {navItems.map((item) => {
        const isActive = router.pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive
              ? 'bg-green-50 text-green-700'
              : 'text-gray-600 hover:bg-gray-50'
              }`}
          >
            <span className="truncate">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}