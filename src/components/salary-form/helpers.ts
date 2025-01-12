import SocialSecurityClient from '@/lib/social-security';
import TaxClient from '@/lib/taxes';
import { GermanFederalState, UserInputs } from '@/types/common';

export const getSalaryResults = (inputs: UserInputs) => {
  const federalState = GermanFederalState.Hamburg;
  TaxClient.setUserInputs(inputs);

  const incomeTaxResults = TaxClient.getIncomeTax();
  const churchTax = TaxClient.getChurchTax(incomeTaxResults.incomeTax, federalState, true);
  const healthInsuranceResults = SocialSecurityClient.getHealthInsuranceContribution(
    inputs.grossIncome,
    2.5,
  );
  const longTermInsuranceResults = SocialSecurityClient.getLongTermCareInsuranceContribution(
    inputs.grossIncome,
    0,
    26,
    federalState,
  );
  const pensionInsuranceResults = SocialSecurityClient.calculatePensionInsuranceContribution(
    inputs.grossIncome,
  );
  const unemploymentInsuranceResults =
    SocialSecurityClient.calculateUnemploymentInsuranceContribution(inputs.grossIncome);

  const netIncome =
    inputs.grossIncome -
    incomeTaxResults.incomeTax -
    incomeTaxResults.solidaritySurcharge -
    churchTax -
    healthInsuranceResults.employeeContribution -
    longTermInsuranceResults.employeeContribution -
    pensionInsuranceResults.employeeContribution -
    unemploymentInsuranceResults.employeeContribution;

  return {
    incomeTaxResults,
    healthInsuranceResults,
    longTermInsuranceResults,
    pensionInsuranceResults,
    unemploymentInsuranceResults,
    netIncome,
  };
};
