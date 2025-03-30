import { TranslationKey } from '@/types/i18n';

export const chartConfig = {
  incomeTax: {
    label: 'Results.employeeResults.taxes.incomeTax.short' satisfies TranslationKey,
    color: 'hsl(var(--chart-1))',
  },
  solidaritySurcharge: {
    label: 'Results.employeeResults.taxes.solidaritySurcharge.short' satisfies TranslationKey,
    color: 'hsl(var(--chart-2))',
  },
  churchTax: {
    label: 'Results.employeeResults.taxes.churchTax.short' satisfies TranslationKey,
    color: 'hsl(var(--chart-3))',
  },
  healthInsurance: {
    label: 'Results.employeeResults.socialSecurity.healthInsurance.short' satisfies TranslationKey,
    color: 'hsl(var(--chart-4))',
  },
  nursingCareInsurance: {
    label:
      'Results.employeeResults.socialSecurity.nursingCareInsurance.short' satisfies TranslationKey,
    color: 'hsl(var(--chart-5))',
  },
  pensionInsurance: {
    label: 'Results.employeeResults.socialSecurity.pensionInsurance.short' satisfies TranslationKey,
    color: 'hsl(var(--chart-6))',
  },
  unemploymentInsurance: {
    label:
      'Results.employeeResults.socialSecurity.unemploymentInsurance.short' satisfies TranslationKey,
    color: 'hsl(var(--chart-7))',
  },
  netSalary: {
    label: 'Results.employeeResults.netSalary.short' satisfies TranslationKey,
    color: 'hsl(var(--chart-8))',
  },
};
