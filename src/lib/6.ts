import { calculateAnnualIncomeTaxShare } from "./10";
import { calculateAnnualSalaryAfterDeductingAllowances } from "./5";
import { calculateFixedTableAllowances } from "./7";
import { calculateAnnualWageTax } from "./8";
import { calculateProportionOfPensionExpensesForSalaryPaymentPeriod } from "./9";
import { InternalFields } from "./InternalFields";
import { UserInputs } from "./UserInputs";

/**
 * MBERECH - Ermittlung der Jahreslohnsteuer auf laufende Bezüge
 */
export const calculateAnnualIncometaxOnCurrentRemuneration = () => {
  const internalFields = InternalFields.instance;
  const userInputs = UserInputs.instance;

  // MZTABFB
  calculateFixedTableAllowances();

  internalFields.VFRB =
    (internalFields.ANP + internalFields.FVB + internalFields.FVBZ) * 100;

  // MLSTJAHR
  calculateAnnualWageTax();

  internalFields.WVFRB = Math.max(
    (internalFields.ZVE - internalFields.GFB) * 100,
    0
  );

  internalFields.LSTJAHR = internalFields.ST * userInputs.F;

  // UPLSTLZZ
  calculateAnnualIncomeTaxShare();

  // UPVKVLZZ
  calculateProportionOfPensionExpensesForSalaryPaymentPeriod();

  if (userInputs.ZKF > 0) {
    internalFields.ZTABFB = internalFields.ZTABFB + internalFields.KFB;

    // MRE4ABZ
    calculateAnnualSalaryAfterDeductingAllowances();

    // MLSTJAHR
    calculateAnnualWageTax();

    internalFields.JBMG = internalFields.ST * userInputs.F;
  } else {
    internalFields.JBMG = internalFields.LSTJAHR;
  }

  // TODO: MSOLZ
};
