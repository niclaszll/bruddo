'use client';

import { Form } from '@/components/ui/form';
import AggregationService, {
  EmployeeResults,
  EmployerResults,
} from '@/features/aggregation/service';
import { CalculationPeriod, FederalState, TaxClass } from '@/types/common';
import { UserInputs } from '@/types/form';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';

import CalculationPeriodSelect from './fields/calculation-period-select';
import ChildAllowancesSelect from './fields/child-allowances-select';
import ChurchTaxCheckbox from './fields/church-tax-checkbox';
import DobInput from './fields/dob-input';
import FederalStateSelect from './fields/federal-state-select';
import GrossIncomeInput from './fields/gross-income-input';
import HealthInsuranceAddConInput from './fields/health-insurance-input';
import NumberOfChildrenSelect from './fields/number-children-select';
import NursingCareInsuranceSurchargeCheckbox from './fields/nursing-care-insurance-surcharge-checkbox';
import TaxClassSelect from './fields/tax-class-select';

const defaultValues: UserInputs = {
  calculationPeriod: CalculationPeriod.enum.YEAR,
  grossIncome: 50000,
  taxClass: TaxClass.enum.I,
  federalState: FederalState.enum.BW,
  healthInsuranceAdditionalContribution: 2.5,
  churchTax: true,
  dob: '2000-01-01',
  numChildren: 0,
  childAllowances: 0,
  nursingCareInsuranceSurcharge: true,
};

export default function SalaryForm() {
  const [employeeResults, setEmployeeResults] = React.useState<EmployeeResults | null>(null);
  const [employerResults, setEmployerResults] = React.useState<EmployerResults | null>(null);
  const form = useForm<UserInputs>({
    resolver: zodResolver(UserInputs),
    defaultValues,
  });

  const getResults = React.useCallback(
    (data: UserInputs) => {
      const surcharge = form.watch('nursingCareInsuranceSurcharge');
      if (surcharge && data.numChildren !== 0) form.setValue('numChildren', 0);

      setEmployeeResults(AggregationService.getAggregatedResultsForEmployee(data));
      setEmployerResults(AggregationService.getAggregatedResultsForEmployer(data));
    },
    [form],
  );

  React.useEffect(() => {
    getResults(form.getValues());
  }, [form, getResults]);

  return (
    <div className="max-w-6xl space-y-4 mx-auto flex flex-wrap gap-12 justify-center">
      <Form {...form}>
        <form
          onChange={form.handleSubmit(getResults)}
          onSubmit={form.handleSubmit(getResults)}
          className="flex flex-col gap-4"
        >
          <CalculationPeriodSelect />
          <GrossIncomeInput />
          <TaxClassSelect />
          <FederalStateSelect />
          <HealthInsuranceAddConInput />
          <ChurchTaxCheckbox />
          <DobInput />
          <NursingCareInsuranceSurchargeCheckbox />
          <NumberOfChildrenSelect />
          <ChildAllowancesSelect />
        </form>
      </Form>
      <div>
        <h2>Employee Results</h2>
        <pre>{JSON.stringify(employeeResults, null, 4)}</pre>
        <h2>Employer Results</h2>
        <pre>{JSON.stringify(employerResults, null, 4)}</pre>
      </div>
    </div>
  );
}
