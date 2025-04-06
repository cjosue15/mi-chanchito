import React from 'react';
import Sidebar from '../components/layout/Sidebar';

function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex h-screen overflow-hidden bg-background'>
      <Sidebar />
      <main className='p-8 flex-1'>{children}</main>
    </div>
  );
}

export default MainLayout;
