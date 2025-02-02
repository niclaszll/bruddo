'server only';

import SocialSecurityService from '@/features/social-security/service';
import ChurchTaxService from '@/features/taxes/church-tax/service';
import TaxService from '@/features/taxes/income-tax/service';
import { CalculationPeriod } from '@/types/common';
import { UserInputs } from '@/types/form';
import { roundDownToFullCent, roundToFullCent } from '@/util/format';

import { calculateUserAge } from './util';

export type CalculationPeriodTuple = {
  [CalculationPeriod.enum.MONTH]: number;
  [CalculationPeriod.enum.YEAR]: number;
};

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

type NetIncomeCalculationParams = {
  grossIncome: number;
  taxes: {
    incomeTax: number;
    solidaritySurcharge: number;
    churchTax: number;
    total: number;
  };
  socialSecurity: {
    healthInsurance: number;
    nursingCareInsurance: number;
    pensionInsurance: number;
    unemploymentInsurance: number;
    total: number;
  };
};

class AggregationService {
  static #instance: AggregationService;

  private constructor() {}

  public static get instance(): AggregationService {
    if (!AggregationService.#instance) {
      AggregationService.#instance = new AggregationService();
    }

    return AggregationService.#instance;
  }

  private calculateEmployeeNetIncome(params: NetIncomeCalculationParams) {
    return roundToFullCent(
      params.grossIncome -
        params.taxes.incomeTax -
        params.taxes.solidaritySurcharge -
        params.taxes.churchTax -
        params.socialSecurity.healthInsurance -
        params.socialSecurity.nursingCareInsurance -
        params.socialSecurity.pensionInsurance -
        params.socialSecurity.unemploymentInsurance,
    );
  }

  private calculateSocialSecurityContributions(inputs: UserInputs) {
    const healthInsuranceResults =
      SocialSecurityService.calculateStatutoryHealthInsuranceContribution(
        inputs.grossIncome,
        inputs.healthInsuranceAdditionalContribution,
        inputs.calculationPeriod,
      );

    const nursingCareInsuranceResults =
      SocialSecurityService.calculateNursingCareInsuranceContribution(
        inputs.grossIncome,
        inputs.numChildren,
        calculateUserAge(inputs.dob),
        inputs.federalState,
        inputs.calculationPeriod,
      );

    const pensionInsuranceResults = SocialSecurityService.calculatePensionInsuranceContribution(
      inputs.grossIncome,
      inputs.calculationPeriod,
    );

    const unemploymentInsuranceResults =
      SocialSecurityService.calculateUnemploymentInsuranceContribution(
        inputs.grossIncome,
        inputs.calculationPeriod,
      );

    const totalEmployeeContribution = roundDownToFullCent(
      healthInsuranceResults.employeeContribution +
        nursingCareInsuranceResults.employeeContribution +
        pensionInsuranceResults.employeeContribution +
        unemploymentInsuranceResults.employeeContribution,
    );

    const totalEmployerContribution = roundDownToFullCent(
      healthInsuranceResults.employerContribution +
        nursingCareInsuranceResults.employerContribution +
        pensionInsuranceResults.employerContribution +
        unemploymentInsuranceResults.employerContribution,
    );

    return {
      healthInsuranceResults,
      nursingCareInsuranceResults,
      pensionInsuranceResults,
      unemploymentInsuranceResults,
      totalEmployeeContribution,
      totalEmployerContribution,
    };
  }

