import SocialSecurityService from '@/domain/social-security/service';
import { CalculationPeriod, CalculationPeriodTuple } from '@/types/common';
import { UserInputs } from '@/types/form';
import { calculateAge } from '@/util/date';
import { roundDownToFullCent } from '@/util/format';

abstract class BaseService {
  protected getSocialSecResults(inputs: UserInputs) {
    const healthInsRes = SocialSecurityService.calcStatutoryHealthInsContrib(
      inputs.grossSalary,
      inputs.healthInsuranceAdditionalContribution,
      inputs.calculationPeriod,
    );

    const nursingCareInsRes = SocialSecurityService.calcNursingCareInsContrib(
      inputs.grossSalary,
      inputs.numChildren,
      calculateAge(inputs.dob),
      inputs.federalState,
      inputs.calculationPeriod,
    );

    const pensionInsRes = SocialSecurityService.calcPensionInsContrib(
      inputs.grossSalary,
      inputs.calculationPeriod,
    );

    const unemploymentInsRes = SocialSecurityService.calcUnemploymentInsContrib(
      inputs.grossSalary,
      inputs.calculationPeriod,
    );

    const totalEmployeeContrib = roundDownToFullCent(
      healthInsRes.employeeContribution +
        nursingCareInsRes.employeeContribution +
        pensionInsRes.employeeContribution +
        unemploymentInsRes.employeeContribution,
    );

    const totalEmployerContrib = roundDownToFullCent(
      healthInsRes.employerContribution +
        nursingCareInsRes.employerContribution +
        pensionInsRes.employerContribution +
        unemploymentInsRes.employerContribution,
    );

    return {
      healthInsurance: healthInsRes,
      nursingCareInsurance: nursingCareInsRes,
      pensionInsurance: pensionInsRes,
      unemploymentInsurance: unemploymentInsRes,
      totalEmployeeContribution: totalEmployeeContrib,
      totalEmployerContribution: totalEmployerContrib,
    };
  }

  protected getMonthlyAndYearlyValues(
    value: number,
    calculationPeriod: CalculationPeriod,
  ): CalculationPeriodTuple {
    const isYearly = calculationPeriod === CalculationPeriod.enum.YEAR;
    return {
      [CalculationPeriod.enum.MONTH]: isYearly ? roundDownToFullCent(value / 12) : value,
      [CalculationPeriod.enum.YEAR]: isYearly ? value : value * 12,
    };
  }
}

export default BaseService;
