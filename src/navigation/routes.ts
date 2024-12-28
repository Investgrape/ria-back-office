import { IconProps } from 'lucide-react';
import { FileText, HomeIcon, UsersIcon, FolderIcon, CalendarIcon, ChartBarIcon, InboxIcon } from 'lucide-react';

export interface RouteConfig {
  name: string;
  path: string;
  icon: React.ForwardRefExoticComponent<IconProps>;
}

export const routes: RouteConfig[] = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: HomeIcon
  },
  {
    name: 'Agreements',
    path: '/agreements',
    icon: FileText
  },
  {
    name: 'Clients',
    path: '/clients',
    icon: UsersIcon
  },
  {
    name: 'Documents',
    path: '/documents',
    icon: FolderIcon
  },
  {
    name: 'Calendar',
    path: '/calendar',
    icon: CalendarIcon
  },
  {
    name: 'Assets',
    path: '/assets',
    icon: ChartBarIcon
  },
  {
    name: 'Messages',
    path: '/messages',
    icon: InboxIcon
  }
];