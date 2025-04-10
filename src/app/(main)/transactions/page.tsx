'use client';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTransaction } from '@/hooks/transaction/useTransaction';
import { formatWithLocale } from '@/lib/date';
import { cn } from '@/lib/utils';
import { ArrowUpDown, Calendar, Filter, Tag } from 'lucide-react';
import { useState } from 'react';

const Transactions = () => {
  const { getTransactionsQuery } = useTransaction();
  const [activeTab, setActiveTab] = useState('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const transactions = getTransactionsQuery.data ?? [];

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

      {/* <Card className='shadow-card'>
        <CardContent> */}
      <div className='flex items-start justify-between mb-4'>
        <Tabs defaultValue='all' value={activeTab} onValueChange={setActiveTab}>
          <TabsList className='grid grid-cols-3 w-full max-w-xs'>
            <TabsTrigger value='all'>Todos</TabsTrigger>
            <TabsTrigger value='income'>Ingresos</TabsTrigger>
            <TabsTrigger value='expense'>Gastos</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className='flex flex-col sm:flex-row gap-2 mt-4 sm:mt-0'>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant='outline' size='sm' className='gap-1'>
                <Filter size={16} />
                <span className='hidden sm:inline'>Filtrar</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-56 p-4'>
              <div className='space-y-2'>
                <h4 className='font-medium text-sm'>Filtrar por</h4>
                <div className='pt-2 space-y-4'>
                  <div>
                    <div className='flex items-center gap-2 mb-2'>
                      <Calendar size={16} />
                      <span className='text-sm font-medium'>Fecha</span>
                    </div>
                    <div className='grid grid-cols-2 gap-2'>
                      <Button size='sm' variant='outline' className='text-xs'>
                        Esta semana
                      </Button>
                      <Button size='sm' variant='outline' className='text-xs'>
                        Este mes
                      </Button>
                      <Button size='sm' variant='outline' className='text-xs'>
                        Último mes
                      </Button>
                      <Button size='sm' variant='outline' className='text-xs'>
                        Este año
                      </Button>
                    </div>
                  </div>

                  <div>
                    <div className='flex items-center gap-2 mb-2'>
                      <Tag size={16} />
                      <span className='text-sm font-medium'>Categoría</span>
                    </div>
                    <div className='grid grid-cols-2 gap-2'>
                      <Button size='sm' variant='outline' className='text-xs'>
                        Alimentación
                      </Button>
                      <Button size='sm' variant='outline' className='text-xs'>
                        Transporte
                      </Button>
                      <Button size='sm' variant='outline' className='text-xs'>
                        Hogar
                      </Button>
                      <Button size='sm' variant='outline' className='text-xs'>
                        Entretenimiento
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>

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

      <div className='rounded-lg border overflow-hidden'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='font-medium'>Concepto</TableHead>
              <TableHead className='font-medium'>Categoría</TableHead>
              <TableHead className='font-medium'>Fecha</TableHead>
              <TableHead className='font-medium text-right'>Monto</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedTransactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className='text-center py-8'>
                  No hay transacciones para mostrar
                </TableCell>
              </TableRow>
            ) : (
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
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Transactions;
