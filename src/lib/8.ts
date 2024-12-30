import { calculatePensionLumpSum } from "./11";
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
    // TODO: UPTAB24
  } else {
    // TODO: MST5-6
  }
};
