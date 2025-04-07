import { UserPost } from '@/infraestructure/interfaces/auth/auth.interface';
import { supabase } from '@/lib/db';

export const createUser = async (user: UserPost): Promise<void> => {
  try {
    const { error } = await supabase.from('users').insert<UserPost>({
      id: user.id,
      name: user.name,
    });

    if (error) {
      throw error;
    }
  } catch (error: any) {
    throw error;
  }
};
