import { z } from 'zod';
import { loginSchema, registerSchema } from './auth.schema';
import { User } from '@supabase/supabase-js';

export type RegisterFormValues = z.infer<typeof registerSchema>;

export type LoginFormValues = z.infer<typeof loginSchema>;

export interface UserPost {
  id: string;
  name: string;
}

export interface AuthContextData {
  user: User | null;
  loading: boolean;
}
