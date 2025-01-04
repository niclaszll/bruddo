import {
  HEALTH_INSURANCE_GENERAL_RATE,
  HEALTH_INSURANCE_INCOME_THRESHOLD,
} from "@/util/constants";
import { roundDownToFullCent } from "@/util/format";

export class HealthInsuranceClient {
  static #instance: HealthInsuranceClient;

  private constructor() {}

  public static get instance(): HealthInsuranceClient {
    if (!HealthInsuranceClient.#instance) {
      HealthInsuranceClient.#instance = new HealthInsuranceClient();
    }

    return HealthInsuranceClient.#instance;
  }

  public calculateHealthInsuranceContribution(
    annualGrossIncome: number,
    additionalContributionRate: number
  ) {
    const cappedIncome = Math.min(
      annualGrossIncome,
      HEALTH_INSURANCE_INCOME_THRESHOLD
    );

    const generalContribution =
      (cappedIncome * HEALTH_INSURANCE_GENERAL_RATE) / 100;

    const additionalContribution =
      (cappedIncome * additionalContributionRate) / 100;

    const totalContribution = roundDownToFullCent(
      generalContribution + additionalContribution
    );

    const employeeShare = roundDownToFullCent(totalContribution / 2);
    const employerShare = roundDownToFullCent(totalContribution / 2);

    return {
      totalContribution,
      employeeShare,
      employerShare,
    };
  }

  public calculateLongTermCareInsurance(
    annualGrossIncome: number,
    numberOfChildren: number,
    age: number,
    isInSaxony: boolean
  ) {
    const employerShareFixed = isInSaxony ? 1.3 : 1.8;

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

    const cappedIncome = Math.min(
      annualGrossIncome,
      HEALTH_INSURANCE_INCOME_THRESHOLD
    );

    const totalContribution = roundDownToFullCent(
      (cappedIncome * effectiveRate) / 100
    );

    const employeeContribution = roundDownToFullCent(
      (cappedIncome * employeeShare) / 100
    );
    const employerContribution = roundDownToFullCent(
      (cappedIncome * employerShareFixed) / 100
    );

    return {
      totalContribution,
      employeeContribution,
      employerContribution,
    };
  }
}
