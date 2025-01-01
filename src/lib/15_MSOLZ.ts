import { calculateShareOfAnnualAmountsForLZZ } from "./16_UPANTEIL";
import { InternalFields } from "./InternalFields";
import { UserInputs } from "./UserInputs";

/**
 * MSOLZ - Solidaritätszuschlag
 */
export const calculateSolidaritySurcharge = () => {
  const internalFields = InternalFields.instance;
  const userInputs = UserInputs.instance;

  internalFields.SOLZFREI = internalFields.SOLZFREI * internalFields.KZTAB;

  if (internalFields.JBMG > internalFields.SOLZFREI) {
    internalFields.SOLZJ = Math.floor((internalFields.JBMG * 5.5) / 100);
    internalFields.SOLZMIN =
      ((internalFields.JBMG - internalFields.SOLZFREI) * 11.9) / 100;
    internalFields.SOLZJ = Math.min(
      internalFields.SOLZJ,
      internalFields.SOLZMIN
    );

    internalFields.JW = internalFields.SOLZJ * 100;

    // UPANTEIL
    calculateShareOfAnnualAmountsForLZZ();

    internalFields.SOLZLZZ = internalFields.ANTEIL1;
  } else {
    internalFields.SOLZLZZ = 0;
  }

  /**
   * Aufteilung des Betrages nach § 51a EStG
   * auf den LZZ für die Kirchensteuer
   */
  if (userInputs.R > 0) {
    internalFields.JW = internalFields.JBMG * 100;

    // UPANTEIL
    calculateShareOfAnnualAmountsForLZZ();

    internalFields.BK = internalFields.ANTEIL1;
  } else {
    internalFields.BK = 0;
  }
};
