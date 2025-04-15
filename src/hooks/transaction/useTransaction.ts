import { createTransaction } from '@/core/actions/transaction/add-transaction';
import { getTransactions } from '@/core/actions/transaction/get-transactions';
import { useAuthContext } from '@/providers/AuthProvider';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useDashboard } from '../dashboard/useDashboard';

export const useTransaction = (start?: string, end?: string) => {
  const { user } = useAuthContext();
  const { getBalanceQuery, getExpenseCategoriesQuery } = useDashboard();

  const getTransactionsQuery = useQuery({
    queryKey: ['transactions', user!.id, start, end],
    queryFn: () => getTransactions(user!.id, start!, end!),
    enabled: !!user?.id && !!start && !!end,
    staleTime: 1000 * 60 * 60,
  });

  const createTransactionMutation = useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      getTransactionsQuery.refetch();
      getBalanceQuery.refetch();
      getExpenseCategoriesQuery.refetch();
    },
  });

  return {
    createTransactionMutation,
    getTransactionsQuery,
  };
};
