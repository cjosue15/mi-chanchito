import { TransactionType } from './transaction.interface';

export interface TransactionRequest {
  user_id: string;
  category_id: string;
  amount: number;
  type: TransactionType;
  date: Date;
  note: string;
}

export interface TransactionResponse {
  id: string;
  category_id: string;
  amount: number;
  type: TransactionType;
  categories: {
    id: string;
    name: string;
    icon: string;
  };
  note: string;
  date: string;
}
