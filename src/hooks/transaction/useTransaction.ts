import { createTransaction } from '@/core/actions/transaction/add-transaction';
import { getTransactions } from '@/core/actions/transaction/get-transactions';
import { useAuthContext } from '@/providers/AuthProvider';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useTransaction = () => {
  const { user } = useAuthContext();

  const getTransactionsQuery = useQuery({
    queryKey: ['transactions', user!.id],
    queryFn: () => getTransactions(user!.id),
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 60,
  });

  const createTransactionMutation = useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      getTransactionsQuery.refetch();
    },
  });

  return {
    createTransactionMutation,
    getTransactionsQuery,
  };
};
