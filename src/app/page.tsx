import SalaryForm from '@/components/salary-form';
import SocialSecurityClient from '@/lib/social-security';
import TaxClient from '@/lib/taxes';
import { GermanFederalState } from '@/types/common';

export default function Home() {
  const grossIncome = 50_000;
  const federalState = GermanFederalState.Hamburg;
  TaxClient.setUserInputs();
  const incomeTaxResults = TaxClient.getIncomeTax();
  const churchTax = TaxClient.getChurchTax(incomeTaxResults.incomeTax, federalState, true);
  const healthInsuranceResults = SocialSecurityClient.getHealthInsuranceContribution(
    grossIncome,
    2.5,
  );
  const longTermInsuranceResults = SocialSecurityClient.getLongTermCareInsuranceContribution(
    grossIncome,
    0,
    26,
    federalState,
  );
  const pensionInsuranceResults =
    SocialSecurityClient.calculatePensionInsuranceContribution(grossIncome);
  const unemploymentInsuranceResults =
    SocialSecurityClient.calculateUnemploymentInsuranceContribution(grossIncome);

  const netIncome =
    grossIncome -
    incomeTaxResults.incomeTax -
    incomeTaxResults.solidaritySurcharge -
    churchTax -
    healthInsuranceResults.employeeContribution -
    longTermInsuranceResults.employeeContribution -
    pensionInsuranceResults.employeeContribution -
    unemploymentInsuranceResults.employeeContribution;

  console.log({
    incomeTaxResults,
    healthInsuranceResults,
    longTermInsuranceResults,
    pensionInsuranceResults,
    unemploymentInsuranceResults,
    netIncome,
  });

  return (
    <div className="min-h-screen p-8 pb-20">
      <SalaryForm />
    </div>
  );
}
