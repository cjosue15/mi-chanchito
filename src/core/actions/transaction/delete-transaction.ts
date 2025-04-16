import { supabase } from '@/lib/db';

export const deleteTransaction = async (id: string) => {
  try {
    const { error } = await supabase.from('transactions').delete().eq('id', id);

    if (error) {
      throw error;
    }
  } catch (error) {
    throw error;
  }
};
