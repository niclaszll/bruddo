import { roundDownToFullEuro } from "@/util/format";
import { calculateMVSP } from "./12_MVSP";
import { InternalFields } from "../clients/InternalFields";
import { TaxClass } from "@/types/income-tax";
import { UserInputs } from "../clients/UserInputs";

/**
 * UPEVP - Berechnung der Vorsorgepauschale (§ 39b Absatz 2 Satz 5 Nummer 3 und Absatz 4 EStG)
 */
export const calculateUPEVP = () => {
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
  internalFields.VSPN = roundDownToFullEuro(
    internalFields.VSP1 + internalFields.VSP2
  );

  // MVSP
  calculateMVSP();

  internalFields.VSP = Math.max(internalFields.VSPN, internalFields.VSP);
};
