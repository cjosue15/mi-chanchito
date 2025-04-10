import { Transaction } from '@/infraestructure/interfaces/transaction/transaction.interface';
import { TransactionResponse } from '@/infraestructure/interfaces/transaction/transaction.response';
import { TransactionMapper } from '@/infraestructure/mappers/transaction.mapper';
import { supabase } from '@/lib/db';

export const getTransactions = async (
  userId: string
): Promise<Transaction[]> => {
  try {
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
      .overrideTypes<TransactionResponse[], { merge: false }>();

    if (error) {
      throw error;
    }

    return data.map(TransactionMapper.fromTransactionResponseToTransaction);
  } catch (error) {
    throw error;
  }
};
