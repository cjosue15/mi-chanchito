import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export const formatWithLocale = (
  date: string,
  formatStr: string = 'dd/MM/yyyy',
  locale = es
) => {
  return format(date, formatStr, { locale });
};
