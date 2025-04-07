'use client';
import Sidebar from '../components/layout/Sidebar';
import { useAuth } from '@/hooks/auth/useAuth';
import { redirect } from 'next/navigation';

function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { getUserMutation } = useAuth();

  const { data: user, isLoading } = getUserMutation;

  if (isLoading) return <div>Cargando...</div>;

  if (!user) {
    return redirect('/auth');
  }

  return (
    <div className='flex h-screen overflow-hidden bg-background'>
      <Sidebar />
      <main className='p-8 flex-1'>{children}</main>
    </div>
  );
}

export default MainLayout;
