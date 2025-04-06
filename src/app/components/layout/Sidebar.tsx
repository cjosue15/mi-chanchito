'use client';

import {
  LucideArrowRightLeft,
  LucideChartPie,
  LucideHouse,
  LucideWallet,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface MenuItem {
  label: string;
  path: string;
  icon?: React.ReactNode;
}

const MENU: MenuItem[] = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: <LucideHouse />,
  },
  {
    label: 'Transacciones',
    path: '/transactions',
    icon: <LucideArrowRightLeft />,
  },
  {
    label: 'Presupuestos',
    path: '/budgets',
    icon: <LucideChartPie />,
  },
  {
    label: 'Categorías',
    path: '/categories',
    icon: <LucideChartPie />,
  },
];

function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      <div className='h-screen bg-primary flex flex-col transition-all duration-300 border-r w-[240px]'>
        <div className='flex items-center p-4 gap-2'>
          <LucideWallet className='text-white' />
          <span className='text-white'>My Chanchito</span>
        </div>

        <div className='mt-4 flex-1'>
          <nav className='space-y-2 px-2'>
            {MENU.map((item, index) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={index}
                  href={item.path}
                  className={`flex items-center space-x-3 p-3 rounded-xl transition-colors justify-cente ${
                    isActive
                      ? 'bg-black text-white'
                      : 'text-white hover:bg-black hover:text-white'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {/* {!collapsed && <span>{item.name}</span>} */}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
