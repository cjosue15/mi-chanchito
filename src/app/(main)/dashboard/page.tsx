'use client';

import DrawerDialog from '@/app/components/DrawerDialog';
import HeaderPage from '@/app/components/HeaderPage';
import { Button } from '@/components/ui/button';
import { Period } from '@/core/actions/dashboard/get-balance';
import { useDashboard } from '@/hooks/dashboard/useDashboard';
import { useIsMobile } from '@/hooks/useMobile';
import { format } from 'date-fns';
import { LucidePlus, TrendingDown, TrendingUp, Wallet } from 'lucide-react';
import { useState } from 'react';
import DateRangeFilter, { DateRange } from './DateRangeFilter';
import ExpensePieChart from './ExpensePieChart';
import NewTransactionForm from './NewTransactionForm';
import StatCard from './StatCard';

function DashboardPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [period, setPeriod] = useState<Period | undefined>('current-month');

  const isMobile = useIsMobile();

  const [dateRange, setDateRange] = useState<DateRange | undefined>(() => {
    const today = new Date();
    return {
      from: new Date(today.getFullYear(), today.getMonth(), 1),
      to: new Date(today.getFullYear(), today.getMonth() + 1, 0),
    };
  });

  const from =
    dateRange && dateRange.from
      ? format(dateRange.from, 'yyyy-MM-dd')
      : undefined;
  const to =
    dateRange && dateRange.to ? format(dateRange.to, 'yyyy-MM-dd') : undefined;

  const { getBalanceQuery, getExpenseCategoriesQuery } = useDashboard(from, to);

  const { balance, incomes, expenses } = getBalanceQuery.data ?? {
    balance: 0,
    incomes: 0,
    expenses: 0,
  };

  const categories = getExpenseCategoriesQuery.data;

  const handleDateRangeChange = (
    newRange: DateRange | undefined,
    period?: Period
  ) => {
    setPeriod(period);
    setDateRange(newRange);
  };

  return (
    <div>
      <HeaderPage
        title='¡Hola, Carlos!'
        subtitle='Bienvenido a tu Mi Chanchito Inteligente'
      >
        <DrawerDialog
          title='Nueva Transacción'
          description='Agrega una nueva transacción a tu billetera'
          open={isOpen}
          setOpen={setIsOpen}
          trigger={
            <Button
              className={`rounded-full cursor-pointer ${
                isMobile ? 'fixed bottom-[100px] right-4 size-16' : ''
              } `}
              onClick={() => setIsOpen(true)}
            >
              <LucidePlus className={`${isMobile ? 'size-8' : 'size-4'}`} />
              {!isMobile && 'Nueva Transacción'}
            </Button>
          }
        >
          <NewTransactionForm onClose={() => setIsOpen(false)} />
        </DrawerDialog>
      </HeaderPage>

      <div>
        <div className='my-6'>
          <DateRangeFilter
            dateRange={dateRange}
            onDateRangeChange={handleDateRangeChange}
            period={period}
            setPeriod={setPeriod}
          />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 mt-4'>
          <StatCard
            title='Balance Actual'
            value={`S/ ${balance.toFixed(2)}`}
            icon={<Wallet className='h-5 w-5 text-primary' />}
            isPositive={true}
          />
          <StatCard
            title='Ingresos Totales'
            value={`S/ ${incomes.toFixed(2)}`}
            icon={<TrendingUp className='h-5 w-5 text-primary' />}
            isPositive={true}
          />
          <StatCard
            title='Gastos Totales'
            value={`S/ ${expenses.toFixed(2)}`}
            icon={<TrendingDown className='h-5 w-5 text-red-500' />}
            isPositive={false}
          />
        </div>

        <div>
          <ExpensePieChart
            categories={categories ?? []}
            isLoading={getExpenseCategoriesQuery.isLoading}
          />
          {/* <ExpenseLineChart /> */}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
