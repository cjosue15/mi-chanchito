import { supabase } from '@/lib/db';
import {
  AuthResponse,
  SignUpWithPasswordCredentials,
} from '@supabase/supabase-js';

export const signIn = async (
  credentials: SignUpWithPasswordCredentials
): Promise<AuthResponse> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword(credentials);

    if (error) {
      throw error;
    }

    return { data, error: null };
  } catch (error: any) {
    throw error;
  }
};
