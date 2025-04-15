import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { es } from 'date-fns/locale';

export const formatWithLocale = (
  date: string,
  formatStr: string = 'dd/MM/yyyy',
  locale = es
) => {
  return format(date, formatStr, { locale });
};

export const getUTCStartAndEnd = (
  start: string,
  end: string,
  timezone = 'America/Lima'
) => {
  const from = `${start}T00:00:00.000`;
  const to = `${end}T23:59:59.99`;

  const startUtc = toZonedTime(from, timezone).toISOString();
  const endUtc = toZonedTime(to, timezone).toISOString();

  return {
    startUtc,
    endUtc,
  };
};
