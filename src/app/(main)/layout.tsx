'use client';
import Sidebar from '../components/layout/Sidebar';
import { useAuth } from '@/hooks/auth/useAuth';
import { useIsMobile } from '@/hooks/useMobile';
import { redirect } from 'next/navigation';
import MobileNavbar from '../components/layout/MobileNavbar';

function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { getUserMutation } = useAuth();

  const isMobile = useIsMobile();

  const { data: user, isLoading } = getUserMutation;

  if (isLoading) return <div>Cargando...</div>;

  if (!user) {
    return redirect('/auth');
  }

  return (
    <div className='flex h-screen overflow-hidden bg-background'>
      {!isMobile ? <Sidebar /> : <MobileNavbar />}

      <main
        className={`p-8 flex-1 overflow-auto ${
          !isMobile ? 'h-screen' : 'h-[calc(100vh-80px)]'
        }`}
      >
        {children}
      </main>
    </div>
  );
}

export default MainLayout;
