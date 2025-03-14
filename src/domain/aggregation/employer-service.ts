'server only';

import { CalculationPeriodTuple } from '@/types/common';
import { UserInputs } from '@/types/form';

import BaseService from './base-service';

export type EmployerResults = {
  grossIncome: CalculationPeriodTuple;
  socialSecurity: {
    healthInsurance: CalculationPeriodTuple;
    nursingCareInsurance: CalculationPeriodTuple;
    pensionInsurance: CalculationPeriodTuple;
    unemploymentInsurance: CalculationPeriodTuple;
    total: CalculationPeriodTuple;
  };
};

class EmployerService extends BaseService {
  static #instance: EmployerService;

  private constructor() {
    super();
  }

  public static get instance(): EmployerService {
    return (this.#instance ??= new EmployerService());
  }

  public getAggregatedResults(inputs: UserInputs): EmployerResults {
    const socSecContrib = this.getSocialSecResults(inputs);

    const getValues = (value: number) =>
      this.getMonthlyAndYearlyValues(value, inputs.calculationPeriod);

    return {
      grossIncome: getValues(inputs.grossIncome),
      socialSecurity: {
        healthInsurance: getValues(socSecContrib.healthInsurance.employerContribution),
        nursingCareInsurance: getValues(socSecContrib.nursingCareInsurance.employerContribution),
        pensionInsurance: getValues(socSecContrib.pensionInsurance.employerContribution),
        unemploymentInsurance: getValues(socSecContrib.unemploymentInsurance.employerContribution),
        total: getValues(socSecContrib.totalEmployerContribution),
      },
    };
  }
}

export default EmployerService.instance;
