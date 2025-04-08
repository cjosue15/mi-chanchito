import { z } from 'zod';

export const budgetSchema = z.object({
  name: z.string().min(2, {
    message: 'El nombre debe tener al menos 2 caracteres.',
  }),
  budget: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: 'El presupuesto debe ser un número mayor a 0.',
  }),
  description: z.string().optional(),
});
