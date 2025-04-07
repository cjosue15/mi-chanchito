import { supabase } from '@/lib/db';
import { AuthError } from '@supabase/supabase-js';

export async function signOut(): Promise<AuthError | null> {
  try {
    const { error } = await supabase.auth.signOut({ scope: 'local' });

    if (error) {
      throw error;
    }

    return null;
  } catch (error: any) {
    throw error;
  }
}
