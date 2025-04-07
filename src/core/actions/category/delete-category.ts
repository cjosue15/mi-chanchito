import { supabase } from '@/lib/db';

export const deleteCategory = async (categoryId: string) => {
  try {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', categoryId);

    if (error) {
      throw error;
    }
  } catch (error) {
    throw error;
  }
};
