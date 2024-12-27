import Link from 'next/link';
import { usePathname } from 'next/navigation';

const items = [
  {
    title: 'Dashboard',
    href: '/',
    icon: 'LayoutDashboard'
  },
  {
    title: 'Employees',
    href: '/employees',
    icon: 'Users'
  },
  {
    title: 'Agreements',
    href: '/agreements',
    icon: 'FileText'
  }
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="grid items-start gap-2">
      {items.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground ${isActive ? 'bg-accent' : 'transparent'}`}
          >
            <span>{item.title}</span>
          </Link>
        );
      })}
    </nav>
  );
}