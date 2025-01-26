'server only';

import SocialSecurityService from '@/features/social-security/service';
import ChurchTaxService from '@/features/taxes/church-tax/service';
import TaxService from '@/features/taxes/income-tax/service';
import { UserInputs } from '@/types/form';
import { roundDownToFullCent, roundToFullCent } from '@/util/format';

import { calculateUserAge } from './util';

export type EmployeeResults = {
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
  netIncome: number;
};

export type EmployerResults = {
  grossIncome: number;
  socialSecurity: {
    healthInsurance: number;
    nursingCareInsurance: number;
    pensionInsurance: number;
    unemploymentInsurance: number;
    total: number;
  };
};

type NetIncomeCalculationParams = Omit<EmployeeResults, 'netIncome'>;

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
      ...netIncomeCalcParams,
      netIncome,
    };
  }

  public getAggregatedResultsForEmployer(inputs: UserInputs): EmployerResults {
    const socSecContrib = this.calculateSocialSecurityContributions(inputs);

    return {
      grossIncome: inputs.grossIncome,
      socialSecurity: {
        healthInsurance: socSecContrib.healthInsuranceResults.employerContribution,
        nursingCareInsurance: socSecContrib.nursingCareInsuranceResults.employerContribution,
        pensionInsurance: socSecContrib.pensionInsuranceResults.employerContribution,
        unemploymentInsurance: socSecContrib.unemploymentInsuranceResults.employerContribution,
        total: socSecContrib.totalEmployerContribution,
      },
    };
  }
}

export default AggregationService.instance;
