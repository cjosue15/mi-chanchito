import {
  LucideArrowRightLeft,
  LucideChartPie,
  LucideHouse,
  LucideSettings,
} from 'lucide-react';

interface MenuItem {
  label: string;
  path: string;
  icon?: React.ReactNode;
}

export const MENU: MenuItem[] = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: <LucideHouse size={18} />,
  },
  {
    label: 'Transacciones',
    path: '/transactions',
    icon: <LucideArrowRightLeft size={18} />,
  },
  {
    label: 'Categorías',
    path: '/categories',
    icon: <LucideChartPie size={18} />,
  },
  {
    label: 'Ajustes',
    path: '/settings',
    icon: <LucideSettings size={18} />,
  },
];
