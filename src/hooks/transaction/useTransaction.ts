import { createTransaction } from '@/core/actions/transaction/add-transaction';
import { deleteTransaction } from '@/core/actions/transaction/delete-transaction';
import { getTransactions } from '@/core/actions/transaction/get-transactions';
import { updateTransaction } from '@/core/actions/transaction/update-transaction';
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

  const deleteTransactionMutation = useMutation({
    mutationFn: deleteTransaction,
    onSuccess: async () => {
      getTransactionsQuery.refetch();
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

  const updateTransactionMutation = useMutation({
    mutationFn: updateTransaction,
    onSuccess: async () => {
      getTransactionsQuery.refetch();
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

  const createTransactionMutation = useMutation({
    mutationFn: createTransaction,
    onSuccess: async () => {
      getTransactionsQuery.refetch();
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
    deleteTransactionMutation,
    updateTransactionMutation,
  };
};
