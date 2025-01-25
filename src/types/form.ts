import { z } from 'zod';

import { CalculationPeriod, FederalState, TaxClass } from './common';

// https://github.com/colinhacks/zod/issues/2985
const castStringToBool = z.preprocess((val) => {
  if (typeof val === 'string') {
    if (['1', 'true'].includes(val.toLowerCase())) return true;
    if (['0', 'false'].includes(val.toLowerCase())) return false;
  }
  return val;
}, z.coerce.boolean());

export const UserInputs = z.object({
  calculationPeriod: CalculationPeriod,
  grossIncome: z.preprocess(Number, z.number()),
  taxClass: TaxClass,
  federalState: FederalState,
  healthInsuranceAdditionalContribution: z.preprocess(Number, z.number()),
  churchTax: castStringToBool,
  dob: z.string().date(),
  numChildren: z.preprocess(Number, z.number().min(0).max(5)).default(0),
  childAllowances: z.preprocess(Number, z.number().min(0).max(10)),
  nursingCareInsuranceSurcharge: castStringToBool,
});

export type UserInputs = z.infer<typeof UserInputs>;
