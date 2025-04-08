import { z } from 'zod';
import { budgetSchema } from './budget.schema';

export type Budget = z.infer<typeof budgetSchema>;

export interface BudgetWithId extends Budget {
  id: string;
  spent: number;
}
