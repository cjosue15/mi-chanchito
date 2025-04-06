import { z } from 'zod';
import { categorySchema } from './category.schema';

export type Category = z.infer<typeof categorySchema>;

export interface CategoryWithId extends Category {
  id: string;
}
