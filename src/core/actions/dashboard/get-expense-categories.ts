import { CategoryTotal } from '@/infraestructure/interfaces/category/category.interface';
import { supabase } from '@/lib/db';
import { toZonedTime } from 'date-fns-tz';

export const getExpenseCategories = async (
  userId: string,
  start: string,
  end: string
) => {
  const from = `${start}T00:00:00.000`;
  const to = `${end}T23:59:59.99`;

  const startUtc = toZonedTime(from, 'America/Lima').toISOString();
  const endUtc = toZonedTime(to, 'America/Lima').toISOString();

  const { data, error } = await supabase.rpc('get_expenses_by_category', {
    start_date: startUtc,
    end_date: endUtc,
    uid: userId,
  });

  if (error) throw error;

  return data as CategoryTotal[];
};
