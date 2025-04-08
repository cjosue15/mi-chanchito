'use client';

import { BudgetWithId } from '@/infraestructure/interfaces/budget/budget.interface';
import React, { useState } from 'react';
import { BudgetCard } from './BudgetCard';
import HeaderPage from '@/app/components/HeaderPage';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import BudgetDialog from './BudgetDialog';

function BudgetPage() {
  const [budgets, setBudgets] = useState<BudgetWithId[]>([
    { id: '1', name: 'Alimentación', spent: 3500, budget: '4000' },
    { id: '2', name: 'Transporte', spent: 1800, budget: '1500' },
    { id: '3', name: 'Entretenimiento', spent: 2200, budget: '2500' },
    { id: '4', name: 'Servicios', spent: 1500, budget: '1800' },
    { id: '5', name: 'Educación', spent: 600, budget: '800' },
    { id: '6', name: 'Salud', spent: 450, budget: '1000' },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDeleteBudget = (id: string) => {
    setBudgets((prev) => prev.filter((budget) => budget.id !== id));
  };

  const handleNewBudget = () => {
    setIsDialogOpen(true);
  };

  return (
    <div>
      <HeaderPage
        title='Presupuestos'
        subtitle='Administra tus límites de gastos mensuales'
      >
        <Button
          onClick={handleNewBudget}
          className='gap-1 rounded-full cursor-pointer'
        >
          <Plus size={18} />
          <span>Nuevo Presupuesto</span>
        </Button>
      </HeaderPage>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8'>
        {budgets.map((budget) => (
          <BudgetCard
            key={budget.id}
            budget={budget}
            onDelete={handleDeleteBudget}
          />
        ))}
      </div>

      <BudgetDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </div>
  );
}

export default BudgetPage;
