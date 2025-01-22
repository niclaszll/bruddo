import { CalculationPeriod } from '@/types/common';
import { roundDownToFullCent } from '@/util/format';

import { InternalFieldsClient } from '../clients/InternalFieldsClient';
import { UserInputsClient } from '../clients/UserInputsClient';

/**
 * UPANTEIL - Ermittlung des Anteils der berücksichtigten privaten Kranken- und
 * Pflegeversicherungsbeiträge für den Lohnzahlungszeitraum
 */
export const calculateUPANTEIL = () => {
  const internalFields = InternalFieldsClient.instance;
  const userInputs = UserInputsClient.instance;

  switch (userInputs.LZZ) {
    case CalculationPeriod.enum.YEAR:
      internalFields.ANTEIL1 = internalFields.JW;
      break;
    case CalculationPeriod.enum.MONTH:
      internalFields.ANTEIL1 = roundDownToFullCent(internalFields.JW / 12);
      break;
    case CalculationPeriod.enum.WEEK:
      internalFields.ANTEIL1 = roundDownToFullCent((internalFields.JW * 7) / 360);
      break;
    case CalculationPeriod.enum.DAY:
      internalFields.ANTEIL1 = roundDownToFullCent(internalFields.JW / 360);
      break;
  }
};
