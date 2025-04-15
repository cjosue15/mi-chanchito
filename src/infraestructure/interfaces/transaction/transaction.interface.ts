export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  category: {
    name: string;
    icon: string;
  };
  amount: number;
  type: TransactionType;
  date: string;
  note: string;
}

export interface DailyExpense {
  day: string;
  total: number;
}
