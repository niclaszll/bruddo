import { roundDownToFullCent } from "@/util/format";
import { InternalFields } from "../clients/InternalFields";
import { SalaryPaymentPeriod } from "@/types/income-tax";
import { UserInputs } from "../clients/UserInputs";

/**
 * UPANTEIL - Ermittlung des Anteils der berücksichtigten privaten Kranken- und
 * Pflegeversicherungsbeiträge für den Lohnzahlungszeitraum
 */
export const calculateUPANTEIL = () => {
  const internalFields = InternalFields.instance;
  const userInputs = UserInputs.instance;

  switch (userInputs.LZZ) {
    case SalaryPaymentPeriod.YEAR:
      internalFields.ANTEIL1 = internalFields.JW;
      break;
    case SalaryPaymentPeriod.MONTH:
      internalFields.ANTEIL1 = roundDownToFullCent(internalFields.JW / 12);
      break;
    case SalaryPaymentPeriod.WEEK:
      internalFields.ANTEIL1 = roundDownToFullCent(
        (internalFields.JW * 7) / 360
      );
      break;
    case SalaryPaymentPeriod.DAY:
      internalFields.ANTEIL1 = roundDownToFullCent(internalFields.JW / 360);
      break;
  }
};
