import { Category } from '@/infraestructure/interfaces/category/category.interface';
import { supabase } from '@/lib/db';

export const createCategory = async (category: Category): Promise<void> => {
  try {
    const { error } = await supabase.from('habits').insert({
      name: category.name,
      type: category.type,
      icon: category.icon,
      user_id: '',
    });

    if (error) {
      throw 'Error creando la categoría';
    }
  } catch (error: any) {
    throw error.message;
  }
};
