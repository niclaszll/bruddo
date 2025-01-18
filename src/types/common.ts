import { z } from 'zod';

export const CalculationPeriod = z.enum(['year', 'month']);
export type CalculationPeriod = z.infer<typeof CalculationPeriod>;

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

export const UserInputs = z.object({
  calculationPeriod: CalculationPeriod,
  grossIncome: z.preprocess(Number, z.number()),
  taxClass: TaxClass,
  federalState: FederalState,
  healthInsuranceAdditionalContribution: z.preprocess(Number, z.number()),
  churchTax: z.boolean(),
  dob: z.string().pipe(z.coerce.date()),
});

export type UserInputs = z.infer<typeof UserInputs>;
