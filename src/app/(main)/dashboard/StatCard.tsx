import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  isPositive?: boolean;
  className?: string;
}

const StatCard = ({
  title,
  value,
  icon,
  isPositive,
  className,
}: StatCardProps) => {
  return (
    <div
      className={cn(
        'bg-white rounded-2xl shadow-card p-4 flex flex-col border border-gray-300',
        className
      )}
    >
      <div className='flex justify-between items-start mb-3'>
        <p className='text-muted-foreground text-sm font-medium'>{title}</p>
        <div
          className={`p-2 rounded-full ${
            isPositive ? 'bg-primary/5' : 'bg-red-100'
          } `}
        >
          {icon}
        </div>
      </div>
      <div className='flex items-end justify-between'>
        <h3 className='text-xl lg:text-2xl font-bold'>{value}</h3>
      </div>
    </div>
  );
};

export default StatCard;
