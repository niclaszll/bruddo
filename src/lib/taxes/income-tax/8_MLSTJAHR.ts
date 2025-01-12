import { TaxClass } from '@/types/income-tax';
import { roundDownToFullEuro } from '@/util/format';

import { calculateUPEVP } from './11_UPEVP';
import { calculateMST5_6 } from './13_MST5-6';
import { calculateUPTAB24 } from './22_UPTAB24';
import { InternalFieldsClient } from './fields/InternalFields';
import { UserInputsClient } from './fields/UserInputs';

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
    roundDownToFullEuro((internalFields.X = internalFields.ZVE / internalFields.KZTAB));
  }

  if (userInputs.STKL < TaxClass.V) {
    // UPTAB24
    calculateUPTAB24();
  } else {
    // MST5-6
    calculateMST5_6();
  }
};
