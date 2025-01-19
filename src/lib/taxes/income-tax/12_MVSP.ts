import { TaxClass } from '@/types/common';
import { HealthInsuranceType } from '@/types/income-tax';
import { roundUpToFullEuro } from '@/util/format';

import { InternalFieldsClient } from './fields/InternalFields';
import { UserInputsClient } from './fields/UserInputs';

/**
 * MVSP - Vorsorgepauschale (§ 39b Absatz 2 Satz 5 Nummer 3 EStG) Vergleichsberechnung zur Mindestvorsorgepauschale
 */
export const calculateMVSP = () => {
  const internalFields = InternalFieldsClient.instance;
  const userInputs = UserInputsClient.instance;

  internalFields.ZRE4VP = Math.min(internalFields.ZRE4VP, internalFields.BBGKVPV);

  if (
    userInputs.PKV === HealthInsuranceType.enum.PRIVATE_NO_CONTRIB ||
    userInputs.PKV === HealthInsuranceType.enum.PRIVATE_WITH_CONTRIB
  ) {
    if (userInputs.STKL === TaxClass.enum.VI) {
      internalFields.VSP3 = 0;
    } else {
      internalFields.VSP3 = (userInputs.PKPV * 12) / 100;

      if (userInputs.PKV === HealthInsuranceType.enum.PRIVATE_WITH_CONTRIB) {
        internalFields.VSP3 =
          internalFields.VSP3 -
          internalFields.ZRE4VP * (internalFields.KVSATZAG + internalFields.PVSATZAG);
      }
    }
  } else {
    internalFields.VSP3 =
      internalFields.ZRE4VP * (internalFields.KVSATZAN + internalFields.PVSATZAN);
  }

  internalFields.VSP = roundUpToFullEuro(internalFields.VSP3 + internalFields.VSP1);
};
