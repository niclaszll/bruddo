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
  numChildren: z.preprocess(Number, z.number().min(0).max(5)),
  childAllowances: z.preprocess(Number, z.number().min(0).max(10)),
  longTermCareInsuranceSurcharge: z.boolean(),
});

export type UserInputs = z.infer<typeof UserInputs>;
