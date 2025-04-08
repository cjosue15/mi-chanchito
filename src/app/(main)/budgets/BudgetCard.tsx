import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';
import { BudgetWithId } from '@/infraestructure/interfaces/budget/budget.interface';
import { LucideTrash } from 'lucide-react';

interface BudgetCategoryProps {
  budget: BudgetWithId;
  onDelete?: (id: string) => void;
}

export const BudgetCard = ({ budget, onDelete }: BudgetCategoryProps) => {
  const { name, spent, budget: budgetAmount, id } = budget;
  const amount = Number(budgetAmount);
  const percentage = Math.min(Math.round((spent / amount) * 100), 100);
  const isOverBudget = spent > amount;

  return (
    <Card className='shadow-sm mb-6'>
      <CardContent className='flex flex-col justify-between h-full'>
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center space-x-4'>
            <div>
              <h3 className='font-medium'>{name}</h3>
              <p className='text-muted-foreground text-sm'>
                Presupuesto mensual
              </p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' size='icon' className='h-8 w-8'>
                <span className='sr-only'>Opciones</span>
                <span className='text-lg'>⋯</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem onClick={() => onDelete && onDelete(id)}>
                <LucideTrash className='mr-2 h-4 w-4' />
                <span>Eliminar</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className='space-y-2'>
          <div className='flex justify-between'>
            <p className='text-sm font-medium'>Gasto actual</p>
            <p className='text-sm font-medium'>
              ${spent}{' '}
              <span className='text-muted-foreground'>/ ${amount}</span>
            </p>
          </div>
          <Progress value={percentage} className='h-2 bg-gray-100' />

          {isOverBudget && (
            <div className='mt-3 text-red-500 text-sm'>
              Excediste tu presupuesto por ${(spent - amount).toFixed(2)}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
