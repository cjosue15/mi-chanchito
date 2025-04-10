import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar as CalendarIcon, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export type DateRange = {
  from: Date | undefined;
  to: Date | undefined;
};

type DateRangeFilterProps = {
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
};

const DateRangeFilter = ({
  dateRange,
  onDateRangeChange,
}: DateRangeFilterProps) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [localDateRange, setLocalDateRange] = useState<DateRange | undefined>(
    dateRange
  );

  // Get current month start and end
  const getCurrentMonth = () => {
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth(), 1);
    const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    return { from: start, to: end };
  };

  // Get previous month start and end
  const getPreviousMonth = () => {
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const end = new Date(today.getFullYear(), today.getMonth(), 0);

    return { from: start, to: end };
  };

  // Get last 3 months range
  const getLast3Months = () => {
    const today = new Date();
    const end = new Date();
    const start = new Date(today.getFullYear(), today.getMonth() - 2, 1);

    return { from: start, to: end };
  };

  // Get current year start and end
  const getCurrentYear = () => {
    const today = new Date();
    const start = new Date(today.getFullYear(), 0, 1);
    const end = new Date(today.getFullYear(), 11, 31);

    return { from: start, to: end };
  };

  // Handle preset selection
  const handlePresetSelect = (value: string) => {
    let newRange;

    switch (value) {
      case 'current-month':
        newRange = getCurrentMonth();
        break;
      case 'previous-month':
        newRange = getPreviousMonth();
        break;
      case 'last-3-months':
        newRange = getLast3Months();
        break;
      case 'current-year':
        newRange = getCurrentYear();
        break;
      default:
        newRange = getCurrentMonth();
    }

    onDateRangeChange(newRange);
    setLocalDateRange(newRange);
    setIsCalendarOpen(false);
  };

  const handleCalendarSelect = (
    range: { from?: Date; to?: Date } | undefined
  ) => {
    if (!range) {
      setLocalDateRange(undefined);
      onDateRangeChange(undefined);
      return;
    }

    const newRange = { from: range.from, to: range.to };
    setLocalDateRange(newRange);
    onDateRangeChange(newRange);
  };

  return (
    <div className='flex flex-col md:flex-row items-center gap-2'>
      <Select onValueChange={handlePresetSelect}>
        <SelectTrigger className='w-[180px] h-9 bg-white'>
          <SelectValue placeholder='Filtrar por período' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='current-month'>Mes actual</SelectItem>
          <SelectItem value='previous-month'>Mes anterior</SelectItem>
          <SelectItem value='last-3-months'>Últimos 3 meses</SelectItem>
          <SelectItem value='current-year'>Año actual</SelectItem>
        </SelectContent>
      </Select>

      <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
        <PopoverTrigger asChild>
          <Button className='h-9 px-3 justify-start text-left font-normal'>
            <CalendarIcon className='mr-2 h-4 w-4' />
            <span>
              {localDateRange?.from
                ? format(localDateRange?.from, 'P', { locale: es })
                : 'Inicio'}
              {' - '}
              {localDateRange?.to
                ? format(localDateRange?.to, 'P', { locale: es })
                : 'Fin'}
            </span>
            <ChevronDown className='ml-auto h-4 w-4 opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <Calendar
            mode='range'
            defaultMonth={localDateRange?.from}
            selected={localDateRange}
            onSelect={handleCalendarSelect}
            numberOfMonths={2}
            className='p-3 pointer-events-auto'
            locale={es}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateRangeFilter;
