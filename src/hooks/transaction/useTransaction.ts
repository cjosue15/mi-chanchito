import { createTransaction } from '@/core/actions/transaction/add-transaction';
import { getTransactions } from '@/core/actions/transaction/get-transactions';
import { useAuthContext } from '@/providers/AuthProvider';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useTransaction = (start?: string, end?: string) => {
  const queryClient = useQueryClient();

  const { user } = useAuthContext();

  const getTransactionsQuery = useQuery({
    queryKey: ['transactions', user!.id, start, end],
    queryFn: () => getTransactions(user!.id, start!, end!),
    enabled: !!user?.id && !!start && !!end,
    staleTime: 1000 * 60 * 60,
  });

  const createTransactionMutation = useMutation({
    mutationFn: createTransaction,
    onSuccess: async () => {
      getTransactionsQuery.refetch();
      console.log({
        start,
        end,
        user: user!.id,
      });
      await queryClient.invalidateQueries({
        queryKey: ['balance'],
      });
      queryClient.invalidateQueries({
        queryKey: ['expense-categories'],
      });
      queryClient.invalidateQueries({
        queryKey: ['daily-expenses'],
      });
      queryClient.invalidateQueries({
        queryKey: ['transactions'],
      });
    },
  });

  return {
    createTransactionMutation,
    getTransactionsQuery,
  };
};
