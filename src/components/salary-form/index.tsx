'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { CalculationPeriod, TaxClass, UserInputs } from '@/types/common';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';

import CalculationPeriodSelect from './fields/calculation-period-select';
import GrossIncomeInput from './fields/gross-income-input';
import TaxClassSelect from './fields/tax-class-select';
import { getSalaryResults } from './helpers';

const defaultValues: UserInputs = {
  calculationPeriod: CalculationPeriod.Enum.year,
  grossIncome: 50000,
  taxClass: TaxClass.enum.I,
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
    <div className="max-w-sm space-y-4 mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CalculationPeriodSelect />
          <GrossIncomeInput />
          <TaxClassSelect />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <pre>{JSON.stringify(results, null, 4)}</pre>
    </div>
  );
}
