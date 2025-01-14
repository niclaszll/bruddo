import { FederalState } from '@/types/common';
import {
  HEALTH_INSURANCE_GENERAL_RATE,
  HEALTH_INSURANCE_INCOME_THRESHOLD,
  PENSION_INSURANCE_CONTRIBUTION_RATE,
  PENSION_INSURANCE_INCOME_THRESHOLD,
  UNEMPLOYMENT_INSURANCE_CONTRIBUTION_RATE,
  UNEMPLOYMENT_INSURANCE_INCOME_THRESHOLD,
} from '@/util/constants';
import { roundDownToFullCent } from '@/util/format';

class SocialSecurityClient {
  static #instance: SocialSecurityClient;

  private constructor() {}

  public static get instance(): SocialSecurityClient {
    if (!SocialSecurityClient.#instance) {
      SocialSecurityClient.#instance = new SocialSecurityClient();
    }

    return SocialSecurityClient.#instance;
  }

  public getHealthInsuranceContribution(
    annualGrossIncome: number,
    additionalContributionRate: number,
  ) {
    const cappedIncome = Math.min(annualGrossIncome, HEALTH_INSURANCE_INCOME_THRESHOLD);

    const generalContribution = roundDownToFullCent(
      (cappedIncome * HEALTH_INSURANCE_GENERAL_RATE) / 100,
    );

    const additionalContribution = roundDownToFullCent(
      (cappedIncome * additionalContributionRate) / 100,
    );

    const totalContribution = roundDownToFullCent(generalContribution + additionalContribution);

    const employeeContribution = roundDownToFullCent(totalContribution / 2);
    const employerContribution = roundDownToFullCent(totalContribution / 2);

    return {
      totalContribution,
      generalContribution,
      additionalContribution,
      employeeContribution,
      employerContribution,
    };
  }

  public getLongTermCareInsuranceContribution(
    annualGrossIncome: number,
    numberOfChildren: number,
    age: number,
    federalState: FederalState,
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

    const cappedIncome = Math.min(annualGrossIncome, HEALTH_INSURANCE_INCOME_THRESHOLD);

    const totalContribution = roundDownToFullCent((cappedIncome * effectiveRate) / 100);

    const employeeContribution = roundDownToFullCent((cappedIncome * employeeShare) / 100);
    const employerContribution = roundDownToFullCent((cappedIncome * employerShareFixed) / 100);

    return {
      totalContribution,
      employeeContribution,
      employerContribution,
    };
  }

  public calculatePensionInsuranceContribution(annualGrossIncome: number) {
    const cappedIncome = Math.min(annualGrossIncome, PENSION_INSURANCE_INCOME_THRESHOLD);

    const totalContribution = roundDownToFullCent(
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

  public calculateUnemploymentInsuranceContribution(annualGrossIncome: number) {
    const cappedIncome = Math.min(annualGrossIncome, UNEMPLOYMENT_INSURANCE_INCOME_THRESHOLD);

    const totalContribution = roundDownToFullCent(
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

export default SocialSecurityClient.instance;
