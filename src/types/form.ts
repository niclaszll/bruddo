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

const castNumberStringToNumber = z.preprocess(
  (val) => Number(`${val}`.replaceAll('.', '').replace(',', '.')),
  z.number(),
);

export const UserInputs = z.object({
  calculationPeriod: CalculationPeriod,
  grossSalary: castNumberStringToNumber,
  taxClass: TaxClass,
  federalState: FederalState,
  healthInsuranceAdditionalContribution: castNumberStringToNumber,
  churchTax: castStringToBool,
  dob: z.string().date(),
  numChildren: z.preprocess(Number, z.number().min(0).max(5)).default(0),
  childAllowances: z.preprocess(Number, z.number().min(0).max(10)),
  nursingCareInsuranceSurcharge: castStringToBool,
  taxAllowance: castNumberStringToNumber,
});

export type UserInputs = z.infer<typeof UserInputs>;
