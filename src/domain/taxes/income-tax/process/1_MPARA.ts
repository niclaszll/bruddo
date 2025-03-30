// see: https://www.bundesfinanzministerium.de/Content/DE/Downloads/Steuern/Steuerarten/Lohnsteuer/Programmablaufplan/2024-11-22-PAP-2025_anlage.pdf?__blob=publicationFile&v=2
import { HEALTH_INSURANCE_SALARY_THRESHOLD_YEAR } from '@/util/constants';

import { InternalFieldsClient } from '../clients/InternalFieldsClient';
import { UserInputsClient } from '../clients/UserInputsClient';

/**
 * MPARA - Zuweisung von Werten für bestimmte Sozialversicherungsparameter
 */
export const setupMPARA = () => {
  const internalFields = InternalFieldsClient.instance;
  const userInputs = UserInputsClient.instance;

  internalFields.BBGRV = userInputs.KRV < 1 ? 96600 : 0;
  internalFields.RVSATZAN = userInputs.KRV < 1 ? 0.093 : 0;
  internalFields.BBGKVPV = HEALTH_INSURANCE_SALARY_THRESHOLD_YEAR;
  internalFields.KVSATZAN = userInputs.KVZ / 2 / 100 + 0.07;
  internalFields.KVSATZAG = 0.0125 + 0.07;

  if (userInputs.PVS === 1) {
    internalFields.PVSATZAN = 0.023;
    internalFields.PVSATZAG = 0.013;
  } else {
    internalFields.PVSATZAN = 0.018;
    internalFields.PVSATZAG = 0.018;
  }

  if (userInputs.PVZ === 1) {
    internalFields.PVSATZAN = internalFields.PVSATZAN + 0.006;
  } else {
    internalFields.PVSATZAN = internalFields.PVSATZAN - userInputs.PVA * 0.0025;
  }

  internalFields.W1STKL5 = 13432;
  internalFields.W2STKL5 = 33380;
  internalFields.W3STKL5 = 222260;

  internalFields.GFB = 12096;
  internalFields.SOLZFREI = 18130;
};
