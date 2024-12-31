import { calculateAnnualIncomeTaxShare } from "./10_UPLSTLZZ";
import { calculateSolidaritySurcharge } from "./15_MSOLZ";
import { calculateAnnualSalaryAfterDeductingAllowances } from "./5_MRE4ABZ";
import { calculateFixedTableAllowances } from "./7_MZTABFB";
import { calculateAnnualWageTax } from "./8_MLSTJAHR";
import { calculateProportionOfPensionExpensesForSalaryPaymentPeriod } from "./9_UPVKVLZZ";
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

  // MSOLZ
  calculateSolidaritySurcharge();
};