  private calculateTaxContributions(inputs: UserInputs) {
    const incomeTaxResults = TaxService.calculateIncomeTax(inputs);
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

  public getMonthlyAndYearlyValues(
    value: number,
    calculationPeriod: CalculationPeriod,
  ): CalculationPeriodTuple {
    if (calculationPeriod === CalculationPeriod.enum.YEAR) {
      return { [CalculationPeriod.enum.MONTH]: value / 12, [CalculationPeriod.enum.YEAR]: value };
    } else {
      return { [CalculationPeriod.enum.MONTH]: value, [CalculationPeriod.enum.YEAR]: value * 12 };
    }
  }

  public getAggregatedResultsForEmployee(inputs: UserInputs): EmployeeResults {
    const taxContrib = this.calculateTaxContributions(inputs);
    const socSecContrib = this.calculateSocialSecurityContributions(inputs);

    const netIncomeCalcParams: NetIncomeCalculationParams = {
      grossIncome: inputs.grossIncome,
      taxes: {
        incomeTax: taxContrib.incomeTaxResults.incomeTax,
        solidaritySurcharge: taxContrib.incomeTaxResults.solidaritySurcharge,
        churchTax: taxContrib.churchTax,
        total: taxContrib.total,
      },
      socialSecurity: {
        healthInsurance: socSecContrib.healthInsuranceResults.employeeContribution,
        nursingCareInsurance: socSecContrib.nursingCareInsuranceResults.employeeContribution,
        pensionInsurance: socSecContrib.pensionInsuranceResults.employeeContribution,
        unemploymentInsurance: socSecContrib.unemploymentInsuranceResults.employeeContribution,
        total: socSecContrib.totalEmployeeContribution,
      },
    };

    const netIncome = this.calculateEmployeeNetIncome(netIncomeCalcParams);

    return {
      grossIncome: this.getMonthlyAndYearlyValues(inputs.grossIncome, inputs.calculationPeriod),
      taxes: {
        incomeTax: this.getMonthlyAndYearlyValues(
          taxContrib.incomeTaxResults.incomeTax,
          inputs.calculationPeriod,
        ),
        solidaritySurcharge: this.getMonthlyAndYearlyValues(
          taxContrib.incomeTaxResults.solidaritySurcharge,
          inputs.calculationPeriod,
        ),
        churchTax: this.getMonthlyAndYearlyValues(taxContrib.churchTax, inputs.calculationPeriod),
        total: this.getMonthlyAndYearlyValues(taxContrib.total, inputs.calculationPeriod),
      },
      socialSecurity: {
        healthInsurance: this.getMonthlyAndYearlyValues(
          socSecContrib.healthInsuranceResults.employeeContribution,
          inputs.calculationPeriod,
        ),
        nursingCareInsurance: this.getMonthlyAndYearlyValues(
          socSecContrib.nursingCareInsuranceResults.employeeContribution,
          inputs.calculationPeriod,
        ),
        pensionInsurance: this.getMonthlyAndYearlyValues(
          socSecContrib.pensionInsuranceResults.employeeContribution,
          inputs.calculationPeriod,
        ),
        unemploymentInsurance: this.getMonthlyAndYearlyValues(
          socSecContrib.unemploymentInsuranceResults.employeeContribution,
          inputs.calculationPeriod,
        ),
        total: this.getMonthlyAndYearlyValues(
          socSecContrib.totalEmployeeContribution,
          inputs.calculationPeriod,
        ),
      },
      netIncome: this.getMonthlyAndYearlyValues(netIncome, inputs.calculationPeriod),
    };
  }

  public getAggregatedResultsForEmployer(inputs: UserInputs): EmployerResults {
    const socSecContrib = this.calculateSocialSecurityContributions(inputs);

    return {
      grossIncome: this.getMonthlyAndYearlyValues(inputs.grossIncome, inputs.calculationPeriod),
      socialSecurity: {
        healthInsurance: this.getMonthlyAndYearlyValues(
          socSecContrib.healthInsuranceResults.employerContribution,
          inputs.calculationPeriod,
        ),
        nursingCareInsurance: this.getMonthlyAndYearlyValues(
          socSecContrib.nursingCareInsuranceResults.employerContribution,
          inputs.calculationPeriod,
        ),
        pensionInsurance: this.getMonthlyAndYearlyValues(
          socSecContrib.pensionInsuranceResults.employerContribution,
          inputs.calculationPeriod,
        ),
        unemploymentInsurance: this.getMonthlyAndYearlyValues(
          socSecContrib.unemploymentInsuranceResults.employerContribution,
          inputs.calculationPeriod,
        ),
        total: this.getMonthlyAndYearlyValues(
          socSecContrib.totalEmployerContribution,
          inputs.calculationPeriod,
        ),
      },
    };
  }

  public getAggregatedResultsForEmployeeInRange(
    minGrossIncome: number,
    maxGrossIncome: number,
    stepSize: number,
    inputs: UserInputs,
  ): EmployeeResults[] {
    const results: EmployeeResults[] = [];

    for (let grossIncome = minGrossIncome; grossIncome <= maxGrossIncome; grossIncome += stepSize) {
      const result = this.getAggregatedResultsForEmployee({ ...inputs, grossIncome });
      results.push(result);
    }

    return results;
  }
}

export default AggregationService.instance;
