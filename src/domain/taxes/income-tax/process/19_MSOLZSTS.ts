import { TaxClass } from '@/types/common';
import { roundDownToFullCent, roundDownToFullEuro } from '@/util/format';

import { InternalFieldsClient } from '../clients/InternalFieldsClient';
import { UserInputsClient } from '../clients/UserInputsClient';
import { getIncomeTaxTariffTypeFactor } from '../utils';
import { calculateMST5_6 } from './13_MST5-6';
import { calculateUPTAB24 } from './22_UPTAB24';

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
    internalFields.X = roundDownToFullEuro(
      internalFields.SOLZSZVE / getIncomeTaxTariffTypeFactor(internalFields.KZTAB),
    );
  }

  // STKL < 5
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

  internalFields.SOLZSBMG = roundDownToFullEuro(internalFields.ST * userInputs.F);

  if (internalFields.SOLZSBMG > internalFields.SOLZFREI) {
    internalFields.SOLZS = roundDownToFullCent((internalFields.STS * 5.5) / 100);
  } else {
    internalFields.SOLZS = 0;
  }
};
