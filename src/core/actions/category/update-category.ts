import { CategoryWithId } from '@/infraestructure/interfaces/category/category.interface';
import { supabase } from '@/lib/db';

export const updateCategory = async (
  category: CategoryWithId & { userId: string }
): Promise<void> => {
  try {
    const { error } = await supabase
      .from('categories')
      .update({
        name: category.name,
        type: category.type,
        icon: category.icon,
        user_id: category.userId,
      })
      .eq('id', category.id);

    if (error) {
      throw error;
    }
  } catch (error) {
    throw error;
  }
};
