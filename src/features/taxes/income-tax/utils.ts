import { CalculationPeriod } from '@/types/common';
import { IncomeTaxTariffType } from '@/types/income-tax';

/**
 * Convert income tax tariff types to internal numeric factor representation
 * @param type
 * @returns
 */
export const getIncomeTaxTariffTypeFactor = (type: IncomeTaxTariffType) => {
  return type === IncomeTaxTariffType.enum.BASIC ? 1 : 2;
};

// Factors to multiply gross income values with to get yearly values
export const calculationPeriodFactors = {
  [CalculationPeriod.enum.YEAR]: 1,
  [CalculationPeriod.enum.MONTH]: 12,
  [CalculationPeriod.enum.WEEK]: 360 / 7,
  [CalculationPeriod.enum.DAY]: 360,
};
