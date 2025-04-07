import { supabase } from '@/lib/db';

export const getCurrentUser = async () => {
  try {
    const { data, error } = await supabase.auth.getUser();

    if (error) throw error;
    return data.user;
  } catch (error) {
    throw error;
  }
};
