import { SalaryPaymentPeriod } from '@/types/income-tax';
import { roundDownToFullCent } from '@/util/format';

import { InternalFieldsClient } from './fields/InternalFields';
import { UserInputsClient } from './fields/UserInputs';

/**
 * UPANTEIL - Ermittlung des Anteils der berücksichtigten privaten Kranken- und
 * Pflegeversicherungsbeiträge für den Lohnzahlungszeitraum
 */
export const calculateUPANTEIL = () => {
  const internalFields = InternalFieldsClient.instance;
  const userInputs = UserInputsClient.instance;

  switch (userInputs.LZZ) {
    case SalaryPaymentPeriod.YEAR:
      internalFields.ANTEIL1 = internalFields.JW;
      break;
    case SalaryPaymentPeriod.MONTH:
      internalFields.ANTEIL1 = roundDownToFullCent(internalFields.JW / 12);
      break;
    case SalaryPaymentPeriod.WEEK:
      internalFields.ANTEIL1 = roundDownToFullCent((internalFields.JW * 7) / 360);
      break;
    case SalaryPaymentPeriod.DAY:
      internalFields.ANTEIL1 = roundDownToFullCent(internalFields.JW / 360);
      break;
  }
};
