import { Category } from '@/infraestructure/interfaces/category/category.interface';
import { supabase } from '@/lib/db';

export const createCategory = async (
  category: Category & { userId: string }
): Promise<void> => {
  try {
    const { error } = await supabase.from('categories').insert({
      name: category.name,
      type: category.type,
      icon: category.icon,
      user_id: category.userId,
    });

    if (error) {
      throw error;
    }
  } catch (error) {
    throw error;
  }
};
