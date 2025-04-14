import { supabase } from '@/lib/db';
import { toZonedTime } from 'date-fns-tz';

export type Period =
  | 'current-month'
  | 'previous-month'
  | 'last-3-months'
  | 'current-year'
  | 'custom';

export const getBalance = async (
  userId: string,
  start: string,
  end: string
  // period?: Period
) => {
  const from = `${start}T00:00:00.000`;
  const to = `${end}T23:59:59.99`;
  // let prevStart = '';
  // let prevEnd = '';

  const startUtc = toZonedTime(from, 'America/Lima').toISOString();
  const endUtc = toZonedTime(to, 'America/Lima').toISOString();

  // if (period === 'custom') {
  //   const date = getPreviousRangeFromDateRange(
  //     toZonedTime(from, 'America/Lima'),
  //     toZonedTime(to, 'America/Lima')
  //   );
  //   prevStart = date.prevStart.toISOString();
  //   prevEnd = date.prevEnd.toISOString();
  // } else {
  //   prevStart = getPreviousPeriod(
  //     toZonedTime(to, 'America/Lima'),
  //     period
  //   ).toISOString();
  //   prevEnd = getPreviousPeriod(
  //     toZonedTime(from, 'America/Lima'),
  //     period
  //   ).toISOString();
  // }

  const { data, error } = await supabase
    .from('transactions')
    .select('type, amount')
    .eq('user_id', userId)
    .gte('date', startUtc)
    .lte('date', endUtc);

  if (error) {
    throw error;
  }

  // const { data: previousTransactions, error: previousError } = await supabase
  //   .from('transactions')
  //   .select('type, amount')
  //   .eq('user_id', userId)
  //   .gte('date', prevStart)
  //   .lte('date', prevEnd);

  // if (previousError) {
  //   throw previousError;
  // }

  const incomes = data
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = data
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = incomes - expenses;

  // const previousIncomes = previousTransactions
  //   .filter((t) => t.type === 'income')
  //   .reduce((sum, t) => sum + t.amount, 0);

  // const previousExpenses = previousTransactions
  //   .filter((t) => t.type === 'expense')
  //   .reduce((sum, t) => sum + t.amount, 0);

  // const previousBalance = previousIncomes - previousExpenses;

  // const changeIncomes = calculatePercentageChange(incomes, previousIncomes);
  // const changeExpenses = calculatePercentageChange(expenses, previousExpenses);
  // const changeBalance = calculatePercentageChange(balance, previousBalance);

  return {
    balance,
    incomes,
    expenses,
  };
};

// export function getPreviousPeriod(date: Date, type?: Period) {
//   switch (type) {
//     case 'current-month':
//     case 'previous-month':
//       return subMonths(date, 1);
//     case 'last-3-months':
//       return subMonths(date, 3);
//     case 'current-year':
//       return subMonths(date, 12);
//     default:
//       return date;
//   }
// }

// export function getPreviousRangeFromDateRange(start: Date, end: Date) {
//   const rangeDays = differenceInDays(end, start) + 1;

//   const prevEnd = subDays(start, 1);
//   const prevStart = subDays(prevEnd, rangeDays - 1);

//   return { prevStart, prevEnd };
// }

// function calculatePercentageChange(
//   current: number,
//   previous: number
// ): number | null {
//   if (previous === 0) {
//     if (current === 0) return 0; // No cambio
//     return null; // No se puede calcular: división por 0
//   }
//   return ((current - previous) / previous) * 100;
// }

// export function formatChange(value: number | null): string {
//   if (value === null) return 'N/A';
//   return `${value.toFixed(2)}%`;
// }
