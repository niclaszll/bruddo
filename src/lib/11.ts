import { calculatePensionLumpSumComparatively } from "./12";
import { InternalFields } from "./InternalFields";
import { TaxClass } from "./types";
import { UserInputs } from "./UserInputs";

/**
 * UPEVP - Berechnung der Vorsorgepauschale (§ 39b Absatz 2 Satz 5 Nummer 3 und Absatz 4 EStG)
 */
export const calculatePensionLumpSum = () => {
  const internalFields = InternalFields.instance;
  const userInputs = UserInputs.instance;

  if (userInputs.KRV === 1) {
    internalFields.VSP1 = 0;
  } else {
    internalFields.ZRE4VP = Math.min(
      internalFields.ZRE4VP,
      internalFields.BBGRV
    );

    internalFields.VSP1 = internalFields.ZRE4VP * internalFields.RVSATZAN;
  }

  internalFields.VSP2 = 0.12 * internalFields.ZRE4VP;
  internalFields.VHB = userInputs.STKL === TaxClass.III ? 3000 : 1900;
  internalFields.VSP2 = Math.min(internalFields.VSP2, internalFields.VHB);
  internalFields.VSPN = Math.ceil(internalFields.VSP1 + internalFields.VSP2);

  // MVSP
  calculatePensionLumpSumComparatively();

  internalFields.VSP = Math.max(internalFields.VSPN, internalFields.VSP);
};
