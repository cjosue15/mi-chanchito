import { supabase } from '@/lib/db';

export const getCurrentUser = async () => {
  try {
    const { data: sessionData } = await supabase.auth.getSession();

    if (!sessionData.session) return null;

    const { data, error } = await supabase.auth.getUser();

    if (error) throw error;
    return data.user;
  } catch (error) {
    throw error;
  }
};
