import { FormState } from '@/components/form/actions';
import { CalculationPeriodTuple } from '@/types/common';
import { TranslationKey } from '@/types/i18n';

type TableRow = {
  label: TranslationKey;
  value: CalculationPeriodTuple;
  isBold: boolean;
};

export const getTableRows = (results: FormState): TableRow[] => {
  if (!results.employeeResults) return [];

  return [
    {
      label: 'Results.employeeResults.taxes.incomeTax.default',
      value: results.employeeResults.taxes.incomeTax,
      isBold: false,
    },
    {
      label: 'Results.employeeResults.taxes.solidaritySurcharge.default',
      value: results.employeeResults.taxes.solidaritySurcharge,
      isBold: false,
    },
    {
      label: 'Results.employeeResults.taxes.churchTax.default',
      value: results.employeeResults.taxes.churchTax,
      isBold: false,
    },
    {
      label: 'Results.employeeResults.taxes.total.default',
      value: results.employeeResults.taxes.total,
      isBold: true,
    },
    {
      label: 'Results.employeeResults.socialSecurity.healthInsurance.default',
      value: results.employeeResults.socialSecurity.healthInsurance,
      isBold: false,
    },
    {
      label: 'Results.employeeResults.socialSecurity.nursingCareInsurance.default',
      value: results.employeeResults.socialSecurity.nursingCareInsurance,
      isBold: false,
    },
    {
      label: 'Results.employeeResults.socialSecurity.pensionInsurance.default',
      value: results.employeeResults.socialSecurity.pensionInsurance,
      isBold: false,
    },
    {
      label: 'Results.employeeResults.socialSecurity.unemploymentInsurance.default',
      value: results.employeeResults.socialSecurity.unemploymentInsurance,
      isBold: false,
    },
    {
      label: 'Results.employeeResults.socialSecurity.total.default',
      value: results.employeeResults.socialSecurity.total,
      isBold: true,
    },
  ];
};
