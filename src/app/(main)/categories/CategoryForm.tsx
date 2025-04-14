'use client';

import ColorPicker from '@/app/components/ColorPicker';
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
import {
  Category,
  CategoryWithId,
} from '@/infraestructure/interfaces/category/category.interface';
import { categorySchema } from '@/infraestructure/interfaces/category/category.schema';
import { categoryIcons } from '@/lib/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { LucideLoader } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface CategoryFormProps {
  submitValues: (category: Category) => void;
  editingCategory?: CategoryWithId;
  isLoading?: boolean;
  closeDialog: () => void;
}

function CategoryForm({
  submitValues,
  isLoading,
  editingCategory,
  closeDialog,
}: CategoryFormProps) {
  const form = useForm<Category>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: '',
      type: 'expense',
      icon: '',
      color: undefined,
    },
    values: {
      name: editingCategory?.name || '',
      type: editingCategory?.type || 'expense',
      icon: editingCategory?.icon || '',
      color: editingCategory?.color || '',
    },
  });

  function onSubmit(values: Category) {
    submitValues(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='type'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className='w-full'>
                  <SelectTrigger>
                    <SelectValue placeholder='Selecciona un tipo' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='expense'>Gasto</SelectItem>
                  <SelectItem value='income'>Ingreso</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

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
          name='icon'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ícono</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className='w-full'>
                  <SelectTrigger>
                    <SelectValue placeholder='Selecciona un ícono' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categoryIcons.map((icon) => (
                    <SelectItem key={icon.value} value={icon.value}>
                      {icon.label}
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
          name='color'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <FormControl>
                <ColorPicker value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex justify-end'>
          <Button
            variant='outline'
            type='button'
            className='mr-4'
            onClick={closeDialog}
          >
            Cancelar
          </Button>
          <Button type='submit' disabled={isLoading}>
            {isLoading && <LucideLoader size={16} className='animate-spin' />}
            {editingCategory ? 'Guardar cambios' : 'Crear categoría'}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default CategoryForm;
