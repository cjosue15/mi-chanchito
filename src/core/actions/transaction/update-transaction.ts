import { TransactionRequest } from '@/infraestructure/interfaces/transaction/transaction.response';
import { supabase } from '@/lib/db';

export const updateTransaction = async (
  transaction: TransactionRequest & { id: string }
): Promise<void> => {
  try {
    const { error } = await supabase
      .from('transactions')
      .update({
        category_id: transaction.category_id,
        amount: transaction.amount,
        type: transaction.type,
        date: transaction.date,
        note: transaction.note,
      })
      .eq('id', transaction.id);

    if (error) {
      throw error;
    }
  } catch (error) {
    throw error;
  }
};
