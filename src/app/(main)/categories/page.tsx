import HeaderPage from '@/app/components/HeaderPage';
import { CategoryDialog } from './CategoryDialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CategoryWithId } from './schema';
import { Button } from '@/components/ui/button';
import { LucideEdit, LucideTrash } from 'lucide-react';

const expenseCategories: any[] = [
  { id: '1', name: 'Comida', icon: '🍔', type: 'expense' },
  { id: '2', name: 'Transporte', icon: '🚗', type: 'expense' },
  { id: '3', name: 'Entretenimiento', icon: '🎉', type: 'expense' },
];

function CategoriesPage() {
  return (
    <div>
      <HeaderPage
        title='Categorías'
        subtitle='Administra las categorías para tus transacciones'
      >
        <CategoryDialog />
      </HeaderPage>

      <Card className='mt-8'>
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
              {expenseCategories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className='font-medium text-xl'>
                    {category.icon}
                  </TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell className='text-right'>
                    <Button
                      variant='ghost'
                      size='icon'
                      // onClick={() => handleEditCategory(category)}
                    >
                      <LucideEdit className='h-4 w-4' />
                    </Button>
                    <Button
                      variant='ghost'
                      size='icon'
                      // onClick={() => handleDeleteCategory(category.id)}
                    >
                      <LucideTrash className='h-4 w-4' />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {expenseCategories.length === 0 && (
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
    </div>
  );
}

export default CategoriesPage;
