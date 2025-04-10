import { TransactionRequest } from '@/infraestructure/interfaces/transaction/transaction.response';
import { supabase } from '@/lib/db';

export const createTransaction = async (
  category: TransactionRequest
): Promise<void> => {
  try {
    const { error } = await supabase.from('transactions').insert({
      user_id: category.user_id,
      category_id: category.category_id,
      amount: category.amount,
      type: category.type,
      date: category.date,
      note: category.note,
    });

    if (error) {
      throw error;
    }
  } catch (error) {
    throw error;
  }
};
