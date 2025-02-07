import SocialSecurityService from '@/features/social-security/service';
import { UserInputs } from '@/types/form';
import { roundDownToFullCent } from '@/util/format';

import { calculateUserAge } from './util';

abstract class BaseService {
  protected getSocialSecResults(inputs: UserInputs) {
    const healthInsRes = SocialSecurityService.calcStatutoryHealthInsContrib(
      inputs.grossIncome,
      inputs.healthInsuranceAdditionalContribution,
      inputs.calculationPeriod,
    );

    const nursingCareInsRes = SocialSecurityService.calcNursingCareInsContrib(
      inputs.grossIncome,
      inputs.numChildren,
      calculateUserAge(inputs.dob),
      inputs.federalState,
      inputs.calculationPeriod,
    );

    const pensionInsRes = SocialSecurityService.calcPensionInsContrib(
      inputs.grossIncome,
      inputs.calculationPeriod,
    );

    const unemploymentInsRes = SocialSecurityService.calcUnemploymentInsContrib(
      inputs.grossIncome,
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
      healthInsuranceResults: healthInsRes,
      nursingCareInsuranceResults: nursingCareInsRes,
      pensionInsuranceResults: pensionInsRes,
      unemploymentInsuranceResults: unemploymentInsRes,
      totalEmployeeContribution: totalEmployeeContrib,
      totalEmployerContribution: totalEmployerContrib,
    };
  }
}

export default BaseService;
