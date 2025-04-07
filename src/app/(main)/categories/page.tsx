'use client';
import HeaderPage from '@/app/components/HeaderPage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useCategory } from '@/hooks/category/useCategory';
import { CategoryWithId } from '@/infraestructure/interfaces/category/category.interface';
import { LucideEdit, LucideTrash } from 'lucide-react';
import { useState } from 'react';
import { CategoryDialog } from './CategoryDialog';
import { CategoryAlert } from './CategoryAlert';
import { toast } from 'sonner';

function CategoriesPage() {
  const { getCategoriesQuery, deleteCategoryMutation } = useCategory();

  const { data, isLoading } = getCategoriesQuery;

  const [category, setCategory] = useState<CategoryWithId | undefined>(
    undefined
  );

  const handleEditCategory = (category: CategoryWithId) => {
    setCategory({ ...category });
  };

  const handleDeleteCategory = async (categoryId: string) => {
    try {
      await deleteCategoryMutation.mutateAsync(categoryId);
      toast.success('Categoría eliminada con éxito');
    } catch {
      toast.error('Error eliminando la categoría');
    }
  };

  if (isLoading) {
    return 'Cargando...';
  }

  return (
    <div>
      <HeaderPage
        title='Categorías'
        subtitle='Administra las categorías para tus transacciones'
      >
        <CategoryDialog
          editingCategory={category}
          onClose={() => setCategory(undefined)}
        />
      </HeaderPage>

      <Card className='my-8'>
        <CardHeader>
          <CardTitle className='text-xl'>Categorías de Gastos</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Icono</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead className='text-right'>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.expenseCategories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className='font-medium text-xl'>
                    {category.icon}
                  </TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell className='text-right'>
                    <Button
                      variant='ghost'
                      size='icon'
                      onClick={() => handleEditCategory(category)}
                    >
                      <LucideEdit className='h-4 w-4' />
                    </Button>

                    <CategoryAlert
                      onDelete={() => handleDeleteCategory(category.id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
              {data?.expenseCategories.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className='text-center py-4 text-muted-foreground'
                  >
                    No hay categorías de gastos. Crea una nueva.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className='text-xl'>Categorías de Ingresos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Icono</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead className='text-right'>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.incomeCategories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className='font-medium text-xl'>
                    {category.icon}
                  </TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell className='text-right'>
                    <Button
                      variant='ghost'
                      size='icon'
                      onClick={() => handleEditCategory(category)}
                    >
                      <LucideEdit className='h-4 w-4' />
                    </Button>

                    <CategoryAlert
                      onDelete={() => handleDeleteCategory(category.id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
              {data?.incomeCategories.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className='text-center py-4 text-muted-foreground'
                  >
                    No hay categorías de ingresos. Crea una nueva.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default CategoriesPage;
