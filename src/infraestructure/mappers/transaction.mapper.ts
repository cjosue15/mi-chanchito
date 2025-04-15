import { Transaction } from '../interfaces/transaction/transaction.interface';
import { TransactionResponse } from '../interfaces/transaction/transaction.response';

export class TransactionMapper {
  static fromTransactionResponseToTransaction(
    transaction: TransactionResponse
  ): Transaction {
    return {
      id: transaction.id,
      category: {
        name: transaction.categories.name,
        icon: transaction.categories.icon,
        id: transaction.categories.id,
      },
      amount: transaction.amount,
      type: transaction.type,
      date: transaction.date,
      note: transaction.note,
    };
  }
}
