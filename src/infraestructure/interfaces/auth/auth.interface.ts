import { z } from 'zod';
import { loginSchema, registerSchema } from './auth.schema';

export type RegisterFormValues = z.infer<typeof registerSchema>;

export type LoginFormValues = z.infer<typeof loginSchema>;

export interface UserPost {
  id: string;
  name: string;
}
