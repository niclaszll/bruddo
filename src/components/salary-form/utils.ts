import SocialSecurityClient from '@/lib/social-security';
import TaxClient from '@/lib/taxes';
import { UserInputs } from '@/types/form';
import { roundUpToFullCent } from '@/util/format';
import dayjs from 'dayjs';

export const getSalaryResults = (inputs: UserInputs) => {
  const age = dayjs(new Date()).diff(dayjs(inputs.dob), 'years');

  const incomeTaxResults = TaxClient.getIncomeTax(inputs);
  const churchTax = TaxClient.getChurchTax(
    incomeTaxResults.churchTaxAssessmentBasis,
    inputs.federalState,
    inputs.churchTax,
  );
  const healthInsuranceResults = SocialSecurityClient.getHealthInsuranceContribution(
    inputs.grossIncome,
    inputs.healthInsuranceAdditionalContribution,
    inputs.calculationPeriod,
  );
  const longTermInsuranceResults = SocialSecurityClient.getLongTermCareInsuranceContribution(
    inputs.grossIncome,
    inputs.numChildren,
    age,
    inputs.federalState,
    inputs.calculationPeriod,
  );
  const pensionInsuranceResults = SocialSecurityClient.calculatePensionInsuranceContribution(
    inputs.grossIncome,
    inputs.calculationPeriod,
  );
  const unemploymentInsuranceResults =
    SocialSecurityClient.calculateUnemploymentInsuranceContribution(
      inputs.grossIncome,
      inputs.calculationPeriod,
    );

  const netIncome = roundUpToFullCent(
    inputs.grossIncome -
      incomeTaxResults.incomeTax -
      incomeTaxResults.solidaritySurcharge -
      churchTax -
      healthInsuranceResults.employeeContribution -
      longTermInsuranceResults.employeeContribution -
      pensionInsuranceResults.employeeContribution -
      unemploymentInsuranceResults.employeeContribution,
  );

  return {
    age,
    incomeTaxResults,
    churchTax,
    healthInsuranceResults,
    longTermInsuranceResults,
    pensionInsuranceResults,
    unemploymentInsuranceResults,
    netIncome,
  };
};
