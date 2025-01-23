import SocialSecurityService from '@/features/social-security/service';
import ChurchTaxService from '@/features/taxes/church-tax/service';
import TaxService from '@/features/taxes/income-tax/service';
import { UserInputs } from '@/types/form';
import { roundToFullCent } from '@/util/format';

import { calculateUserAge } from './util';

export type EmployeeResults = {
  grossIncome: number;
  taxes: {
    incomeTax: number;
    solidaritySurcharge: number;
    churchTax: number;
  };
  socialSecurity: {
    healthInsurance: number;
    nursingCareInsurance: number;
    pensionInsurance: number;
    unemploymentInsurance: number;
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

    return {
      healthInsuranceResults,
      nursingCareInsuranceResults,
      pensionInsuranceResults,
      unemploymentInsuranceResults,
    };
  }

  private calculateTaxContributions(inputs: UserInputs) {
    const incomeTaxResults = TaxService.calculateIncomeTax(inputs);
    const churchTax = ChurchTaxService.calculateChurchTax(
      incomeTaxResults.churchTaxAssessmentBasis,
      inputs.federalState,
      inputs.churchTax,
    );

    return {
      incomeTaxResults,
      churchTax,
    };
  }

  public getAggregatedResultsForEmployee(inputs: UserInputs): EmployeeResults {
    const taxContributions = this.calculateTaxContributions(inputs);
    const socialSecurityContributions = this.calculateSocialSecurityContributions(inputs);

    const netIncomeCalcParams: NetIncomeCalculationParams = {
      grossIncome: inputs.grossIncome,
      taxes: {
        incomeTax: taxContributions.incomeTaxResults.incomeTax,
        solidaritySurcharge: taxContributions.incomeTaxResults.solidaritySurcharge,
        churchTax: taxContributions.churchTax,
      },
      socialSecurity: {
        healthInsurance: socialSecurityContributions.healthInsuranceResults.employeeContribution,
        nursingCareInsurance:
          socialSecurityContributions.nursingCareInsuranceResults.employeeContribution,
        pensionInsurance: socialSecurityContributions.pensionInsuranceResults.employeeContribution,
        unemploymentInsurance:
          socialSecurityContributions.unemploymentInsuranceResults.employeeContribution,
      },
    };

    const netIncome = this.calculateEmployeeNetIncome(netIncomeCalcParams);

    return {
      ...netIncomeCalcParams,
      netIncome,
    };
  }

  public getAggregatedResultsForEmployer(inputs: UserInputs): EmployerResults {
    const socialSecurityContributions = this.calculateSocialSecurityContributions(inputs);

    return {
      grossIncome: inputs.grossIncome,
      socialSecurity: {
        healthInsurance: socialSecurityContributions.healthInsuranceResults.employerContribution,
        nursingCareInsurance:
          socialSecurityContributions.nursingCareInsuranceResults.employerContribution,
        pensionInsurance: socialSecurityContributions.pensionInsuranceResults.employerContribution,
        unemploymentInsurance:
          socialSecurityContributions.unemploymentInsuranceResults.employerContribution,
      },
    };
  }
}

export default AggregationService.instance;
