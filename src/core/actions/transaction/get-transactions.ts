import { Transaction } from '@/infraestructure/interfaces/transaction/transaction.interface';
import { TransactionResponse } from '@/infraestructure/interfaces/transaction/transaction.response';
import { TransactionMapper } from '@/infraestructure/mappers/transaction.mapper';
import { getUTCStartAndEnd } from '@/lib/date';
import { supabase } from '@/lib/db';

export const getTransactions = async (
  userId: string,
  start: string,
  end: string
): Promise<Transaction[]> => {
  try {
    const { startUtc, endUtc } = getUTCStartAndEnd(start, end);

    const { data, error } = await supabase
      .from('transactions')
      .select(
        `
        *,
        categories (
          id,
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
