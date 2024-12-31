import { InternalFields } from "./InternalFields";
import { SalaryPaymentPeriod } from "./types";
import { UserInputs } from "./UserInputs";

/**
 * UPANTEIL - Ermittlung des Anteils der berücksichtigten privaten Kranken- und
 * Pflegeversicherungsbeiträge für den Lohnzahlungszeitraum
 */
export const calculateShareOfAnnualAmountsForLZZ = () => {
  const internalFields = InternalFields.instance;
  const userInputs = UserInputs.instance;

  switch (userInputs.LZZ) {
    case SalaryPaymentPeriod.YEAR:
      internalFields.ANTEIL1 = internalFields.JW;
      break;
    case SalaryPaymentPeriod.MONTH:
      internalFields.ANTEIL1 = Math.floor(internalFields.JW / 12);
      break;
    case SalaryPaymentPeriod.WEEK:
      internalFields.ANTEIL1 = Math.floor((internalFields.JW * 7) / 360);
      break;
    case SalaryPaymentPeriod.DAY:
      internalFields.ANTEIL1 = Math.floor(internalFields.JW / 360);
      break;
  }
};
