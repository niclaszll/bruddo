import { CalculationPeriod, CalculationPeriodTuple } from '@/types/common';
import dayjs from 'dayjs';

export const calculateUserAge = (dateOfBirth: string) =>
  dayjs(new Date()).diff(dayjs(dateOfBirth), 'years');

export const getMonthYearValues = (
  value: number,
  calculationPeriod: CalculationPeriod,
): CalculationPeriodTuple => {
  const isYearly = calculationPeriod === CalculationPeriod.enum.YEAR;
  return {
    [CalculationPeriod.enum.MONTH]: isYearly ? value / 12 : value,
    [CalculationPeriod.enum.YEAR]: isYearly ? value : value * 12,
  };
};
