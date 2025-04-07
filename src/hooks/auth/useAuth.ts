import { createUser } from '@/core/actions/auth/create-user';
import { getCurrentUser } from '@/core/actions/auth/get-user';
import { register } from '@/core/actions/auth/register';
import { signIn } from '@/core/actions/auth/sign-in';
import { signOut } from '@/core/actions/auth/sign-out';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useAuth = () => {
  const queryClient = useQueryClient();

  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: async ({ data }) => {
      if (!data?.user) return;

      await createUserMutation.mutateAsync({
        id: data.user.id,
        name: data.user?.user_metadata.name,
      });
      await queryClient.invalidateQueries({ queryKey: ['current-user'] });
    },
  });

  const createUserMutation = useMutation({
    mutationFn: createUser,
  });

  const loginMutation = useMutation({
    mutationFn: signIn,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['current-user'] });
    },
  });

  const signOutMutation = useMutation({
    mutationFn: signOut,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['current-user'] });
    },
  });

  const getUserMutation = useQuery({
    queryKey: ['current-user'],
    queryFn: getCurrentUser,
    staleTime: 1000 * 60 * 60,
  });

  return {
    registerMutation,
    getUserMutation,
    loginMutation,
    signOutMutation,
  };
};
