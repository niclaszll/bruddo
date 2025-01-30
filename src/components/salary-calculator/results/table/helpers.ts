import { CalculationPeriodTuple } from '@/features/aggregation/service';
import { TranslationKey } from '@/types/i18n';

import { FormState } from '../../actions';

type TableRow = {
  label: TranslationKey;
  value: CalculationPeriodTuple;
  isBold: boolean;
};

export const getTableRows = (results: FormState): TableRow[] => {
  if (!results.employeeResults || !results.employerResults) return [];

  return [
    {
      label: 'Results.employeeResults.taxes.incomeTax',
      value: results.employeeResults.taxes.incomeTax,
      isBold: false,
    },
    {
      label: 'Results.employeeResults.taxes.solidaritySurcharge',
      value: results.employeeResults.taxes.solidaritySurcharge,
      isBold: false,
    },
    {
      label: 'Results.employeeResults.taxes.churchTax',
      value: results.employeeResults.taxes.churchTax,
      isBold: false,
    },
    {
      label: 'Results.employeeResults.taxes.total',
      value: results.employeeResults.taxes.total,
      isBold: true,
    },
    {
      label: 'Results.employeeResults.socialSecurity.healthInsurance',
      value: results.employeeResults.socialSecurity.healthInsurance,
      isBold: false,
    },
    {
      label: 'Results.employeeResults.socialSecurity.nursingCareInsurance',
      value: results.employeeResults.socialSecurity.nursingCareInsurance,
      isBold: false,
    },
    {
      label: 'Results.employeeResults.socialSecurity.pensionInsurance',
      value: results.employeeResults.socialSecurity.pensionInsurance,
      isBold: false,
    },
    {
      label: 'Results.employeeResults.socialSecurity.unemploymentInsurance',
      value: results.employeeResults.socialSecurity.unemploymentInsurance,
      isBold: false,
    },
    {
      label: 'Results.employeeResults.socialSecurity.total',
      value: results.employeeResults.socialSecurity.total,
      isBold: true,
    },
  ];
};
