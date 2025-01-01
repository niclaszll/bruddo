import { calculatePensionLumpSum } from "./11_UPEVP";
import { calculateIncomeTaxForTaxClassesVAndVI } from "./13_MST5-6";
import { calculateStandardIncomeTax } from "./22_UPTAB24";
import { InternalFields } from "./InternalFields";
import { TaxClass } from "./types";
import { UserInputs } from "./UserInputs";

/**
 * MLSTJAHR - Ermittlung der Jahreslohnsteuer
 */
export const calculateAnnualWageTax = () => {
  const internalFields = InternalFields.instance;

  // UPEVP
  calculatePensionLumpSum();

  internalFields.ZVE =
    internalFields.ZRE4 - internalFields.ZTABFB - internalFields.VSP;

  calculateUPMLST();
};

/**
 * UPMLST
 */
export const calculateUPMLST = () => {
  const internalFields = InternalFields.instance;
  const userInputs = UserInputs.instance;

  if (internalFields.ZVE < 1) {
    internalFields.ZVE = 0;
    internalFields.X = 0;
  } else {
    Math.floor((internalFields.X = internalFields.ZVE / internalFields.KZTAB));
  }

  if (userInputs.STKL < TaxClass.VI) {
    // UPTAB24
    calculateStandardIncomeTax();
  } else {
    // MST5-6
    calculateIncomeTaxForTaxClassesVAndVI();
  }
};
