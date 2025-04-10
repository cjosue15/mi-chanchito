import { MENU } from '@/lib/menu';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

function MobileNavbar() {
  const pathname = usePathname();

  return (
    <div className='md:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-2 z-10'>
      <div className='flex justify-between items-center'>
        {MENU.map((item, index) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={index}
              href={item.path}
              className={`flex flex-col items-center p-2 ${
                isActive ? 'text-primary' : 'text-gray-500'
              }`}
            >
              {item.icon}
              <span className='text-xs mt-1'>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default MobileNavbar;
