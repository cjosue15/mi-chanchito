import { CategoryWithId } from '@/infraestructure/interfaces/category/category.interface';
import { supabase } from '@/lib/db';

export const getCategories = async (userId: string) => {
  try {
    const { error, data } = await supabase
      .from('categories')
      .select('*')
      .eq('user_id', userId)
      .overrideTypes<CategoryWithId[], { merge: false }>();

    if (error) {
      throw error;
    }

    const expenseCategories = data.filter((cat) => cat.type === 'expense');
    const incomeCategories = data.filter((cat) => cat.type === 'income');

    return {
      expenseCategories,
      incomeCategories,
    };
  } catch (error) {
    throw error;
  }
};
