import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useIsMobile } from '@/hooks/useMobile';
import { PropsWithChildren, ReactNode } from 'react';

interface DrawerDialogProps extends PropsWithChildren {
  title: string;
  description: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  trigger?: ReactNode;
  className?: string;
}

function DrawerDialog({
  children,
  title,
  description,
  open,
  setOpen,
  className,
  trigger,
}: DrawerDialogProps) {
  const isMobile = useIsMobile();

  if (!isMobile) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className={className} asChild>
          {trigger}
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer autoFocus={open} open={open} onOpenChange={setOpen}>
      <DrawerTrigger className={className} asChild>
        {trigger}
      </DrawerTrigger>
      <DrawerContent className='p-4'>
        <DrawerHeader className='text-left'>
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        {children}
      </DrawerContent>
    </Drawer>
  );
}

export default DrawerDialog;
