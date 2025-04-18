import { roundDownToFullCent } from '@/util/format';

import { InternalFieldsClient } from '../clients/InternalFieldsClient';
import { UserInputsClient } from '../clients/UserInputsClient';
import { getIncomeTaxTariffTypeFactor } from '../utils';
import { calculateUPANTEIL } from './16_UPANTEIL';

/**
 * MSOLZ - Solidaritätszuschlag
 */
export const calculateMSOLZ = () => {
  const internalFields = InternalFieldsClient.instance;
  const userInputs = UserInputsClient.instance;

  internalFields.SOLZFREI =
    internalFields.SOLZFREI * getIncomeTaxTariffTypeFactor(internalFields.KZTAB);

  if (internalFields.JBMG > internalFields.SOLZFREI) {
    internalFields.SOLZJ = roundDownToFullCent((internalFields.JBMG * 5.5) / 100);
    internalFields.SOLZMIN = ((internalFields.JBMG - internalFields.SOLZFREI) * 11.9) / 100;
    internalFields.SOLZJ = Math.min(internalFields.SOLZJ, internalFields.SOLZMIN);

    internalFields.JW = internalFields.SOLZJ * 100;

    calculateUPANTEIL();

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

    calculateUPANTEIL();

    internalFields.BK = internalFields.ANTEIL1;
  } else {
    internalFields.BK = 0;
  }
};
