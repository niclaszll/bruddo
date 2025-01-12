import { TaxClass } from '@/types/income-tax';
import { roundDownToFullCent, roundDownToFullEuro } from '@/util/format';

import { calculateMST5_6 } from './13_MST5-6';
import { calculateUPTAB24 } from './22_UPTAB24';
import { InternalFieldsClient } from './fields/InternalFields';
import { UserInputsClient } from './fields/UserInputs';

/**
 * MSOLZSTS - Berechnung des SolZ auf sonstige Bezüge
 */
export const calculateMSOLZSTS = () => {
  const internalFields = InternalFieldsClient.instance;
  const userInputs = UserInputsClient.instance;

  internalFields.SOLZSZVE =
    userInputs.ZKF > 0 ? internalFields.ZVE - internalFields.KFB : internalFields.ZVE;

  if (internalFields.SOLZSZVE < 1) {
    internalFields.SOLZSZVE = 0;
    internalFields.X = 0;
  } else {
    internalFields.X = roundDownToFullEuro(internalFields.SOLZSZVE / internalFields.KZTAB);
  }

  if (userInputs.STKL < TaxClass.V) {
    // UPTAB24
    calculateUPTAB24();
  } else {
    // MST5-6
    calculateMST5_6();
  }

  internalFields.SOLZSBMG = roundDownToFullEuro(internalFields.ST * userInputs.F);

  if (internalFields.SOLZSBMG > internalFields.SOLZFREI) {
    internalFields.SOLZS = roundDownToFullCent((internalFields.STS * 5.5) / 100);
  } else {
    internalFields.SOLZS = 0;
  }
};
