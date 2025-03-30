import { CalculationPeriod } from '@/types/common';
import { IncomeTaxTariffType } from '@/types/income-tax';

/**
 * Convert income tax tariff types to internal numeric factor representation
 */
export const getIncomeTaxTariffTypeFactor = (type: IncomeTaxTariffType): number =>
  type === IncomeTaxTariffType.enum.BASIC ? 1 : 2;

// Factors to multiply gross salary values with to get yearly values
export const calculationPeriodFactors: Record<CalculationPeriod, number> = {
  [CalculationPeriod.enum.YEAR]: 1,
  [CalculationPeriod.enum.MONTH]: 12,
} as const;
