'use client';

import { MENU } from '@/lib/menu';
import { LucideWallet } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
                      ? 'bg-white text-primary'
                      : 'text-white hover:bg-white hover:text-primary'
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
