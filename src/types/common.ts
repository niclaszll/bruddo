import { z } from 'zod';

export const CalculationPeriod = z.enum(['YEAR', 'MONTH', 'WEEK', 'DAY']);
export type CalculationPeriod = z.infer<typeof CalculationPeriod>;

export type CalculationPeriodTuple = {
  [CalculationPeriod.enum.MONTH]: number;
  [CalculationPeriod.enum.YEAR]: number;
};

export const TaxClass = z.enum(['I', 'II', 'III', 'IV', 'V', 'VI']);
export type TaxClass = z.infer<typeof TaxClass>;

export const FederalState = z.enum([
  'BW',
  'BY',
  'BE',
  'BB',
  'HB',
  'HH',
  'HE',
  'NI',
  'MV',
  'NW',
  'RP',
  'SL',
  'SN',
  'ST',
  'SH',
  'TH',
]);
export type FederalState = z.infer<typeof FederalState>;
