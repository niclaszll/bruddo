'use client';

import { Form } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { initialState } from '@/domain/init';
import { useToast } from '@/hooks/shadcn/use-toast';
import { UserInputs } from '@/types/form';
import { FormState } from '@/util/actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { startTransition, useCallback, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';

import CalculationPeriodSelect from './fields/calculation-period-select';
import ChildAllowancesSelect from './fields/child-allowances-select';
import ChurchTaxSwitch from './fields/church-tax-switch';
import DobInput from './fields/dob-input';
import FederalStateSelect from './fields/federal-state-select';
import GrossIncomeInput from './fields/gross-income-input';
import HealthInsuranceAddConInput from './fields/health-insurance-input';
import NumberOfChildrenSelect from './fields/number-children-select';
import NursingCareInsuranceSurchargeSwitch from './fields/nursing-care-insurance-surcharge-switch';
import TaxAllowanceInput from './fields/tax-allowance-input';
import TaxClassSelect from './fields/tax-class-select';

type Props = {
  formState: FormState;
  formAction: (payload: FormData) => void;
};

export default function SalaryForm({ formState, formAction }: Props) {
  const t = useTranslations('common.errorToast');
  const { toast } = useToast();

  const form = useForm<UserInputs>({
    resolver: zodResolver(UserInputs),
    defaultValues: initialState.userInputs,
  });

  const formRef = useRef<HTMLFormElement>(null);

  const handleFieldDependencies = useCallback(
    (data: UserInputs) => {
      const surcharge = form.watch('nursingCareInsuranceSurcharge');
      if (surcharge && data.numChildren !== 0) {
        form.setValue('numChildren', 0);
      }
    },
    [form],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (typeof umami !== 'undefined') umami.track('Handle form submit');
      form.handleSubmit(() => {
        handleFieldDependencies(form.getValues());
        if (formRef.current) {
          startTransition(() => formAction(new FormData(formRef.current!)));
        }
      })(e);
    },
    [form, formAction, handleFieldDependencies],
  );

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
  }, [formState.error, t, toast]);

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
        <ChurchTaxSwitch />
        <DobInput />
        <ChildAllowancesSelect />
        <Separator className="mt-2" />
        <HealthInsuranceAddConInput />
        <NursingCareInsuranceSurchargeSwitch />
        <NumberOfChildrenSelect />
      </form>
    </Form>
  );
}
