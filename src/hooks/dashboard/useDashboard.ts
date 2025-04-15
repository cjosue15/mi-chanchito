import { getBalance } from '@/core/actions/dashboard/get-balance';
import { getDailyExpense } from '@/core/actions/dashboard/get-daily-expenses';
import { getExpenseCategories } from '@/core/actions/dashboard/get-expense-categories';
import { useAuthContext } from '@/providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';

export const useDashboard = (start?: string, end?: string) => {
  const { user } = useAuthContext();

  const getBalanceQuery = useQuery({
    queryKey: ['balance', start, end, user!.id],
    queryFn: () => getBalance(user!.id, start!, end!),
    enabled: !!user?.id && !!start && !!end,
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: true,
  });

  const getExpenseCategoriesQuery = useQuery({
    queryKey: ['expense-categories', start, end, user!.id],
    queryFn: () => getExpenseCategories(user!.id, start!, end!),
    enabled: !!user?.id && !!start && !!end,
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: true,
  });

  const getDailyExpensesQuery = useQuery({
    queryKey: ['daily-expenses', start, end, user!.id],
    queryFn: () => getDailyExpense(user!.id, start!, end!),
    enabled: !!user?.id && !!start && !!end,
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: true,
  });

  return {
    getBalanceQuery,
    getExpenseCategoriesQuery,
    getDailyExpensesQuery,
  };
};
