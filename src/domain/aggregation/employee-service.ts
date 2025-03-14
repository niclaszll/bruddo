'server only';

import ChurchTaxService from '@/domain/taxes/church-tax/service';
import IncomeTaxService from '@/domain/taxes/income-tax/service';
import { CalculationPeriodTuple } from '@/types/common';
import { UserInputs } from '@/types/form';
import { roundDownToFullCent, roundToFullCent } from '@/util/format';

import BaseService from './base-service';

export type EmployeeResults = {
  grossIncome: CalculationPeriodTuple;
  taxes: {
    incomeTax: CalculationPeriodTuple;
    solidaritySurcharge: CalculationPeriodTuple;
    churchTax: CalculationPeriodTuple;
    total: CalculationPeriodTuple;
  };
  socialSecurity: {
    healthInsurance: CalculationPeriodTuple;
    nursingCareInsurance: CalculationPeriodTuple;
    pensionInsurance: CalculationPeriodTuple;
    unemploymentInsurance: CalculationPeriodTuple;
    total: CalculationPeriodTuple;
  };
  netIncome: CalculationPeriodTuple;
};

class EmployeeService extends BaseService {
  static #instance: EmployeeService;

  private constructor() {
    super();
  }

  public static get instance(): EmployeeService {
    return (this.#instance ??= new EmployeeService());
  }

  private getTaxResults(inputs: UserInputs) {
    const incomeTaxResults = IncomeTaxService.calculateIncomeTax(inputs);
    const churchTax = ChurchTaxService.calculateChurchTax(
      incomeTaxResults.churchTaxAssessmentBasis,
      inputs.federalState,
      inputs.churchTax,
    );

    const total = roundDownToFullCent(
      incomeTaxResults.incomeTax + incomeTaxResults.solidaritySurcharge + churchTax,
    );

    return {
      incomeTaxResults,
      churchTax,
      total,
    };
  }

  public getAggregatedResults(inputs: UserInputs): EmployeeResults {
    const { calculationPeriod, grossIncome } = inputs;
    const { incomeTaxResults, churchTax, total: taxTotal } = this.getTaxResults(inputs);
    const socSecResults = this.getSocialSecResults(inputs);

    const netIncome = roundToFullCent(
      grossIncome - (taxTotal + socSecResults.totalEmployeeContribution),
    );

    const getValues = (value: number) => this.getMonthlyAndYearlyValues(value, calculationPeriod);

    return {
      grossIncome: getValues(grossIncome),
      taxes: {
        incomeTax: getValues(incomeTaxResults.incomeTax),
        solidaritySurcharge: getValues(incomeTaxResults.solidaritySurcharge),
        churchTax: getValues(churchTax),
        total: getValues(taxTotal),
      },
      socialSecurity: {
        healthInsurance: getValues(socSecResults.healthInsurance.employeeContribution),
        nursingCareInsurance: getValues(socSecResults.nursingCareInsurance.employeeContribution),
        pensionInsurance: getValues(socSecResults.pensionInsurance.employeeContribution),
        unemploymentInsurance: getValues(socSecResults.unemploymentInsurance.employeeContribution),
        total: getValues(socSecResults.totalEmployeeContribution),
      },
      netIncome: getValues(netIncome),
    };
  }

  public getAggregatedResultsInRange(
    minGrossIncome: number,
    maxGrossIncome: number,
    stepSize: number,
    inputs: UserInputs,
  ): EmployeeResults[] {
    const results: EmployeeResults[] = [];

    for (let grossIncome = minGrossIncome; grossIncome <= maxGrossIncome; grossIncome += stepSize) {
      const result = this.getAggregatedResults({ ...inputs, grossIncome });
      results.push(result);
    }

    return results;
  }
}

export default EmployeeService.instance;
