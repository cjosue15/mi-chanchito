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
import { useCategory } from '@/hooks/category/useCategory';
import {
  Category,
  CategoryWithId,
} from '@/infraestructure/interfaces/category/category.interface';
import { useAuthContext } from '@/providers/AuthProvider';
import { LucidePlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import CategoryForm from './CategoryForm';

interface CategoryDialogProps {
  editingCategory?: CategoryWithId;
  onClose: () => void;
}

export function CategoryDialog({
  editingCategory,
  onClose,
}: CategoryDialogProps) {
  const { createCategoryMutation, updateCategoryMutation } = useCategory();
  const { user } = useAuthContext();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (editingCategory) {
      setIsOpen(true);
    }
  }, [editingCategory]);

  const handleSubmit = async (category: Category) => {
    if (!user) return;

    const isUpdating = !!editingCategory;

    try {
      isUpdating
        ? await updateCategoryMutation.mutateAsync({
            ...category,
            id: editingCategory?.id,
            userId: user.id,
          })
        : await createCategoryMutation.mutateAsync({
            ...category,
            userId: user.id,
          });

      toast.success(
        `${isUpdating ? 'Categoría actualizada' : 'Categoría creada'} con éxito`
      );
      setIsOpen(false);
    } catch (error) {
      toast.error(
        `${isUpdating ? 'Error editando' : 'Error creando'} la categoría`
      );
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(isOpen) => {
        setIsOpen(isOpen);
        onClose();
      }}
    >
      <DialogTrigger asChild>
        <Button className='rounded-full cursor-pointer'>
          <LucidePlus /> Nueva Categoría
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>
            {editingCategory ? 'Editar categoría' : 'Crear nueva categoría'}
          </DialogTitle>
          <DialogDescription>
            {editingCategory
              ? 'Modifica los detalles de la categoría existente.'
              : 'Crea una nueva categoría para tus transacciones.'}
          </DialogDescription>
        </DialogHeader>
        <CategoryForm
          submitValues={handleSubmit}
          isLoading={
            createCategoryMutation.isPending || updateCategoryMutation.isPending
          }
          editingCategory={editingCategory}
        />
      </DialogContent>
    </Dialog>
  );
}
