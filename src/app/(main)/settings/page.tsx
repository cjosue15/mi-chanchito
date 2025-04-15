'use client';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/auth/useAuth';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

function SettingsPage() {
  const { signOutMutation } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOutMutation.mutateAsync();
      toast.success('Sesión cerrada');
      // router.push('/auth');
    } catch (error) {
      toast.error('Error al cerrar sesión');
    }

    // const promise = signOutMutation.mutateAsync();
    // toast.promise(promise, {
    //   loading: 'Cerrando sesión...',
    //   success: () => {
    //     router.push('/auth');

    //     return 'Sesión cerrada';
    //   },
    //   error: 'Error al cerrar sesión',
    // });
  };

  return (
    <div>
      <Button variant='destructive' onClick={handleSignOut}>
        Cerrar sesión
      </Button>
    </div>
  );
}

export default SettingsPage;
