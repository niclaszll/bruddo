import { roundDownToFullCent, roundDownToFullEuro } from "@/util/format";
import { calculateIncomeTaxForTaxClassesVAndVI } from "./13_MST5-6";
import { calculateStandardIncomeTax } from "./22_UPTAB24";
import { InternalFields } from "./InternalFields";
import { UserInputs } from "./UserInputs";

/**
 * MSOLZSTS - Berechnung des SolZ auf sonstige Bezüge
 */
export const calculateSolidaritySurchargeOtherEmoluments = () => {
  const internalFields = InternalFields.instance;
  const userInputs = UserInputs.instance;

  internalFields.SOLZSZVE =
    userInputs.ZKF > 0
      ? internalFields.ZVE - internalFields.KFB
      : internalFields.ZVE;

  if (internalFields.SOLZSZVE < 1) {
    internalFields.SOLZSZVE = 0;
    internalFields.X = 0;
  } else {
    internalFields.X = roundDownToFullEuro(
      internalFields.SOLZSZVE / internalFields.KZTAB
    );
  }

  if (userInputs.STKL < 5) {
    // UPTAB24
    calculateStandardIncomeTax();
  } else {
    // MST5-6
    calculateIncomeTaxForTaxClassesVAndVI();
  }

  internalFields.SOLZSBMG = roundDownToFullEuro(
    internalFields.ST * userInputs.F
  );

  if (internalFields.SOLZSBMG > internalFields.SOLZFREI) {
    internalFields.SOLZS = roundDownToFullCent(
      (internalFields.STS * 5.5) / 100
    );
  } else {
    internalFields.SOLZS = 0;
  }
};
