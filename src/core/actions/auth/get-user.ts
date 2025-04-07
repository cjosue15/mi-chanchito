import { supabase } from '@/lib/db';

export const getCurrentUser = async () => {
  try {
    const { data: sessionData } = await supabase.auth.getSession();

    console.log({ sessionData: sessionData.session });

    if (!sessionData.session) return null;

    const { data, error } = await supabase.auth.getUser();

    console.log({ data, error });

    if (error) throw error;
    return data.user;
  } catch (error) {
    throw error;
  }
};
