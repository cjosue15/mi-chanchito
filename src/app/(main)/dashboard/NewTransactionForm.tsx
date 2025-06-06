import { DateTimePickerForm } from '@/app/components/DatePicker';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCategory } from '@/hooks/category/useCategory';
import { useTransaction } from '@/hooks/transaction/useTransaction';
import { CategoryWithId } from '@/infraestructure/interfaces/category/category.interface';
import { Transaction } from '@/infraestructure/interfaces/transaction/transaction.interface';
import { cn } from '@/lib/utils';
import { useAuthContext } from '@/providers/AuthProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader, Minus, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
  title: z.string().min(2, {
    message: 'El título debe tener al menos 2 caracteres.',
  }),
  amount: z.coerce.number().positive({
    message: 'El monto debe ser un número positivo.',
  }),
  category: z.string().min(1, {
    message: 'Por favor selecciona una categoría.',
  }),
  date: z.date({
    message: 'Por favor selecciona una fecha.',
  }),
  type: z.enum(['income', 'expense']),
});

type FormValues = z.infer<typeof formSchema>;

function NewTransactionForm({
  onClose,
  transaction,
}: {
  onClose: () => void;
  transaction?: Transaction;
}) {
  const { user } = useAuthContext();
  const { getCategoriesQuery } = useCategory();
  const { createTransactionMutation, updateTransactionMutation } =
    useTransaction();

  const isPending =
    createTransactionMutation.isPending || updateTransactionMutation.isPending;

  const [categories, setCategories] = useState<CategoryWithId[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      amount: undefined,
      category: '',
      date: new Date(),
      type: 'expense',
    },
  });

  const type = form.watch('type');

  useEffect(() => {
    if (transaction) {
      form.reset({
        title: transaction.note,
        amount: transaction.amount,
        category: transaction.category.id,
        date: new Date(transaction.date),
        type: transaction.type,
      });
    }
  }, [transaction, form]);

  useEffect(() => {
    const data = getCategoriesQuery.data;

    console.log(type);

    if (data) {
      const categoriesData =
        type === 'expense' ? data.expenseCategories : data.incomeCategories;

      setCategories(categoriesData);

      if (transaction) {
        setTimeout(() => {
          form.setValue('category', transaction.category.id);
        });
      }
    }
  }, [type, getCategoriesQuery.data, transaction]);

  async function onSubmit(values: FormValues) {
    if (!user) return;

    try {
      if (transaction) {
        await updateTransactionMutation.mutateAsync({
          id: transaction.id,
          user_id: user?.id,
          category_id: values.category,
          amount: values.amount,
          type: values.type,
          date: values.date,
          note: values.title,
        });
      } else {
        await createTransactionMutation.mutateAsync({
          user_id: user?.id,
          category_id: values.category,
          amount: values.amount,
          type: values.type,
          date: values.date,
          note: values.title,
        });
      }

      form.reset();
      onClose();
      toast.success(
        `Transacción ${transaction ? 'actualizada' : 'creada'} con éxito`
      );
    } catch (error) {
      toast.error(
        `Error al ${transaction ? 'actualizar' : 'crear'} la transacción`
      );
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <div className='grid grid-cols-2 gap-4 mb-6'>
          <Button
            type='button'
            variant={type === 'expense' ? 'default' : 'outline'}
            className={cn(
              'flex items-center justify-center gap-2 rounded-xl py-6',
              type === 'expense' ? 'bg-red-400 hover:bg-red-400/90 border' : ''
            )}
            onClick={() => form.setValue('type', 'expense')}
          >
            <Minus size={18} />
            <span>Gasto</span>
          </Button>
          <Button
            type='button'
            variant={type === 'income' ? 'default' : 'outline'}
            className={cn(
              'flex items-center justify-center gap-2 rounded-xl py-6',
              type === 'income' ? 'bg-primary hover:bg-primary/90 border' : ''
            )}
            onClick={() => form.setValue('type', 'income')}
          >
            <Plus size={18} />
            <span>Ingreso</span>
          </Button>
        </div>

        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Concepto</FormLabel>
              <FormControl>
                <Input placeholder='Ejemplo: Compra supermercado' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='amount'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Monto</FormLabel>
              <FormControl>
                <div className='relative'>
                  <span className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500'>
                    S/
                  </span>
                  <Input
                    placeholder='0.00'
                    className='pl-8'
                    type='number'
                    step='0.01'
                    {...field}
                    value={field.value || ''}
                    onChange={(e) => {
                      const value =
                        e.target.value === ''
                          ? undefined
                          : parseFloat(e.target.value);
                      field.onChange(value);
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='category'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoría</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
              >
                <FormControl className='w-full'>
                  <SelectTrigger>
                    <SelectValue placeholder='Selecciona una categoría' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem value={category.id} key={category.id}>
                      {category.icon} {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='date'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>Fecha</FormLabel>
              <DateTimePickerForm
                selectedDate={field.value}
                onDateChange={field.onChange}
              />

              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type='submit'
          className='w-full rounded-xl py-6'
          disabled={isPending}
        >
          {isPending && <Loader size={16} className='animate-spin' />}{' '}
          {transaction ? 'Actualizar Transacción' : 'Guardar Transacción'}
        </Button>
      </form>
    </Form>
  );
}

export default NewTransactionForm;
