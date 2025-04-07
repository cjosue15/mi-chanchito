import { createCategory } from '@/core/actions/category/create-category';
import { getCategories } from '@/core/actions/category/get-categories';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useAuthContext } from '@/providers/AuthProvider';
import { deleteCategory } from '@/core/actions/category/delete-category';
import { updateCategory } from '@/core/actions/category/update-category';

export const useCategory = () => {
  const { user } = useAuthContext();

  const getCategoriesQuery = useQuery({
    queryKey: ['categories', user!.id],
    queryFn: () => getCategories(user!.id),
    enabled: !!user?.id,
  });

  const createCategoryMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      getCategoriesQuery.refetch();
    },
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      getCategoriesQuery.refetch();
    },
  });

  const updateCategoryMutation = useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      getCategoriesQuery.refetch();
    },
  });

  return {
    createCategoryMutation,
    getCategoriesQuery,
    deleteCategoryMutation,
    updateCategoryMutation,
  };
};
