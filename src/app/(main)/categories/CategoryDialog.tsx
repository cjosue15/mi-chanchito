'use client';

import { useCategory } from '@/hooks/category/useCategory';
import {
  Category,
  CategoryWithId,
} from '@/infraestructure/interfaces/category/category.interface';
import { useAuthContext } from '@/providers/AuthProvider';
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
      onClose();
    } catch (error) {
      toast.error(
        `${isUpdating ? 'Error editando' : 'Error creando'} la categoría`
      );
    }
  };

  return (
    <CategoryForm
      submitValues={handleSubmit}
      isLoading={
        createCategoryMutation.isPending || updateCategoryMutation.isPending
      }
      editingCategory={editingCategory}
      closeDialog={() => onClose()}
    />
  );
}
