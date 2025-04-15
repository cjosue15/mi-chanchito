import { Transaction } from '@/infraestructure/interfaces/transaction/transaction.interface';
import { TransactionResponse } from '@/infraestructure/interfaces/transaction/transaction.response';
import { TransactionMapper } from '@/infraestructure/mappers/transaction.mapper';
import { supabase } from '@/lib/db';
import { toZonedTime } from 'date-fns-tz';

export const getTransactions = async (
  userId: string,
  start: string,
  end: string
): Promise<Transaction[]> => {
  try {
    const from = `${start}T00:00:00.000`;
    const to = `${end}T23:59:59.99`;

    const startUtc = toZonedTime(from, 'America/Lima').toISOString();
    const endUtc = toZonedTime(to, 'America/Lima').toISOString();

    const { data, error } = await supabase
      .from('transactions')
      .select(
        `
        *,
        categories (
          name,
          icon
        )
      `
      )
      .eq('user_id', userId)
      .gte('date', startUtc)
      .lte('date', endUtc)
      .overrideTypes<TransactionResponse[], { merge: false }>();

    if (error) {
      throw error;
    }

    return data.map(TransactionMapper.fromTransactionResponseToTransaction);
  } catch (error) {
    throw error;
  }
};
