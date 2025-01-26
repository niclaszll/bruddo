'use client';

import { Form } from '@/components/ui/form';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { Table, TableBody, TableCell, TableFooter, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/shadcn/use-toast';
import { CalculationPeriod, FederalState, TaxClass } from '@/types/common';
import { UserInputs } from '@/types/form';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { startTransition, useActionState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';

import { onSubmitAction } from './actions';
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
  const { toast } = useToast();
  const [state, formAction] = useActionState(onSubmitAction, {
    error: false,
    employeeResults: undefined,
    employerResults: undefined,
  });

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
      startTransition(() => formAction(new FormData(formRef.current!)));
    })(e);
  };

  useEffect(() => {
    formRef.current?.requestSubmit();
  }, [form]);

  useEffect(() => {
    if (state.error) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
      });
    }
  }, [state, toast]);

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="max-w-8xl mx-auto flex gap-8 p-8"
    >
      <ResizablePanel defaultSize={20}>
        <Form {...form}>
          <form
            ref={formRef}
            action={formAction}
            onSubmit={handleSubmit}
            onChange={handleSubmit}
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
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel className="max-w-6xl mx-auto grow">
        <Table className="caption-top">
          <TableBody>
            <TableRow className="font-bold bg-muted/30">
              <TableCell>Bruttogehalt</TableCell>
              <TableCell>{state.employeeResults?.grossIncome}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Lohnsteuer</TableCell>
              <TableCell>{state.employeeResults?.taxes.incomeTax}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Solidaritätszuschlag</TableCell>
              <TableCell>{state.employeeResults?.taxes.solidaritySurcharge}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Kirchensteuer</TableCell>
              <TableCell>{state.employeeResults?.taxes.churchTax}</TableCell>
            </TableRow>
            <TableRow className="font-bold bg-muted/30">
              <TableCell>Gesamtabzug Steuern</TableCell>
              <TableCell>{state.employeeResults?.taxes.total}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Krankenversicherung</TableCell>
              <TableCell>{state.employeeResults?.socialSecurity.healthInsurance}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Pflegeversicherung</TableCell>
              <TableCell>{state.employeeResults?.socialSecurity.nursingCareInsurance}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Rentenversicherung</TableCell>
              <TableCell>{state.employeeResults?.socialSecurity.pensionInsurance}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Arbeitslosenversicherung</TableCell>
              <TableCell>{state.employeeResults?.socialSecurity.unemploymentInsurance}</TableCell>
            </TableRow>
            <TableRow className="font-bold bg-muted/30">
              <TableCell>Gesamtabzug Sozialversicherung</TableCell>
              <TableCell>{state.employeeResults?.socialSecurity.total}</TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow className="font-bold">
              <TableCell colSpan={1}>Nettoverdienst</TableCell>
              <TableCell>{state.employeeResults?.netIncome}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
