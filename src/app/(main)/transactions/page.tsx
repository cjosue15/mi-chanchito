'use client';
import DrawerDialog from '@/app/components/DrawerDialog';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Period } from '@/core/actions/dashboard/get-balance';
import { useTransaction } from '@/hooks/transaction/useTransaction';
import { Transaction } from '@/infraestructure/interfaces/transaction/transaction.interface';
import { formatWithLocale } from '@/lib/date';
import { cn } from '@/lib/utils';
import { format, set } from 'date-fns';
import { ArrowUpDown, LucideEdit, LucideTrash } from 'lucide-react';
import { useState } from 'react';
import DateRangeFilter, { DateRange } from '../../components/DateRangeFilter';
import NewTransactionForm from '../dashboard/NewTransactionForm';

const Transactions = () => {
  const [period, setPeriod] = useState<Period | undefined>('current-month');
  const [isOpen, setIsOpen] = useState(false);
  const [transactionSelected, setTransactionSelected] = useState<
    Transaction | undefined
  >();
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

  const { getTransactionsQuery } = useTransaction(from, to);

  const [activeTab, setActiveTab] = useState('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const transactions = getTransactionsQuery.data ?? [];
  const isLoading = getTransactionsQuery.isLoading;
  const isError = getTransactionsQuery.isError;

  const filteredTransactions = transactions.filter((transaction) => {
    if (activeTab === 'income') return transaction.type === 'income';
    if (activeTab === 'expense') return transaction.type === 'expense';
    return true; // 'all' tab
  });

  // Sort transactions by date
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  return (
    <div className='w-full overflow-auto'>
      <div className='mb-8'>
        <h1 className='text-2xl font-bold mb-1'>Transacciones</h1>
        <p className='text-muted-foreground'>
          Administra tus ingresos y gastos
        </p>
      </div>

      <div className='flex items-center justify-between mb-4'>
        <Tabs defaultValue='all' value={activeTab} onValueChange={setActiveTab}>
          <TabsList className='grid grid-cols-3 w-full max-w-xs'>
            <TabsTrigger value='all'>Todos</TabsTrigger>
            <TabsTrigger value='income'>Ingresos</TabsTrigger>
            <TabsTrigger value='expense'>Gastos</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className='flex flex-row gap-2'>
          <Button
            variant='outline'
            size='sm'
            className='gap-1'
            onClick={toggleSortOrder}
          >
            <ArrowUpDown size={16} />
            <span className='hidden sm:inline'>
              {sortOrder === 'asc' ? 'Más antiguo' : 'Más reciente'}
            </span>
          </Button>
        </div>
      </div>

      <div className='mb-4'>
        <DateRangeFilter
          period={period}
          setPeriod={setPeriod}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
        />
      </div>

      <div className='rounded-lg border overflow-hidden'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='font-medium'>Concepto</TableHead>
              <TableHead className='font-medium'>Categoría</TableHead>
              <TableHead className='font-medium'>Fecha</TableHead>
              <TableHead className='font-medium text-right'>Monto</TableHead>
              <TableHead className='font-medium text-right'>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={4} className='text-center py-8'>
                  Cargando...
                </TableCell>
              </TableRow>
            )}
            {isError && (
              <TableRow>
                <TableCell colSpan={4} className='text-center py-8'>
                  Error al cargar las transacciones
                </TableCell>
              </TableRow>
            )}
            {!isLoading && !isError && sortedTransactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className='text-center py-8'>
                  No hay transacciones para mostrar
                </TableCell>
              </TableRow>
            ) : (
              !isLoading &&
              !isError &&
              sortedTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <span className='font-medium'>{transaction.note}</span>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center gap-2'>
                      <div className='size-8 flex items-center justify-center rounded-lg bg-primary/10 text-primary'>
                        <span>{transaction.category.icon}</span>
                      </div>
                      <span className='font-medium'>
                        {transaction.category.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {formatWithLocale(transaction.date, 'PP')}
                  </TableCell>
                  <TableCell
                    className={cn(
                      'text-right font-medium',
                      transaction.type === 'income'
                        ? 'text-primary'
                        : 'text-red-400'
                    )}
                  >
                    {transaction.type === 'income' ? '+ ' : '- '}$
                    {transaction.amount.toFixed(2)}
                  </TableCell>
                  <TableCell className='text-right'>
                    <Button
                      variant='ghost'
                      size='icon'
                      onClick={() => {
                        setTransactionSelected({ ...transaction });
                        setIsOpen(true);
                      }}
                    >
                      <LucideEdit className='h-4 w-4' />
                    </Button>

                    <Button variant='ghost' size='icon' onClick={() => {}}>
                      <LucideTrash className='h-4 w-4' />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <DrawerDialog
          title='Editar Transacción'
          description='Modifica una transacción en tu billetera'
          open={isOpen}
          setOpen={setIsOpen}
        >
          <NewTransactionForm
            transaction={transactionSelected}
            onClose={() => {
              setIsOpen(false);
              setTransactionSelected(undefined);
            }}
          />
        </DrawerDialog>
      </div>
    </div>
  );
};

export default Transactions;
