import SocialSecurityClient from '@/lib/social-security';
import TaxClient from '@/lib/taxes';
import { UserInputs } from '@/types/common';
import { roundUpToFullCent } from '@/util/format';

export const getSalaryResults = (inputs: UserInputs) => {
  TaxClient.setUserInputs(inputs);

  const incomeTaxResults = TaxClient.getIncomeTax();
  const churchTax = TaxClient.getChurchTax(incomeTaxResults.incomeTax, inputs.federalState, true);
  const healthInsuranceResults = SocialSecurityClient.getHealthInsuranceContribution(
    inputs.grossIncome,
    2.45,
  );
  const longTermInsuranceResults = SocialSecurityClient.getLongTermCareInsuranceContribution(
    inputs.grossIncome,
    0,
    26,
    inputs.federalState,
  );
  const pensionInsuranceResults = SocialSecurityClient.calculatePensionInsuranceContribution(
    inputs.grossIncome,
  );
  const unemploymentInsuranceResults =
    SocialSecurityClient.calculateUnemploymentInsuranceContribution(inputs.grossIncome);

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
    incomeTaxResults,
    healthInsuranceResults,
    longTermInsuranceResults,
    pensionInsuranceResults,
    unemploymentInsuranceResults,
    netIncome,
  };
};
