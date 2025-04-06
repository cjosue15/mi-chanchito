'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Category } from '@/infraestructure/interfaces/category/category.interface';
import { LucidePlus } from 'lucide-react';
import CategoryForm from './CategoryForm';

export function CategoryDialog() {
  const handleSubmit = (category: Category) => {
    console.log(category);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='rounded-full cursor-pointer'>
          <LucidePlus /> Nueva Categoría
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>
            {/* {editingCategory ? 'Editar categoría' : 'Crear nueva categoría'} */}
            Crear nueva categoría
          </DialogTitle>
          <DialogDescription>
            {/* {editingCategory 
                ? 'Modifica los detalles de la categoría existente.' 
                : 'Crea una nueva categoría para tus transacciones.'} */}
            Crea una nueva categoría para tus transacciones.
          </DialogDescription>
        </DialogHeader>
        <CategoryForm submitValues={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
}
