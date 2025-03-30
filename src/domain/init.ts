import { FormState } from '@/components/form/actions';
import { CalculationPeriod, FederalState, TaxClass } from '@/types/common';

// provide an initial precalculated state for faster page loads
// TODO: make this dynamic
export const initialState: FormState = {
  employeeResults: {
    grossSalary: {
      MONTH: 3333.33,
      YEAR: 40000,
    },
    taxes: {
      incomeTax: {
        MONTH: 385.75,
        YEAR: 4629,
      },
      solidaritySurcharge: {
        MONTH: 0,
        YEAR: 0,
      },
      churchTax: {
        MONTH: 30.86,
        YEAR: 370.32,
      },
      total: {
        MONTH: 416.6,
        YEAR: 4999.32,
      },
    },
    socialSecurity: {
      healthInsurance: {
        MONTH: 285,
        YEAR: 3420,
      },
      nursingCareInsurance: {
        MONTH: 80,
        YEAR: 960,
      },
      pensionInsurance: {
        MONTH: 310,
        YEAR: 3720,
      },
      unemploymentInsurance: {
        MONTH: 43.33,
        YEAR: 520,
      },
      total: {
        MONTH: 718.33,
        YEAR: 8620,
      },
    },
    netSalary: {
      MONTH: 2198.39,
      YEAR: 26380.68,
    },
  },
  employeeResultsRange: undefined,
  userInputs: {
    calculationPeriod: CalculationPeriod.enum.YEAR,
    grossSalary: 40_000,
    taxClass: TaxClass.enum.I,
    federalState: FederalState.enum.BW,
    healthInsuranceAdditionalContribution: 2.5,
    churchTax: true,
    dob: '2000-01-01',
    numChildren: 0,
    childAllowances: 0,
    nursingCareInsuranceSurcharge: true,
    taxAllowance: 0,
  },
  error: false,
};
