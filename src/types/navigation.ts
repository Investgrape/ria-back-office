import { LucideIcon } from 'lucide-react';

export interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
  current?: boolean;
}

export interface RouteConfig extends NavItem {
  element?: React.ReactNode;
  children?: RouteConfig[];
}