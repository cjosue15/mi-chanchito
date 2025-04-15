import { DailyExpense } from '@/infraestructure/interfaces/transaction/transaction.interface';
import { getUTCStartAndEnd } from '@/lib/date';
import { supabase } from '@/lib/db';

export const getDailyExpense = async (
  userId: string,
  start: string,
  end: string
) => {
  const { startUtc, endUtc } = getUTCStartAndEnd(start, end);

  const { data, error } = await supabase.rpc('get_daily_expenses', {
    start_date: startUtc,
    end_date: endUtc,
    uid: userId,
    user_timezone: 'America/Lima',
  });

  if (error) throw error;

  return data as DailyExpense[];
};
