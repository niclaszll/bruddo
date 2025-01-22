import { CalculationPeriod, FederalState } from '@/types/common';
import {
  HEALTH_INSURANCE_GENERAL_RATE,
  HEALTH_INSURANCE_INCOME_THRESHOLD_MONTH,
  HEALTH_INSURANCE_INCOME_THRESHOLD_YEAR,
  PENSION_INSURANCE_CONTRIBUTION_RATE,
  PENSION_INSURANCE_INCOME_THRESHOLD_MONTH,
  PENSION_INSURANCE_INCOME_THRESHOLD_YEAR,
  UNEMPLOYMENT_INSURANCE_CONTRIBUTION_RATE,
  UNEMPLOYMENT_INSURANCE_INCOME_THRESHOLD_MONTH,
  UNEMPLOYMENT_INSURANCE_INCOME_THRESHOLD_YEAR,
} from '@/util/constants';
import { roundToFullCent } from '@/util/format';

class SocialSecurityService {
  static #instance: SocialSecurityService;

  private constructor() {}

  public static get instance(): SocialSecurityService {
    if (!SocialSecurityService.#instance) {
      SocialSecurityService.#instance = new SocialSecurityService();
    }

    return SocialSecurityService.#instance;
  }

  public calculateStatutoryHealthInsuranceContribution(
    grossIncome: number,
    additionalContributionRate: number,
    calculationPeriod: CalculationPeriod,
  ) {
    const threshold =
      calculationPeriod === CalculationPeriod.enum.YEAR
        ? HEALTH_INSURANCE_INCOME_THRESHOLD_YEAR
        : HEALTH_INSURANCE_INCOME_THRESHOLD_MONTH;

    const cappedIncome = Math.min(grossIncome, threshold);

    const generalContribution = roundToFullCent(
      (cappedIncome * HEALTH_INSURANCE_GENERAL_RATE) / 100,
    );

    const additionalContribution = roundToFullCent(
      (cappedIncome * additionalContributionRate) / 100,
    );

    const totalContribution = roundToFullCent(generalContribution + additionalContribution);

    const employeeContribution = roundToFullCent(totalContribution / 2);
    const employerContribution = roundToFullCent(totalContribution / 2);

    return {
      totalContribution,
      generalContribution,
      additionalContribution,
      employeeContribution,
      employerContribution,
    };
  }

  public calculateNursingCareInsuranceContribution(
    grossIncome: number,
    numberOfChildren: number,
    age: number,
    federalState: FederalState,
    calculationPeriod: CalculationPeriod,
  ) {
    const employerShareFixed = federalState === FederalState.enum.SN ? 1.3 : 1.8;

    let effectiveRate: number;

    if (numberOfChildren === 0 && age >= 23) {
      effectiveRate = 4.2;
    } else if (numberOfChildren === 1 || (numberOfChildren === 0 && age < 23)) {
      effectiveRate = 3.6;
    } else if (numberOfChildren === 2) {
      effectiveRate = 3.35;
    } else if (numberOfChildren === 3) {
      effectiveRate = 3.1;
    } else if (numberOfChildren === 4) {
      effectiveRate = 2.85;
    } else {
      // five or more children
      effectiveRate = 2.6;
    }

    const employeeShare = effectiveRate - employerShareFixed;

    const threshold =
      calculationPeriod === CalculationPeriod.enum.YEAR
        ? HEALTH_INSURANCE_INCOME_THRESHOLD_YEAR
        : HEALTH_INSURANCE_INCOME_THRESHOLD_MONTH;

    const cappedIncome = Math.min(grossIncome, threshold);

    const totalContribution = roundToFullCent((cappedIncome * effectiveRate) / 100);

    const employeeContribution = roundToFullCent((cappedIncome * employeeShare) / 100);
    const employerContribution = roundToFullCent((cappedIncome * employerShareFixed) / 100);

    return {
      totalContribution,
      employeeContribution,
      employerContribution,
    };
  }

  public calculatePensionInsuranceContribution(
    grossIncome: number,
    calculationPeriod: CalculationPeriod,
  ) {
    const threshold =
      calculationPeriod === CalculationPeriod.enum.YEAR
        ? PENSION_INSURANCE_INCOME_THRESHOLD_YEAR
        : PENSION_INSURANCE_INCOME_THRESHOLD_MONTH;

    const cappedIncome = Math.min(grossIncome, threshold);

    const totalContribution = roundToFullCent(
      (cappedIncome * PENSION_INSURANCE_CONTRIBUTION_RATE) / 100,
    );
    const employeeContribution = totalContribution / 2;
    const employerContribution = totalContribution / 2;

    return {
      totalContribution,
      employeeContribution,
      employerContribution,
    };
  }

  public calculateUnemploymentInsuranceContribution(
    annualGrossIncome: number,
    calculationPeriod: CalculationPeriod,
  ) {
    const threshold =
      calculationPeriod === CalculationPeriod.enum.YEAR
        ? UNEMPLOYMENT_INSURANCE_INCOME_THRESHOLD_YEAR
        : UNEMPLOYMENT_INSURANCE_INCOME_THRESHOLD_MONTH;

    const cappedIncome = Math.min(annualGrossIncome, threshold);

    const totalContribution = roundToFullCent(
      (cappedIncome * UNEMPLOYMENT_INSURANCE_CONTRIBUTION_RATE) / 100,
    );
    const employeeContribution = totalContribution / 2;
    const employerContribution = totalContribution / 2;

    return {
      totalContribution,
      employeeContribution,
      employerContribution,
    };
  }
}

export default SocialSecurityService.instance;
