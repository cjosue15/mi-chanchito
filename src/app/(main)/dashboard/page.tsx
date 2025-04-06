import HeaderPage from '@/app/components/HeaderPage';
import { Button } from '@/components/ui/button';
import { LucidePlus } from 'lucide-react';
import React from 'react';

function DashboardPage() {
  return (
    <div>
      <HeaderPage
        title='¡Hola, Marcos!'
        subtitle='Bienvenido a tu Billetera Inteligente'
      >
        <Button className='rounded-full cursor-pointer'>
          <LucidePlus /> Nueva Transacción
        </Button>
      </HeaderPage>
    </div>
  );
}

export default DashboardPage;
