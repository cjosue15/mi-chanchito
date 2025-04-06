import { z } from 'zod';

export const categorySchema = z.object({
  name: z.string().min(2, {
    message: 'El nombre debe tener al menos 2 caracteres.',
  }),
  icon: z
    .string({
      message: 'El icono es obligatorio.',
    })
    .min(1, {
      message: 'El icono es obligatorio.',
    }),
  type: z.enum(['income', 'expense']),
});
