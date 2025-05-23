import { CategoryTotal } from '@/infraestructure/interfaces/category/category.interface';
import { getUTCStartAndEnd } from '@/lib/date';
import { supabase } from '@/lib/db';

export const getExpenseCategories = async (
  userId: string,
  start: string,
  end: string
) => {
  const { startUtc, endUtc } = getUTCStartAndEnd(start, end);

  const { data, error } = await supabase.rpc('get_expenses_by_category', {
    start_date: startUtc,
    end_date: endUtc,
    uid: userId,
  });

  if (error) throw error;

  return data as CategoryTotal[];
};
