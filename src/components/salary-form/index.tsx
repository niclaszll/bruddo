'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { CalculationPeriod, TaxClass } from '@/types/common';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import CalculationPeriodSelect from './fields/calculation-period-select';
import GrossIncomeInput from './fields/gross-income-input';
import TaxClassSelect from './fields/tax-class-select';

export const FormSchema = z.object({
  calculationPeriod: CalculationPeriod,
  grossIncome: z.preprocess(Number, z.number()),
  taxClass: TaxClass,
});

const defaultValues: z.infer<typeof FormSchema> = {
  calculationPeriod: CalculationPeriod.Enum.year,
  grossIncome: 50000,
  taxClass: TaxClass.enum.I,
};

export default function SalaryForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-sm space-y-4 mx-auto"
      >
        <CalculationPeriodSelect />
        <GrossIncomeInput />
        <TaxClassSelect />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
