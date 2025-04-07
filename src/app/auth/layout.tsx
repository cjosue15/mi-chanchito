'use client';

import { useAuth } from '@/hooks/auth/useAuth';
import { redirect } from 'next/navigation';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { getUserMutation } = useAuth();

  const { data: user, isLoading } = getUserMutation;

  if (isLoading) return <div>Cargando...</div>;

  if (user) {
    return redirect('/dashboard');
  }

  return <>{children}</>;
}
