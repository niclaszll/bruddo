'use client';

import { Form } from '@/components/ui/form';
import { CalculationPeriod, FederalState, TaxClass, UserInputs } from '@/types/common';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';

import CalculationPeriodSelect from './fields/calculation-period-select';
import ChurchTaxCheckbox from './fields/church-tax-checkbox';
import DobInput from './fields/dob-input';
import FederalStateSelect from './fields/federal-state-select';
import GrossIncomeInput from './fields/gross-income-input';
import HealthInsuranceAddConInput from './fields/health-insurance-input';
import TaxClassSelect from './fields/tax-class-select';
import { getSalaryResults } from './helpers';

const defaultValues: UserInputs = {
  calculationPeriod: CalculationPeriod.enum.year,
  grossIncome: 50000,
  taxClass: TaxClass.enum.I,
  federalState: FederalState.enum.BW,
  healthInsuranceAdditionalContribution: 2.5,
  churchTax: true,
  dob: new Date().toISOString().split('T')[0],
};

export default function SalaryForm() {
  const [results, setResults] = React.useState<object | null>(null);
  const form = useForm<UserInputs>({
    resolver: zodResolver(UserInputs),
    defaultValues,
  });

  function onSubmit(data: UserInputs) {
    setResults(getSalaryResults(data));
  }

  return (
    <div className="max-w-6xl space-y-4 mx-auto flex flex-wrap gap-12 justify-center">
      <Form {...form}>
        <form
          onChange={form.handleSubmit(onSubmit)}
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <CalculationPeriodSelect />
          <GrossIncomeInput />
          <TaxClassSelect />
          <FederalStateSelect />
          <HealthInsuranceAddConInput />
          <ChurchTaxCheckbox />
          <DobInput />
        </form>
      </Form>
      <div>
        <pre>{JSON.stringify(results, null, 4)}</pre>
      </div>
    </div>
  );
}
