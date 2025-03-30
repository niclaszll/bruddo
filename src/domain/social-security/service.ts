'server only';

import { CalculationPeriod, FederalState } from '@/types/common';
import {
  HEALTH_INSURANCE_GENERAL_RATE,
  HEALTH_INSURANCE_SALARY_THRESHOLD_MONTH,
  HEALTH_INSURANCE_SALARY_THRESHOLD_YEAR,
  PENSION_INSURANCE_CONTRIBUTION_RATE,
  PENSION_INSURANCE_SALARY_THRESHOLD_MONTH,
  PENSION_INSURANCE_SALARY_THRESHOLD_YEAR,
  UNEMPLOYMENT_INSURANCE_CONTRIBUTION_RATE,
  UNEMPLOYMENT_INSURANCE_SALARY_THRESHOLD_MONTH,
  UNEMPLOYMENT_INSURANCE_SALARY_THRESHOLD_YEAR,
} from '@/util/constants';
import { roundToFullCent } from '@/util/format';

class SocialSecurityService {
  static #instance: SocialSecurityService;

  private constructor() {}

  public static get instance(): SocialSecurityService {
    return (this.#instance ??= new SocialSecurityService());
  }

  private getThreshold(
    calculationPeriod: CalculationPeriod,
    yearThreshold: number,
    monthThreshold: number,
  ) {
    return calculationPeriod === CalculationPeriod.enum.YEAR ? yearThreshold : monthThreshold;
  }

  public calcStatutoryHealthInsContrib(
    grossSalary: number,
    additionalContributionRate: number,
    calculationPeriod: CalculationPeriod,
  ) {
    const threshold = this.getThreshold(
      calculationPeriod,
      HEALTH_INSURANCE_SALARY_THRESHOLD_YEAR,
      HEALTH_INSURANCE_SALARY_THRESHOLD_MONTH,
    );

    const cappedSalary = Math.min(grossSalary, threshold);
    const generalContribution = roundToFullCent(
      (cappedSalary * HEALTH_INSURANCE_GENERAL_RATE) / 100,
    );
    const additionalContribution = roundToFullCent(
      (cappedSalary * additionalContributionRate) / 100,
    );
    const totalContribution = roundToFullCent(generalContribution + additionalContribution);
    const halfContribution = roundToFullCent(totalContribution / 2);

    return {
      totalContribution,
      generalContribution,
      additionalContribution,
      employeeContribution: halfContribution,
      employerContribution: halfContribution,
    };
  }

  public calcNursingCareInsContrib(
    grossSalary: number,
    numberOfChildren: number,
    age: number,
    federalState: FederalState,
    calculationPeriod: CalculationPeriod,
  ) {
    const employerShareFixed = federalState === FederalState.enum.SN ? 1.3 : 1.8;

    function getNursingCareRate(numberOfChildren: number, age: number): number {
      if (numberOfChildren === 0 && age >= 23) return 4.2;
      if (numberOfChildren === 1 || (numberOfChildren === 0 && age < 23)) return 3.6;
      if (numberOfChildren === 2) return 3.35;
      if (numberOfChildren === 3) return 3.1;
      if (numberOfChildren === 4) return 2.85;
      return 2.6; // five or more children
    }

    const effectiveRate = getNursingCareRate(numberOfChildren, age);
    const employeeShare = effectiveRate - employerShareFixed;

    const threshold = this.getThreshold(
      calculationPeriod,
      HEALTH_INSURANCE_SALARY_THRESHOLD_YEAR,
      HEALTH_INSURANCE_SALARY_THRESHOLD_MONTH,
    );

    const cappedSalary = Math.min(grossSalary, threshold);
    const totalContribution = roundToFullCent((cappedSalary * effectiveRate) / 100);
    const employeeContribution = roundToFullCent((cappedSalary * employeeShare) / 100);
    const employerContribution = roundToFullCent((cappedSalary * employerShareFixed) / 100);

    return { totalContribution, employeeContribution, employerContribution };
  }

  public calcPensionInsContrib(grossSalary: number, calculationPeriod: CalculationPeriod) {
    const threshold = this.getThreshold(
      calculationPeriod,
      PENSION_INSURANCE_SALARY_THRESHOLD_YEAR,
      PENSION_INSURANCE_SALARY_THRESHOLD_MONTH,
    );

    const cappedSalary = Math.min(grossSalary, threshold);

    const totalContribution = roundToFullCent(
      (cappedSalary * PENSION_INSURANCE_CONTRIBUTION_RATE) / 100,
    );
    const halfContribution = roundToFullCent(totalContribution / 2);

    return {
      totalContribution,
      employeeContribution: halfContribution,
      employerContribution: halfContribution,
    };
  }

  public calcUnemploymentInsContrib(
    annualGrossSalary: number,
    calculationPeriod: CalculationPeriod,
  ) {
    const threshold = this.getThreshold(
      calculationPeriod,
      UNEMPLOYMENT_INSURANCE_SALARY_THRESHOLD_YEAR,
      UNEMPLOYMENT_INSURANCE_SALARY_THRESHOLD_MONTH,
    );

    const cappedSalary = Math.min(annualGrossSalary, threshold);

    const totalContribution = roundToFullCent(
      (cappedSalary * UNEMPLOYMENT_INSURANCE_CONTRIBUTION_RATE) / 100,
    );
    const halfContribution = roundToFullCent(totalContribution / 2);

    return {
      totalContribution,
      employeeContribution: halfContribution,
      employerContribution: halfContribution,
    };
  }
}

export default SocialSecurityService.instance;
