import { calculateShareOfAnnualAmountsForLZZ } from "./16_UPANTEIL";
import { InternalFields } from "./InternalFields";

/**
 * UPLSTLZZ - Ermittlung des Anteils der Jahreslohnsteuer für den Lohnzahlungszeitraum
 */
export const calculateUPLSTLZZ = () => {
  const internalFields = InternalFields.instance;

  internalFields.JW = internalFields.LSTJAHR * 100;

  // UPANTEIL
  calculateShareOfAnnualAmountsForLZZ();

  internalFields.LSTLZZ = internalFields.ANTEIL1;
};
