import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Budget } from '@/infraestructure/interfaces/budget/budget.interface';
import { budgetSchema } from '@/infraestructure/interfaces/budget/budget.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

function BudgetForm() {
  const form = useForm<Budget>({
    resolver: zodResolver(budgetSchema),
    defaultValues: {
      name: '',
      budget: '',
      description: '',
    },
  });

  function onSubmit(values: Budget) {
    console.log('Form submitted:', values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder='Ej: Alimentación' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='budget'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Monto del presupuesto</FormLabel>
              <FormControl>
                <Input type='number' placeholder='Ej: 4000' {...field} />
              </FormControl>
              <FormDescription>
                Ingresa el monto máximo para esta categoría en pesos.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción (opcional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Agrega notas o detalles sobre este presupuesto'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex items-center justify-end space-x-2'>
          <Button
            variant='outline'
            type='button'
            // onClick={() => onOpenChange(false)}
          >
            Cancelar
          </Button>
          <Button type='submit'>Guardar presupuesto</Button>
        </div>
      </form>
    </Form>
  );
}

export default BudgetForm;
