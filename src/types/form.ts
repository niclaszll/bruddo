import { z } from 'zod';

import { CalculationPeriod, FederalState, TaxClass } from './common';

export const UserInputs = z.object({
  calculationPeriod: CalculationPeriod,
  grossIncome: z.preprocess(Number, z.number()),
  taxClass: TaxClass,
  federalState: FederalState,
  healthInsuranceAdditionalContribution: z.preprocess(Number, z.number()),
  churchTax: z.boolean(),
  dob: z.string().date(),
});

export type UserInputs = z.infer<typeof UserInputs>;
