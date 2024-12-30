import { InternalFields } from "./InternalFields";
import { HealthInsuranceType, TaxClass } from "./types";
import { UserInputs } from "./UserInputs";

/**
 * MVSP - Vorsorgepauschale (§ 39b Absatz 2 Satz 5 Nummer 3 EStG) Vergleichsberechnung zur Mindestvorsorgepauschale
 */
export const calculatePensionLumpSumComparatively = () => {
  const internalFields = InternalFields.instance;
  const userInputs = UserInputs.instance;

  internalFields.ZRE4VP = Math.min(
    internalFields.ZRE4VP,
    internalFields.BBGKVPV
  );

  if (userInputs.PKV > HealthInsuranceType.STATUTORY) {
    if (userInputs.STKL === TaxClass.VI) {
      internalFields.VSP3 = 0;
    } else {
      internalFields.VSP3 = (userInputs.PKPV * 12) / 100;

      if (userInputs.PKV === HealthInsuranceType.PRIVATE_WITH_CONTRIB) {
        internalFields.VSP3 =
          internalFields.VSP3 -
          internalFields.ZRE4VP *
            (internalFields.KVSATZAG + internalFields.PVSATZAG);
      }
    }
  } else {
    internalFields.VSP3 =
      internalFields.ZRE4VP *
      (internalFields.KVSATZAN + internalFields.PVSATZAN);
  }

  internalFields.VSP = Math.ceil(internalFields.VSP3 + internalFields.VSP1);
};
