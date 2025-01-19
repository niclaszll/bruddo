import { TaxClass } from '@/types/common';
import { roundDownToFullEuro } from '@/util/format';

import { calculateUPEVP } from './11_UPEVP';
import { calculateMST5_6 } from './13_MST5-6';
import { calculateUPTAB24 } from './22_UPTAB24';
import { InternalFieldsClient } from './fields/InternalFields';
import { UserInputsClient } from './fields/UserInputs';
import { getIncomeTaxTariffTypeFactor } from './utils';

/**
 * MLSTJAHR - Ermittlung der Jahreslohnsteuer
 */
export const calculateMLSTJAHR = () => {
  const internalFields = InternalFieldsClient.instance;

  // UPEVP
  calculateUPEVP();

  internalFields.ZVE = internalFields.ZRE4 - internalFields.ZTABFB - internalFields.VSP;

  calculateUPMLST();
};

/**
 * UPMLST
 */
export const calculateUPMLST = () => {
  const internalFields = InternalFieldsClient.instance;
  const userInputs = UserInputsClient.instance;

  if (internalFields.ZVE < 1) {
    internalFields.ZVE = 0;
    internalFields.X = 0;
  } else {
    roundDownToFullEuro(
      (internalFields.X = internalFields.ZVE / getIncomeTaxTariffTypeFactor(internalFields.KZTAB)),
    );
  }

  // STKL < V
  if (
    (
      [TaxClass.enum.I, TaxClass.enum.II, TaxClass.enum.III, TaxClass.enum.IV] as TaxClass[]
    ).includes(userInputs.STKL)
  ) {
    // UPTAB24
    calculateUPTAB24();
  } else {
    // MST5-6
    calculateMST5_6();
  }
};
