'use client';

import { Form } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/shadcn/use-toast';
import { CalculationPeriod, FederalState, TaxClass } from '@/types/common';
import { UserInputs } from '@/types/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { startTransition, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';

import { FormState } from '../actions';
import CalculationPeriodSelect from './fields/calculation-period-select';
import ChildAllowancesSelect from './fields/child-allowances-select';
import ChurchTaxCheckbox from './fields/church-tax-checkbox';
import DobInput from './fields/dob-input';
import FederalStateSelect from './fields/federal-state-select';
import GrossIncomeInput from './fields/gross-income-input';
import HealthInsuranceAddConInput from './fields/health-insurance-input';
import NumberOfChildrenSelect from './fields/number-children-select';
import NursingCareInsuranceSurchargeCheckbox from './fields/nursing-care-insurance-surcharge-checkbox';
import TaxAllowanceInput from './fields/tax-allowance-input';
import TaxClassSelect from './fields/tax-class-select';

export const defaultValues: UserInputs = {
  calculationPeriod: CalculationPeriod.enum.YEAR,
  grossIncome: 40_000,
  taxClass: TaxClass.enum.I,
  federalState: FederalState.enum.BW,
  healthInsuranceAdditionalContribution: 2.5,
  churchTax: true,
  dob: '2000-01-01',
  numChildren: 0,
  childAllowances: 0,
  nursingCareInsuranceSurcharge: true,
  taxAllowance: 0,
};

type Props = {
  formState: FormState;
  formAction: (payload: FormData) => void;
};

export default function SalaryForm({ formState, formAction }: Props) {
  const t = useTranslations('common.errorToast');
  const { toast } = useToast();

  const form = useForm<UserInputs>({
    resolver: zodResolver(UserInputs),
    defaultValues,
  });

  const formRef = useRef<HTMLFormElement>(null);

  const handleFieldDependencies = (data: UserInputs) => {
    const surcharge = form.watch('nursingCareInsuranceSurcharge');
    if (surcharge && data.numChildren !== 0) form.setValue('numChildren', 0);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.handleSubmit(() => {
      handleFieldDependencies(form.getValues());
      if (formRef.current != null)
        startTransition(() => formAction(new FormData(formRef.current ?? undefined)));
    })(e);
  };

  useEffect(() => {
    formRef.current?.requestSubmit();
  }, [form]);

  useEffect(() => {
    if (formState.error) {
      toast({
        variant: 'destructive',
        title: t('title'),
        description: t('description'),
      });
    }
  }, [formState, t, toast]);

  return (
    <Form {...form}>
      <form
        ref={formRef}
        action={formAction}
        onSubmit={handleSubmit}
        onChange={handleSubmit}
        className="flex flex-col md:gap-4 gap-6"
      >
        <CalculationPeriodSelect />
        <GrossIncomeInput />
        <FederalStateSelect />
        <Separator className="mt-2" />
        <TaxClassSelect />
        <TaxAllowanceInput />
        <ChurchTaxCheckbox />
        <DobInput />
        <ChildAllowancesSelect />
        <Separator className="mt-2" />
        <HealthInsuranceAddConInput />
        <NursingCareInsuranceSurchargeCheckbox />
        <NumberOfChildrenSelect />
      </form>
    </Form>
  );
}
