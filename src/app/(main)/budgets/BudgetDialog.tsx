import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import BudgetForm from './BudgetForm';

interface NewBudgetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  // onBudgetCreated?: (budget: BudgetData) => void;
}

const BudgetDialog = ({
  open,
  onOpenChange,
}: // onBudgetCreated,
NewBudgetDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Crear nuevo presupuesto</DialogTitle>
          <DialogDescription>
            Define un límite de gasto mensual para una categoría específica.
          </DialogDescription>
        </DialogHeader>
        <BudgetForm />
      </DialogContent>
    </Dialog>
  );
};

export default BudgetDialog;
